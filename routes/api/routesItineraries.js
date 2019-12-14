const express = require('express');
const router = express.Router();

//importamos el modelo
const Itinerary = require('../../models/modelItinerary')

//Agregamos las rutas de cities

// @route   GET /:cityId
// @desc:   trae todos los itineraries que pertenezcan a la cityId
// @access: public
router.get('/:cityId', async (req, res) => { 
    try {
        // db.itinerary.aggregate([{
        //     $lookup: {
        //         from: 'cities',
        //         localField: 'cityId',
        //         foreignField: '_id',
        //         as: 'asd'
        //       }
        // }])
        console.log('sad')
        const itinerariesObtained = await Itinerary.find({cityId: req.params.cityId});
        // itinerariesObtained.map( itinerary => { itinerary.json()} )
        console.log(itinerariesObtained);
        if (itinerariesObtained) {
            res.status(200).json(itinerariesObtained)
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
});

router.post('/newItinerary', async (req, res) => {
    try {
        const itineraryCreated = new Itinerary({
            mytineraryName: req.body.mytineraryName,
            userPhoto: req.body.userPhoto,
            username: req.body.username,
            rating: req.body.rating,
            duration: req.body.duration,
            price: req.body.price, 
            hashtag: req.body.hashtag,
            cityId: req.body.cityId
        })
        const itinerarySaved = await itineraryCreated.save();
        res.status(200).json({
            itinerary: itinerarySaved
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.delete('/:itineraryId', async (req, res) => {
    try {
        const itineraryRemoved = await Itinerary.remove({_id: req.params.itineraryId});
        if (itineraryRemoved) {
            res.status(200).json({
                message: 'itinerary deleted'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

//exporto el router con las rutas asociadas
module.exports = router