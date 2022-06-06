const router = require('express').Router();
const Housing = require('../models/Housing.js');
const { create, getHousings } = require('../services/housingService.js');
const { isAuth } = require('../middlwares/authMiddleware.js');


router.get('/create', isAuth, (req, res) => {
    res.render('housing/create');
});

router.get('/housings', async (req, res) => {
    let housings = await getHousings();
    res.render('housing/housings', { housings });
});


router.post('/create', async (req, res) => {
    let housingData = req.body;
    await create({ ...housingData, owner: req.user._id });
    res.redirect('/housing/housings');

})

module.exports = router;