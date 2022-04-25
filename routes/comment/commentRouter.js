const router = require("express").Router();
const commentCtrl = require("../../controllers/comment/commentCtrl");
const { check, Log ,notReqAuthentication} = require('../../middleware/auth');



router.post('/addComment/:id',Log,commentCtrl.addcomment); // id : MusicId
router.delete('/deleteComment/:idComment/:idMusic',Log,commentCtrl.deletecomment);
router.put('/likeComment/:commentId',Log,commentCtrl.likecomment);
router.put('/dislikeComment/:commentId',Log,commentCtrl.dislikecomment);
router.put('/updatecomment/:commentId',Log,commentCtrl.updatecomment); //manqué

module.exports = router;

