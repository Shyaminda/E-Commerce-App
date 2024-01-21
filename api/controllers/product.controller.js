import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import slugify from 'slugify';

const createProduct = asyncHandler(async (req, res) => {
    try {
        if(req.body.title){       // if title is provided, slugify it
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error, 'Product creation failed(createProduct product.controller.js)');
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if(req.body.title){       // if title is provided, slugify it
            req.body.slug = slugify(req.body.title);
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        throw new Error(error, 'Product updating failed(updateProduct product.controller.js)');
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id, req.body, { new: true });
        res.json(deletedProduct);
    } catch (error) {
        throw new Error(error, 'Product updating failed(updateProduct product.controller.js)');
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

export { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct };