const Product = require('../models/product');
const User = require('../models/user');



const addToCart = (req, res, next) => {

    User.findOne({ _id: req.body.userId }, (err, userInfo) => {
        let duplicate = false;

        userInfo.cart.forEach((item) => {
            //nese produkti osht mrena ncart e shtojm veq quantity 
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        })


        if (duplicate) {
            User.findOneAndUpdate(
                { _id: req.body.userId, "cart.id": req.query.productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(201).json(userInfo.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.body.userId },
                {
                    $push: {
                        cart: {
                            id: req.query.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(201).json(userInfo.cart)
                }
            )
        }
    })
}

const getCart = (req, res, next) => {
    let userId = req.body.userId;
    let user;

    try {
        user = User.findById({ _id: userId }, (err, userInfo) => {
            if (err) {
                return next(res.status(404).json({ message: 'couldnt find user' }))
            } else {
                res.status(201).json(userInfo.cart)
            }

        });
    } catch (error) {
        return next(res.status(404).json({ message: 'couldnt find user' }))
    }



}


const removeItem = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.body.userId },
        {
            "$pull":
                { "cart": { "id": req.body.productId } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            Product.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    )
}

exports.addToCart = addToCart;
exports.getCart = getCart;
exports.removeItem = removeItem;