// Dependencies
const express = require('express');

//Controller
const controller = require('./order.controller');

//Router
const router = express();

//Routes
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.register);
router.put ('/:id', controller.update);
router.delete('/:id', controller.delete);


//Export
module.exports = router;