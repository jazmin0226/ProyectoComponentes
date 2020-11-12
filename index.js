// Inyeccion de dependencias

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serverConfig = require('dotenv').config();

//Components
const components = require('./components/components.routes');
const port =  process.env.SERVER_PORT;
const dbUser = process.env.DB_USER;
const dbUrl = process.env.DB_URL;
const dbPassword = process.env.DB_PASSWORD;

//Contantes
const app = express(); //Instancia actual de express

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database conection
mongoose.set('useCreateIndex', true);
mongoose.connect(dbUrl, {
  auth: {
    user: dbUser,
    password: dbPassword
  },
useNewUrlParser: true,
useUnifiedTopology: true,
retryWrites: false
})
.then(() => console.log('Connection to CosmosDB successful'))
.catch((err) => console.error(err));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


//Router
app.use('/', components);

//Listener - SERVIDOR ya levantado
app.listen(port, () => {
    console.log(port);
})

module.exports = app;