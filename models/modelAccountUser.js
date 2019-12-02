//u, profilePic, country FALTA
const { appConfig } = require('../config/config');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        // match: regularExpression ,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    }
},
{
    versionKey: false // set to false then it wont create in mongodb
},
{
    collection: "users"
});

module.exports = mongoose.model('users', accountSchema);