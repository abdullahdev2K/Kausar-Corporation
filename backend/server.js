import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import { connectToDatabase } from './config/dbConfig.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import companyRoutes from './routes/companyRoutes.js';

// server initialization
const app = express();
const port = 8080;

// Allow incoming data
app.use(express.json());

// Morgan function
app.use(morgan("dev"));

app.use(cors({
    origin: 'http://localhost:5173', // Ensure this is the correct origin of your frontend
    credentials: true
}));

// Connect to DB
connectToDatabase();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/companies', companyRoutes);

// Serve static files from the "uploads" folder
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});