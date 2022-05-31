const router = require('express').Router();
const authService = require('../services/authService.js');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    let { name, username, password, repeatPassword } = req.body;
    try{
        if(password !== repeatPassword){
            res.locals.error = 'Password mismatch';
            res.render('auth/register');
        } else {
            await authService.register({ name, username, password, repeatPassword });
            res.redirect('/');
        }
    }catch(error) {
        console.log(error);
    }


})



module.exports = router;