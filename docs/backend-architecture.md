# Backend Architecture

How the Shelvus backend is laid out, and how image uploads (book covers and
profile pictures) move through it. Parts marked *(planned)* do not exist yet.

The database tables are described in [ERD.drawio](ERD.drawio).

## Overview

```
                         ┌──────────────────────┐
                         │      Frontend        │
                         │ (account settings,   │
                         │  admin book page...) │
                         └──────────┬───────────┘
                                    ▼
┌──────────────────────────────────────────────────────────────┐
│ app.js:  cors → express.json → session                       │
└──────┬──────────────┬──────────────┬──────────────┬──────────┘
       ▼              ▼              ▼              ▼
 ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────────────┐
 │ /user    │   │ /book    │   │ /loan    │   │ /media (planned) │
 │          │   │          │   │ (planned)│   │ mediaRoutes      │
 │          │   │          │   │          │   │  + upload.single │
 └────┬─────┘   └────┬─────┘   └────┬─────┘   └────────┬─────────┘
      ▼              ▼              ▼                  ▼
 ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────────────┐
 │ user     │   │ book     │   │ loan     │   │ mediaController  │
 │ Ctrl     │   │ Ctrl     │   │ Ctrl     │   │ (only one that   │
 │          │   │          │   │ (planned)│   │  uses s3Client)  │
 └────┬─────┘   └────┬─────┘   └────┬─────┘   └──┬───────────┬───┘
      │              │              │            │           │
      ▼              ▼              ▼            ▼           ▼
 ┌────────────────────────────────────────────────────┐ ┌──────────┐
 │ Models: userModel  bookModel  bookCopyModel        │ │ s3Client │
 │         loanModel  mediaAsset                      │ └────┬─────┘
 └─────────────────────────┬──────────────────────────┘      ▼
                           ▼                          ┌──────────────┐
                     ┌────────────┐                   │  R2 bucket   │
                     │ Library.db │                   └──────▲───────┘
                     └────────────┘                          │ public URL
                                                    ┌────────┴───────┐
                                                    │ Browser loads  │
                                                    │ images directly│
                                                    └────────────────┘
```

## Layers

Each layer only talks to the layer directly below it.

| Layer | Folder | Job |
|---|---|---|
| Routes | `src/routes` | Match the URL and run per-route middleware (e.g. `upload.single`, admin check). |
| Controllers | `src/Controllers` | Read `req`, call models, talk to R2, send the response. |
| Models | `src/Models` | Run SQL against `Library.db`. Never see `req` or files. |
| Config | `src/config` | `env.js` (loads `.env`), `database_conn.js`, `s3Client.js`, `multerConfig.js`. |

### Models

One model class per table, all methods `static`. The exception is `BookImage`,
a small junction table that is only used through a book, so its queries live in
`bookModel`.

| Model | Tables |
|---|---|
| `userModel` | `User` (including setting `avatar_id`) |
| `bookModel` | `Book`, `BookImage` |
| `bookCopyModel` *(planned)* | `BookCopy` |
| `loanModel` *(planned)* | `Loan` |
| `mediaAsset` | `MediaAsset`: insert, get, delete only |

## Images and R2

- **Files live in Cloudflare R2. The database stores only the file's key**
  (`MediaAsset.storage_key`), e.g. `book-covers/<uuid>.jpg`.
- `MediaAsset` describes the file only. Who it belongs to is stored separately:
  - Book cover: a `BookImage` row with `position = 0`.
  - Profile picture: `User.avatar_id`.
- **Only `mediaController` uses `s3Client`**, for writing and deleting files.
- The key is always generated on the backend (prefix + `crypto.randomUUID()` +
  file extension). The frontend never sends or chooses a key.

### Media routes *(planned)*

| Route | Who | Form-data |
|---|---|---|
| `POST /media/book-cover` | Admin only | the image file + `book_id` |
| `POST /media/avatar` | The logged-in user | the image file |

Each upload is one request. A generic "upload, then attach in a second request"
route was considered and rejected: it leaves unused files when the second
request never happens, and needs extra checks that a user isn't attaching
someone else's media.

### Upload flow (book cover)

1. Route: multer (memory storage, 5 MB limit, images only) puts the file on `req.file`.
2. Controller: check `book_id` exists. If not, respond 404 before uploading anything.
3. Controller: build the key and upload to R2 with `PutObjectCommand`.
4. `mediaAsset`: insert the `MediaAsset` row (`storage_key`, `content_type`,
   `size_bytes`, `uploaded_by`). Take its id from `lastInsertRowid`.
5. `bookModel`: insert the `BookImage` row (`book_id`, `position = 0`, `media_id`).
6. Respond with the public URL.

A profile picture follows the same steps, except step 5 sets `User.avatar_id`
through `userModel`.

### Reading images

The backend never sends image bytes. A query joins to `MediaAsset` to get the
`storage_key`, and the controller builds the URL as `PUBLIC_BASE_URL/<key>`. The
frontend puts that URL in an `<img src>`, and the browser downloads the image
from R2 directly.

- Book list with covers: `Book` LEFT JOIN `BookImage` (with `position = 0` in
  the ON clause) LEFT JOIN `MediaAsset`.
- Profile picture: `User` LEFT JOIN `MediaAsset` on `avatar_id`.

LEFT JOIN keeps books and users that have no image yet. Their key comes back as
NULL, and the frontend shows a placeholder.

### Replacing and deleting

- **Replace:** upload a new file, insert a new `MediaAsset` row, point the link
  (`BookImage.media_id` or `User.avatar_id`) at it, then delete the old asset.
- **Delete:** remove the link first, then the `MediaAsset` row (`BookImage`
  uses `ON DELETE RESTRICT`), then the R2 object with `DeleteObjectCommand`.
  Deleting the R2 object last means a failure leaves an unused file rather than
  a row pointing at a missing file.
