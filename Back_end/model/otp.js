import { db } from "../config/db.js"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config({ path: ".env" });

export const otp = {
    verifyOTP : (otp, email, execute) => {
        const sql = "SELECT 1 FROM otp WHERE otp = ? AND email = ?";

        db.execute(sql, [otp, email], execute);
    },

    deleteOTP : (email, execute) => {
        const sql = "DELETE FROM otp WHERE email = ?";

        db.execute(sql, [email], execute);
    },

    createOTP : (email, execute) => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const sql = "INSERT INTO otp(email, otp, time_existed) VALUES (?,?, NOW() + INTERVAL 3 MINUTE)";

        db.execute(sql, [email, otp], execute);
    },

    getOTP : (email, execute) => {
        const sql = "SELECT otp FROM otp WHERE email = ?";

        db.execute(sql, [email], execute);
    },

    sendOTP: (email, otp, execute) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASS
            }
        });

        console.log(process.env.EMAIL);

        const mailOptions = {
            from : "password-manager web",
            to : email,
            subject: 'otp code',
            text: otp
        }

        transporter.sendMail(mailOptions, execute);
    }
}