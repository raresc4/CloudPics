const { Router } = require('express');  
const router = Router();

const userApi = require("./routes/user-routes.js");

router.use('/user', userApi);

module.exports = router;