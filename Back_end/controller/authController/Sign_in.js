import { users } from "../../model/users.js"
import { service } from "../../service/service.js"
import { session } from "../../model/session.js"

const sign_in = (req, res) => {
    const { username , password } = req.body;

    if (!username || !password) {
        return res.status(401).json({ message : "Vui lòng điền đầy đủ thông tin!"})
    }

    users.getUserbyUsername(username, async (err, result) => {
        if (err || result.length === 0) {
            return res.status(401).json({ message : "Sai tên tài khoản hoặc mật khẩu!"});
        }

        const user = result[0];

        const password_successful = await service.comparePassword(password, user.password);

        if (!password_successful) {
            return res.status(401).json({ message : "Sai tên tài khoản hoặc mật khẩu!"});
        }

        const accessToken = service.createJWT({userId : user.id});

        session.checkSession(user.id, (err, result) => {
            if (err) {
                return res.status(500).json({ message : "Lỗi trong quá trình xác thực!"});
            }

            const refreshToken = service.createRefreshToken();

            if (result.length === 0) {
                session.createSession(user.id, refreshToken, (err, result) => {
                if (err) 
                    return res.status(500).json({ message : "Lỗi trong quá trình xác thực!"});

                sendResponse(res, refreshToken, accessToken, user.username);
                })
            }
            else if (result.length !== 0) {
                session.updateSession(user.id, refreshToken, (err, result) => {
                if (err) 
                    return res.status(500).json({ message : "Lỗi trong quá trình xác thực!"});

                sendResponse(res, refreshToken, accessToken, user.username);
                })
            }
        })
    })
}

function sendResponse (res, refreshToken, accessToken, username) {
    res.cookie("refreshToken", refreshToken ,{
        httpOnly : true,
        maxAge : process.env.REFRESH_TOKEN_TIME
    })

    res.status(200).json({ message : `${username} đăng nhập thành công!`, accessToken})
}

export default sign_in;