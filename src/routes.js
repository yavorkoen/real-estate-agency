const router = require('express').Router();
const homeContoller = require('./controllers/homeController.js');
const authContoller = require('./controllers/authController.js');
const createController = require('./controllers/createController.js');
const { isAuth } = require('./middlwares/authMiddleware.js');

router.use(homeContoller);
router.use(authContoller);
router.use('/offers', isAuth, createController);

module.exports = router;