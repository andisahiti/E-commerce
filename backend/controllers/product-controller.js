const mongoose = require('mongoose');
const Product = require('../models/product');
const { validationResult } = require('express-validator');
const upload = require('../middleware/fileupload');
const User = require('../models/user');

const addProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(res.status(422).json({ message: "Invalid inputs passed, please check your data." }))
    }

    const createdProduct = new Product(req.body)

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdProduct.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {

        return next(res.status(500).json({ message: 'Creating product failed!' }));
    }

    res.status(201).json({ product: createdProduct });

}


const uploadFiles = (req, res, next) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, message: 'uploading image failed' }).status(500)
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })


}



const getProducts = async (req, res, next) => {

    let products;
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;
    //req.body.filters osht objekt me 2 array
    //key osht price edhe type
    for (let key in req.body.filters) {
        //nese kena filtera
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {

                //req.body.filters[key] osht array i types [1,2,4,5]
                //findArgs[key] osht {types:[1,2,4]}
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    //mongo know them
    //gte=greater that
    //lte=less that 

    try {
        //findArgs = {types:[1,2],price:{'$gte':0,'$lte':199}}
        if (term) {
            products = await Product.find(findArgs).find({ $text: { $search: term } }).skip(skip).limit(limit);

        } else {
            products = await Product.find(findArgs).skip(skip).limit(limit);
        }
    } catch (error) {
        return next(res.status(404).json({ message: 'Couldnt fetch products' }))
    }

    res.json({ products: products, postSize: products.length })
}




const getItems = (req, res) => {
    let productIds = req.query.id || [];


    if (req.body.cartItems) {
        productIds = [];
        productIds = req.body.cartItems.map(item => {
            return item
        })

    }

    Product.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
}

exports.addProduct = addProduct;
exports.uploadFiles = uploadFiles;
exports.getProducts = getProducts;
exports.getProductsById = getProductsById;
exports.getItems = getItems;
