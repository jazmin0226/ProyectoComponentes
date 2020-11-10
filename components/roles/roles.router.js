// Dependencies
const express = require('express');

//Controller
const roleController = require('./roles.controller');

//Router
const router = express();

//Routes
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRolById);
router.post('/', roleController.registerRol);
router.delete('/:id', roleController.deleteRole);
router.unlock('/:id', roleController.enableRole);


//Export
module.exports = router;