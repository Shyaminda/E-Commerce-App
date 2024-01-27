import asyncHandler from 'express-async-handler';
import Inquiry from '../models/inquiryModel.js';
import validateMongoDbId  from '../utils/validateMdbId.js';

const createInquiry = asyncHandler(async (req, res) => {
    try {
        const newInquiry = await Inquiry.create(req.body);
        res.json({newInquiry});
    } catch (error) {
        throw new Error(error,"Error creating Inquiry (Inquiry.controller.js createInquiry)");
    }
});

const updateInquiry = asyncHandler(async (req, res) => {   
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedInquiry = await Inquiry.findByIdAndUpdate(id, req.body, {
        new: true,
        });
        res.json(updatedInquiry);
    } catch (error) {
        throw new Error(error,"Error updating Inquiry (Inquiry.controller.js updateInquiry)");
    }
});

const deleteInquiry = asyncHandler(async (req, res) => {      //http://localhost:3000/api/Inquiry/65b0ce6066e865119874fe80 in postman
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedInquiry = await Inquiry.findByIdAndDelete(id);
        res.json(deletedInquiry);
    } catch (error) {
        throw new Error(error,"Error deleting Inquiry (Inquiry.controller.js deleteInquiry");
    }
});

const getInquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getInquiry = await Inquiry.findById(id);
        res.json(getInquiry);
    } catch (error) {
        throw new Error(error,"Error getting Inquiry (Inquiry.controller.js getInquiry");
    }
});

const getAllInquiry = asyncHandler(async (req, res) => {
    try {
        const getallInquiry = await Inquiry.find();
        res.json(getallInquiry);
    } catch (error) {
        throw new Error(error,"Error getting all Inquiry (Inquiry.controller.js getallInquiry");
    }
});

export {createInquiry,updateInquiry,deleteInquiry,getInquiry,getAllInquiry};


//the inquiryModel,inquiryRouter,inquiryController all are copies of brand 