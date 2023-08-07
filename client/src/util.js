import React from "react";
import { Navigate, Route } from "react-router-dom";
import {message} from 'antd'; 


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

export const handleLogout = () => {
    localStorage.clear();
    message.success("You are logegd out !")
    window.location.href = "/login";
}

export const apiUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:8090";
    }
    return "http://prodhost:8090";
}



































