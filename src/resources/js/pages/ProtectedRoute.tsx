import React, { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import MyPageHeader from '../components/MyPageHeader';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const ProtectedRouteSection = styled.section`
   
    .protected-route-container{
        margin-top: 7%;
    }

`;

const ProtectedRoute = ()=> {
    
    const auth = useAuth()
    
    if(!auth?.user){
        return <Navigate to="/login" />
    }
    return(
        <>
        <ProtectedRouteSection>
            <div className="header-container">
                <MyPageHeader/>
            </div>
            <div className="protected-route-container">
                <Outlet />
            </div>
        </ProtectedRouteSection>
        </>
    )
}

export default ProtectedRoute