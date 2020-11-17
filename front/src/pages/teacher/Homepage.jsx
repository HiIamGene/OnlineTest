import React, { useState } from 'react';
import { Row, Col, Button, Input, Form } from 'antd';
import { Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import writing from '../../assets/img/writing.png'
import brand from '../../assets/img/brand.png'
import { NavLink } from 'react-router-dom';

const { Title } = Typography;

function Homepage(props) {
  const [username, setuername] = useState();
  const [password, setpassword] = useState();
  const onFinish = values => {
    console.log('Success:', values);
  };
  const handlepassword = (e) => {
    setpassword(e)
  }
  const handleusername = (e) => {
    setuername(encodeURIComponent)
  }
  return (
    <div>

      <Row style={{ background: '#ffffff', marginTop: 90 }}>
        <Col span={14} offset={0}>
          < img src={brand} alt="Logo" style={{ width: 482 }} />
          <Col span={12} offset={2}>
            <Title style={{ font: 'Josefin Sans', fontSize: 30 }}>web application</Title>
            <Title style={{ font: 'Josefin Sans', fontSize: 80, marginTop: 1 }}>Online Testing</Title>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}

            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username" style={{ width: 764, height: 66 }}
                  onChange={handleusername}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  style={{ width: 764, height: 66 }}
                  onChange={handlepassword}
                />
              </Form.Item>
              <Form.Item>

                <a className="login-form-forgot" href="">Forgot password</a>
                <NavLink to="/class">
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: 200, height: 50, marginLeft: 565 }} >
                    <div style={{ font: 'Josefin Sans', fontSize: 20 }}>Log in</div>
                  </Button>
                </NavLink>
              </Form.Item>
            </Form>
          </Col>
        </Col>
        <Col span={10} offset={0}>
          < img src={writing} alt="Logo" style={{ height: '80%' }} />
        </Col>

      </Row>
    </div>
  )
}
export default Homepage;
