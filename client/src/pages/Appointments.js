import { message, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Appointments = () => {

    const [doctorList, setDoctorList] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'emailid',
            key: 'emailid',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
        },
        {
            title: 'Specialization',
            dataIndex: 'specialization',
            key: 'specialization',
        },
        {
            title: 'Fees',
            dataIndex: 'feePerConsultation',
            key: 'feePerConsultation',
        },
        {
            title: "Actions",
            key: "actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className='d-flex'>
                    <button onClick={() => handleBooking(text, record)} className='btn btn-success'>Book</button>
                </div>
            ) 
        }
    ];

    const handleBooking = async (text, record) => {
        try {
            console.log({text, record})
            const res = await axios.post("http://localhost:8090/api/v1/user/book-doctor",{
                doctorId: record.userId,
                username: record.username,
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

    const getDoctors = async () => {
        const res = await axios.post("http://localhost:8090/api/v1/admin/getList",{
            listType: "doctor",
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        if (res.data.success) { 
            const listData = [];
                res.data.data.forEach(item => {
                    listData.push({
                        "username": item.username || `${item.firstName} ${item.lastName}`,
                        "emailid": item.emailid,
                        "userId": item._id,
                        "address": item.address,
                        "experience": item.experience,
                        "feePerConsultation": item.feePerConsultation,
                        "specialization": item.specialization,
                        "website": item.website,
                    })
                })
                setDoctorList(listData)
                message.success(res.data.message);
        }
    }

    useEffect(() => {
        getDoctors();
    }, [])
  return (
    <div>
        <h4>Book Appointment</h4>
        <hr />
        <Table dataSource={doctorList} 
            columns={columns} 
            size="small"
        />
    </div>
  )
}

export default Appointments