const AWS = require("aws-sdk");
const multer = require("multer");
const router = require("express").Router();

// Multer File Middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// localhost:8080/v1/photo/upload
router.post("/upload", upload.single("file"), function(req, res, next) {
    const file = req.file;

    const s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });

    //Where you want to store your file
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
    };

    res.json(req.body);

    s3bucket.upload(params, function(err, data) {
        if (err) {
            res.status(500).json({ error: true, Message: err });
        } else {
            res.send({ data });
        }
    });
});

module.exports = router;
