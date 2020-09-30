import React   from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import logo from '../assets/img/eikon-logo.svg';
import acquistion_logo from '../assets/img/acquistion.svg';
import realtime_logo from '../assets/img/realtime.svg';
import campaign_logo from '../assets/img/campaigns.svg';
import payment_logo from '../assets/img/payment.svg'

const { Sider } = Layout;

const MenuIcon = styled.img`
width: 40px;
height: 40px;
  padding: 5px;
`

const Branding = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 16px 5px 5px 5px;
`
const center = styled.div`
  margin: auto;
  width: 50%;
  padding: 10px;
  `

function SideMenu(props) {
  return (
    <Sider
      collapsedWidth="500"
      theme="light"
    >
      <div style={{ height: 110 }}>
       
      </div>
      <center>
      <Menu mode="inline"  defaultSelectedKeys={[props.keyValue]}>
        <Menu.Item key="1"style={{height: "85px"}} value="1" >
          <NavLink to="/acquisition">
            <MenuIcon src={acquistion_logo} style={{ height: "40px" }}  />
            <br />
            <span>Acquistion</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="2"style={{height: "85px"}} value="2">
          <NavLink to="/realtime">
            <MenuIcon src={realtime_logo} style={{ height: "40px" }} />
            <br />
            <span>Realtime</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="3"style={{height: "85px"}} value="3">
          <NavLink to="/campaign">
            <MenuIcon src={campaign_logo} style={{ height: "40px" }} />
            <br />
            <span>Campaigns</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="4"style={{height: "85px"}} value="4">
          <NavLink to="/payment">
            <MenuIcon src={payment_logo} style={{ height: "40px" }} />
            <br />
            <span>Payment</span>
          </NavLink>
        </Menu.Item>
      </Menu>
      </center>
    </Sider>
  );
}

export default SideMenu;
//defaultSelectedKeys={['4']}
// <Branding src={logo} style={{ height: 50, marginTop: 40 }} />