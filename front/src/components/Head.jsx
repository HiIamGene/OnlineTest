import React, { useState }  from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';
import { Layout, Menu, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Input, Form } from 'antd';
import logout from  '../assets/img/logout.png';
const { Text } = Typography;
const MenuIcon = styled.img`
  width: 30px;
  height: 30px;
  padding: 5px;
`

const ContainerName = styled.div`
  padding: 0;
  width: "100%";
  margin-left: 120px;  
  
`
const ContainerHead = styled.div`
padding: 20;
width: "100%";
margin-left: 30px;
margin-right: 30px;   
margin-top:10px;

`


const { Header } = Layout;
function Head() {
  const [Username, setUsername] = useState("T.Somchai")
  return (
    <div>
      <Row>
        <Col span={1} offset={2}>
        < img src={logout} alt="Logo" style={{ width: 40 ,marginTop:60,marginLeft:30}} />
        </Col>
        <Col span={17} >
  <div style={{ fontSize:30,marginTop:55}}>{Username}</div>
        </Col>
        <Col span={3}>              
        <NavLink to="/">
                <Button ype="primary" htmlType="submit" className="login-form-button" style={{marginTop:50, background: '#DEDEDE', color: '#FFFFFF', width: 200, height: 60 }} >
                < img src={logout} alt="Logo" style={{ width: 40 ,marginTop:3}} />
                <div style={{fontSize:30,float:'right',color:'black',fontWeight: "bold",marginBottom:20}}>Logout</div>
                </Button>
                </NavLink></Col>
      </Row>
    </div>
  );
}

export default Head;
