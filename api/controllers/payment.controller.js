//import razorpay from 'razorpay';

// const instance = new razorpay({
//     key_id: "",
//     key_secret: ""
// });

const checkOut = async (req, res) => {
    const {amount} = req.body;
    const options = {
        amount: amount * 100, // amount in smallest currency unit
        currency: "INR",
    }
    const order = await instance.orders.create(options);
    res.json({
        order,
        success: true,
    });

};

const paymentVerification = async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId } = req.body;
    res.json({
        razorpayOrderId,
        razorpayPaymentId,
    });

};

export { checkOut, paymentVerification };