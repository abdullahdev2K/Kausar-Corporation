import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/categories";

// Fetch all categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get(`${API_URL}/category`);
    return response.data;
});

// Add new category
export const addCategory = createAsyncThunk('categories/addCategory', async (newCategory) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/category`, newCategory, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data.category;
});

// Delete a category
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
    const authToken = localStorage.getItem('token');
    await axios.delete(`${API_URL}/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return categoryId;
});

// Update a category
export const updateCategory = createAsyncThunk('categories/updateCategory', async (updatedCategory) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/category`, {
        id: updatedCategory.id,
        category_name: updatedCategory.category_name
    }, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
});


const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter((category) => category.id !== action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index].category_name = action.payload.category_name;
                }
            });
    },
});

export default categorySlice.reducer;