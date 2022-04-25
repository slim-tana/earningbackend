

const router = require("express").Router();
const musicCtrl = require("../../controllers/music/musicCtrl");
const { check, Log,notReqAuthentication } = require('../../middleware/auth');

router.post('/UploadMusic',Log,musicCtrl.UploadMusic);
router.get('/:trackID',musicCtrl.DownloadMusic);
router.get('/fetechMusic/:trackName',musicCtrl.fetechMusicByName);
router.put('/dislikeMusic/:userId/:musicId',Log,musicCtrl.dislikeMusic);
router.put('/likeMusic/:userId/:musicId',Log,musicCtrl.likeMusic);
router.delete('/deleteMusic/:id',Log,musicCtrl.deleteMusic);


module.exports = router;
