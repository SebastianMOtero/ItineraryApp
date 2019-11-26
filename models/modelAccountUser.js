import { mongo } from 'mongoose';

//u, profilePic, country FALTA

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let accountSchema = new Schema({
    userName: {
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
        required: true
    },
},
{
    collection: "userAccount"
});

module.export = mongoose.model('userAccount', accountSchema);