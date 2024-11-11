import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/companies";

// Fetch all companies
export const fetchCompanies = createAsyncThunk('companies/fetchCompanies', async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
});

// Add new company
export const addCompany = createAsyncThunk('companies/addCompany', async (newCompany) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/`, newCompany, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data.company;
});

// Delete a company
export const deleteCompany = createAsyncThunk('companies/deleteCompany', async (companyId) => {
    const authToken = localStorage.getItem('token');
    await axios.delete(`${API_URL}/company/${companyId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return companyId;
});

// Update a company
export const updateCompany = createAsyncThunk('companies/updateCompany', async (updatedCompany) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/`, {
        id: updatedCompany.id,
        company_name: updatedCompany.company_name
    }, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
});


const companySlice = createSlice({
    name: 'companies',
    initialState: {
        companies: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.companies = action.payload;
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addCompany.fulfilled, (state, action) => {
                state.companies.push(action.payload);
            })
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.companies = state.companies.filter((company) => company.id !== action.payload);
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                const index = state.companies.findIndex((com) => com.id === action.payload.id);
                if (index !== -1) {
                    state.companies[index].company_name = action.payload.company_name;
                }
            });
    },
});

export default companySlice.reducer;