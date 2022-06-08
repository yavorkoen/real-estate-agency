const router = require('express').Router();
const Housing = require('../models/Housing.js');
const { create, getAll, getOne, addTenantReduceAvailability, deleteHousing, update } = require('../services/housingService.js');
const { isAuth, isGuest } = require('../middlwares/authMiddleware.js');


router.get('/create', isAuth, (req, res) => {
    res.render('housing/create');
});

router.post('/create', isAuth, async (req, res) => {
    let housingData = req.body;
    await create({ ...housingData, owner: req.user._id });
    res.redirect('/housing/housings');

});

router.get('/housings', async (req, res) => {
    let housings = await getAll();
    res.render('housing/housings', { housings });
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

async function isNotOwner(req, res, next) {
    let housing = await getOne(req.params.housingId);
   if (housing.owner == req.user?._id) {
        res.redirect(`/housing/${req.params.housingId}/details`)
   } else {
       next();
   }
}

router.get('/:housingId/rent', isNotOwner, async (req, res) => {

    await addTenantReduceAvailability(req.params.housingId, req.user._id);

    res.redirect(`/housing/${req.params.housingId}/details`);
});


router.get('/:housingId/delete', isAuth, async(req, res) => {

    await deleteHousing(req.params.housingId);
    res.redirect('/housing/housings');
})


router.get('/:housingId/edit', async (req, res) => {
    let housing = await getOne(req.params.housingId);
    res.render('housing/edit', { ...housing.toObject() });
});


router.post('/:housingId/edit', async (req, res) => {
    let updateData = req.body;

    await update(req.params.housingId, updateData);

    res.redirect(`/housing/${req.params.housingId}/details`);
});

module.exports = router;