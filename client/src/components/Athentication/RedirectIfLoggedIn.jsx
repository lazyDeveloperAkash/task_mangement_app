import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';


const RedirectIfLoggedIn = ({ children }) => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default RedirectIfLoggedIn;
