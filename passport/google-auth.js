const GOOGLE_CLIENT_ID = require('../config/keys').google.clientID;
const GOOGLE_CLIENT_SECRET = require('../config/keys').google.clientSecret;
const cbURL = require('../config/keys').URIRedirect;

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(new GoogleStrategy({ 
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL:  "http://localhost:5000/users/loginGoogleRedirect"
    }, (accessToken, refreshToken, profile, cb) => {
        const pUser = {
            firstName : profile.name.givenName,
            lastName : profile.name.familyName,
            username : profile.displayName,
            password : profile.id,
            email : profile.emails[0].value,
            profilePic : profile.photos[0].value
        }
        cb(null, pUser)
    })
);