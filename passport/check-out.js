const jwt = require('jsonwebtoken');

//middleware para controlar la autenticacion 
module.exports = (req, res, next)  => {
    console.log('check-out method');
    // console.log(req.headers.authorization)
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        console.log(token);
        console.log(process.env.JWT_KEY)
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log('check out verifico');
        console.log(decoded);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}