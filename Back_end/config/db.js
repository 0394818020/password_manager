import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config({path : ".env"});

export const db = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST
})

