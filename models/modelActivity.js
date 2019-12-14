//Importamos mongoose
const mongoose = require('mongoose');

//Creamos un esquema
const Schema = mongoose.Schema;

const activitySchema = new Schema ({
    name: {
        type: String,
        required: true
    },   
    address: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    time: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    itineraryId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},
{
    collection: "activities"
});

module.exports = mongoose.model('activity', activitySchema)