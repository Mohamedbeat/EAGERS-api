import mongoose from "mongoose";
import  express, { json }  from "express";
import 'dotenv/config'
import productRouter from './routes/productR.js' 
import authRouter from './routes/authR.js' 
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express()
const connectionToDB= async()=>{
try {
    await mongoose.connect('mongodb://127.0.0.1:27017/testingDB')
    console.log('Connected to mongoDB');
} catch (error) {
    console.log(error);
}
}



//middlewares
app.use(json())
// app.use(cors())
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())
app.use('/products', productRouter)
app.use('/auth', authRouter)










app.listen(process.env.PORT, ()=>{
    connectionToDB()
    console.log('Server in up at '+ process.env.PORT);
})
