import mongoose from "mongoose";
import bcrypt from "bcrypt"; 

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
}, {timestamps:true});

userSchema.pre("save",async function(next){
    const salt=await bcrypt.genSaltSync(10);
    this.password=await bcrypt.hash(this.password,salt);
});

userSchema.methods.matchPassword=async function(password){    //this method is used to compare the password entered by the user with the hashed password stored in the database.
    return await bcrypt.compare(password,this.password);
};

const User=mongoose.model('User',userSchema);   
export default User;