const router = require("express").Router();
const playlistCtrl = require("../../controllers/playlist/playlistCtrl");
const { check, Log ,notReqAuthentication} = require('../../middleware/auth');



router.post('/CreateNewPlaylist',Log,playlistCtrl.CreateNewPlaylist);
router.put('/AddMusicToMyPlaylist/:id/:PlaylistId',Log,playlistCtrl.AddMusicToMyPlaylist);
router.delete('/deletePlaylist/:id',Log,playlistCtrl.deletePlaylist);
router.put('/updateMyPlaylist/:id',Log,playlistCtrl.updateMyPlaylist); // manqué
router.get('/fetechMyPlaylist',Log,playlistCtrl.fetechMyPlaylist);
router.get('/fetechPlaylistByName',Log,playlistCtrl.fetechPlaylistByName); // manqué

module.exports = router;

