import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layouts/Header.jsx';
import Sidebar from './components/layouts/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import ResetPassword from './components/auth/ResetPassword.jsx';
import Profile from './components/auth/Profile.jsx';
import Categories from './components/category/Categories.jsx';
import AddCategory from './components/category/AddCategory.jsx';
import UpdateCategory from './components/category/UpdateCategory.jsx';
import Users from './components/users/Users.jsx';
import AddUser from './components/users/AddUser.jsx';
import UpdateUser from './components/users/UpdateUser.jsx';
import Roles from './components/roles/Roles.jsx';
import AddRole from './components/roles/AddRole.jsx';
import UpdateRole from './components/roles/UpdateRole.jsx';
import Suppliers from './components/suppliers/Suppliers.jsx';
import AddSupplier from './components/suppliers/AddSupplier.jsx';
import UpdateSupplier from './components/suppliers/UpdateSupplier.jsx';
import Customers from './components/customers/Customers.jsx';
import AddCustomer from './components/customers/AddCustomer.jsx';
import UpdateCustomer from './components/customers/UpdateCustomer.jsx';
import Companies from './components/company/Companies.jsx';
import AddCompany from './components/company/AddCompany.jsx';
import UpdateCompany from './components/company/UpdateCompany.jsx';
import Products from './components/products/Products.jsx';
import AddProduct from './components/products/AddProduct.jsx';
import UpdateProduct from './components/products/UpdateProduct.jsx';
import Inventory from './components/inventory/Inventory.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import './App.css';

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    // Open Sidebar
    const openNav = () => {
        const sidebar = document.getElementById("mySidebar");
        const main = document.getElementById("main");

        if (!sidebar || !main) return;

        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (screenWidth <= 575) {
        sidebar.style.width = "100%";
        main.style.marginLeft = "0";
        } else {
        sidebar.style.width = "250px";
        main.style.marginLeft = "250px";
        }
        setIsSidebarOpen(true);
    };

    // Close Sidebar
    const closeNav = () => {
        const sidebar = document.getElementById("mySidebar");
        const main = document.getElementById("main");

        if (!sidebar || !main) return;

        sidebar.style.width = "0";
        main.style.marginLeft = "0";
        setIsSidebarOpen(false);
    };

    // Toggle Sidebar
    const toggleSidebar = () => {
        if (isSidebarOpen) {
        closeNav();
        } else {
        openNav();
        }
    };

    const isLoginPage = location.pathname === '/';
    const isSignUpPage = location.pathname === '/signup';
    const isForgotPasswordPage = location.pathname === '/forgot-password';
    const isResetPasswordPage = location.pathname.startsWith('/reset-password');

    // Adjust layout when navigating between routes
    useEffect(() => {
        if (!isLoginPage && !isSignUpPage && !isForgotPasswordPage && !isResetPasswordPage) {
        openNav();
        } else {
        closeNav();
        }
    }, [location.pathname]); // Adding `location.pathname` dependency

    const siteTitle = "Kausar Corporation";

    return (
        <>
            {!isLoginPage && !isSignUpPage && !isForgotPasswordPage && !isResetPasswordPage && (
                <>
                    <Header toggleSidebar={toggleSidebar} siteTitle={siteTitle} />
                    <Sidebar />
                </>
            )}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/categories" element={<Categories />} />

                <Route 
                    path="/add-category" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AddCategory />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/update-category" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <UpdateCategory />
                        </ProtectedRoute>
                    } 
                />
                
                <Route path="/users" element={<Users />} />

                <Route 
                    path="/add-user" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AddUser />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/update-user/:id" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <UpdateUser />
                        </ProtectedRoute>
                    } 
                />

                <Route path="/roles" element={<Roles />} />
                
                <Route 
                    path="/add-role" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AddRole />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/update-role" 
                    element={
                    <ProtectedRoute requiredRole="admin">
                            <UpdateRole />
                        </ProtectedRoute>
                    } 
                />

                <Route path="/suppliers" element={<Suppliers />} />

                <Route 
                    path="/add-supplier" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AddSupplier />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/update-supplier" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <UpdateSupplier />
                        </ProtectedRoute>
                    } 
                />

                <Route path="/customers" element={<Customers />} />

                <Route 
                    path="/add-customer" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AddCustomer />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/update-customer" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <UpdateCustomer />
                        </ProtectedRoute>
                    } 
                />
                
                <Route path="/companies" element={<Companies />} />

                <Route 
                    path="/add-company" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AddCompany />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                        path="/update-company" 
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <UpdateCompany />
                            </ProtectedRoute>
                        } 
                    />

                <Route path="/products" element={<Products />} />

                <Route 
                    path="/add-product" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AddProduct />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/update-product/:id" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <UpdateProduct />
                        </ProtectedRoute>
                    } 
                />

                <Route path="/inventory" element={<Inventory />} />
            
            </Routes>
        </>
    );
};

export default App;