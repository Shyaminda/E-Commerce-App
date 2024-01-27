import express from 'express';
import { createColor, deleteColor, getColor, getAllColor, updateColor } from "../controllers/color.controller.js";
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const ColorRouter = express.Router();

ColorRouter.post("/",authMiddleware,isAdmin,createColor);
ColorRouter.put("/:id",authMiddleware,isAdmin,updateColor);
ColorRouter.delete("/:id",authMiddleware,isAdmin,deleteColor);
ColorRouter.get("/:id",getColor);
ColorRouter.get("/",getAllColor);

export default ColorRouter;


//the colorModel,ColorRouter,colorController all are copies of brand 