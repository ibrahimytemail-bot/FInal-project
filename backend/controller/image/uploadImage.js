const Image = require('../../models/imageModel')

const uploadImageToDb = async (req, res) => {
    try {
        const { filename, category } = req.body
        
        if (!req.file) {
            return res.status(400).json({
                message: "No image file provided",
                error: true,
                success: false
            })
        }

        const newImage = new Image({
            filename: filename || req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer,
            category: category || 'general'
        })

        const savedImage = await newImage.save()

        res.status(200).json({
            message: "Image uploaded successfully",
            success: true,
            error: false,
            data: {
                id: savedImage._id,
                filename: savedImage.filename,
                category: savedImage.category,
                url: `/api/image/${savedImage._id}`
            }
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = uploadImageToDb
