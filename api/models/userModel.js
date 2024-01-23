import mongoose from "mongoose";
import bcrypt from "bcrypt"; 
import crypto from "crypto";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:true,
    },
    lastName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    cart:{
        type:Array,
        default:[],
    },
    address:[{type: mongoose.Schema.Types.ObjectId,ref:"Address"}],
    wishList:[{type: mongoose.Schema.Types.ObjectId,ref:"Product"}],
    refreshToken:{
        type:String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt= bcrypt.genSaltSync(10);
    this.password=await bcrypt.hash(this.password,salt);
});

userSchema.methods.matchPassword=async function(password){    //this method is used to compare the password entered by the user with the hashed password stored in the database.
    return await bcrypt.compare(password,this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = Date.now() + 30 * 60 * 1000;  //10 minutes   //linked to user.controller.js resetPassword function
    return resetToken;
}

const User=mongoose.model('User',userSchema);   
export default User;