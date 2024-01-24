import express from 'express';
import { createBrand, deleteBrand, getBrand, getAllBrand, updateBrand } from '../controllers/brand.controller.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const brandRouter = express.Router();

brandRouter.post("/",authMiddleware,isAdmin,createBrand);
brandRouter.put("/:id",authMiddleware,isAdmin,updateBrand);
brandRouter.delete("/:id",authMiddleware,isAdmin,deleteBrand);
brandRouter.get("/:id",getBrand);
brandRouter.get("/",getAllBrand);

export default brandRouter;