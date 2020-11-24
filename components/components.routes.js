//Dependencies
const express = require('express');

//Routes Components
const productRoutes = require('./products/products.router');
const userRoutes = require('./users/users.router');
const roleRoutes = require('./roles/roles.router');
const orderRoutes = require('./order/order.router');
const loginRoute = require('./login/login.router');

//Router
const router = express();

//Routes
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/orders', orderRoutes);
router.use('/login', loginRoute);


//Export
module.exports = router;