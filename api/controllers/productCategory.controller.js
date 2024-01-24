import asyncHandler from 'express-async-handler';
import Category from '../models/productCategoryModel.js';
import validateMongoDbId  from '../utils/validateMdbId.js';

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json({newCategory});
    } catch (error) {
        throw new Error(error,"Error creating category (category.controller.js createCategory)");
    }
});

const updateCategory = asyncHandler(async (req, res) => {   //http://localhost:3000/api/product-category/65b0ce6066e865119874fe80 in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
        });
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error,"Error updating category (category.controller.js updateCategory)");
    }
});

const deleteCategory = asyncHandler(async (req, res) => {      //http://localhost:3000/api/product-category/65b0ce6066e865119874fe80 in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getCategory = await Category.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getallCategory = asyncHandler(async (req, res) => {
    try {
        const getallCategory = await Category.find();
        res.json(getallCategory);
    } catch (error) {
        throw new Error(error);
    }
});

export {createCategory,updateCategory,deleteCategory,getCategory,getallCategory};