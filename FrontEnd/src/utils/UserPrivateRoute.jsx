import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const UserPrivateRoute = () => {

    let { user } = useContext(AuthContext);

    if (!user || user.role !== 'ADMIN' && user.role !== 'User') {
        return <Navigate to='/' />;
    }

    return <Outlet />;
}
    
  
export default UserPrivateRoute;