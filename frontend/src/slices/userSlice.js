import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;  // This should contain all users
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for adding a user
export const addUser = createAsyncThunk('users/addUser', async (userData, { rejectWithValue }) => {
    const authToken = localStorage.getItem('token');
    try {
        const response = await axios.post(`${API_URL}/add-user`, userData, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        return response.data; // Assuming response contains the new user data
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id, { rejectWithValue }) => {
    const authToken = localStorage.getItem('token');
    try {
        await axios.delete(`${API_URL}/delete-user/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        return id; // Return the ID of deleted user
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for updating a user
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }, { rejectWithValue }) => {
    const authToken = localStorage.getItem('token');
    try {
        const response = await axios.put(`${API_URL}/update-user/${id}`, userData, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});


// Initial state
const initialState = {
    users: [],
    loading: false,
    error: null,
};

// User slice
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            })            
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload; // Update user in the state
                }
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload); // Add the new user to the state
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;