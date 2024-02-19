import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                //required: true,
            },
            color: {
                type: String,
                //required: true,
            },
        },
    ],
    paymentIntent: {
        amount: {
            type: Number,
            required: true,
        },
    },
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
    orderStatus:{
        type: String,
        enum: [
        "Not Processed",
        "Cash on Delivery",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delivered",],
        default: "Not Processed",
    },

    // orderAmount: {
    //     type: Number,
    //     required: true,
    // },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },
    // contactInfo: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Contact",
    // },
    //transactionId: {},
}, { timestamps: true}
);

const Order = mongoose.model("Order", orderSchema);
export default Order;