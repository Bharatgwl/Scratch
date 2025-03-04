/*************  ✨ Codeium Command 🌟  *************/
const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: Buffer,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
});


module.exports = mongoose.model('product', productSchema);
/******  404d5edb-95e1-4c0c-923a-855381b41435  *******/ 