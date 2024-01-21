import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const createProduct = asyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error, 'Product creation failed(createProduct product.controller.js)');
    }
});

const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProducts = await Product.findById(id);
        res.json(findProducts);
    } catch (error) {
        throw new Error(error, 'Product retrieving failed(getProduct product.controller.js)');
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const findProducts = await Product.find();
        res.json(findProducts);
    } catch (error) {
        throw new Error(error, 'Product retrieving failed(getAllProducts product.controller.js)');
    }
});

export { createProduct, getProduct, getAllProducts };