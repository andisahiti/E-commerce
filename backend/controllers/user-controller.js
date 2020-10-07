const User = require('../models/user');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { validationResult } = require('express-validator');


const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(res.status(422).json({ message: "Invalid inputs passed, please check your data." }))
    }

    const { name, email, password, surname } = req.body;


    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);

    } catch (error) {
        return next(res.status(500).json({ message: "password hashing failed" }))
    }

    const createdUser = new User({
        name,
        surname,
        email,
        password: hashedPassword
    })

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        return next(res.status(500).json({ message: "something went wrong" }))
    }

    if (existingUser) {
        return next(res.status(422).json({ message: "user with that email already exists" }))
    }


    try {
        await createdUser.save()
    } catch (error) {
        return next(res.status(500).json({ message: "couldnt create user" }))
    }

    let token;

    try {
        token = JWT.sign({ userId: createdUser._id, email: createdUser.email }, process.env.JWT_KEY)

    } catch (err) {
        return next(res.status(500).json({ message: "error while generating token" }))
    }

    res.json({ message: "user created", userId: createdUser._id, email: createdUser.email, token: token }).status(201)
}


const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;


    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        return next(res.status(422).json({ message: "something when wrong while searching for the user" }))
    }

    if (!existingUser) {
        return next(res.status(404).json({ message: "couldnt find a user with that email" }))
    }

    let userPassword;


    try {
        userPassword = await bcrypt.compare(password, existingUser.password)
    } catch (error) {
        return next(res.status(422).json({ message: "error while filtering the password" }))
    }


    if (!userPassword) {
        return next(res.status(404).json({ message: "wrong password" }))
    }

    let token;

    try {
        token = JWT.sign({ userId: existingUser._id, email: existingUser.email }, process.env.JWT_KEY)

    } catch (err) {
        return next(res.status(500).json({ message: "error while generating token" }))
    }


    res.status(201).json({ message: "user login successful", userId: existingUser._id, email: existingUser.email, token: token, role: existingUser.role });

}

exports.signup = signup;
exports.login = login;