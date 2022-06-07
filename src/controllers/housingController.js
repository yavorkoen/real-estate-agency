const router = require('express').Router();
const Housing = require('../models/Housing.js');
const { create, getAll, getOne, addTenantReduceAvailability, deleteHousing } = require('../services/housingService.js');
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
    
    let isUser = req.user

    let housing = await getOne(req.params.housingId);

    let tenants = housing.getTenants();

    let isOwner = housing.owner == req.user?._id;

    let isAvailable = housing.availablePieces > 0;

    let housingData = await housing.toObject({ getters: true });

    if (!req.user) {
        return res.render('housing/details', { ...housingData, tenants })
    }

    let isTenant = housing.tenants.some(x => x._id == req.user?._id);

    res.render('housing/details', { ...housingData, isUser, isOwner, tenants, isTenant, isAvailable });
});

router.get('/:housingId/rent', async (req, res) => {

    await addTenantReduceAvailability(req.params.housingId, req.user._id);

    res.redirect(`/housing/${req.params.housingId}/details`);
});


router.get('/:housingId/delete', async(req, res) => {

    await deleteHousing(req.params.housingId);
    res.redirect('/housing/housings');
})


router.get('/:housingId/edit', async (req, res) => {
    let housing = await getOne(req.params.housingId);
    res.render('housing/edit', { ...housing.toObject() });
});


router.post('/:housingId/edit', async (req, res) => {
    let updateData = req.body;
    let housing = await getOne(req.params.housingId);

});

module.exports = router;