const express = require('express');
const router = express.Router();
const modelUser = require('../../models/modelAccountUser');

const bcrypt = require('bcryptjs');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const key = require('../../config/config').secretOrKey
const checkAuth = require('../../passport/check-out');
const googleAuth = require('../../passport/google-auth');
const url = require('url');
require('../../passport/jwt');
var ObjectID = require('mongodb').ObjectID;

const UserServices = require('../../services/userServices');
const userServices = new UserServices();

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // cb(null, './uploads/');
        cb(null, './public/images/users')
    },
    filename: function(req, file, cb) {
        cb(null,  file.originalname);
    }
}); //especifica como se guardan los files
const public = multer({ storage: storage })  //Esto especifica una ruta donde multer va
// a guardar todos los incoming files. tenemos que hacerla static, ya que es publica

// @route   POST api/users
// @desc:   carga un usuario
// @access: public
// router.post('/new', public.single('profilePic'), (req, res) => {
    router.get(
        "/",
        passport.authenticate("jwt", { session: false }),
        (req, res) => {
          userModel
            .findOne({ _id: req.user.id })
            .then(user => {
              res.json(user);
            })
            .catch(err => res.status(404).json({ error: "User does not exist!" }));
        }
      );


var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
router.get('/identifyuser', 
            passport.authenticate('jwt', {session:false}),
            async (req, res) => {
                console.log(req.user);
                // const idUser = req.user._id;
                // const user = await userService.getUserById(idUser);
                res.status(200).json({
                    data: req.user,
                    message: 'exito'
                });
              }
);

//CREA CUENTA USUARIO
router.post(
        '/signup', 
        // passport.authenticate("jwt", { session: false }),
        public.single('profilePic'), 
        (req, res) => { 
            const userServices = new UserServices();
            const pUser = {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                username : req.body.username,
                password : req.body.password,
                email : req.body.email,
                profilePic : req.file.path
            };
            res.json ( userServices.newUser(pUser) );
        }
)

//STEP 2 DE SPRINT 4
//CONTROLA SI EXISTE USUARIO Y CREA UN TOKEN 
router.post('/login', async (req, res) => { 
    const pUser = {
        email: req.body.email,
        password: req.body.password
    }
    const token = await userServices.login(pUser);
    res.status(200).json({
        token: token
    })
    // res.redirect(`http://localhost:3000/${token}`);
})

//AUTH con google
router.get('/loginGoogle',
  passport.authenticate('google', { scope: ["profile", "email"] }));

router.get('/loginGoogleRedirect', 
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    async function(req, res) { //EN ESTE REQ RECIBO EL MAIL Y PASSWORD
        // return 
        const token = await userServices.loginService(req.user);    
        res.redirect(`http://localhost:3000/loaduser/${token}`);
        // return res.status(200).json(payload);
    }
)

router.delete('/:userId', (req, res) => {
    modelUser
        .remove({_id : req.params.userId})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'user deleted'
            });
        })
        .catch( err => {
            res.status(500).json({
                error: err
            });
        });
})

router.post('/newFavourite', async (req, res) => {
    try { console.log('asd')
        let itiId = `${req.body.itineraryId}`;
        console.log(itiId)
        let user = await modelUser.findByIdAndUpdate(req.body.id, {
            $push: {
                favourites: ObjectID(itiId)
            }
        });
        user = await modelUser.findById(req.body.id);
        if (user) { console.log(user)
            return res.status(200).json(user)
        } 
        return console.log("No se encontro")
    } catch (error) {
        
    }
})

router.post('/removeFavourite', async(req, res) => {
    let user = await modelUser.findByIdAndUpdate(req.body.id, {
        $pull: {
            favourites: ObjectID(req.body.itineraryId)
        }
    });
    user = await modelUser.findById(req.body.id);
    if (user) { console.log(user)
            return res.status(200).json(user)
        } 
        return console.log("No se encontro")
})
module.exports = router;