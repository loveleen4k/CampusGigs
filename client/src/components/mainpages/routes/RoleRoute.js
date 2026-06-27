import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import { EMPLOYER, getEffectiveRole } from '../../../constants/userRoles.js';
import RoleAccessDenied from './RoleAccessDenied.js';

const RoleRoute = ({ allowedRoles, children }) => {
    const { userApi } = useContext(GlobalState);
    const user = userApi.user[0];
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!user.email) {
        return <p className="empty-text text-center mt-4">Loading...</p>;
    }

    if (!allowedRoles.includes(getEffectiveRole(user.role))) {
        const action = allowedRoles.includes(EMPLOYER) ? 'hire' : 'apply';
        return <RoleAccessDenied action={action} />;
    }

    return children;
};

export default RoleRoute;
