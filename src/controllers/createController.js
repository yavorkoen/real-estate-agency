const router = require('express').Router();
const Housing = require('../models/Housing.js');
const { create } = require('../services/createService.js');

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async (req, res) => {
    let housingData = req.body;
    await create({ ...housingData , owner: req.user._id});
    res.redirect('/housings');

})

module.exports = router;