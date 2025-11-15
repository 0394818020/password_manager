import { db } from "../config/db.js"

export const session = {
    createSession : (id, refreshToken, execute) => {
        const sql = "INSERT INTO session(userId, refreshToken, time_existed) VALUES (?,?, NOW() + INTERVAL 7 DAY)"

        db.execute(sql, [id, refreshToken], execute);
    },

    updateSession : (userId, refreshToken, execute) => {
        const sql = "UPDATE session SET refreshToken = ?, time_existed = NOW() + INTERVAL 7 DAY WHERE userId = ?";

        db.execute(sql, [refreshToken, userId], execute);
    },

    checkSession : (userId, execute) => {
        const sql = "SELECT 1 FROM session WHERE userId = ?"

        db.execute(sql, [userId], execute);
    }
}