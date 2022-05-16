const multer = require("multer");
const fs = require("fs");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("coucou");
    const dest = "images/refuges/" + req.body.nom; // + "/chiens";

    fs.access(dest, function (error) {
      if (error) {
        console.log("Directory does not exist.");
        fs.mkdir(dest, (error) => cb(error, dest));
      } else {
        console.log("Directory exists.");
        return cb(null, dest);
      }
    });
  },

  filename: (req, file, callback) => {
    const name = req.body.nom.split(" ").join("_") + ".jpg";
    callback(null, name);
  },
});

module.exports = multer({ storage: storage }).single("logo");
