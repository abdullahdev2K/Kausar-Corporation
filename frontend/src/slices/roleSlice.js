import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/roles";

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
});

export const addRole = createAsyncThunk('roles/addRole', async (role) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/`, role, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data.role;
});

export const updateRole = createAsyncThunk('roles/updateRole', async ({ id, role_name }) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, { role_name }, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (id) => {
    const authToken = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
    });
    return id;
});

const roleSlice = createSlice({
    name: 'roles',
    initialState: { roles: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.roles = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addRole.fulfilled, (state, action) => {
                state.roles.push(action.payload);
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                const index = state.roles.findIndex((role) => role.id === action.payload.id);
                if (index !== -1) {
                    state.roles[index] = action.payload;
                }
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.roles = state.roles.filter((role) => role.id !== action.payload);
            });
    },
});

export default roleSlice.reducer;