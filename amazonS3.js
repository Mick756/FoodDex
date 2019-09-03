let s3 = new AWS.S3();

s3.getObject({
    Bucket: "p2recipepictures",
    Key: "M-Logo.jpg"
}, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});