import asyncHandler from 'express-async-handler';
import Coupon from '../models/couponModel.js';
import validateMongoDbId from '../utils/validateMdbId.js';

const createCoupon = asyncHandler(async (req, res) => {      //http://localhost:3000/api/coupon/  in postman
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        throw new Error(error, "Error creating coupon(coupon.controller.js createCoupon)");
    }
});

const getAllCoupons = asyncHandler(async (req, res) => {   //http://localhost:3000/api/coupon/  in postman
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        throw new Error(error);
    }
});

const updateCoupon = asyncHandler(async (req, res) => {   //http://localhost:3000/api/coupon/60b9b6b9e9b9b71f0c9b8b1f  in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
        new: true,
        });
        res.json(updateCoupon);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteCoupon = asyncHandler(async (req, res) => {    //http://localhost:3000/api/coupon/60b9b6b9e9b9b71f0c9b8b1f  in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupon);
    } catch (error) {
        throw new Error(error);
    }
});

const getCoupon = asyncHandler(async (req, res) => {  //http://localhost:3000/api/coupon/65b12e96d97dd323157b8ed0  in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getCoupon = await Coupon.findById(id);
        res.json(getCoupon);
    } catch (error) {
        throw new Error(error);
    }
});


export { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, getCoupon};