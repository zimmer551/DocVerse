/* eslint-disable react-hooks/exhaustive-deps */
import { message, Table, Tabs } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { apiUrl } from '../util';

const Lists = () => {

    const items = [
    {
        key: '1',
        label: 'Doctors',
        children: <List type="doctor"
        />
    },
    {
        key: '2',
        label: 'Users',
        children: <List type="user"
        />
    }]

    return (
        <Tabs items={items}/>
  )
}

export default Lists

const List = (props) => {
    const [listData, setListData] = useState([]);
    // const [listType, setListType] = useState(props.type);

    const listPageType = props.type;

    const columns = {
        "user": [
            {
                title: 'Name',
                dataIndex: 'username',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'emailid',
                key: 'emailid',
            },
            {
                title: 'Is Admin',
                dataIndex: 'isAdmin',
                key: 'isadmin',
                render: (text, record) => (
                    <span>{record.isAdmin ? "Yes" : "No"}</span>
                )
            },
        ],
        "doctor": [
            {
                title: 'Name',
                dataIndex: 'username',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'emailid',
                key: 'emailid',
            },
            {
                title: 'Application Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: "Actions",
                key: "actions",
                dataIndex: "actions",
                render: (text, record) => (
                    <div className='d-flex'>
                        {record.status === "pending" ?
                            <button onClick={() => handleAccountStatus(text, record)} className='btn btn-success'>Approve</button> : 
                            <button className='btn btn-danger'>Reject</button>
                        }
                    </div>
                ) 
            }
        ]
    }

    const handleAccountStatus = async (text, record) => {
        try {
            console.log({text, record})
            const res = await axios.post(`${apiUrl()}/api/v1/admin/changeAccountStatus`,{
                applicationStatus: "approved",
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (res.data.success) {
                message.success(res.data.message);
            }
        } catch (error) {
            message.error("Something went wrong !")
        }
    }

    useEffect(()=> {
        getList(listPageType);
        console.log({listPageType})
    }, [listPageType]);


    const getList = useCallback(async() => {
        
        try {
            const res = await axios.post(`${apiUrl()}/api/v1/admin/getList`,{
                listType: listPageType,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (res.data.success) { 
                const listData = [];
                res.data.data.forEach(item => {
                    if(listPageType === "user") {
                        listData.push({
                            "username": item.username,
                            "emailid": item.emailid,
                            "isAdmin": item.isAdmin,
                        })
                    } else {
                        listData.push({
                            "username": item.username,
                            "emailid": item.emailid,
                            "status": item.applicationStatus,
                            "actions": "",
                            "userId": item._id,
                        })
                    }
                })
                console.log(">>",{listData})
                setListData(listData);
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log("Mark all read error",error);
            message.error("Something went wrong !")
        } 
    }, []);

    
    return (
        <Table dataSource={listData} 
            columns={columns[listPageType]} 
            size="small"
        />
    )
}