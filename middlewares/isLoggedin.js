const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.isLoggedin = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash('error', 'You are not logged in');
        return res.redirect('/');
    }
    try {
        let token = req.cookies.token;
        let decoded = jwt.verify(token, process.env.JWT_KEY);
        let user1 = await userModel.findOne({ email: decoded.email }).select('-password -__v');
        req.user = user1;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            req.flash('error', 'Your session has expired, please login again');
        } else {
            req.flash('error', 'something went wrong');
        }
        return res.redirect('/');
    }
};
