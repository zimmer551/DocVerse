import React from 'react';
import '../styles/Register.css';
import { Button, Checkbox, Form, Input, message, Table } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { apiUrl } from '../util';

  const Login = () => { 
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();

    const data = [
      {
        username: "d",
        password: "d"
      },
      {
        username: "admin",
        password: "d",
      }
    ]

    const cols = [
      {
        title: "User Name",
        dataIndex: "username"
      },
      {
        title: "Password",
        dataIndex: "password"
      }
    ]

    const onFinish = async(values) => {
      try {
        dispatch(showLoading());
        const res = await axios.post(`${apiUrl()}/api/v1/user/login`, values);
        dispatch(hideLoading());
        if (res.data.success) {
          message.success(`Login Successful. Welcome !`);
          localStorage.setItem("token", res.data.token);
          navigate(state?.path || '/');
        } else {
          message.error(res.data.message);
        }
      } catch (err) {
        dispatch(hideLoading());
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
     <div>
     <Table dataSource={data} 
            columns={cols} 
            size="small"
        />
     </div>
    </div>
  );
}

export default Login;