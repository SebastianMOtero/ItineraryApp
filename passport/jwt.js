const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// const passport = require("passport");
const mongoose = require("mongoose");
const modelUser = require("../models/modelAccountUser");
const key = require('../config/config').secretOrKey;
const passport = require('passport')
require('dotenv').config();

console.log(`la key es: ${process.env.JWT_KEY}`);

//JWT STRATEGY OPTIONS
const opts = {} 
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;


//EXPORTO LA ESTRATEGIA
module.exports = passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => { 
        modelUser
            .findById(jwt_payload.id)
            .then( user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    })
  );
