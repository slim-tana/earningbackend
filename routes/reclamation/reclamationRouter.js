

const router = require("express").Router();
const reclamationCtrl = require("../../controllers/reclamation/reclamationCtrl");
const { check,Log, notReqAuthentication } = require('../../middleware/auth');

router.post('/add',Log,reclamationCtrl.addReclamation);
router.post('/consultReclamation',Log,reclamationCtrl.consultReclamation);
router.post('/OnlyDone',Log,reclamationCtrl.OnlyDone);



module.exports = router;
