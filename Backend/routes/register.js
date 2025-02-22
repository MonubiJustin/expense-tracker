const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { User } = require('../models/register');
const { validate } = require('../validation/register')

// registration route
router.post('/', async (req, res) => {
    try {

        const { error } = await validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json("Email already registered");


        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            email, username, password: hashedPassword
        })
        await newUser.save();

        res.status(201).json("User registered successfully")
    } catch (error) {
        res.status(500).json("Server error");
        console.log(error.message);
    }
})























module.exports = router;