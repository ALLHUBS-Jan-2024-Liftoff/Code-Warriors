import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminPrivateRoute = () => {

    let { user } = useContext(AuthContext);

    return !user? <Navigate to='/admin_sign_in'/> : <Outlet />
}
    
  
export default AdminPrivateRoute;