const Joi = require('joi');
const bcrypt = require('bcrypt');
const userModel = require('../models/user-model');
const { genrateToken } = require('../utils/generatetoken');

module.exports.registerUser = async function (req, res) {
    // console.log(req.body);
    try {

        let { fullname, email, password } = req.body;

        let checkuser = await userModel.findOne({ email });
        if (checkuser) {
            return res.status(400).send("user already exists");
        }
        const schema = Joi.object().keys({
            fullname: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        });

        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).send(result.error.details);
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            fullname,
            email,
            password: hash
        });
        // res.status(201).send(user);
        let token = genrateToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/shop");
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async function (req, res) {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            req.flash('error', 'Invalid password');
            return res.redirect('/');
        }
        let token = genrateToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/shop");
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.logoutuser = async function (req, res) {
    res.clearCookie("token");
    res.redirect("/");
}   