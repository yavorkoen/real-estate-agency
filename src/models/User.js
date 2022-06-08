const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then((hash) => {
            this.password = hash;
            next();
        })
        .catch(error => console.log(error));
});

userSchema.static('findByUsername', function(username){
    return this.findOne({username});
});

userSchema.method('validatePassword', function(password){
    return bcrypt.compare(password, this.password);
});


const User = mongoose.model('User', userSchema);

module.exports = User;