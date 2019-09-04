const AWS = require("aws-sdk");
const multer = require("multer");
const router = require("express").Router();

// Multer File Middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// localhost:8080/v1/photo/upload
module.exports = function (app) {
    app.post("/api/upload", upload.single("file"), function(req, res, next) {
        const file = req.file;

        AWS.config.loadFromPath('config/s3config.json');

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
                console.log(req.body.name, data.Location);
            }
        });
    });

};
