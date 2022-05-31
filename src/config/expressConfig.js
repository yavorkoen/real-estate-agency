const express = require('express');
const path = require('path');
const router = require('../routes.js');
 
function expressConfig(app) {
    app.use('/static', express.static(path.join(__dirname, '../public')));
    app.use(router);
}

module.exports = expressConfig;