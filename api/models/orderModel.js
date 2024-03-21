import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    shippingInfo: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zipCode: {
            type: Number,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        other: {
            type: String,
        },
    },
    paymentInfo: {
        payHereOrderId: {
            type: String,
            required: true,
        },
        payHerePaymentId: {
            type: String,
            required: true,
        },
    },
    orderItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Color",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    }],
    paidAt: {
        type: Date,
        default: Date.now(),
    },
    month: {
        type: String,
        default: new Date().getMonth(),
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    totalPriceAfterDiscount: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        default: "Ordered",
    },
}, { timestamps: true}
);

const Order = mongoose.model("Order", orderSchema);
export default Order;



/* orderBy: {
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
    //transactionId: {}, */
    //this is what the order model was before