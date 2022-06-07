const Housing = require('../models/Housing.js');

exports.create = (housingData) => {
   return Housing.create(housingData); 
}

exports.getLastThree = () => Housing.find().sort({createdAt: -1}).limit(3).lean();

exports.getAll = () => Housing.find().lean();

exports.getOne = (id) => Housing.findById(id).populate('tenants');

exports.addTenantReduceAvailability = async (housingId, userId) => {
  
  return Housing.findByIdAndUpdate(housingId, { $push: {tenants: userId},  $inc: {availablePieces: -1}});
}

exports.deleteHousing = (id) => Housing.findByIdAndDelete(id);

exports.update = (updateData, housing) => {
   
}