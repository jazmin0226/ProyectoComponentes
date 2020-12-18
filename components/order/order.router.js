// Dependencies
const express = require('express');

//Controller
const controller = require('./order.controller');

//Router
const router = express();

//Routes
router.get('/', controller.getAll); 
router.post('/', controller.register);

// router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/:userid', controller.getByUser);
router.get('/userstate/:id', controller.getOrdersUserState);
router.get('/statecreated/:id', controller.getOrdersUserCreated);
router.get('/statesent/:id', controller.getOrdersUserSent);
router.get('/statedelivered/:id', controller.getOrdersUserDelivered);

router.put('/updatestate/:id', controller.updateState);
router.patch('/updateorder', controller.updateOrder);
router.delete('/delete/:id', controller.deleteProduct);

//Export
module.exports = router;