const { Router } = require('express');  
const router = Router();

const userApi = require("./routes/user-routes.js");
const jwtApi = require("./routes/jwt-routes.js");

router.use('/user', userApi);
router.use('/jwt', jwtApi);

module.exports = router;