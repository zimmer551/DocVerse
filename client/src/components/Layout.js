import { Badge } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { adminSideBarMenu, userSideBarMenu } from '../Data/data'
import "../styles/Layout.css"
import { handleLogout } from '../util'


const Layout = ({children}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    let userType = "User ";
    let sideBarMenu = []
    if (user) {
        sideBarMenu = user?.isAdmin ? adminSideBarMenu : userSideBarMenu;
        if(user.isAdmin) userType = "Admin ";
        if(user.isDoctor) userType = `${userType}Doctor`;
    }

    return (
    <>
        <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                    <div className='logo'>
                        <h6 style={{cursor: "pointer"}} onClick={() => {navigate("/")}}>DocVerse</h6>
                        <hr />
                    </div>
                    <div className='menu'>
                        {sideBarMenu.map(menu =>{
                            const isActive = location.pathname === menu.pathname
                            return (
                                <div key={menu.name} className={`menu-item ${isActive ? "active" : ""}`}>
                                    <div>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </div>
                            )
                        })}
                        <div className={`menu-item`}>
                            <div onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link>Log Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <h4>
                            {userType}
                        </h4>
                        <div className='header-content' style={{cursor: 'pointer', "marginRight": "20px"}}>
                            <Badge count={user?.notification?.length}
                             onClick={() => {navigate("/notification")}}>
                                <i style={{marginRight: "20px"}} className='fa-solid fa-bell'></i>
                            </Badge>
                            <Link to="/profile">{user?.name}</Link>
                        </div>
                    </div>
                    
                    <div className='body'>
                        {/* {children} */}
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout