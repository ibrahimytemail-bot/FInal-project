const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    category: {
        type: String,
        default: 'general'
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image
