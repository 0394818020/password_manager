import { users } from "../../model/users.js";
import { otp } from "../../model/otp.js";

const forgot_password = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message : "không bỏ trống email!"});
    }

    users.checkEmail(email, (err, result) => {
        if (err || result.length === 0) {
            return res.status(500).json({ message : "Lỗi khi kiểm tra email!"});
        }

        otp.deleteOTP(email, (err, result) => {
            if (err)
                return res.status(500).json({ message : "Xảy ra lỗi khi xử otp!"});

            otp.createOTP(email, (err, result) => {
                if (err)
                    return res.status(500).json({ message: "Xảy ra lỗi khi xử lí otp!"});

                let otp_code;

                otp.getOTP(email, (err, result) => {
                    if (err)
                        return res.status(500).json({ message : "Lỗi khi xử lí otp!"});
                    
                    if (result.length === 0) 
                        return res.status(500).json({ message : "Lỗi khi xử lí otp!"});

                    otp_code = result[0].otp; 

                    otp.sendOTP(email, otp_code, (sendErr) => {
                        if (sendErr)
                            return res.status(500).json({ message : "Lỗi khi gửi otp!"});

                        console.log("OTP đã gửi : ", otp_code);
                        
                        res.status(201).json({message : "tạo otp và gửi thành công!"});
                    })
                })
            })
        })
    })
}

export default forgot_password;