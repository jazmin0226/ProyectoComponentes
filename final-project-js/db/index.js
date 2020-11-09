// Inyeccion de dependencias

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serverConfig = require('dotenv').config();

//Components
const components = require('./components/components.routes');

//Contantes
const app = express(); //Instancia actual de express

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database conection
mongoose.set('useCreateIndex', true);
mongoose.connect(serverConfig.parsed.DB_URL, {
  auth: {
    user: serverConfig.parsed.DB_USER,
    password: serverConfig.parsed.DB_PASSWORD
  },
useNewUrlParser: true,
useUnifiedTopology: true,
retryWrites: false
})
.then(() => console.log('Connection to CosmosDB successful'))
.catch((err) => console.error(err));

//Router
app.use('/', components);

//Listener - SERVIDOR ya levantado
app.listen(serverConfig.parsed.SERVER_PORT, () => {
    console.log(serverConfig.parsed.SERVER_PORT);
})

module.exports = app;