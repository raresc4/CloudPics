const { Router } = require('express');

const router = Router();
const controller = require('../controllers/jwtController.js');

router.post('/logout', controller.logout);
router.get('/getUsername', controller.getUsername);

module.exports = router;