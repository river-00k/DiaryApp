import React, { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import MyPageHeader from '../components/MyPageHeader';
import { useAuth } from './AuthContext';

const ProtectedRoute = ()=> {
    
    const auth = useAuth()
    
    if(!auth?.user){
        return <Navigate to="/login" />
    }
    return(
        <div>
            <MyPageHeader/>
            <Outlet />
        </div>
    )
}

export default ProtectedRoute