import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import authRouter from './routes/authRouter.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import productRouter from './routes/productRouter.js';
import morgan from 'morgan';
import blogRouter from './routes/blogRouter.js';
import productCategoryRouter from './routes/productCategoryRoute.js';
import blogCategoryRouter from './routes/blogCategoryRouter.js';
import brandRouter from './routes/brandRouter.js';
import couponRouter from './routes/couponRoute.js';
import ColorRouter from './routes/colorRoute.js';
import Inquiry from './models/inquiryModel.js';
import InquiryRouter from './routes/inquiryRoute.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

mongoose.connect(process.env.MONGO)
.then(() => console.log('Connected to Database successfully'))
.catch((err) => console.log(err));


app.use("/api/user",authRouter);
app.use("/api/product",productRouter);
app.use("/api/blog",blogRouter);
app.use("/api/product-category",productCategoryRouter);
app.use("/api/blog-category",blogCategoryRouter);
app.use("/api/brand",brandRouter);
app.use("/api/coupon",couponRouter);
app.use("/api/color",ColorRouter);
app.use("/api/inquiry",InquiryRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});