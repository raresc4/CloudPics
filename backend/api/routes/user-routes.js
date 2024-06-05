const { Router } = require('express');

const router = Router();
const controller = require('../controllers/userController.js');

router.post('/createUser', controller.createUser);
router.post('/getUserByUsername', controller.getUserByUsername);
router.post('/verifyUser', controller.verifyUser);
router.put('/incrementPhotoCount', controller.incrementPhotoCount);
router.put('/changePassword', controller.changePassword);
router.delete('/deleteUser', controller.deleteUser);
router.post('/getUserAboutInfo', controller.getUserAboutInfo);

module.exports = router;