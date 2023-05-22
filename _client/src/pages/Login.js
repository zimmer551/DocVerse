import React from 'react';
import '../styles/Register.css';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

  const Login = () => { 
    
    const navigate = useNavigate();

    const onFinish = async(values) => {
      try {
        const res = await axios.post('http://localhost:8080/api/v1/user/login', values);
        if (res.data.success) {
          message.success(`Login Successful. Welcome !`);
          localStorage.setItem("token", res.data.token);
          navigate('/');
        } else {
          message.error(res.data.message);
        }
      } catch (err) {
        message.error(`Login Failed`);
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
        <h3 className='text-center'>Existing User Login</h3>
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
          <Link className='m-4' to="/register">New user ?</Link>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
      </div>
      
    </Form>
    </div>
  );
}

export default Login;