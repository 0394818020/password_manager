import { otp } from "../model/otp.js"

const verify_OTP = (req, res) => {
    const {email, otp_code} = req.body;

    if (!otp_code) {
        return res.status(400).json({message : "Thiếu otp hoặc email!"});
    }

    otp.verifyOTP(email, otp_code, (err, result) => {
        if (err)
            return res.status(500).json({message : "Lỗi trong quá trình kiểm tra OTP!"});

        if (result.affectedRows === 0) {
            return res.status(400).json({ message : "OTP không hợp lệ hoặc đã hết hạn!"});
        }

        res.status(200).json({message : "Xác thực thành công!"});
    })
}

export default verify_OTP;