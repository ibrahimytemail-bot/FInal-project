const productModel = require("../../models/productModel")

const getHomeCategoryProduct = async(req,res)=>{
    try{
        const { category } = req.body
        const product = await productModel.find({ category, showOnHome : true }).sort({ createdAt : -1 }).limit(4)

        res.json({
            data : product,
            message : "Home Category Product",
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

module.exports = getHomeCategoryProduct
