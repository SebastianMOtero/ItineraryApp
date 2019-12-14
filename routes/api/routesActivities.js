const express = require('express');
const router = express.Router();

//importamos el modelo
const Activity = require('../../models/modelActivity');

router.get('/:itineraryId', async (req, res) => { 
    try {
        const activitiesObtained = await Activity.find({itineraryId: req.params.itineraryId});
        console.log(activitiesObtained);
        if (activitiesObtained) {
            res.status(200).json({
                activities: activitiesObtained
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
});

router.post('/newActivity', async (req, res) => {
    try {
        const activityCreated = new Activity({
            name: req.body.name,
            address: req.body.address,
            photo: req.body.photo,
            time: req.body.time,
            cost: req.body.cost,
            comments: req.body.comments, 
            itineraryId: req.body.itineraryId
        })
        const activitySaved = await activityCreated.save();
        res.status(200).json({
            activity: activitySaved
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.delete('/:activityId', async (req, res) => {
    try {
        const activityRemoved = await Activity.remove({_id: req.params.activityId});
        if (activityRemoved) {
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

module.exports = router;