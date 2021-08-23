import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//Instantiate the app
const app = express();
dotenv.config();

//Global Middleware Setup
app.use(cors());
app.use(express.json())

const port = process.env.PORT || 9001;

app.listen((req, res) => {
  console.log(`Server listening on port ${port}`);
})