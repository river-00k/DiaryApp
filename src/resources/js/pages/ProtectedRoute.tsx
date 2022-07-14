import React, { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import MyPageHeader from '../components/MyPageHeader';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ()=> {
    
    const auth = useAuth()
    
    if(!auth?.user){
        return <Navigate to="/login" />
    }
    return(
        <>
            <MyPageHeader/>
            <Outlet />
        </>
    )
}

export default ProtectedRoute