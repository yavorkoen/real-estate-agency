const router = require('express').Router();
const { AUTH_COOKIE_NAME } = require('../constants.js');
const authService = require('../services/authService.js');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try{
       let user = await authService.login(username, password);
       let token = await authService.createToken(user);
       res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/');
    }catch(error) {
        console.log(error);
        //TODO return error
    }
})

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    let { name, username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.locals.error = 'Password mismatch';
        return res.render('auth/register');
    }

    try {
        await authService.register({ name, username, password, repeatPassword });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        //Return error
    }
})



module.exports = router;