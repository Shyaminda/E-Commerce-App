import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import authRouter from './routes/authRouter.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO)
.then(() => console.log('Connected to Database successfully'))
.catch((err) => console.log(err));


app.use("/api/user",authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});