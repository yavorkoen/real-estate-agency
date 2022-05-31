const User = require('../models/User.js');

exports.login = (userData) => {
    
    
}

exports.register = (userData) => {

    return User.create(userData);
}