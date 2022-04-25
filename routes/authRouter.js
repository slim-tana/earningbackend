const { check, notReqAuthentication,Log } = require('../middleware/auth');
const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");
const passport = require("passport"); require('../passport.js');


router.put("/activate/:secretToken", authCtrl.activate);
router.post('/forget', notReqAuthentication, authCtrl.forget);
router.post('/reset/:Passwordtoken', Log, authCtrl.resetPassword);
router.post("/refresh_token", authCtrl.generateAccessToken);
router.post("/register",notReqAuthentication, authCtrl.register);
router.post("/login", notReqAuthentication, authCtrl.login);
router.post("/logout",Log, authCtrl.logout);
router.get("/check", authCtrl.check);





module.exports = router;
