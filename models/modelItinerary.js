const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    profileName: {
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
    }
},
{
    collection: "itinerary"
});

module.exports = modelItinerary = mongoose.model('itinerary', itinerarySchema);