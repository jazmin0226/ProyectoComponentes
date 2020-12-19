// Dependencies
const express = require('express');

//Controller
const userController = require('./users.controller');

//Router
const router = express();

//Routes
router.get('/', userController.getAllUsers);
router.post('/', userController.registerUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.unlock('/:id', userController.enableUser);
router.get('/:id', userController.getUserById);

// router.get('object', userController.getUserByObjectId);

//Export
module.exports = router;