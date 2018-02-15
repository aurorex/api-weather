const express = require('express');
// las dependencias se guardan en variable app
const app = express();
// creamos el server
const server = app.listen(3000, encender);
// levantamos el server
function encender() {
  console.log('servidor encendido');
}
app.use(express.static('public'));
