import express, { Request, Response } from 'express';
import apiRouter from './routes/apiRoute';
import cors from 'cors';

const app = express();


require('dotenv').config();

app.use(cors({
    origin: process.env.URL_ORIGIN
}))

app.use(express.json());
app.use('/api', apiRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});