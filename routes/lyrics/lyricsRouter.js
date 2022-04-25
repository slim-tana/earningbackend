const router = require("express").Router();
const lyricsCtrl = require("../../controllers/lyrics/lyricsCtrl");
const { check, Log ,notReqAuthentication} = require('../../middleware/auth');



router.post('/addlyrics/:id',Log,lyricsCtrl.addlyrics); // id : MusicId
router.delete('/deletelyrics/:idlyrics/:idMusic',Log,lyricsCtrl.deletelyrics);
router.put('/likelyrics/:lyricsId',Log,lyricsCtrl.likelyrics);
router.put('/dislikelyrics/:lyricsId',Log,lyricsCtrl.dislikelyrics);
router.put('/updateLyrics/:lyricsId',Log,lyricsCtrl.updateLyrics); //manqué

module.exports = router;

