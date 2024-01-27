import express from 'express';
import { createInquiry, deleteInquiry, getInquiry, getAllInquiry, updateInquiry } from '../controllers/inquiry.controller.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const InquiryRouter = express.Router();

InquiryRouter.post("/",createInquiry);
InquiryRouter.put("/:id",authMiddleware,isAdmin,updateInquiry);
InquiryRouter.delete("/:id",authMiddleware,isAdmin,deleteInquiry);
InquiryRouter.get("/:id",getInquiry);
InquiryRouter.get("/",getAllInquiry);

export default InquiryRouter;