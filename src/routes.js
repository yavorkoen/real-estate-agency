const router = require('express').Router();
const homeContoller = require('./controllers/homeController.js');
const authContoller = require('./controllers/authController.js');

router.use(homeContoller);
router.use(authContoller);

module.exports = router;