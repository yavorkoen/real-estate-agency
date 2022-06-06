const jwt = require('../utils/jwt.js');
const { AUTH_COOKIE_NAME, SECRET } = require('../constants.js');


exports.auth = (req, res, next) => {
    let token = req.cookies[AUTH_COOKIE_NAME];

    if (token) {
        jwt.verify(token, SECRET)
            .then(decodedToken => {
                //create property user of the req obj
                req.user = decodedToken;
                res.locals.user = decodedToken;
                next();
            })
            .catch(error => {
                // res.clearCookie(AUTH_COOKIE_NAME);
                // res.status(404).res.redirect('404');
                res.redirect(404, '/login');
            })

    } else {
        next()
    };
};

exports.isAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else { 
        res.redirect(404, '/login');
    }
}