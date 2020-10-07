const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true, unique: 1, trim: true },
    password: { type: String, required: true, minlength: 6 },
    surname: { type: String, required: true, maxlength: 20 },
    role: { type: Number, default: 0 },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    }
})


const User = mongoose.model('User', userSchema);

module.exports = User;