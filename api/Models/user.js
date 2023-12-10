import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter your name!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password should be greater than 6 characters"],
      select: false,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  });

    const User = mongoose.model("User", userSchema);
    export default User;