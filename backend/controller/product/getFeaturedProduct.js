const productModel = require("../../models/productModel")

const getFeaturedProductController = async(req,res)=>{
    try{
        const featuredProduct = await productModel.find({ featured : true }).sort({ createdAt : -1 })

        res.json({
            message : "Featured Product",
            data : featuredProduct,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getFeaturedProductController
