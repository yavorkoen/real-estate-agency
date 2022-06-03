const express = require('express');
const path = require('path');
const router = require('../routes.js');
const cookieParser = require('cookie-parser');
 
function expressConfig(app) {
    app.use(express.urlencoded({extended: true}));
    app.use('/static', express.static(path.join(__dirname, '../public')));
    app.use(cookieParser());
    app.use(router);
}

module.exports = expressConfig;