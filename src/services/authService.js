const jwt = require('../utils/jwt.js');
const User = require('../models/User.js');
const { SECRET } = require('../constants.js');

exports.login = function (username, password) {

    return User.findByUsername(username)
        .then(user => {
            if (user) {
                return Promise.all([user.validatePassword(password), user]);
            } else {
                throw { message: 'Incorrect username or password' }
            }
        })
        .then(([isValid, user]) => {
            if (isValid) {
                return user;
            } else {
                throw { message: 'Incorrect username or password' }
            }
        })
        // .catch(error => {
        //     // console.log(error);
        // });
}

exports.register = (userData) => {

    return User.create(userData);
}

exports.createToken = async (user) => {

    let token = await jwt.sign(
        { _id: user._id, name: user.name, username: user.username },
        SECRET,
        { expiresIn: '1h' },
    )
    return token;
}