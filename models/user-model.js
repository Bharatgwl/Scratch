const { ref } = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        default: []
    }],
    order: {
        type: Array,
        default: []
    },
    contact: Number,
    image: String,
});


module.exports = mongoose.model('user', userSchema);