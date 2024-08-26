
import  Jwt  from 'jsonwebtoken';
import { catchError } from './catchError.js';
import { AppError } from '../utils/appError.js';
import { userModel } from '../../databases/models/user.model.js';

export const auth = catchError(async (req,res,next)=>{
    let token = req.headers.token;
    let decoded= Jwt.verify(token, process.env.JWT_TOKEN);

    let user = await userModel.findById(decoded._id)
    if(!user) return next(new AppError("user not found"))
    if(user&& user.passwordChangedAt){
        let time = parseInt(user.passwordChangedAt.getTime() /1000)
        if(time>decoded.iat) return next(new AppError("invalid Token Please login again"))
    }
    req.user=decoded
    next();
})

export const allowedTo = (...roles) =>{
    return catchError(async (req,res,next) =>{
        if(!roles.includes(req.user.role))
            return next(new AppError("you are not authorized",401))
        next()
    })
}

