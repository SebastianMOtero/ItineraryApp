const User = require('../models/modelAccountUser');
const bcrypt = require('bcryptjs');
const tokenSecret = require('../config/keys').token.secretOrKey;
const jwt = require('jsonwebtoken');

class UserServices {

    async loginService(pUser) {
        try { console.log('ENTRO LOGIN SERVICE')
            const userExist = await User.findOne({email: pUser.email});
            if (!userExist) { console.log(pUser)
                const newUser = await this.newUser(pUser);
                console.log(newUser);
            }
            const token = await this.login(pUser);
            return token;
        
        } catch (error) {
            return error;
        }
    }

    //validate the password and return a token
    async login(pUser) { 
            const userExist = await User.find({email: pUser.email});console.log(userExist[0].password)
            if (!userExist) {
                //retornar error, mail no existe
            } else {
                let validatedPassword = await bcrypt.compare(pUser.password, userExist[0].password)
                if (validatedPassword) {
                    const token = await this.createToken(userExist[0]._id);
                    return token;
                } else {
                    //error de password
                }
            }
    }

    //Add a new user to database if they doesnt exist
    async newUser(pUser) { console.log('entro al newUser')
        try {
            const userExist = await User.findOne({email: pUser.email});
            if (userExist) {
                //Si existe mandar error de mail existente
            }
            const hashedPassword = await bcrypt.hash(pUser.password, 10);
            const userCreated = new User({
                firstName : pUser.firstName,
                lastName : pUser.lastName,
                username : pUser.username,
                password : hashedPassword,
                email : pUser.email,
                profilePic : pUser.path || pUser.profilePic,
                favourites: []
            }); console.log('USUARIO CREADO');
            const newUser = await userCreated.save();
            return newUser;
        } catch (error) {
            
        }
        // await User
        //     .find( {email: pUser.email} )
        //     .exec()
        //     .then( user => {
        //         if ( user.length >= 1) {  
        //             console.log('mail existe ya')
        //         } else {
        //             bcrypt.hash(pUser.password, 10, (err, hash) => {
        //                 if (err) {
        //                     console.log('error encriptando pass')
        //                 } else {
        //                     const user = new User({
        //                         firstName : pUser.firstName,
        //                         lastName : pUser.lastName,
        //                         username : pUser.username,
        //                         password : hash,
        //                         email : pUser.email,
        //                         profilePic : pUser.path
        //                     });

        //                     user
        //                         .save()
        //                         .then( res => {
        //                             console.log('usuario creado piola')
        //                             return user;
        //                         })
        //                         .catch( err => {
        //                             console.log('error al crear usuario')
        //                         })
        //                 }
        //             })
        //         }
        //     })
    }

    //Create and return a token for an specific ID
    createToken(id) {
        const token = jwt.sign(
            {
                id: id
            },
                tokenSecret,
            {
                expiresIn: "1h"
            }
        );
        return token;
    }
}

module.exports = UserServices;