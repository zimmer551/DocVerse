import { Card, Tabs } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'

const Notification = () => {


    const {user} = useSelector(state => state.user);
    
    const handleMarkAllRead = () => {

    }
    const handleDeleteAllRead = () => {

    }
    const handleTabChange = () => {

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
    <Layout>
        <h4 className="p-3 text-center">Notifications</h4>
        <Tabs items={items} onChange={handleTabChange}/>
    </Layout>
  )
}

const UnReadTab = (props) => {
    const {handleMarkAllRead, user} = props;
    return (
        <>
                <div className='d-flex justify-content-end'>
                    <h4 className='p-2' onClick={handleMarkAllRead}>Mark all as read</h4>
                </div>
               {
                user?.notification.forEach((element, i) => {
                    <Card
                    title={element.type}
                    key={i}
                    style={{
                        width: 300,
                    }}
                    >
                        <p>{element.message}</p>
                 </Card>
                })
               }
        </>
    )
}


const ReadTab = (props) => {
    const { handleDeleteAllRead } = props;
    return (
        <>
            <div className='d-flex justify-content-end'>
                <h4 className='p-2' onClick={handleDeleteAllRead}>Delete all as read</h4>
            </div>
        </>
    )
}


export default Notification;