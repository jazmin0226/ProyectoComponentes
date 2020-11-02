// Dependencies
const express = require('express');

//Controller
const productController = require('./products.controller');

//Router
const router = express();

//Routes
router.get('/', productController.getAllProducts);
router.post('/', productController.registerProduct);


//Export
module.exports = router;