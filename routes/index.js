const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const { isLoggedin } = require('../middlewares/isLoggedin');
// const products = [
//     {
//         bgcolor: '#FF5733',
//         image: Buffer.from('your-image-data', 'base64'),
//         name: 'Product 1'
//     },
//     {
//         bgcolor: '#33FF57',
//         image: Buffer.from('your-image-data', 'base64'),
//         name: 'Product 2'
//     }
// ];

router.get('/', function (req, res) {
    let error = req.flash('error');
    res.render('index', { error });
});


router.get('/shop', isLoggedin, async function (req, res) {
    let products = await productModel.find();
    let success = req.flash('success');
    res.render('shop', { products, success });
});
router.get('/cart', isLoggedin, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate('cart');
    // let products = await productModel.find();
    res.render('cart', { user });
});


router.get('/addtocart/:productid', isLoggedin, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash('success', 'Product added to cart');
    res.redirect('/shop');
});
module.exports = router;
