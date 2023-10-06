import User from '../models/usersM.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createErr } from '../utils/error.js';
import { JWT_SECRET_KEY } from '../configs.js';


//REGISTER
export const register = async (req, res, next)=>{
    console.log(req.body);
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(200).json('User has been created successfully')
    } catch (error) {
        next(error)
    }
}

//REGISTER
export const login = async (req, res, next)=>{
    console.log(req.body);
    try {
        //checking existance
        const user = await User.findOne({username :req.body.username})
        if(!user) return next(createErr(404, "No user found!"))

        //ckecking pass is correct
        const isPassCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPassCorrect) return next(createErr(404, "Incorrect password"))

        const token = jwt.sign({id: user._id, isAdmin : user.isAdmin},JWT_SECRET_KEY);

        const {password,isAdmin,...others } = user._doc;
        res.cookie('access_token2', token, {
            httpOnly: false,
            sameSite: 'None',/////////
            secure:true,//add those to make cookie visible in browser coz of security issue
            // SameSite: None,
            // Secure:true,
        })
        .status(200)
        .json(others)


    } catch (error) {
        next(error)
    }
}