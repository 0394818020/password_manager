import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { db } from "./config/db.js"
import authRouters from "./routes/authRoutes.js"

dotenv.config({path: ".env"});

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/auth",authRouters);

db.connect((err) => {
    if (err) {
        console.log("Lỗi database: ", err);
        process.exit(1);
    }

    console.log("Kết nối database thành công!");

    app.listen(PORT, () => {
        console.log(`Server đang chạy ở ${PORT}`);
    })
})

