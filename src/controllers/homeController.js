const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.user);
    res.render('home');
});

router.get('/housings', (req, res) => {
    res.render('housing/housings');
})

module.exports = router;