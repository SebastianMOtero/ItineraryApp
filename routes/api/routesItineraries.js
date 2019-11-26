const express = require('express');
const router = express.Router();

//importamos el modelo
const modelItinerary = require('../../models/modelItinerary')

//Agregamos las rutas de cities

// @route   GET /:cityId
// @desc:   trae todos los itineraries que pertenezcan a la cityId
// @access: public
router.get('/:cityId', (req, res) => { 
    modelItinerary
        .find( {cityId: req.params.cityId} ) //busca todos los que aplique a model itinerarie
        .then( itinerary => res.json(itinerary) ) //cada uno que aplique lo transforma en json
        .catch(err => res.status(404).json({success: false}))
});

//exporto el router con las rutas asociadas
module.exports = router