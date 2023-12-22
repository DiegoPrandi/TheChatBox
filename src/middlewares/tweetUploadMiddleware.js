const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, "../../public/images/tweets");
    console.log("Destination Path:", destinationPath);
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const userId = req.session.userId;
    const filename = `tweet_${userId}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    console.log("Filename:", filename);
    cb(null, filename);
  },
});

const tweetImageUpload = multer({ storage: storage });

module.exports = tweetImageUpload;
