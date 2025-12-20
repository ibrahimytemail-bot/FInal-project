const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')

async function deleteProductController(req, res) {
    try {

        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied")
        }

        const { _id } = req.body

        if (!_id) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false
            })
        }

        const deletedProduct = await productModel.findByIdAndDelete(_id)

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            })
        }

        res.json({
            message: "Product deleted successfully",
            data: deletedProduct,
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = deleteProductController
