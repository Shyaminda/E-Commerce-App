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
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Category",
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        //required: true,
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
        comment: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }],
    totalRatings:{
        type: Number,
        default: 0,
    },
    color: [],
    tags: String,
    images: [{
        public_id: String,
        url: String,
    }],
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
