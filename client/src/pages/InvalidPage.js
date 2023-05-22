import React from 'react';
import { Alert, Space } from 'antd';
import { Link } from 'react-router-dom';
  
const InvalidPage = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Link to="/">
        <Alert
          message="Error"
          description="Go back to Home Page"
          type="error"
          showIcon
        />
      </Link>
    </Space>
  );
  

export default InvalidPage