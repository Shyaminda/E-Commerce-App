import asyncHandler from 'express-async-handler';
import brand from '../models/brandModel.js';
import validateMongoDbId  from '../utils/validateMdbId.js';

const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await brand.create(req.body);
        res.json({newBrand});
    } catch (error) {
        throw new Error(error,"Error creating Brand (brand.controller.js createBrand)");
    }
});

const updateBrand = asyncHandler(async (req, res) => {   //http://localhost:3000/api/Brand/65b0ce6066e865119874fe80 in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedBrand = await brand.findByIdAndUpdate(id, req.body, {
        new: true,
        });
        res.json(updatedBrand);
    } catch (error) {
        throw new Error(error,"Error updating Brand (brand.controller.js updateBrand)");
    }
});

const deleteBrand = asyncHandler(async (req, res) => {      //http://localhost:3000/api/Brand/65b0ce6066e865119874fe80 in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedBrand = await brand.findByIdAndDelete(id);
        res.json(deletedBrand);
    } catch (error) {
        throw new Error(error,"Error deleting Brand (brand.controller.js deleteBrand");
    }
});

const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getBrand = await brand.findById(id);
        res.json(getBrand);
    } catch (error) {
        throw new Error(error,"Error getting Brand (brand.controller.js getBrand");
    }
});

const getAllBrand = asyncHandler(async (req, res) => {
    try {
        const getallBrand = await brand.find();
        res.json(getallBrand);
    } catch (error) {
        throw new Error(error,"Error getting all Brand (brand.controller.js getallBrand");
    }
});

export {createBrand,updateBrand,deleteBrand,getBrand,getAllBrand};