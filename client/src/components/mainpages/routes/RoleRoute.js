import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import { getEffectiveRole } from '../../../constants/userRoles.js';

const RoleRoute = ({ allowedRoles, children }) => {
    const { userApi } = useContext(GlobalState);
    const user = userApi.user[0];
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!user.email) {
        return <div>Loading...</div>;
    }

    if (!allowedRoles.includes(getEffectiveRole(user.role))) {
        return <Navigate to="/Profile" replace />;
    }

    return children;
};

export default RoleRoute;
