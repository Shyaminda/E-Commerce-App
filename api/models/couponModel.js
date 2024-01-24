import mongoose from 'mongoose';

const couponSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    // isActive: {
    //     type: Boolean,
    //     default: true
    // }
}, {
    timestamps: true
});

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;