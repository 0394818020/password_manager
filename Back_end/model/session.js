import { db } from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"

export const session = {
    createSession : (id, refreshToken, execute) => {
        const sql = "INSERT INTO session(userId, refreshToken, time_existed) VALUES (?,?, NOW() + INTERVAL 7 DAY)"

        db.execute(sql, [id, refreshToken], execute);
    },

    comparePassword : async (password, db_password) => {

        return await bcrypt.compare(password, db_password)
    },

    createJWT : (userId) => {
        return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_TIME });
    },

    createRefreshToken : () => {
        return crypto.randomBytes(64).toString('hex');
    }
}