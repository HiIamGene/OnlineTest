import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import Profile from '../assets/icon/Profile.png';
import axios from 'axios';
import API from "../constants/api.jsx"
import history from "./../utils/history";


const ContainerHead = styled.div`
padding: 20;
width: "100%";
margin-left: 30px;
margin-right: 30px;   
margin-top:10px;

`

function Head(props) {
  const [username,setUsername] = useState([])
  const logout = () => {
    localStorage.clear();
    history.push('/')
    window.location.reload()
  }
  useEffect(() => {
    axios.post(API.V1.USERNAME,{
    }, {
        headers: {
            'Authorization': localStorage.getItem('token'),
        }
    } ).then(res => {
      setUsername(res.data)
    }).catch(err => {
        console.warn(err);
    })
}, []);


  return (
    <div>
      <Row>
        <Col span={1} offset={2}>
          <img src={Profile} alt="Logo" style={{ width: 40, marginTop: 60, marginLeft: 30 }} />
        </Col>
        <Col span={17} >
          <div style={{ fontSize: 30, marginTop: 55 }}>{username}</div>
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
