import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
},{
    timestamps:true,
});

const productCategory=mongoose.model('Category',productCategorySchema);
export default productCategory;