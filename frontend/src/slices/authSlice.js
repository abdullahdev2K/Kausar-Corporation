import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth";

// Async thunk for user signup
export const signupUser = createAsyncThunk('auth/signupUser', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for user login
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        const { token } = response.data;

        // Save token to localStorage
        localStorage.setItem('token', token);

        // Dispatch the fetchUserProfile action to fetch and update the user profile
        const profileResponse = await dispatch(fetchUserProfile()).unwrap(); // Unwrap to catch errors

        return { token, userInfo: profileResponse };
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue('Server error');
        }
    }
});

// Async thunk for user logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
    try {
        await axios.post(`${API_URL}/logout`);
        localStorage.removeItem('token');
        dispatch(resetError());
        dispatch(logout()); // Reset the state
    } catch (error) {
        console.error('Error during logout:', error);
    }
});

// Forgot Password async thunk
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async ({ email }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});

// Reset Password async thunk
export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ resetToken, password }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/reset-password/${resetToken}`, { password });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token || localStorage.getItem('token');

    // Only fetch profile if a token exists
    if (!token) {
        // Gracefully exit without rejecting
        return null; // Change this from rejectWithValue
    }

    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue('Failed to fetch user profile');
        }
    }
});

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async (profileData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token || localStorage.getItem('token');

    // Only fetch profile if a token exists
    if (!token) {
        // Gracefully exit without rejecting
        return null; // Change this from rejectWithValue
    }

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        const formData = new FormData();
        Object.keys(profileData).forEach((key) => {
            formData.append(key, profileData[key]);
        });

        const response = await axios.put(`${API_URL}/profile`, formData, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Initial state
const initialState = {
    userInfo: null,
    loading: false,
    error: null,
    token: localStorage.getItem('token') || null,
    successMessage: null,
};

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        // resetSuccess: (state) => {
        //     state.success = false;  // Add this reducer to reset the success flag
        // },
        logout: (state) => {
            state.token = null;
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup reducers
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Login reducers
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.userInfo = action.payload.userInfo;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch user profile reducers
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout reducers
            .addCase(logoutUser.fulfilled, (state) => {
            state.userInfo = null;
            state.token = null;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Reset password
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { resetError, logout, resetSuccess } = authSlice.actions;
export default authSlice.reducer;