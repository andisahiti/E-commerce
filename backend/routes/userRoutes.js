const express = require('express');
const userController = require('../controllers/user-controller');
const { check } = require('express-validator');



const route = express.Router();


route.post('/signup', [
    check('name')
        .not()
        .isEmpty(),
    check('surname')
        .not()
        .isEmpty(),
    check('email')
        .normalizeEmail()
        .isEmail(),
    check('password').isLength({ min: 6 })
], userController.signup)


route.post('/login', [
    check('email')
        .normalizeEmail()
        .isEmail(),
    check('password').isLength({ min: 6 })
], userController.login);




module.exports = route;


