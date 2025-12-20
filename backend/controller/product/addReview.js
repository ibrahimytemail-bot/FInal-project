const productModel = require("../../models/productModel")
const userModel = require("../../models/userModel")

const addReviewController = async(req,res)=>{
    try{
        const { productId, rating, comment } = req.body
        const currentUserId = req.userId

        if(!currentUserId){
            throw new Error("Please login to add a review")
        }

        const user = await userModel.findById(currentUserId)
        if(!user){
            throw new Error("User not found")
        }

        const product = await productModel.findById(productId)
        if(!product){
            throw new Error("Product not found")
        }

        const review = {
            userId : currentUserId,
            userName : user.name || "Anonymous",
            rating : Number(rating),
            comment,
            createdAt : new Date()
        }

        const updateProduct = await productModel.findByIdAndUpdate(
            productId,
            {
                $push : { reviews : review }
            },
            { new : true }
        )

        res.json({
            message : "Review added successfully",
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

module.exports = addReviewController
