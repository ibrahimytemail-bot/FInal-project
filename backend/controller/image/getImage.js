const Image = require('../../models/imageModel')

const getImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id)

        if (!image) {
            return res.status(404).json({
                message: "Image not found",
                error: true,
                success: false
            })
        }

        res.set('Content-Type', image.contentType)
        res.set('Cache-Control', 'public, max-age=31536000')
        res.send(image.data)

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getImage
