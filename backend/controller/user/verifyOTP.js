const userModel = require("../../models/userModel");

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Please provide email and OTP",
                error: true,
                success: false
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            });
        }

        if (user.otpExpire < Date.now()) {
            return res.status(400).json({
                message: "OTP expired",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            message: "OTP verified successfully",
            success: true,
            error: false
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = verifyOTP;
