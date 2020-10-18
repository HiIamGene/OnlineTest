import React, { useState } from 'react';
import { Row, Col, Button, Input, Form, Icon, Typography } from 'antd';
import logo from '../assets/img/eikon-logo.svg';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const { Title } = Typography;
const Branding = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 16px 5px 5px 5px;

`
const center = styled.div`
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
  `

function Homepage(props) {

  const [newpassword, setnewpassword] = useState();;
  const [newrepassword, setnewrepassword] = useState();
  const [dataLogin, setdataLogin] = useState();
  const [dataRegister, setdataRegister] = useState();
  const [edit, setEdit] = useState(true);
  const toggleEdit = () => {
    setEdit(!edit);
  }
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  const handlemail = (e) => {
    setdataLogin({...dataLogin,email:e.target.value})
  }
  const handlepassword = (e) => {
    setdataLogin({...dataLogin,password:e.target.value})
  }
  const handlenewemail = (e) => {
    setdataRegister({...dataRegister,email:e.target.value})
  }
  const handlenewpassword = (e) => {
    setdataRegister({...dataRegister,password:e.target.value})
    setnewpassword(e.target.value)
  }
  const handlenewuser = (e) => {
    setdataRegister({...dataRegister,user:e.target.value})
  }
  const handlenewrepassword = (e) => {
    setnewrepassword(e.target.value);
  }
  const login = () => {
    alert(JSON.stringify(dataLogin))
  }
  const signUp = () =>{
    if(newrepassword===newpassword){
      alert("create new account success")
      alert(JSON.stringify(dataRegister))
    }
    else{ alert("password does not match")}    
  }
  return (
    <Row gutter={8} style={{ background: '#2FADB9' }}>
      <Col span={24} style={{ padding: 70 }} />

      <Col span={3} />
      {edit ?
        <div>
          <Col span={18} style={{ background: '#FFF', borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)", padding: 25 }}>
            <center>
              <Col span={14} >
                <div style={{ padding: 60 }} ></div>

                <Title level="2" style={{}}>Welcome Back</Title>
                <div>
                  Sign in with your email
                </div>
                <br />

                <Form onSubmit={handleSubmit} className="login-form">
                  <Form.Item style={{ width: "80%" }}>

                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Email Address"
                      className="input"
                      type="email"
                      name="email"
                      onChange={handlemail}
                    />

                  </Form.Item>
                  <Form.Item style={{ width: "80%" }}>
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      className="input"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handlepassword}
                    />
                  </Form.Item>
                  <Form.Item style={{ width: "80%" }}>
                    <Input
                      prefix={<Icon type="google" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="Google"
                      placeholder="Google 2 Factor Authentication"
                    />
                  </Form.Item>
                </Form>
                <div><NavLink to="/acquisition">

                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: 'rgb(41,128,174)', color: '#FFF', width: "35%", borderRadius: '15px' }}
                    onClick={login}>

                    Sign In

                </Button>
                </NavLink>
                <a href="http://localhost:3000/login">link text</a>
               
                </div>
                <div style={{ padding: 70 }} ></div>
              </Col>
            </center>
            <Col span={10} >
              <center>
                <div style={{ padding: 40 }} ></div>
                
                <br />

                <Title level="2" style={{}}>Create Account</Title>
                <div>
                  Take control of your advertising experience.<br />
                  See how well your ads perform by having <br />
                  the full access to performance data.
          </div>
                <br />
                <br />
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={toggleEdit} style={{ background: 'rgb(41,128,174)', color: '#FFF', width: "35%", borderRadius: '15px' }}>
                  Sign Up
          </Button>
              </center>
            </Col>
          </Col>
        </div>
        :
        <div>
          <Col span={18} style={{ background: '#FFF', borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)", padding: 25 }}>


            <Col span={10} >
              <center>
                <div style={{ padding: 40 }} ></div>
                <Branding src={logo} style={{ height: 50, marginTop: 40 }} />
                <br />

                <Title level="2" >Welcome Back</Title>
                <div>
                  Take control of your advertising experience.<br />
                  See how well your ads perform by having <br />
                  the full access to performance data.
          </div>
                <br />
                <br />
                <Button onClick={toggleEdit} style={{ background: 'rgb(41,128,174)', color: '#FFF', width: "35%", borderRadius: '15px' }}>
                  Sign In
          </Button>
              </center>
            </Col>
            <Col span={14} >
              <center>
                <div style={{ padding: 30 }} ></div>

                <Title level="2" >Create Account</Title>
                <div>
                  Register with your email
          </div>
                <br />

                <Form onSubmit={handleSubmit} className="login-form">
                  <Form.Item style={{ width: "80%" }}>

                    <Input
                      prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="First & Last Name"
                      onChange={handlenewuser}
                    />

                  </Form.Item>
                  <Form.Item style={{ width: "80%" }}>
                    <Input
                      prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Company Name"
                      
                    />
                  </Form.Item>
                  <Form.Item style={{ width: "80%" }}>
                    <Input
                      prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Email Address"
                      onChange={handlenewemail}
                    />
                  </Form.Item>
                  <Form.Item style={{ width: "80%" }}>
                    <Input
                      prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                      onChange={handlenewpassword}
                    />
                  </Form.Item>
                  <Form.Item style={{ width: "80%" }}>
                    <Input
                      prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}

                      placeholder="Re-enter Password"
                      onChange={handlenewrepassword}
                    />
                  </Form.Item>
                </Form>

                <Button onClick={signUp} type="primary" htmlType="submit" className="login-form-button" style={{ background: 'rgb(41,128,174)', color: '#FFF', width: "35%", borderRadius: '15px' }}>
                    Sign Up
                </Button>
                <div style={{ padding: 30 }} ></div>
              </center>
            </Col>
          </Col>
        </div>
      }
      <Col span={3} />
      <Col span={24} style={{ padding: 75 }} />

    </Row>
  )
}
export default Homepage;
/*
<NavLink to="/acquisition">
</NavLink>*/
//<Branding src={logo} style={{ height: 50, marginTop: 40 }} />