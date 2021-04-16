const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    mbNum: {type: Number, required: true},
    hashPassword: { type: String, required: true },
    login_type: { type: Number, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;