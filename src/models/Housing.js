const mongoose = require('mongoose');


const housingSchema = new mongoose.Schema({
    homeName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availablePieces: {
        type: Number,
        required: true
    },
    tenant: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' }
})

const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;