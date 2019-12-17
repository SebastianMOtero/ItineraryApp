//Importamos mongoose
const mongoose = require('mongoose');

//Creamos un esquema
const Schema = mongoose.Schema;

const citySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
},
{
    collection: "cities"
});

module.exports = mongoose.model('city', citySchema)