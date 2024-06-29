import express, { Request, Response } from 'express';
import apiRouter from './routes/apiRoute';

const app = express();


require('dotenv').config();

app.use(express.json());
app.use('/api', apiRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});