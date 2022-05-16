const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
//router.get("/users/me/", auth, userCtrl.getUserProfile);
router.put("/users/:id", auth, userCtrl.updateAccount);
router.post("/users/delete/:id", auth, userCtrl.deleteAccount);
router.get("/users", userCtrl.getAllUsers);

module.exports = router;
