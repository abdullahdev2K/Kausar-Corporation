import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/suppliers";

// Fetch all suppliers
export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {
    const response = await axios.get(`${API_URL}/supplier`);
    return response.data;
});

// Add new supplier
export const addSupplier = createAsyncThunk('suppliers/addSupplier', async (newSupplier) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/supplier`, newSupplier, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data.supplier;
});

// Delete a supplier
export const deleteSupplier = createAsyncThunk('suppliers/deleteSupplier', async (supplierId) => {
    const authToken = localStorage.getItem('token');
    await axios.delete(`${API_URL}/supplier/${supplierId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return supplierId;
});

// Update a supplier
export const updateSupplier = createAsyncThunk('suppliers/updateSupplier', async (updatedSupplier) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.put(
        `${API_URL}/supplier`,
        {
            id: updatedSupplier.id,
            supplier_name: updatedSupplier.supplier_name,
            supplier_urduname: updatedSupplier.supplier_urduname,
            primary_contact: updatedSupplier.primary_contact,
            secondary_contact: updatedSupplier.secondary_contact,
            primary_address: updatedSupplier.primary_address,
            secondary_address: updatedSupplier.secondary_address,
            city: updatedSupplier.city,
        },
        {
            headers: { Authorization: `Bearer ${authToken}` },
        }
    );
    return response.data;
});

const supplierSlice = createSlice({
    name: 'suppliers',
    initialState: {
        suppliers: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.suppliers = action.payload;
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addSupplier.fulfilled, (state, action) => {
                state.suppliers.push(action.payload);
            })
            .addCase(deleteSupplier.fulfilled, (state, action) => {
                state.suppliers = state.suppliers.filter((supplier) => supplier.id !== action.payload);
            })
            .addCase(updateSupplier.fulfilled, (state, action) => {
                const index = state.suppliers.findIndex((sup) => sup.id === action.payload.id);
                if (index !== -1) {
                    state.suppliers[index] = { ...state.suppliers[index], ...action.payload }; // Merge the updated data
                }
            });            
    },
});

export default supplierSlice.reducer;