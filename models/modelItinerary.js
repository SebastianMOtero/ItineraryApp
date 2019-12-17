const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    mytineraryName: {
        type: String,
        required: true
    },
    userPhoto: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    hashtag: {
        type: Array,
        required: true
    },
    cityId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    comments: {
        type: Array,
        required: false //Modificar mas adelante
    }
},
{
    collection: "itinerary"
});

module.exports = modelItinerary = mongoose.model('itinerary', itinerarySchema);