const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        default : ""
    },
    products : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "product"
            },
            quantity : Number,
            name : String,
            price : Number,
            image : String
        }
    ],
    paymentDetails : {
        paymentId : {
            type : String,
            default : ""
        },
        payment_method_type : [],
        payment_status : {
            type : String,
            default : ""
        }
    },
    shippingDetails : {
        fullName : String,
        email : String,
        phoneNumber : String,
        addressLine1 : String,
        addressLine2 : String,
        city : String,
        state : String,
        pinCode : String,
        country : String
    },
    totalAmount : {
        type : Number,
        default : 0
    },
    orderStatus : {
        type : String,
        default : "Processing"
    }
},{
    timestamps : true
})

const orderModel = mongoose.model("order",orderSchema)

module.exports = orderModel
