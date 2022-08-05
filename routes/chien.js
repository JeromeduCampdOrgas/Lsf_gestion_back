const router = require("express").Router();
const chienCtrl = require("../controllers/chiens");

const multerCarousel = require("../middleware/multer-carousel");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-chiens");

const test = require("../middleware/test");

router.post("/chiens", multer, chienCtrl.createChien); //
router.get("/chiens", chienCtrl.getAllChiens);
//router.get("/chiens/:nom", chienCtrl.searchChien);
router.get("/chiens/:refugeId", chienCtrl.getAllChiensOneRefuge);
router.post("/chiens/carousel", multerCarousel, chienCtrl.carousel); //création carousel
router.get("/chiens/carousel/:chienId", chienCtrl.chiensCarousel); //obtient carousel d'un chien
router.delete("/chiens/carousel/:id", chienCtrl.chiensCarouselSuppr); //supprime une image du carousel
router.put("/chiens/:id", multer, chienCtrl.updateChien); //
router.delete("/chiens/:id", chienCtrl.deleteChien);
module.exports = router;
