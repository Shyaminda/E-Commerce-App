import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

dotenv.config({ path: "./Config/.env" });
const app = express();
app.use(express.json()); //allow json inputs to the server
app.use(cookieParser()); //allow cookie inputs to the server
app.use(fileUpload({useTempFiles: true})); //allow file inputs to the server

if (process.env.NODE_ENV !== "production") {
    process.on("unhandledRejection", (error) => {
      console.log("UNHANDLED REJECTION! 💥 Shutting down...");
      console.log(`Error: ${error.message}`);
      // You might want to perform additional actions here for unhandled rejections in non-production environments
    });
}

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});

export default app;