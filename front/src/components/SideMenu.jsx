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
        collapsedWidth="500"
        style={{ background: "#70C5FB" }}
      >
        <div style={{ height:  50}}>

        </div>
        <Center >
          <div style={{ height: 150 }}>
            <Branding src={logo} style={{ height: 150}} />
          </div>
          <Menu style={{ background: "#70C5FB" }} theme="dark" mode="inline" defaultSelectedKeys={[props.keyValue]}>
            <Menu.Item key="1" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="1" >
              <NavLink to="/Class">
                <MenuIcon src={Class} />
                <br />
                <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Class</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2" style={{ height: "140px" , display: "flex", justifyContent: "center", alignItems: "center"}} value="2" >
              <NavLink to="/UserInfo">
                <MenuIcon src={UserInfo} style={{ marginLeft:"23px",height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>User Info</span>
              </NavLink>
            </Menu.Item>
          </Menu>

        </Center>
      </Sider>
    );
  }
  else if (props.form === 2) {
    return (
      <Sider
        collapsedWidth="500"
        style={{ background: "#70C5FB" }}
      >
        <div style={{ height: 110 }}>

        </div>
        <Center >

          <Menu style={{ background: "#70C5FB" }} theme="dark" mode="inline" defaultSelectedKeys={[props.keyValue]}>
            <Menu.Item key="1" style={{ height: "140px" , display: "flex", justifyContent: "center", alignItems: "center"}} value="1" >
              <NavLink to="/Class">
                <MenuIcon src={Class} style={{ height: "70px", width: "70px" }} />
                <br />
                <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Class</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="2" >
              <NavLink to="/Teacher">
                <MenuIcon src={Member} style={{ height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Member</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3" style={{ height: "140px" }} value="3" >
              <NavLink to="/Testbank">
                <MenuIcon src={TestBank} style={{ height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>TestBank</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4" style={{ height: "140px" }} value="4" >
              <NavLink to="/Class">
                <MenuIcon src={Back} style={{ height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Back</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Center>
      </Sider>
    );
  }
  else if (props.form === 3) {
    {
      return (
        <Sider
          collapsedWidth="500"
          style={{ background: "#70C5FB" }}
        >
          <div style={{ height: 110 }}>

          </div>
          <Center >

            <Menu style={{ background: "#70C5FB" }} theme="dark" mode="inline" defaultSelectedKeys={[props.keyValue]}>
              <Menu.Item key="1" style={{ height: "140px" }} value="1" >
                <NavLink to="/Teacher">
                  <MenuIcon src={Teacher} style={{ height: "70px", width: "70px" }} />
                  <br />
                  <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Teacher</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2" style={{ height: "140px" }} value="2" >
                <NavLink to="/Student">
                  <MenuIcon src={Student} style={{ height: "60px", width: "80px" }} />
                  <br />
                  <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Student</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3" style={{ height: "140px" }} value="3" >
                <NavLink to="/Class">
                  <MenuIcon src={Back} style={{ height: "60px", width: "80px" }} />
                  <br />
                  <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Back</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Center>
        </Sider>
      );
    }
  }
  else if (props.form === 4) {
    {
      return (
        <Sider
          collapsedWidth="500"
          style={{ background: "#70C5FB" }}
        >
          <div style={{ height: 110 }}>

          </div>
          <Center >

            <Menu style={{ background: "#70C5FB" }} theme="dark" mode="inline" defaultSelectedKeys={[props.keyValue]}>
              <Menu.Item key="1" style={{ height: "140px" }} value="1" >
                <NavLink to="/Detail">
                  <MenuIcon src={Class} style={{ height: "70px", width: "70px" }} />
                  <br />
                  <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Class</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2" style={{ height: "140px" }} value="2" >
                <NavLink to="/Group">
                  <MenuIcon src={Group} style={{ height: "60px", width: "80px" }} />
                  <br />
                  <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Group</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3" style={{ height: "140px" }} value="3" >
                <NavLink to="/Class">
                  <MenuIcon src={Back} style={{ height: "74px", width: "74px" }} />
                  <br />
                  <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Back</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Center>
        </Sider>
      );
    }
  }

}

export default SideMenu;