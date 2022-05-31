const express = require('express');
const { initDatabase } = require('./config/databaseConfig.js');

const app = express();
const { PORT } = require('./constants.js');


require('./config/hbsConfig.js')(app);
require('./config/expressConfig.js')(app);


initDatabase()
    .then(() => {
        app.listen(PORT, () => console.log('App running on port ' + PORT + '...' ));
    })
    .catch(error => {
        console.log(error);
    });