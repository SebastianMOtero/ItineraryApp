const express = require('express');
const router = express.Router();

//importamos el modelo
const modelCity = require('../../models/modelCity');
const modelItinerary = require('../../models/modelItinerary');

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/cities')
    },
    filename: function(req, file, cb) {
        cb(null,  file.originalname);
    }
});
const public = multer({ storage: storage })

//Agregamos las rutas de cities
router.get('/city/:cityId', (req, res) => { console.log(req.params.cityId)
    modelCity
        .findById(req.params.cityId)
        .then( city => res.status(200).json(city))
})

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
router.post(
    '/add', 
    public.single('image'),
    async (req, res) => { 
        try {
            const cityExist = await modelCity.findOne({name: req.body.name});
            if (cityExist) {
                console.log('existe')//error si existe 
            }
            const cityCreated = new modelCity({
                name: req.body.name,
                country: req.body.country,
                image: req.file.path
            })
            const newCity = await cityCreated.save(); 
            res.status(200).json(newCity)
        } catch (error) {
            console.log('fallo');
            //error si falla el proceso
        }
});

// @route   cities/update/:id
// @desc:   update the city
// @access: public
router.post(
    '/update/:id', 
    public.single('image'),
    async (req, res) => { 
    try {
        const cityUpdated = await modelCity.findByIdAndUpdate(req.params.id, {
            country: req.body.country,
            image: req.file.path
        });
        if (cityUpdated) { console.log('existo')
            return res.status(200).json(cityUpdated)
        } 
        return console.log("No se encontro")
    } catch (error) {
        
    }
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