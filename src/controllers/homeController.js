const router = require('express').Router();
const { getLastThree } = require('../services/housingService.js'); 

router.get('/', async (req, res) => {
    console.log(req.user);
    let housings = await getLastThree();
    res.render('home', { housings });

});


module.exports = router;