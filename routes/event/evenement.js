const router = require('express').Router();
const evenementController = require('../../controllers/event/evenement');
const cors= require('cors')
const { check, Log,notReqAuthentication } = require('../../middleware/auth');


// auth

router.use(cors())
router.post("/register", evenementController.signUp);
router.get('/', evenementController.getAllevenements);
router.get('/:id', evenementController.evenementInfo);
router.put("/:id", evenementController.updateevenement);
router.delete('/:id', evenementController.deleteevenement)
router.put('/likeevenementModel/:evenementModelId',evenementController.likeevenementModel);
router.put('/dislikeevenementModel/:evenementModelId',evenementController.dislikeevenementModel);


module.exports = router;