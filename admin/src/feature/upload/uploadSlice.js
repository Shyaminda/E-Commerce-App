import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk("upload/images",async (data,thunkAPI) => {
    try {
        const formData = new FormData();
        for(let i = 0; i < data.length; i++) {   // loop through the files and append them to the formData
            formData.append("images", data[i]);
        }
        return await uploadService.uploadImages(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const deleteImg = createAsyncThunk("delete/images",async (id,thunkAPI) => {
    try {
        return await uploadService.deleteImages(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

const initialState = {
    images: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const uploadSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(uploadImg.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(uploadImg.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.images = action.payload;        //"images" is same as the "images" in the initialState name
        })
        .addCase(uploadImg.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteImg.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteImg.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.images = [];        //"images" is same as the "images" in the initialState name
        })
        .addCase(deleteImg.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        });
    },
});
export default uploadSlice.reducer;