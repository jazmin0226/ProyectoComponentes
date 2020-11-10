//Dependencies
const express = require('express');

//Routes Components
const productRoutes = require('./products/products.router');
const orderRoutes = require('./order/order.router');

//Router
const router = express();

//Routes
router.use('/products', productRoutes);
router.use('/orders', orderRoutes );

//Export
module.exports = router;