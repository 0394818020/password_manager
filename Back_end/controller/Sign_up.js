import { users } from "../model/users.js";

const sign_up = (req, res) => {
    const {username, password, email} = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({message: "Thiếu thông tin!"});
    }

    //Kiểm tra username đã tồn tại hay chưa
    users.checkUsername(username, (err, result) => {
        if (err)
            return res.status(500).json({message : "Lỗi không thể thực hiện truy vấn!"});
        if (result.length !== 0)
            return res.status(400).json({message : "username đã tồn tại!"});

        users.checkEmail(email, (err, result) => {
            if (err)
                return res.status(500).json({message : "Lỗi không thể thực hiện truy vấn!"});
            if (result.length !== 0)
                return res.status(400).json({message : "email đã tồn tại!"});

            users.createNewUser(username, password, email, (err, result) => {
                if (err)
                    return res.status(500).json({message : "Lỗi khi tạo User mới!"});
                res.status(201).json({message : "Tạo User mới thành công!"});
            })
        })
    })
}

export default sign_up;