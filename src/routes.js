const router = require('express').Router();
const homeContoller = require('./controllers/homeController.js');
const authContoller = require('./controllers/authController.js');
const housingController = require('./controllers/housingController.js');

router.use(homeContoller);
router.use(authContoller);
router.use('/housing', housingController);

module.exports = router;