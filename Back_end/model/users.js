import { db } from "../config/db.js";
import bcrypt from "bcrypt";

export const users = {
    getUserbyUsername : (username, execute) => {
        const sql = "SELECT * FROM users WHERE username = ?";
        db.execute(sql, [username], execute);
    },

    checkUsername: (username, execute) => {
        const sql = "SELECT 1 FROM users WHERE username = ?";
        db.execute(sql, [username], execute);
    },

    checkEmail : (email, execute) => {
        const sql = "SELECT 1 FROM users WHERE email = ?";
        db.execute(sql, [email], execute);
    },
    
    createNewUser : async (username, password, email, execute) => {
        const salt = 10;
        const hashpassword = await bcrypt.hash(password, salt);

        const sql = "INSERT INTO users(username, password, email) VALUES (?,?,?)"
        db.execute(sql, [username, hashpassword, email], execute);
    },

    updatePassword : async (username, newPassword, execute) => {
        const salt = 10;
        const hashpassword = await bcrypt.hash(newPassword, salt);

        const sql = "UPDATE users SET password = ? WHERE username = ?";
        db.execute(sql, [hashpassword, username], execute);
    }
}