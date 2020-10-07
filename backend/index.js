const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(cors())



app.use('/api/users', userRoutes)
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {

    return res.status(404).json({ message: "Could not find route" })
});



const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gg6hk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(process.env.PORT || 5000);
        console.log('Connected to Database')

    })
    .catch((error) => {
        console.log(error)
    });
