const Image = require('../../models/imageModel')

const getAllImages = async (req, res) => {
    try {
        const { category } = req.query
        const filter = category ? { category } : {}
        
        const images = await Image.find(filter).select('-data')

        res.status(200).json({
            message: "Images retrieved successfully",
            success: true,
            error: false,
            data: images.map(img => ({
                id: img._id,
                filename: img.filename,
                category: img.category,
                contentType: img.contentType,
                url: `/api/image/${img._id}`,
                uploadDate: img.uploadDate
            }))
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getAllImages
