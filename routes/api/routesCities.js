const express = require('express');
const router = express.Router();

//importamos el modelo
const modelCity = require('../../models/modelCity');
const modelItinerary = require('../../models/modelItinerary');

//Agregamos las rutas de cities

// @route   GET api/cities
// @desc:   trae todas las ciudades de la BD
// @access: public
router.get('/all', (req, res) => { 
    modelCity
        .find() //busca todos los que aplique a model city
        .then( city => res.json(city) ) //cada uno que aplique lo transforma en json
        .catch(err => res.status(404).json({success: false}))
});

// @route   GET api/:id
// @desc:   trae todas lis itinerarios de una ciudad
// @access: public
router.get('/:cityId', (req, res) => { 
    let cityRequired = req.params.id;
    modelItinerary
        .find({ cityId: cityRequired}) //busca todos los que aplique a model itineraries con ese id
        .then( itineraries => res.json(itineraries) ) //cada uno que aplique lo transforma en json
        .catch(err => res.status(404).json({success: false}))
});


//Exportamos el router con las rutas de cities
module.exports = router;