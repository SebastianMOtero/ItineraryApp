//importa modulos
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('node-env-file');
const passport = require('passport');
const checkAuth = require('./passport/check-out');
const { join } = require('path')
require('./lib/mongodb');
const routesCities = require('./routes/api/routesCities');
const routesItineraries = require('./routes/api/routesItineraries');
const routesUsers = require('./routes/api/routesUsers');
const routesActivities = require('./routes/api/routesActivities');
const routesComments = require('./routes/api/routesComments');
env(__dirname + '/.env');

const app = express();

//PARA IMAGEN 
// app.use('/uploads', express.static('uploads'));
app.use('/public', express.static('public'));

//Middlewares
app.use(bodyParser.json());
app.use(cors()); 
app.use(passport.initialize());

//Rutas usadas, las asocio 
// app.use('/cities', checkAuth, routesCities);
app.use('/cities', routesCities);
app.use('/itineraries', routesItineraries);
app.use('/users', routesUsers);
app.use('/activities', routesActivities);
app.use('/comments', routesComments);

const port = process.env.port || 5000;
app.listen( port, () => console.log(`Server started on port ${port}`) );