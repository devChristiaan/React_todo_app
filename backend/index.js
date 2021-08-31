import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//Import Routes
import router from './routes/router.js';

//Instantiate the app
const app = express();
dotenv.config({path: './config.env'});

//Global Middleware Setup
app.use(cors());
app.use(express.json())

//Routes
app.use('/api/v1/router', router)

const port = process.env.PORT || 9001;

app.listen(port, (req, res) => {
  console.log(`Server listening on http://localhost:${port}`);
})