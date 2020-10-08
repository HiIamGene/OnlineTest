import React from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';
import { Layout, Menu, Typography } from 'antd';
import nonti from '../assets/img/Group 20.png';
import setting from '../assets/img/Group 21.png';
import logout from '../assets/img/Group 23.png'
import { NavLink } from 'react-router-dom';
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
var firstname = 'John';
var lastname = 'Doe';
var tel = '02-123-1234';
function Head() {
  return (

    <ContainerHead style={{ background: '#fff', borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)" }}>
      <Header className="header" style={{ background: '#fff', borderRadius: '18px', minHeight: 100 }}>

        <div style={{ float: "left" }} >

          <Avatar size={100} icon="user" style={{ width: 100, height: 100, borderRadius: 100 / 2 }} />

        </div>
        <ContainerName>
          <Text strong style={{ fontSize: 30, top: "50px" }}>{firstname} {lastname} </Text>
          <Text style={{ fontSize: 20 }}>{tel}  </Text>
          <Menu
            theme="light"
            mode="horizontal"
            //defaultSelectedKeys={['2']}
            style={{ lineHeight: '100px', float: "right", fontSize: 20 }}

          >
            <Menu.Item key="1">
              <MenuIcon src={nonti} />
              Notification
              </Menu.Item>
            <Menu.Item key="2">
              <MenuIcon src={setting} />
              Settings
              </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/">
                <MenuIcon src={logout} />

                Log Out
                </NavLink>
            </Menu.Item>

          </Menu>

        </ContainerName>



      </Header>
    </ContainerHead>
  );
}

export default Head;
