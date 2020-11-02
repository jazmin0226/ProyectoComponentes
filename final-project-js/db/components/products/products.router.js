// Dependencies
const express = require('express');

//Controller
const productController = require('./products.controller');

//Router
const router = express();

//Routes
router.get('/', productController.getAllProducts);


//Export
module.exports = router;