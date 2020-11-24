// Dependencies
const express = require('express');

//Controller
const controller = require('./login.controller');

//Router
const router = express();

//Export
router.post('/', controller.login);

module.exports = router;