import express  from "express";
import { addProduct, deleteProduct, getCats, getProduct, getProducts, getProductsNofeatured, updateProduct } from "../controllers/productC.js";


const router = express.Router()

// create porduct
router.post('/',addProduct)
// update porduct
router.put('/:id',updateProduct)
// delete porduct
router.delete('/:id',deleteProduct)
// get porduct
router.get('/:id',getProduct)
// get all porduct
router.get('/',getProducts)//getProducts
router.patch('/',getProductsNofeatured)//getProducts


router.post('/categories',getCats)//getProducts

// router.get("/hello",(req, res)=>{
//     console.log("sdffd :"+req.params.id)
//     res.json('5464')
// })
//getProducts











export default router;