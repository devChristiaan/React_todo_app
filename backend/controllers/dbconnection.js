import mysql from 'mysql';
import dotenv from "dotenv"

dotenv.config({path: './config.env'});

//DB connections
const dbPool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

export { dbPool }