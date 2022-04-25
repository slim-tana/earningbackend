const router = require("express").Router();
const chatBoxCtrl = require("../../controllers/chatBox/chatBoxCtrl");
const { check, Log ,notReqAuthentication} = require('../../middleware/auth');


router.post('/SendMessage/:idUserDestination',Log,chatBoxCtrl.SendMessage); // id : MusicId
router.get('/GetAllMessages',Log,chatBoxCtrl.GetAllMessages);
router.put('/fetchConversation',Log,chatBoxCtrl.fetchConversation);
router.put('/makeSourdine/:id',Log,chatBoxCtrl.makeSourdine);

module.exports = router;

