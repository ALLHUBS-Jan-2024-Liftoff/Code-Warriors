import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminPrivateRoute = () => {

    let { user } = useContext(AuthContext);

    if (!user || user.role !== 'ADMIN') {
        return <Navigate to='/admin_auth' />;
    }

    return <Outlet />;
}
    
  
export default AdminPrivateRoute;