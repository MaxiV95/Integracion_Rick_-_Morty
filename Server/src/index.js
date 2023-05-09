require('dotenv').config();
const PORT = process.env.S_PORT || 3001;

const { conn } = require("./DB_connection"); // esta es la config de nuestra db
const server = require('./app');// esta es la config de nuestro server


server.listen(PORT, async () => {
   console.log('Server raised in port: ' + PORT);
   //await conn.sync({ force: true });          /* SOLO EN CREACION */
   await conn.sync({ alter: true });
});
 