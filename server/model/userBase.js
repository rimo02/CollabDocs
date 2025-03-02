const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userBaseSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userBaseSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userBaseSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

module.exports = mongoose.model("User", userBaseSchema);
