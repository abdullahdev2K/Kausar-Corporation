import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/products";

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
});

// Add new product
export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/`, newProduct, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data.product;
});

// Delete a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    const authToken = localStorage.getItem('token');
    await axios.delete(`${API_URL}/product/${productId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return productId;
});

// Update a product
export const updateProduct = createAsyncThunk('products/updateProduct', async (updatedProduct) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/`, {
        id: updatedProduct.id,
        product_name: updatedProduct.product_name,
        // contact_info: updatedProduct.contact_info,
        // address: updatedProduct.address
    }, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
});


const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product.id !== action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((pro) => pro.id === action.payload.id);
                if (index !== -1) {
                    state.products[index].product_name = action.payload.product_name;
                }
            });
    },
});

export default productSlice.reducer;