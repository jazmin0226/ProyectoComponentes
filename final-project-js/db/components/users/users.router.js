// Dependencies
const express = require('express');

//Controller
const userController = require('./users.controller');

//Router
const router = express();

//Routes
router.get('/', userController.getAllUsers);
//router.post('/', productController.registerProduct);


//Export
module.exports = router;