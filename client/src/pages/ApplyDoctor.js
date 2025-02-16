import { Col, Form, Input, message, Row, TimePicker } from 'antd'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { apiUrl } from '../util'




const ApplyDoctor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user); 

    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post(`${apiUrl()}/api/v1/user/apply-doctor`, {
                ...values,
                userId: user._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })       

            dispatch(hideLoading());
            if(res?.data?.success) {
                message.success(res.data.message);
                navigate("/");
            } else message.error(res.data.message);
        } catch (err) {
            dispatch(hideLoading());
            message.error("Something Went Wrong !")
        }
    }
console.log({user})
  return (
    <>
        <h1 className='text-center'>Apply As A Doctor</h1>
        <Form layout='vertical' onFinish={handleFinish} className="m-3">
            <h5 className='text-dark'>Personal Details</h5>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="User Name" name="username" required rules={[{required: true}]}>
                        <Input type="text" placeholder='last name' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Phone Number" name="phone" required rules={[{required: true}]}>
                        <Input type="number" placeholder='phone number' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Email Id" type="email" name="emailid"  required rules={[{required: true}]}>
                        <Input type="text" placeholder='email id' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Website" name="website">
                        <Input type="text" placeholder='website' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Address" name="address" required rules={[{required: true}]}>
                        <Input type="text" placeholder='your clinic address' />
                    </Form.Item>
                </Col>
            </Row>
            <hr />
            <h5 className='text-dark'>Professional Details</h5>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Specialization" name="specialization" required rules={[{required: true}]}>
                        <Input type="text" placeholder='specialization' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Fees Per Consultation" name="feePerConsultation" required rules={[{required: true}]}>
                        <Input type="number" placeholder='fees in rupees' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Experience" name="experience" required rules={[{required: true}]}>
                        <Input type="number" placeholder='experience in months' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Timings" name="timings" required rules={[{required: true}]}>
                        <TimePicker.RangePicker format="HH:mm"/>
                    </Form.Item>
                </Col>
            </Row>
            <button className='btn btn-primary form-btn' type="submit">Submit</button>
        </Form>
    </>
  )
}

export default ApplyDoctor