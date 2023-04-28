require("dotenv").config();

const express = require('express');
const server = express();
const router = require('./routes/route');
const morgan = require('morgan')


server.use(express.json());
server.use(morgan('dev'));
// ...
server.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
   );
   res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
   );
   next();
});

server.use('/rickandmorty', router)


module.exports = server

// res.setHeader('Access-Control-Allow-Origin', '*')
// /* Permite que los recursos (como archivos, imágenes o datos) de un sitio web
// sean accesibles desde otro dominio u origen diferente al del sitio web actual.*/