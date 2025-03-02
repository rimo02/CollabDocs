const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/userBase')
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "An account with that email already exists" });
        const user = new User({ email, username, password });
        await user.save();
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.post('/login' ,async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email" });
        const match = await bcrypt.compare(String(password).trim(), user.password);
        if (!match) return res.status(400).json({ message: "Invalid password" });

        const token = await user.generateToken();
        res.json({ user, token })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router