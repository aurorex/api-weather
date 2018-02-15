/*
let fetch = require('node-fetch');

let darksky = 'https://api.darksky.net/forecast/key/lat,lng';
let key = 'bfb97796a5bb08eff53b85624593a6fa';
let lat = 45.3483;
let lng = -75.7584;
const uri = darksky + key + '/' + lat + ',' + lng;
console.log(uri);
uri = uri.concat('?units=ca');

let options = {
  method: 'GET',
  mode: 'cors'
};
let req = new fetch.Request(uri, options);

fetch(req)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Bad HTTP!');
    }
  })
  .then((j) => {
    console.log(j);
    console.log(j.currently.temperature, j.currently.summary);
    // j.forEach(function(user) {
    //   console.log(user.id, user.name, user.name);
    console.log('JSON data provided');
    // });
  })
  .catch((err) => {
    console.log('ERROR', err.message);
  });
*/
