const multer = require("multer");
const fs = require("fs");
const { json } = require("body-parser");
const path = require("path");
const models = require("../models");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = "images/chiens/chienCarousel/" + req.body.nom;

    fs.open(dest, function (error) {
      if (error) {
        //TO DO
        //ici créer le dossier, modifier le nom du fichier et enregistrer le fichier dans le nouveau dossier
        //console.log("Directory does not exist.");
        //console.log(dest);
        fs.mkdir(dest, (error) => cb(error, dest));
      } else {
        //TO DO
        //modifier le nom du fichier et enregistrer le fichier dans le dossier
        //console.log("Directory exists.");
        let currentFile = file.originalname;

        fs.readdir(dest, (err, files) => {
          files.forEach((file) => {
            let indexPoint = file.indexOf(".");
            let indexbeforeExt = file.indexOf("-");
            let ext = file.substring(indexPoint, indexbeforeExt);
            let finalFile = file.substring(0, indexPoint) + ext;
            if (currentFile == finalFile) {
              let fileToDelete = `${req.protocol}://${req.get(
                "host"
              )}/${dest}/${file}`;

              fs.unlinkSync(`${dest}/${file}`);
              models.chiencarousel.destroy({
                where: {
                  images: fileToDelete,
                },
              });
            }
          });
        });
        return cb(null, dest);
      }
    });
  },

  filename: (req, file, cb) => {
    //const extension = MIME_TYPES[file.mimetype];

    //const name = req.file.split(" ").join("_") + "." + extension;
    //console.log(name);

    cb(
      null,

      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
module.exports = multer({ storage: storage }).array("images", 10);
