//importa modulos
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('node-env-file');
const passport = require('passport')
env(__dirname + '/.env');
// const passport = require('./passport/passport');

//inicializa express en variable app
const app = express();

// usa bodyparser como middleware
// creo que transforma automaticamente los body de las request  ajson
app.use(bodyParser.json());

//STEP 3
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//passport configuration
require('./passport/passport');  //equivalent to app.use(passport.authenticate('session'));

//PARA IMAGEN 
// app.use('/uploads', express.static('uploads'));
app.use('/public', express.static('public'));
//traigo de config/keys e connectionString
const db = require('./config/keys').mongoURI;

//Almaceno las rutas
const routesCities = require('./routes/api/routesCities');
const routesItineraries = require('./routes/api/routesItineraries');
const routesUsers = require('./routes/api/routesUsers');
const routesActivities = require('./routes/api/routesActivities');

// conecto a mongo
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then( () => console.log('MongoDB Connected') )
    .catch( err => console.log(err) );

app.use(bodyParser.json());
app.use(cors()); 
    
//Rutas usadas, las asocio 
app.use('/cities', routesCities);
app.use('/itineraries', routesItineraries);
app.use('/users', routesUsers);
app.use('/activities', routesActivities);

// le asigna a port la variable de entorno ubicada en PORT actualmente o 5000
const port = process.env.port || 5000;
 
//la app intenta escuchar y conectar el port seleccionado, como callback imprime que lo consiguio
app.listen( port, () => console.log(`Server started on port ${port}`) );