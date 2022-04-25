

const router = require("express").Router();
const reclamationAdminCtrl = require("../../controllers/reclamation/reclamationAdminCtrl");
const { check, Log,notReqAuthentication } = require('../../middleware/auth');

router.get('/getAllReclamation',Log,reclamationAdminCtrl.getAllReclamation);
router.put('/doneReclamation/:id',Log,reclamationAdminCtrl.doneReclamation);

module.exports = router;
