 const jwt = require("jsonwebtoken")
 
let authMiddleware = {}

authMiddleware.generateAccessToken = (userLoad)=>{
     console.log(userLoad)
     return jwt.sign(userLoad.toJSON(), process.env.SECRET_OR_KEY,{
         expiresIn: keys.expiresIn
     })
 }

const verifyTokenAndGetUID = (bearer)=>{
        return new Promise(resolve, reject=>{
            let token  = bearer ? bearer.split(" ")[1]: null
            if(token){

                let verifyCallback = (error, decode)=>{
                    if(error){reject("Token invalid")}
                    console.log(decode)
                    resolve(decode)
                }

                jwt.verify(token, process.env.SECRET_OR_KEY, verifyCallback)
            }else(reject("Token invalid"))
        })
 }
 
 
 authMiddleware.isUserAuthenticated = (req, res, next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(403).json({
            status: 403,
            message: 'FORBIDDEN'
        })
    }else { //verify token
        const token = getBearerToken(authHeader)
    
        if (token) {
          return verifyTokenAndGetUID(token)
            .then((userId) => {
              res.locals.auth = {
                userId
              }
              next()
            })
            .catch((err) => {
              logger.logError(err)
    
              return res.status(401).json({
                status: 401,
                message: 'UNAUTHORIZED'
              })
            })
        } else {
          return res.status(403).json({
            status: 403,
            message: 'FORBIDDEN'
          })
        } 
      }
}

module.exports = authMiddleware  