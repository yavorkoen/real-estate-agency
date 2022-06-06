const router = require('express').Router();
const Housing = require('../models/Housing.js');
const { create, getAll, getOne } = require('../services/housingService.js');
const { isAuth } = require('../middlwares/authMiddleware.js');


router.get('/create', isAuth, (req, res) => {
    res.render('housing/create');
});

router.get('/housings', async (req, res) => {
    let housings = await getAll();
    res.render('housing/housings', { housings });
});


router.post('/create', async (req, res) => {
    let housingData = req.body;
    await create({ ...housingData, owner: req.user._id });
    res.redirect('/housing/housings');

});

router.get('/:housingId/details', async (req, res) => {

    let housing = await getOne(req.params.housingId); 
    console.log(housing);
    res.render('housing/details', { ...housing })
})

module.exports = router;