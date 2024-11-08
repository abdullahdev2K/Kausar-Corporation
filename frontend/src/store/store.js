import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice.js';
import userSlice from '../slices/userSlice.js';
import categorySlice from '../slices/categorySlice.js';
import roleSlice from '../slices/roleSlice.js';
import supplierSlice from '../slices/supplierSlice.js';
import customerSlice from '../slices/customerSlice.js';

const store = configureStore({
    reducer: {
        auth: authSlice,
        users: userSlice,
        categories: categorySlice,
        roles: roleSlice,
        suppliers: supplierSlice,
        customers: customerSlice,
    },
    devTools: true,
});

export default store;