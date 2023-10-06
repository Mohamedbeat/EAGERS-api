import jwt from 'jsonwebtoken'
import { createErr } from './error.js'
import { JWT_SECRET_KEY } from '../configs.js';

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token2;
    if(!token) return next(createErr(401, "You are not athenticated!"))
    jwt.verify(token, JWT_SECRET_KEY, (err, user)=>{
        if(err) return next(createErr(403, "Token is not valid!"))
        req.user= user;
        next()
});
}


export const verifyUser = (req, res, next)=>{
verifyToken(req, res, ()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        next()
    }else{
        return next(createErr(403, "You are not authorized!"))
    }
})
}
export const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createErr(403, "You are not authorized!"))
        }
    })
    }