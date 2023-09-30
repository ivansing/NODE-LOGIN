const jsonWebToken = require("jsonwebtoken");
const {UnauthenticatedError} = require("../errors");

const  authenticationMiddleware = async (req,res,next) =>{
    const authHeader =  req.headers.authorization
   if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError("No token provided")
  } 
  const token = authHeader.split(' ')[1] // first item "Bearer ", second it's token

  try {
    const decoded = jsonWebToken.verify(token,process.env.JSON_SECRET)
    const {id,username} = decoded
    req.user = {id,username}
    
    next()
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route")
  }
}

module.exports = authenticationMiddleware