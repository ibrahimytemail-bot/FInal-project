const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    userId : String,
    userName : String,
    rating : Number,
    comment : String,
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const productSchema = mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
    sellingPrice : Number,
    status : {
        type : String,
        default : "In Stock"
    },
    featured : {
        type : Boolean,
        default : false
    },
    bestSelling : {
        type : Boolean,
        default : false
    },
    showOnHome : {
        type : Boolean,
        default : false
    },
    reviews : [reviewSchema]
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel