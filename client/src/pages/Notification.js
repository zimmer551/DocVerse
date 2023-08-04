import { Card, message, Tabs } from 'antd'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { getUser } from '../redux/features/userSlice'

const Notification = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    
    const handleMarkAllRead = async() => {
        try {
            const res = await axios.post("http://localhost:8090/api/v1/user/get-all-notifications",{userId: user._id},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (res.data.success) { 
                message.success(res.data.message);
                dispatch(getUser(res.data.data));
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log("Mark all read error",error);
            message.error("Something went wrong !")
        }
    }
    const handleDeleteAllRead = async () => {
        try {
            const res = await axios.post("http://localhost:8090/api/v1/user/delete-all-notifications",{userId: user._id},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (res.data.success) { 
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log("Delete all error",error);
            message.error("Something went wrong !")
        }
    }

    const items = [
        {
            key: '1',
            label: 'Un - Read',
            children: <UnReadTab user={user}
                handleMarkAllRead={handleMarkAllRead}
            />
        },
        {
            key: '2',
            label: 'Read',
            children: <ReadTab user={user}
            handleDeleteAllRead={handleDeleteAllRead}
            />
        }
    ]
  return (
    <>
        <h4 className="p-3 text-center">Notifications</h4>
        <Tabs items={items}/>
    </>
  )
}

const UnReadTab = (props) => {
    const navigate = useNavigate();
    const {handleMarkAllRead, user} = props;

    const handleCardClick = (path = "/") => {
        navigate(path)
    }
    return (
        <>
            <div className='d-flex justify-content-end'>
                <h4 className='p-2 text-primary' style={{cursor: "pointer"}} onClick={handleMarkAllRead}>Mark all as read</h4>
            </div>
            <div className='card-content'>
            {
                user?.notification.map((element, i) => {
                    return <div className='card' onClick={() => handleCardClick(element?.data.onClickPath)}>
                        <Card
                            title={element.type}
                            key={i}
                            bodyStyle={{
                                width: 230,
                                cursor: "pointer",
                                margin: "20px",
                            }}
                            headStyle={{
                                background: "#9b6fc3",
                                color: "white",
                            }}
                            hoverable
                            size="small"
                            >
                                <p>{element.message}</p>
                        </Card>
                </div>
                })
            }
            </div>
        </>
    )
}


const ReadTab = (props) => {
    const { handleDeleteAllRead, user } = props;
    return (
        <>
            <div style={{cursor: "pointer"}} className='d-flex justify-content-end'>
                <h4 className='p-2 text-primary' style={{cursor: "pointer"}} onClick={handleDeleteAllRead}>Delete all as read</h4>
            </div>
            <div className='card-content'>
                {
                user?.seenNotification.map((element, i) => {
                    return <div className='card'>
                        <Card
                            title={element.type}
                            key={i}
                            bodyStyle={{
                                width: 230,
                                cursor: "pointer",
                            }}
                            headStyle={{
                                background: "#9b6fc3",
                                color: "white",
                            }}
                            hoverable
                            size="small"
                            >
                                <p>{element.message}</p>
                        </Card>
                 </div>
                })
               }
            </div>
        </>
    )
}


export default Notification;