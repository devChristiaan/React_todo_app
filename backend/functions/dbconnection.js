import mysql from 'mysql';
import dotenv  from "dotenv"

dotenv.config()

//DB connections
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

db.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err);
  } else {
    console.log("MySQL database is connected")
  }})

export { db }