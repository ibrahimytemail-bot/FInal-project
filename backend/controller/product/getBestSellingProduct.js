const productModel = require("../../models/productModel")

const getBestSellingProductController = async(req,res)=>{
    try{
        const bestSellingProduct = await productModel.find({ bestSelling : true }).sort({ createdAt : -1 })

        res.json({
            message : "Best Selling Product",
            data : bestSellingProduct,
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

module.exports = getBestSellingProductController
