import React from 'react';
import '../styles/Register.css';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


  const Register = () => { 

    const navigate = useNavigate();   

    const onFinish = async(values) => {
      try {
        const res = await axios.post('/api/v1/user/register', values);
        if (res.data.success) {
          message.success("Registered successfully");
          navigate('/login');
        } else {
          message.error(res.data.message);
        }
        

      } catch (err) {
        console.log(err);
        message.error("Something went wrong");
      }
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
    <div className='form-container'>
        <Form
        className='register-form'
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <h3 className='text-center'>New User Register Form</h3>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email Id"
        name="emailid"
        rules={[
          {
            required: true,
            message: 'Please input your email id!',
          },
        ]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
  
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
  
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        
      </Form.Item>
      <div className='text-center'>
            <Link className='m-4' to="/login">Already a user ?</Link>
            <Button type="primary" htmlType="submit">
            Register
            </Button>
      </div>
    </Form>
    </div>
  );
}

export default Register;