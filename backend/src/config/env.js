import path from "path";

// Loads backend/.env into process.env (built into Node, no package needed).
// In ESM every import runs before the importing file's own code, so this
// has to be its own module, imported first by anything that reads process.env
// when it loads (app.js, s3Client.js).
process.loadEnvFile(path.join(import.meta.dirname, "../../.env"));
