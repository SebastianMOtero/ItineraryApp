//Importamos mongoose
const mongoose = require('mongoose');

//Creamos un esquema
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    itineraryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "comments"
});

module.exports = mongoose.model('comments', commentSchema)