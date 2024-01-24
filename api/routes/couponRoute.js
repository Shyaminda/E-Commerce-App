import express from 'express';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from '../controllers/coupon.controller.js';

const couponRouter = express.Router();

couponRouter.post("/",authMiddleware,isAdmin,createCoupon);
couponRouter.get("/",authMiddleware,isAdmin,getAllCoupons);
couponRouter.put("/:id",authMiddleware,isAdmin,updateCoupon);
couponRouter.delete("/:id",authMiddleware,isAdmin,deleteCoupon);
couponRouter.get("/:id",authMiddleware,isAdmin,getCoupon);

export default couponRouter;