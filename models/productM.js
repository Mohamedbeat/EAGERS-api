import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    brand:{
        type: String,
    },
    size:{
        type:[String],
    },
    desc:{
        type:String
    },
    price:{
        type:Number
    }, 
    category:{
        type:String
    },
    picture:{
        type:String
    },
    featured:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model('product',productSchema)