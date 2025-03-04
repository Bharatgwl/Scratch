const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');  // require the user model

const { registerUser, loginUser, logoutuser } = require('../controllers/authControllers');
require('dotenv').config();

router.get('/', function (req, res) {
    res.send('users Router');
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutuser);


module.exports = router;

