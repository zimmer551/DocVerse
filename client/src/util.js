import React from "react";
import { Navigate, Route } from "react-router-dom";


/**
 * opens child component if isauthenticated, else redirect to login
 * @param {*} param0 
 */
export const ProtectedRoute = ({component: Component, isAuthenticated, ...rest}) => {
    <Route 
        {...rest}
        render={props => isAuthenticated ? 
            <Component {...props}/> :
            <Navigate to="/login" />
        }
    />
}








































