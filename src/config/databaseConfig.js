const mongoose = require('mongoose');
const { DB_CONNECTIN_STRING } = require('../constants.js');

exports.initDatabase = function() {
    return mongoose.connect(DB_CONNECTIN_STRING);
}
