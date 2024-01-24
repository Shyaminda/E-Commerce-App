import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
},{
    timestamps:true,
});

const brand=mongoose.model('Brand',brandSchema);
export default brand;