const express = require('express');
const router = express.Router();
const env = require('dotenv').config();
const onwerModel = require('../models/owner-model');


if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        let owners = await onwerModel.find();
        if (owners.length > 0) {
            res.send(503).send("you don't have permission to create a new owner");
        } else {
            let { fullname, email, password } = req.body;
            let createdOwner = await onwerModel.create({
                fullname,
                email,
                password
            });
            res.status(201).send(createdOwner);
        }
    });

}
router.get('/admin', function (req, res) {
    let success = req.flash('success');
    res.render('createproducts', {success});
    console.log(process.env.NODE_ENV);
});




module.exports = router;