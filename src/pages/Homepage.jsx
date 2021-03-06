import React , {useEffect, useState} from 'react';
import { Row, Col, Button, Input, Form } from 'antd';
import { Typography } from 'antd';
import instance, {setAuth} from '../constants/action.js';
import API from "../constants/api.jsx";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import writing from '../assets/img/writing.png'
import brand from '../assets/img/brand.png'
const { Title } = Typography;

function Homepage (props){
  const [token,setToken]=useState("")
  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem("role") === "teacher") {
        props.history.push(`/Teacher/Course`)
      } 
      else if (localStorage.getItem("role") === "student"){
        props.history.push(`/Student/Test`)
      }
      else if (localStorage.getItem("role") === "admin"){
        props.history.push(`/Admin`)
      }
      
    }
  }, [token]);
  const onFinish = values => {
    instance.post(API.V1.LOGIN, null, {
      params: {
        username: values.username
        ,
        password: values.password
      }

    }).then( res => {
      if (res.data === "Wrong Username or Password") {
        alert("Wrong Username or Password")
      }
      else {
        setToken( res.data["token"])
        localStorage.setItem('token', "Bearer " + res.data["token"])
        localStorage.setItem('role', res.data["role"])
        setAuth()
      }
    }).catch(err => {
      console.warn(err);
    })
  };
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

                  />
                </Form.Item>
                <Form.Item>

                  <a className="login-form-forgot" href="">Forgot password</a>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: 200, height: 50, marginLeft: 565 }} >
                    <div style={{ font: 'Josefin Sans', fontSize: 20 }}>Log in</div>
                  </Button>
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
