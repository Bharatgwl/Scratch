const mongoose = require('mongoose');


const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    image: String,
    gstin: String,
});


module.exports = mongoose.model('owner', ownerSchema);