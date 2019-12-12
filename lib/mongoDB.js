const mongoose = require("mongoose");

const URIdb = require('../config/keys').mongoURI;

// conecto a mongo
mongoose
    .connect(URIdb, { 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true })
    .then( () => console.log('MongoDB Connected') )
    .catch( err => console.log(err) );

module.exports = mongoose;