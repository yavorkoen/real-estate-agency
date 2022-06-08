const router = require('express').Router();
const { AUTH_COOKIE_NAME } = require('../constants.js');
const authService = require('../services/authService.js');
const { isAuth, isGuest } = require('../middlwares/authMiddleware.js');

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    let { username, password } = req.body;

    try {
        let user = await authService.login(username, password);
        let token = await authService.createToken(user);
        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('auth/login', { error })
        //TODO return error
    }
})

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
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
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});



module.exports = router;