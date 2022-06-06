const Housing = require('../models/Housing.js');

exports.create = (housingData) => {
   return Housing.create(housingData); 
}

exports.getLastThree = () => Housing.find().sort({createdAt: -1}).limit(3).lean();

