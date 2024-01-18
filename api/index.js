import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";

const app = express();

mongoose.connect(process.env.MONGO)
.then(() => console.log('Connected to Database successfully'))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});