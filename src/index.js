const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

app.use('/static', express.static(path.join(__dirname, 'public')));

require('./config/hbsConfig.js')(app);

app.get('/', (req, res) => {
    res.render('home', {layout: false});
});

app.listen(port, () => console.log('App running on port ' + port + '...' ));