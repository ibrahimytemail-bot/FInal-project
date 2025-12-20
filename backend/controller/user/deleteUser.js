const userModel = require("../../models/userModel")

async function deleteUser(req, res) {
    try {
        const sessionUser = req.userId
        const { userId } = req.body

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                error: true,
                success: false
            })
        }

        const user = await userModel.findById(sessionUser)

        if (user?.role !== "ADMIN") {
            return res.status(403).json({
                message: "Only admin can delete users",
                error: true,
                success: false
            })
        }

        const deletedUser = await userModel.findByIdAndDelete(userId)

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        res.json({
            data: deletedUser,
            message: "User deleted successfully",
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

module.exports = deleteUser
