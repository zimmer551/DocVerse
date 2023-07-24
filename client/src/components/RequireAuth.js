import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUser } from '../redux/features/userSlice';
import { handleLogout } from '../util';


export const RequireAuth = ({children}) => {

    const location = useLocation();
    const dispatch = useDispatch();

    const getUserData = async() => {
      try {
        await axios.post("http://localhost:8090/api/v1/user/getUserData", {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(data => {
          if (!data.data.success && !localStorage.getItem('token')) handleLogout();
          dispatch(getUser(data.data.data));
        });  
      } catch (err) {
        console.log("getUserData.js err >> ", err)
      }
    }
  
    useEffect(() => {
      getUserData();
    },[])

    const isAuthenticated = () => {

        if ( localStorage.getItem('token')) return true;
        return false;
        
    }

  /* In order for this to occur, the parent route element must have an <Outlet /> component 
  to render the child elements. The Outlet component enables nested UI
  to be visible when child routes are rendered. */

    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace state={{ path: location.pathname}}/>
}