const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose");
const dotenv = require('dotenv');
dotenv.config();
mongoose
    .connect(process.env.MONGO_URI)
    .then(function () {
        dbgr("connected");



    }).catch(function (err) {
        console.log('Error in connecting database', err);
    });


module.exports = mongoose.connection;
