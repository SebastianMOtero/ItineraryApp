//importa modulos
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//inicializa express en variable app
const app = express();

// usa bodyparser como middleware
// creo que transforma automaticamente los body de las request  ajson
app.use(bodyParser.json());

//traigo de config/keys e connectionString
const db = require('./config/keys').mongoURI;

//Almaceno las rutas
const routesCities = require('./routes/api/routesCities');
const routesItineraries = require('./routes/api/routesItineraries');

// conecto a mongo
mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then( () => console.log('MongoDB Connected') )
    .catch( err => console.log(err) );

    app.use(bodyParser.json());
    app.use(cors());
    
//Rutas usadas, las asocio 
app.use('/cities', routesCities);
app.use('/itineraries', routesItineraries);
// le asigna a port la variable de entorno ubicada en PORT actualmente o 5000
const port = process.env.port || 5000;
 
//la app intenta escuchar y conectar el port seleccionado, como callback imprime que lo consiguio
app.listen( port, () => console.log(`Server started on port ${port}`) );