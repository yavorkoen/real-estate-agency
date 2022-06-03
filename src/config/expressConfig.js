const express = require('express');
const path = require('path');
const routes = require('../routes.js');
const cookieParser = require('cookie-parser');
const { auth } = require('../middlwares/authMiddleware.js')
 
function expressConfig(app) {
    app.use(express.urlencoded({extended: true}));
    app.use('/static', express.static(path.join(__dirname, '../public')));
    app.use(cookieParser());
    app.use(auth);
    app.use(routes);
}

module.exports = expressConfig;