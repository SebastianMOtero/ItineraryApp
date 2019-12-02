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
            .findOne(jwt_payload.sub)
            .then( user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    })
  );
// const localStrategy = require('passport-local').Strategy;

//Nombre del metodo de autenticacion y le paso la nueva estrategia
// passport.use('local-signup', new localStrategy({
//         //la nueva etrategia recibe un objeto y un callback
//         //el objeto indica que tipo de dato recibimos del cliente
//         usernameField: 'username', //ponemos nombre del formulario },
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//     //el callback para decirle que hace con esos datos, validar, almacenar o que
//     (req, email, password, done) => {

//     }
// ));