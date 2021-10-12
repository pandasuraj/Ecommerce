const { findById } = require("../models/productModels");
const Product = require("../models/productModels");



//Create Product--- Admin
exports.createProduct = async (req,res,next) =>{

    const product = await Product.create(req.body);
    res.status(201).json({
        sucess:true,
        product
    })
}

// Get all Products
exports.getAllProducts = async (req,res)=>{

    const products = await Product.find()
    res.status(200).json({
        sucess:true,
        products
    })
}

// Get single Product
exports.getProductDetails = async (req,res,next)=>{

    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
           sucess:false,
           message:"Product not found"
       })
    }
    
    res.status(200).json({
      sucess:true,
      product
  })
}

// Update Product --- Admin
exports.updateProduct = async (req,res,next)=>{

    let product = await Product.findById(req.params.id)

    if(!product){
    return res.status(500).json({
        sucess:false,
        message:"Product not found"
    })
}
   product = await Product.findByIdAndUpdate(req.params.id,req.body,{
       new:true,
       runValidators:true,
       useFindAndModify:false
    });
    res.status(200).json({
        sucess:true,
        product
    })
}

// Delete Product  
exports.deleteProduct = async (req,res,next)=>{

    let product = await Product.findById(req.params.id)

    if(!product){
     return res.status(500).json({
        sucess:false,
        message:"Product not found"
    })
}
    await product.remove();
      res.status(200).json({
        sucess:true,
        message:"Product Deleted Sucessfully"
    })
}