import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    color: {
        type: String,
        enum: ["Apple", "Samsung", "Acer", "Razer",],
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
    rating: [{
        star: Number,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }],
    color: {
        type: String,
        enum: ["white", "black", "blue", "red", "green", "yellow", "grey", "orange", "purple", "pink", "brown", "silver", "gold", "multi-color"],
    },
    image: {
        type: Array,
    },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
