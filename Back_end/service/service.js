import jwt from "jsonwebtoken"
import crypto from "crypto"
import bcrypt from "bcrypt"

export const service = {
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
