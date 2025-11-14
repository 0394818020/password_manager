import { users } from "../../model/users.js"
import { session } from "../../model/session.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import crypto from "crypto"

dotenv.config({ path : ".env"});

const sign_in = (req, res) => {
    const { username, password } = req.body;  

    if (!username || !password) {
        return res.status(401).json({ message : "Vui lòng điền đầy đủ thông tin!"});
    }

    users.getUserbyUsername(username, async (err, result) => {
        if (err) {
            return res.status(401).json({ message : "Sai tên tài khoản hoặc mật khẩu!"});
        }

        if (result.length === 0) {
            return res.status(401).json({ message : "Sai tên tài khoản hoặc mật khẩu!"});
        }

        const user = result[0];

        const password_succesfull = await session.comparePassword(password, user.password);

        if (!password_succesfull) {
            return res.status(401).json({ message : "Sai tên tài khoản hoặc mật khẩu"});
        }

        const accessToken = session.createJWT({ userId: user.id });

        const refreshToken = session.createRefreshToken();

        session.createSession(user.id, refreshToken, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message : "Lỗi khi xử lí đăng nhập!"})
                
            }

            res.cookie('refreshToken', refreshToken, {
                httpOnly : true,
                secure : false,
                sameSite : 'none',
                maxAge : process.env.REFRESH_TOKEN_TIME
            })

            res.status(200).json({ message : `${user.username} đăng nhập thành công!`, accessToken});
        })
    })
}

export default sign_in;