import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    color:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color"
    },


    // orderBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     //required: true,
    // },
    // products: [
    //     {
    //         product: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "Product",
    //         },
    //         quantity: {
    //             type: Number,
    //             //required: true,
    //         },
    //         color: {
    //             type: String,
    //             //required: true,
    //         },
    //         price: {
    //             type: Number,
    //             //required: true,
    //         },
    //     },
    // ],
    // cartTotal: Number,
    // totalAfterDiscount: Number,
    // paymentStatus: {
    //     type: String,
    //     enum: ["pending", "completed", "cancelled", "refund"],
    //     default: "pending",
    // },
    // paymentType: {
    //     type: String,
    //     enum: ["cod", "card"],
    //     default: "cod",
    // },
    //transactionId: {},
}, { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;