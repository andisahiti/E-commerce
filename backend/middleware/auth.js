const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(res.status(401).json({ message: 'couldnt indentify token' }))
        }

        //to verify it (token,the private key)
        const decodedToken = JWT.verify(token, 'supersecret_do_not_share');
        req.userData = { userId: decodedToken.userId };
        next();


    } catch (error) {
        return next(res.status(401).json({ message: 'You are not authorized to make changes here !!' }))

    }
}