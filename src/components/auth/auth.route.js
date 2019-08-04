const router = require("express").Router();
const authCtrl = require("./auth.controller");

router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.post("/register", authCtrl.register);

module.exports = router;
