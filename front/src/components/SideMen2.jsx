import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import Class from '../assets/icon/Class.png';
import UserInfo from '../assets/icon/userInfo.png';
import Back from '../assets/icon/Back.png';
import TestBank from '../assets/icon/Test-bank.png';
import Teacher from '../assets/icon/teacher.png';
import Student from '../assets/icon/student.png';
import Group from '../assets/icon/Group.png';
import Member from '../assets/icon/Member.png';
import Info from '../assets/icon/Info.png';
import logo from '../assets/icon/Logo-b.png';
import ScoreTest from '../assets/icon/ScoreTest.png';

const { Sider } = Layout;


const MenuIcon = styled.img`
width: 70px;
height: 70px;
`
const Center = styled.div`
  position: 'absolute', left: '50%', top: '50%',
  transform: 'translate(-50%, -50%)'
 
  `
const Branding = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0px 5px 50px 5px;
`
function SideMenu(props) {
  if (props.form === 1) {
    return (
      <Sider
        width={180}
        style={{ background: "#70C5FB" }}
      >
        <div style={{ height: 50 }}>

        </div>
        <Center >
          <div style={{ height: 150 }}>
            <Branding src={logo} style={{ height: 150 }} />
          </div>
          <Menu style={{ background: "#70C5FB" }} theme="dark" mode="inline" defaultSelectedKeys={[props.keyValue]}>
            <Menu.Item key="1" style={{ marginRight:"20px",height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="1" >
              <NavLink to="/Course">
                <MenuIcon src={Class} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Course</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="2" >
              <NavLink to="/UserInfo">
                <MenuIcon src={UserInfo} style={{ marginLeft: "10px", height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>User Info</span>
              </NavLink>
            </Menu.Item>
          </Menu>

        </Center>
      </Sider>
    );
  }

}

export default SideMenu;