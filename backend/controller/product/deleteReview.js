const productModel = require("../../models/productModel")

const deleteReviewController = async(req,res)=>{
    try{
        const { productId, reviewId } = req.body

        const updateProduct = await productModel.findByIdAndUpdate(
            productId,
            {
                $pull : { reviews : { _id : reviewId } }
            },
            { new : true }
        )

        res.json({
            message : "Review deleted successfully",
            data : updateProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = deleteReviewController
