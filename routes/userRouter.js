const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const { check,Log, notReqAuthentication } = require('../middleware/auth');


router.put('/follow/:followId/:follwingid', Log,userCtrl.follow);
router.put('/unfollow/:followId/:follwingid', Log,userCtrl.unfollow);

router.delete("/deleteUser/:id",Log,userCtrl.desactivate);


router.get("/getFollowers/:id",Log, userCtrl.getFollowers);
router.get("/getFollowing/:id", Log,userCtrl.getFollowing);

module.exports = router;
