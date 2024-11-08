import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/customers";

// Fetch all customers
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
    const response = await axios.get(`${API_URL}/customer`);
    return response.data;
});

// Add new customer
export const addCustomer = createAsyncThunk('customers/addCustomer', async (newCustomer) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/customer`, newCustomer, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data.customer;
});

// Delete a customer
export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (customerId) => {
    const authToken = localStorage.getItem('token');
    await axios.delete(`${API_URL}/customer/${customerId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return customerId;
});

// Update a customer
export const updateCustomer = createAsyncThunk('customers/updateCustomer', async (updatedCustomer) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/customer`, {
        id: updatedCustomer.id,
        customer_name: updatedCustomer.customer_name,
        contact_info: updatedCustomer.contact_info,
        address: updatedCustomer.address
    }, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
});


const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload);
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter((customer) => customer.id !== action.payload);
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.customers.findIndex((cus) => cus.id === action.payload.id);
                if (index !== -1) {
                    state.customers[index].customer_name = action.payload.customer_name;
                }
            });
    },
});

export default customerSlice.reducer;