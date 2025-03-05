const express = require('express');
const router = express.Router();
const { User } = require('../models/register');
const { validate } = require('../validation/login');
const bcrypt = require('bcrypt');


// login route
router.post('/', async (req, res) => {
    try {

        const { error } = validate(req.body);
        if (error) return res.status(400).json(error.details[0].message)

        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (!userExists) return res.json("Invalid email or password");

        const passwordIsValid = bcrypt.compareSync(password, userExists.password);
        if (!passwordIsValid) return res.json("Invalid email or passoword");

        const token = userExists.getAuthToken();
        res.header('x-auth-token', token).json("Login successfull")

    } catch (error) {
        res.status(500).json("Server Error");
        console.log(error.message);
    }
})

module.exports = router;
