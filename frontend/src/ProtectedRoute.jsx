import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiredRole }) => {
    const userRole = useSelector((state) => state.auth.userInfo?.role)?.toLowerCase();

    if (requiredRole && userRole !== requiredRole.toLowerCase()) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;