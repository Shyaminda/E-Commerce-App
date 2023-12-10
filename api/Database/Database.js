import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectionDb =() =>{
    mongoose.connect(process.env.MONGO)
    .then(()=>console.log('DataBase is Connected successfully'))
    .catch(err=>console.log(err));
}

export default connectionDb;