import dotenv from "dotenv";
import app from "./app.js";
import connectionDb from "./Database/Database.js";

if (process.env.NODE_ENV !== "production") {
    process.on("unhandledRejection", (error) => {
      console.log("UNHANDLED REJECTION! 💥 Shutting down...");
      console.log(`Error: ${error.message}`);
      // You might want to perform additional actions here for unhandled rejections in non-production environments
    });
}

// Database connection
dotenv.config({ path: "api/Config/.env" });
connectionDb();
//the error MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.
//is solve by making the path of dotenv file to be absolute path which means by adding api/Config/.env not the relative path .env which is ./Config/.env

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
  });

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`shutting down the server for unhandle promise rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });

app.listen(3001,()=>{
    console.log('Server is running 0n port 3001');
});

