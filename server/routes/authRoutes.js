const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/userBase')
const router = express.Router();
const nodemailer = require('nodemailer')
const crypto = require('crypto')
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

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

router.post('/login', async (req, res) => {
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

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        const otp = crypto.randomInt(100000, 999999).toString();
        user.resetPasswordOTP = otp.toString()
        user.resetPasswordExp = Date.now() + 10 * 60 * 1000
        await user.save()
        await transporter.sendMail({
            to: email,
            subject: 'Your Password Reset OTP',
            html: `<p>Your OTP for password reset is: <b>${otp}</b>. This OTP is valid for 10 minutes.</p>`,
        });
        res.status(200).json({ message: "OTP sent to your email." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        const user = await User.findOne({
            email,
            resetPasswordOTP: otp.toString(),
            resetPasswordExp: { $gt: Date.now() },
        })

        if (!user) return res.status(400).json({ message: "Expired OTP" });
        user.password = password
        user.resetPasswordOTP = undefined
        user.resetPasswordExp = undefined
        await user.save()
        const token = await user.generateToken();
        res.status(200).json({ message: "Password reset successful. Logging In...", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router