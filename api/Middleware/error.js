// import express from "express";
// //import ErrorHandler from "../Utils/ErrorHandler.js";

// const app = express();

// app.use((err,req,res,next)=>{
//     const statusCode=err.statusCode || 500;
//     const message=err.message || "Internal Server Error";

// // wrong mongodb id error
// if (err.name === "CastError") {
//     const message = `Resources not found with this id.. Invalid ${err.path}`;
//     err = new ErrorHandler(message, 400);
//   }

// // Duplicate key error
// if (err.code === 11000) {
//     const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
//     err = new ErrorHandler(message, 400);
//   }

// // wrong jwt error
// if (err.name === "JsonWebTokenError") {
//     const message = `Your url is invalid please try again letter`;
//     err = new ErrorHandler(message, 400);
//   }

// // jwt expired
// if (err.name === "TokenExpiredError") {
//     const message = `Your Url is expired please try again letter!`;
//     err = new ErrorHandler(message, 400);
//   }

//     return res.status(statusCode).json({
//         success:false,
//         statusCode,
//         message
//     });

// });
