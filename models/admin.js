const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Username cannot be empty']
    },

    password: {
        type: String,
        required: [true, 'Password cannot be empty']
    }
});

module.exports = mongoose.model('Admin', adminSchema);