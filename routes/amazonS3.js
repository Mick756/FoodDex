const dotenv = require("dotenv").config();
const AWS = require("aws-sdk");
const multer = require("multer");
const router = require("express").Router();
const db = require("../models");

// Multer File Middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// localhost:8080/v1/photo/upload
module.exports = function (app) {

    AWS.config.accessKeyId = process.env.ACCESS_KEY_ID;
    AWS.config.secretAccessKey = process.env.SECRET_ACCESS_KEY;
    AWS.config.region = process.env.REGION;

    app.post("/api/upload", upload.single("file"), function(req, res, next) {
        const file = req.file;

        const s3bucket = new AWS.S3();

        //Where you want to store your file
        const params = {
            Bucket: "p2recipepictures",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };

        s3bucket.upload(params, function(err, data) {
            if (err) {
                res.status(500).json({ error: true, Message: err });
            } else {
                req.body.image = data.Location;
                db.Bite.create(req.body).then(dbBites => {});
            }
        });
    });


};
