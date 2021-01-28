import React, {useEffect}from 'react';
import { Link } from 'react-router-dom';
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
import history from "./../utils/history";
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
  useEffect(() => {
    if(!props.couseCode){
      console.log("me")
      history.push(`/Teacher/Course`)
    }

  }, []);
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
              <Link to="/Teacher/Course">
                <MenuIcon src={Class} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Course</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="2" >
              <Link to="/Teacher/UserInfo">
                <MenuIcon src={UserInfo} style={{ marginLeft: "10px", height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>User Info</span>
              </Link>
            </Menu.Item>
          </Menu>

        </Center>
      </Sider>
    );
  }
  else if (props.form === 2) {
    return (
      <Sider
        width={180}
        style={{ background: "#70C5FB" }}
      >
        <div style={{ height: 50 }}></div>
        <Center >
          <div style={{ height: 150 }}>
            <Branding src={logo} style={{ height: 150 }} />
          </div>
          <Menu style={{ background: "#70C5FB" }} theme="dark" mode="inline" defaultSelectedKeys={[props.keyValue]}>
            <Menu.Item key="1" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="1" >
              <Link to="/Teacher/InClass">
                <MenuIcon src={Class} style={{marginRight:"20px", height: "70px", width: "70px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Course</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" style={{height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="2" >
              <Link to="/Teacher/Teacher">
                <MenuIcon src={Member} style={{ height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Member</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="3" >
              <Link to="/Teacher/Testbank">
                <MenuIcon src={TestBank} style={{ height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>TestBank</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="4" >
              <Link to="/Teacher/ScoreTest">
                <MenuIcon src={ScoreTest} style={{marginLeft:10, height: "80px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Score Test</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="5" >
              <Link to="/Teacher/Course">
                <MenuIcon src={Back} style={{ height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Back</span>
              </Link>

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
        width={180}
        style={{ background: "#70C5FB" }}
      >
        <div style={{ height: 50 }}></div>
        <Center >
          <div style={{ height: 150 }}>
            <Branding src={logo} style={{ height: 150 }} />
          </div>

            <Menu style={{ background: "#70C5FB" }} theme="dark" mode="inline" defaultSelectedKeys={[props.keyValue]}>
              <Menu.Item key="1" style={{ height: "140px" , display: "flex", justifyContent: "center", alignItems: "center"}} value="1" >
                <Link to="/Teacher/Teacher">
                  <MenuIcon src={Teacher} style={{ height: "70px", width: "70px" }} />
                  <br />
                  <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Teacher</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2" style={{ height: "140px" , display: "flex", justifyContent: "center", alignItems: "center"}} value="2" >
                <Link to="/Teacher/Student">
                  <MenuIcon src={Student} style={{ height: "60px", width: "80px" }} />
                  <br />
                  <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Student</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="3" >
                <Link to="/Teacher/InClass">
                  <MenuIcon src={Back} style={{ height: "60px", width: "80px" }} />
                  <br />
                  <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Back</span>
                </Link>
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
        width={180}
        style={{ background: "#70C5FB" }}
      >
        <div style={{ height: 50 }}></div>
        <Center >
          <div style={{ height: 150 }}>
            <Branding src={logo} style={{ height: 150 }} />
          </div>

            <Menu style={{ background: "#70C5FB" }} theme="dark" mode="inline" defaultSelectedKeys={[props.keyValue]}>
              <Menu.Item key="1" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="1" >
                <Link to="/Teacher/Detail">
                  <MenuIcon src={Info} style={{ marginRight:20,height: "70px", width: "70px" }} />
                  <br />
                  <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Info</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2" style={{ height: "140px" , display: "flex", justifyContent: "center", alignItems: "center"}} value="2" >
                <Link to="/Teacher/Group">
                  <MenuIcon src={Group} style={{ height: "60px", width: "80px" }} />
                  <br />
                  <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Group</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3" style={{ height: "140px" , display: "flex", justifyContent: "center", alignItems: "center"}} value="3" >
                <Link to="/Teacher/InClass">
                  <MenuIcon src={Back} style={{ height: "74px", width: "74px" }} />
                  <br />
                  <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Back</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Center>
        </Sider>
      );
    }
  }
  else if (props.form === 5) {
    {
      return (
        <Sider
        width={180}
        style={{ background: "#70C5FB" }}
      >
        <div style={{ height: 50 }}></div>
        <Center >
          <div style={{ height: 150 }}>
            <Branding src={logo} style={{ height: 150 }} />
          </div>

            <Menu style={{ background: "#70C5FB" }} theme="dark" mode="inline" defaultSelectedKeys={[props.keyValue]}>
              <Menu.Item key="1" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="1" >
                <Link to="/Teacher/Detail">
                  <MenuIcon src={Info} style={{ marginRight:20,height: "70px", width: "70px" }} />
                  <br />
                  <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Info</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2" style={{ height: "140px" , display: "flex", justifyContent: "center", alignItems: "center"}} value="2" >
                <Link to="/Teacher/Group">
                  <MenuIcon src={Group} style={{ height: "60px", width: "80px" }} />
                  <br />
                  <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Group</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3" style={{ height: "140px" , display: "flex", justifyContent: "center", alignItems: "center"}} value="3" >
                <Link to="/Teacher/Question">
                  <MenuIcon src={Back} style={{ height: "74px", width: "74px" }} />
                  <br />
                  <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Back</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Center>
        </Sider>
      );
    }
  }
  else if (props.form === 6) {
    return (
      <Sider
        width={180}
        style={{ background: "#70C5FB" }}
      >
        <div style={{ height: 50 }}></div>
        <Center >
          <div style={{ height: 150 }}>
            <Branding src={logo} style={{ height: 150 }} />
          </div>
          <Menu style={{ background: "#70C5FB" }} theme="dark" mode="inline" defaultSelectedKeys={[props.keyValue]}>
            <Menu.Item key="1" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="1" >
              <Link to="/Teacher/InClass">
                <MenuIcon src={Class} style={{marginRight:"20px", height: "70px", width: "70px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Course</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" style={{height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="2" >
              <Link to="/Teacher/Teacher">
                <MenuIcon src={Member} style={{ height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Member</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="3" >
              <Link to="/Teacher/Testbank">
                <MenuIcon src={TestBank} style={{ height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>TestBank</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="4" >
              <Link to="/Teacher/ScoreTest">
                <MenuIcon src={ScoreTest} style={{marginLeft:10, height: "80px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Score Test</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="5" >
              <Link to="/Teacher/ScoreTest">
                <MenuIcon src={Back} style={{ height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Back</span>
              </Link>

            </Menu.Item>
          </Menu>
        </Center>
      </Sider>
    );
  }
  else if (props.form === 7) {
    return (
      <Sider
        width={180}
        style={{ background: "#70C5FB" }}
      >
        <div style={{ height: 50 }}></div>
        <Center >
          <div style={{ height: 150 }}>
            <Branding src={logo} style={{ height: 150 }} />
          </div>
          <Menu style={{ background: "#70C5FB" }} theme="dark" mode="inline" defaultSelectedKeys={[props.keyValue]}>
            <Menu.Item key="1" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="1" >
              <Link to="/ScoreTest">
                <MenuIcon src={ScoreTest} style={{marginLeft:10, height: "80px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Score Test</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} value="2" >
              <Link to="/ScoreStudent">
                <MenuIcon src={Back} style={{ height: "60px", width: "80px" }} />
                <br />
                <span style={{ fontSize: 25, color: 'white', fontWeight: "bold" }}>Back</span>
              </Link>

            </Menu.Item>
          </Menu>
        </Center>
      </Sider>
    );
  }

}

export default SideMenu;