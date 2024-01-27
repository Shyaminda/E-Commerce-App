import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    mobile:{
        type: String,
        required: true,
    },
    comment:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "Submitted",
        enum: ["Submitted","Replied","In Progress"],
    },
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;