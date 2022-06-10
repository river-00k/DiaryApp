import React, { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ():ReactElement => {
    
    const auth = useAuth()
    
    if(!auth?.user){
        return <Navigate to="/login" />
    }
    return(
        <Outlet />
    )
}

export default ProtectedRoute