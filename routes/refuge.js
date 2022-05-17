const router = require("express").Router();
const refugeCtrl = require("../controllers/refuge");

//const multer = require("../middleware/multer-config");
const multer = require("../middleware/multer-refuges");

router.post("/refuge", multer, refugeCtrl.createRefuge); //
router.get("/refuges", refugeCtrl.getAllRefuge); //auth,
router.get("/refuge/:nom", refugeCtrl.getOneRefuge);
router.put("/refuge/:id", multer, refugeCtrl.updateRefuge);
router.delete("/refuge/:id", multer, refugeCtrl.deleteRefuge);
module.exports = router;
