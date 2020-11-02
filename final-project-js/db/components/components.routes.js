//Dependencies
const express = require('express');

//Routes Components
const productRoutes = require('./products/products.router');

//Router
const router = express();

//Routes
router.use('/products', productRoutes);


//Export
module.exports = router;