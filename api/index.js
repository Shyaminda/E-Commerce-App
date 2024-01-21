import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import authRouter from './routes/authRouter.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import productRouter from './routes/productRouter.js';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

mongoose.connect(process.env.MONGO)
.then(() => console.log('Connected to Database successfully'))
.catch((err) => console.log(err));


app.use("/api/user",authRouter);
app.use("/api/product",productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});