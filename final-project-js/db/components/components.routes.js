//Dependencies
const express = require('express');

//Routes Components
const productRoutes = require('./products/products.router');
const userRoutes = require('./user/user.router');

//Router
const router = express();

//Routes
router.use('/products', productRoutes);



//Export
module.exports = router;