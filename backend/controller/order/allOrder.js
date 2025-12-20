const orderModel = require("../../models/orderModel")
const userModel = require("../../models/userModel")

const allOrderController = async(req,response)=>{
    try{
        const userId = req.userId

        const user = await userModel.findById(userId)

        if(user.role !== 'ADMIN'){
            return response.status(500).json({
                message : "not access",
                error : true,
                success : false
            })
        }

        const AllOrder = await orderModel.find().sort({ createdAt : -1 })

        return response.status(200).json({
            data : AllOrder,
            success : true,
            error : false
        })

    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = allOrderController
