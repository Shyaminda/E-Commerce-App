import asyncHandler from 'express-async-handler';
import blogCategory from '../models/blogCategoryModel.js';
import validateMongoDbId  from '../utils/validateMdbId.js';

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await blogCategory.create(req.body);
        res.json({newCategory});
    } catch (error) {
        throw new Error(error,"Error creating category (blogCategory.controller.js createCategory)");
    }
});

const updateCategory = asyncHandler(async (req, res) => {   //http://localhost:3000/api/product-category/65b0ce6066e865119874fe80 in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedCategory = await blogCategory.findByIdAndUpdate(id, req.body, {
        new: true,
        });
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error,"Error updating category (blogCategory.controller.js updateCategory)");
    }
});

const deleteCategory = asyncHandler(async (req, res) => {      //http://localhost:3000/api/product-category/65b0ce6066e865119874fe80 in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await blogCategory.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error,"Error deleting category (blogCategory.controller.js deleteCategory");
    }
});

const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getCategory = await blogCategory.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error,"Error getting category (blogCategory.controller.js getCategory");
    }
});

const getallCategory = asyncHandler(async (req, res) => {
    try {
        const getallCategory = await blogCategory.find();
        res.json(getallCategory);
    } catch (error) {
        throw new Error(error,"Error getting all category (blogCategory.controller.js getallCategory");
    }
});

export {createCategory,updateCategory,deleteCategory,getCategory,getallCategory};