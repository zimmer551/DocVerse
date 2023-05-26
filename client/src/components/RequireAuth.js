import { useJwt } from 'react-jwt';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


export const RequireAuth = ({children}) => {

    const location = useLocation();
    const { decodedToken, isExpired } = useJwt(localStorage.getItem('token'));
console.log(">>>>",decodedToken, isExpired, );

    const isAuthenticated = () => {
        try {
            if ( decodedToken || true ) return true;
            return false;
        } catch (err) {
            return false;
        }
    }

    /* In order for this to occur, the parent route element must have an <Outlet /> component 
  to render the child elements. The Outlet component enables nested UI
  to be visible when child routes are rendered. */

    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace state={{ path: location.pathname}}/>
}