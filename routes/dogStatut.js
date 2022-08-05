const router = require("express").Router();
const statutCtrl = require("../controllers/dogstatut");

router.post("/statut", statutCtrl.createStatut);
router.get("/statut", statutCtrl.getStatuts);
router.delete("/statut/:id", statutCtrl.deleteStatut);
module.exports = router;
