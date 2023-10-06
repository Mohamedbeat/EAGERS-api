import Product from '../models/productM.js'



//create product
export const addProduct =async (req, res)=>{
    const newProduct = Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}
//update product
export const updateProduct =async (req, res)=>{
    
    try {
        const updatedProduct = await Product.findById(req.params.id)
        if(req.body.name) { updatedProduct.name = req.body.name}
        if(req.body.brand) { updatedProduct.brand = req.body.brand}
        if(req.body.size) { updatedProduct.size =(req.body.size)}
        if(req.body.desc) { updatedProduct.desc = req.body.desc}
        if(req.body.price) { updatedProduct.price = req.body.price}
        if(req.body.picture) { updatedProduct.picture = req.body.picture}
        if(req.body.category) { updatedProduct.category = req.body.category}
        await updatedProduct.save()
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}
//delete product
export const deleteProduct =async (req, res)=>{
    
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(`The product (${req.params.id}) has been deleted`)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get product
export const getProduct =async (req, res)=>{
    const productID = req.params.id
    try {
        const foundProduct = await Product.findById(productID)
        res.status(200).json(foundProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get product
export const getProducts =async (req, res)=>{
    const {min,max, ...others} = req.query
    const name = req.query.name || "";
    const category = req.query.category || "";
    const brand = req.query.brand || "";
    const featured = req.query.featured || false;
    const limit = req.query.limit || 999999;
    console.log(name);
    try {
        // const foundProducts = await Product.find({
        //     price:{$gt:parseInt(min) || 1, $lt:parseInt(max) || 999}
        // })
        const foundProducts = await Product.find({$and:[
            { price:{$gte:parseInt(min) || 1, $lte:parseInt(max) || 9999}},
            {name: {$regex: `${name}` || "" , $options: 'i' }},
            {brand: {$regex: `${brand}` || "" , $options: 'i' }},
            {category: {$regex: `${category}` || "" , $options: 'i' }},
            {featured: featured }
        ]}).limit(limit)
        res.status(200).json(foundProducts)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get product
export const getProductsNofeatured =async (req, res)=>{
    const {min,max, ...others} = req.query
    const name = req.query.name || "";
    const category = req.query.category || "";
    const brand = req.query.brand || "";
    const limit = req.query.limit || 999999;
    console.log(name);
    try {
        // const foundProducts = await Product.find({
        //     price:{$gt:parseInt(min) || 1, $lt:parseInt(max) || 999}
        // })
        const foundProducts = await Product.find({$and:[
            { price:{$gte:parseInt(min) || 1, $lte:parseInt(max) || 9999}},
            {name: {$regex: `${name}` || "" , $options: 'i' }},
            {brand: {$regex: `${brand}` || "" , $options: 'i' }},
            {category: {$regex: `${category}` || "" , $options: 'i' }},
            
        ]}).limit(limit)
        res.status(200).json(foundProducts)
    } catch (error) {
        res.status(500).json(error)
    }
}

//getCategories

export const getCats =async (req, res)=>{

    try {
        const foundCats = await Product.find({},{category: 1}).distinct('category')
        res.status(200).json(foundCats)
    } catch (error) {
        res.status(500).json(error)
    }
}