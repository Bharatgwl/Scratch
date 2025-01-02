const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ScratchDB');

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isadmin: Boolean,
    order: {
        type: Array,
        default: []
    },
    contact: Number,
    image: String,
});


module.exports = mongoose.model('user', userSchema);