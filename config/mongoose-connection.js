const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ScratchDB').then(function () {
    console.log('Database connected');

}).catch(function (err) {
    console.log('Error in connecting database', err);
});


module.exports = mongoose.connection;