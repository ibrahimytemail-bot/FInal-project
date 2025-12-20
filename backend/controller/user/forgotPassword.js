const userModel = require("../../models/userModel");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
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

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        user.otp = otp;
        user.otpExpire = otpExpire;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otp}. It is valid for 15 minutes.`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            message: "OTP sent to your email",
            success: true,
            error: false
        });

    } catch (err) {
        console.log("Forgot Password Error:", err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = forgotPassword;
