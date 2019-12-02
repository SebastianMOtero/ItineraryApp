const express = require('express');
const router = express.Router();
const modelUser = require('../../models/modelAccountUser');

const bcrypt = require('bcryptjs');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const key = require('../../config/config').secretOrKey

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


router.get('/getUser', (req, res) => {
    modelUser
        .find()
        .then( user => res.json(user) )
})

//CREA CUENTA USUARIO
router.post(
        '/signup', 
        passport.authenticate("jwt", { session: false }),
        public.single('profilePic'), 
        (req, res) => { 
            //CONTROLO QUE EL USUARIO NO EXISTA YA
            modelUser
                .find({
                    email: req.body.email// BUSCO LO QUE NO SE PUEDE REPETIR DNI EMAIL POR EJEMPLO
                })
                .exec()
                .then( user => { 
                    //SI EXISTE AVISO
                    if (user.length >= 1 ) {  //409 significa que se puede manejar la request pero hay conflicto
                        return res.status(409).json({
                            message: 'Mail exists'
                        });
                        //SINO LO CREO
                    } else {
                        //ENCRIPTO LA CONTRASENA PARA GUARDARLA EN BD    
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                })
                            } else { 
                                //CREO OBJETO USUARIO PARA LA BD
                                const user = new modelUser({
                                    firstName : req.body.firstName,
                                    lastName : req.body.lastName,
                                    username : req.body.username,
                                    password : hash,
                                    email : req.body.email,
                                    profilePic : req.file.path
                                });
                                user
                                    //LO GUARDO EN LA BD CON SU PASS ENCRIPTADA
                                    .save()
                                    .then( res => {
                                        res.status(201).json({
                                            message: 'user created'
                                        })
                                        res.redirect('/');  //CONTROLAAAAAAAAAAAAAAAAAAA ESTO
                                    })
                                    .catch( err => {
                                        res.status(500).json({
                                            error: err
                                        })
                                    })
                            }
                        })
                    }
                })
        }
)

//STEP 2 DE SPRINT 4
//CONTROLA SI EXISTE USUARIO Y CREA UN TOKEN 
router.post('/login', (req, res) => { 
    modelUser  
        .find({
            email: req.body.email
        })
        .exec()
        .then( user => { 
            if ( user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            } else { 
                //COMPARO LA CONTRASENA USADA PARA LOGUEARSE
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) { 
                        return res.status(401).json({
                            message: "Auth failed"
                        })
                    }
                    if (result) {
                        //SI LOS DATOS SON CORECTOS CREO TOKEN
                        const token = jwt.sign(
                        //ACA PONER EL PAYLOAD
                        {
                            email: user[0]._id,
                            profilePic: user[0].profilePic
                        }, 
                        //ACA PONER LA KEY
                        key,//ACA PONER ALGO SECRETO ENV AAAAAAAAAAAAAAAAAA
                        //OPCIONES : TIEMPO EN QUE EXPIRA
                        {
                            expiresIn: "1h"
                        }
                        ); 
                        //RETORNO AL FRONT EL TOKEN
                        return res.status(200).json({
                            message: "Auth successful",
                            token : token,
                        })
                    }
                    res.status(401).json({
                        message: "Auth failed"
                    }) 
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
})

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
module.exports = router;