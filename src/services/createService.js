const Housing = require('../models/Housing.js');

exports.create = (housingData) => {
   return Housing.create(housingData); 
}