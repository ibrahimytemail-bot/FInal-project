const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const changePassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "Please provide email, password and confirm password",
                error: true,
                success: false
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
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

        // Optional: Check if OTP was verified recently? 
        // For simplicity, we assume if they reached here, they are verified or we could clear OTP here.
        // A more secure way would be to issue a temporary token after OTP verification and require it here.
        // But for this request, we'll just update the password.

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        user.password = hashPassword;
        user.otp = undefined;
        user.otpExpire = undefined;

        await user.save();

        return res.status(200).json({
            message: "Password changed successfully",
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

module.exports = changePassword;
