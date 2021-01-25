import React, { useState,useEffect } from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';
import { Layout, Menu, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Input, Form } from 'antd';
import Profile from '../assets/icon/Profile.png';
import { UnderlineOutlined } from '@ant-design/icons';
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
function Head(props) {
  const logout = () => {
    localStorage.removeItem('token')
    props.history.push(`/`)
    
  }
 

  //alert(localStorage.('token'))
  const [Username, setUsername] = useState(props.Username)
  return (
    <div>
      <Row>
        <Col span={1} offset={2}>
          <img src={Profile} alt="Logo" style={{ width: 40, marginTop: 60, marginLeft: 30 }} />
        </Col>
        <Col span={17} >
          <div style={{ fontSize: 30, marginTop: 55 }}>{Username}</div>
        </Col>
        <Col span={3}>
            <a onClick={logout} style={{ marginTop: 50, width: 200, height: 60 ,fontSize:30,  textDecorationLine: 'underline'}} >
              Logout
            </a>
        </Col>
      </Row>
    </div>
  );
}

export default Head;
