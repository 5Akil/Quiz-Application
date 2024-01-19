const jwt = require('jsonwebtoken')
const adminModel = require('../modals/adminModal');


var adminAuth = async (req, res, next) => {
    
    const { authorization } = req.headers

    // console.log(authorization);
    if (authorization && authorization.startsWith('Bearer')) {
        try {

            // Get Token from header
            var token = authorization.split(' ')[1]
            
            if (token) {
               
                // Verify Token
                const {adminID} = jwt.verify(token, process.env.SECRET_KEY)
                // Get User from Token
                req.user = await adminModel.findById(adminID)
            }else{
                res.status(401).send({ "status": "failed", "message": "Unauthorized Admin, No Token" })
            }

            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({ "status": "failed", "message": "Unauthorized Admin" })
        }
    }
    if (!token) {
        res.status(401).send({ "status": "failed", "message": "Unauthorized Admin, No Token" })
    }
}


module.exports =adminAuth



