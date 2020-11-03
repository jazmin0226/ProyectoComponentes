// Dependencies
const express = require('express');

//Controller
const userController = require('./user.controller');

//Router
const router = express();

//Routes
router.get('/', userController.getAllUsers);
//router.post('/', productController.registerProduct);


//Export
module.exports = router;