// Dependencies
const express = require('express');

//Controller
const productController = require('./products.controller');

//Router
const router = express();

//Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.registerProduct);
router.put('/:id', productController.updateProduct);

//N 

//Export
module.exports = router;