import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return next(errorHandler(401,"Access Denied"));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{   //user
        if(err){
            return next(errorHandler(403,"Invalid Token"));
        }
       req.user=user;//user   //here we are getting the user id from the token and passing it to the updateUser function
        next(); //here next means user.route.js goes to updateUser function from verifyToken function
    })
};

export {verifyToken};