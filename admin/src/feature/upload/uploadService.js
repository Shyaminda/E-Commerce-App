import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";

const uploadImages = async (data) => {
    const response = await axios.post(`${base_url}upload/`, data, config);
    return response.data;
};

const deleteImages = async (id) => {
    const response = await axios.delete(`${base_url}upload/delete-image/${id}`, config);
    return response.data;
};

const uploadService = {
    uploadImages,
    deleteImages,
};

export default uploadService;