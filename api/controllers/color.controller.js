import asyncHandler from 'express-async-handler';
import Color from '../models/colorModel.js';
import validateMongoDbId  from '../utils/validateMdbId.js';

const createColor = asyncHandler(async (req, res) => {
    try {
        const newColor = await Color.create(req.body);
        res.json({newColor});
    } catch (error) {
        throw new Error(error,"Error creating Color (Color.controller.js createColor)");
    }
});

const updateColor = asyncHandler(async (req, res) => {   //http://localhost:3000/api/Color/65b0ce6066e865119874fe80 in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
        new: true,
        });
        res.json(updatedColor);
    } catch (error) {
        throw new Error(error,"Error updating Color (Color.controller.js updateColor)");
    }
});

const deleteColor = asyncHandler(async (req, res) => {      //http://localhost:3000/api/Color/65b0ce6066e865119874fe80 in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedColor = await Color.findByIdAndDelete(id);
        res.json(deletedColor);
    } catch (error) {
        throw new Error(error,"Error deleting Color (Color.controller.js deleteColor");
    }
});

const getColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getColor = await Color.findById(id);
        res.json(getColor);
    } catch (error) {
        throw new Error(error,"Error getting Color (Color.controller.js getColor");
    }
});

const getAllColor = asyncHandler(async (req, res) => {
    try {
        const getallColor = await Color.find();
        res.json(getallColor);
    } catch (error) {
        throw new Error(error,"Error getting all Color (Color.controller.js getallColor");
    }
});

export {createColor,updateColor,deleteColor,getColor,getAllColor};