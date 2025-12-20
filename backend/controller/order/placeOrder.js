const orderModel = require("../../models/orderModel")
const addToCartModel = require("../../models/cartProduct")

const placeOrderController = async(req,response)=>{
    try{
        const currentUserId = req.userId
        const { 
            products, 
            paymentDetails, 
            shippingDetails, 
            totalAmount 
        } = req.body

        const payload = {
            userId : currentUserId,
            products : products,
            paymentDetails : paymentDetails,
            shippingDetails : shippingDetails,
            totalAmount : totalAmount,
            paymentDetails : {
                paymentId : "",
                payment_method_type : [],
                payment_status : "pending"
            }
        }

        const newOrder = new orderModel(payload)
        const saveOrder = await newOrder.save()

        //clear cart
        await addToCartModel.deleteMany({ userId : currentUserId })

        return response.status(201).json({
            data : saveOrder,
            message : "Order placed successfully",
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

module.exports = placeOrderController
