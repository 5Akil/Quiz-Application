const jwt = require('jsonwebtoken')
const userModel = require('../modals/userModal');


var userAuth = async (req, res, next) => {
    
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Get Token from header
            var token = authorization.split(' ')[1]
            if (token) {
                // Verify Token
                const {userID} = jwt.verify(token, process.env.SECRET_KEY)

                console.log(userID);
                // Get User from Token
               const user= await userModel.findById(userID)
               console.log(user,"<<<<<<<<<<<<<");
               if (user !== null){
                 req.user = user
                 next()
               }else{
                return res.send({"status" : "401" , "message":" user is deleted by admin"})
               }
            } else {
                res.status(401).send({ "status": "failed", "message": "Unauthorized user, No Token" })
            }
        } catch (error) {
            res.send({ "status": "403" , "message":"token Expired" })
        }
    }
   
}


module.exports = userAuth




