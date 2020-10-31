import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import Class from '../assets/icon/Class.png';
import UserInfo from '../assets/icon/userInfo.png';

const { Sider } = Layout;

const MenuIcon = styled.img`
width: 40px;
height: 40px;
  padding: 5px;
`
const Center = styled.div`
  position: 'absolute', left: '50%', top: '50%',
  transform: 'translate(-50%, -50%)'
 
  `

function SideMenu(props) {
  if (props.form === 1) {
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
              <NavLink to="/Class">
                <MenuIcon src={Class} style={{ height: "70px", width: "70px" }} />
                <br />
                <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Class</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2" style={{ height: "140px" }} value="2" >
              <NavLink to="/Class">
                <MenuIcon src={UserInfo} style={{ height: "60px", width: "80px" }} />
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
            <Menu.Item key="1" style={{ height: "140px" }} value="1" >
              <NavLink to="/Class">
                <MenuIcon src={Class} style={{ height: "70px", width: "70px" }} />
                <br />
                <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Class</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2" style={{ height: "140px" }} value="2" >
              <NavLink to="/Class">
                <MenuIcon src={UserInfo} style={{ height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>User Info</span>
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
                <NavLink to="/Class">
                  <MenuIcon src={Class} style={{ height: "70px", width: "70px" }} />
                  <br />
                  <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Class</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2" style={{ height: "140px" }} value="2" >
                <NavLink to="/Class">
                  <MenuIcon src={UserInfo} style={{ height: "60px", width: "80px" }} />
                  <br />
                  <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>User Info</span>
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
                <NavLink to="/Class">
                  <MenuIcon src={Class} style={{ height: "70px", width: "70px" }} />
                  <br />
                  <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>Class</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2" style={{ height: "140px" }} value="2" >
                <NavLink to="/Class">
                  <MenuIcon src={UserInfo} style={{ height: "60px", width: "80px" }} />
                  <br />
                  <span style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>User Info</span>
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