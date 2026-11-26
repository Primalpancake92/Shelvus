const express = require("express");
const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const crypto = require("crypto");
const s3 = require("../config/s3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const testRouter = express.Router();

testRouter.post('/profile-img', upload())