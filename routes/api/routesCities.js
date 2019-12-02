const express = require('express');
const router = express.Router();

//importamos el modelo
const modelCity = require('../../models/modelCity');
const modelItinerary = require('../../models/modelItinerary');

//Agregamos las rutas de cities

// @route   cities/all
// @desc:   get all the cities
// @access: public
router.get('/all', (req, res) => { 
    modelCity
        .find() 
        .then( city => res.status(200).json(city) ) //cada uno que aplique lo transforma en json
        .catch( err => res.status(400).send('cities not founded'))
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

// @route   cities/add
// @desc:   add a new city
// @access: public
router.post('/add', (req, res) => { 
    let city = new modelCity(req.body) ;
    city.save()
        .then( city => res.status(200).json({'city': 'city added successfully'}) ) //cada uno que aplique lo transforma en json
        .catch( err => res.status(400).send('adding new city failed')); 
});

// @route   cities/update/:id
// @desc:   update the city
// @access: public
router.post('/update/:id', (req, res) => { 
    modelCity
        .findById(req.params.id, (err, city) => {
            if (!city) {
                res.status(404).send('data is not found');
            } else {
                city.name = req.body.name,
                city.country = req.body.country

                city.save()
                    .then( city => { res.json('city updated')})
                    .catch( err => { res.status(400).send('update not possible')});
            }
        });
});


//Exportamos el router con las rutas de cities
module.exports = router;