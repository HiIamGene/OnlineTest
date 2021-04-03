import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import Profile from '../assets/icon/Profile.png';
import instance,{setAuth} from '../constants/action.js';
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
    setAuth()
    history.push('/')
  }
  useEffect(() => {
    /*if (localStorage.getItem('token')) {
      if (localStorage.getItem["role"] === "teacher") {
        props.history.push(`/Teacher/Course`)
      } 
      else if (localStorage.getItem["role"] === "student"){
        props.history.push(`/Student/Course`)
      }
    }*/ 
    instance.post(API.V1.USERNAME).then(res => {
      setUsername(res.data)
    }).catch(err => {
        console.warn(err);
    })
}, []);


  return (

      <Row style={{ marginTop:50 }}>
        <Col span={1} offset={1}>
          <img src={Profile} alt="Logo" style={{ width: 40 }} />
        </Col>
        <Col span={18} >
          <div style={{ fontSize: 30,marginRight:50}}>{username}</div>
        </Col>
        <Col span={4}>
            <a onClick={logout} style={{ fontSize:30,  textDecorationLine: 'underline'}} >
              Logout
            </a>
        </Col>
      </Row>

  );
}

export default Head;
