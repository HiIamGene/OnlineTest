import React, { useState,useEffect } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Profile from '../../assets/icon/Profile.png';
import API from "../../constants/api.jsx";
import instance from '../constants/action.js';
const { Title } = Typography;

function UserInfo(props) {
  const [UserInfo,setUserInfo] =useState( { })

  const keyValue = "2";
  const form = 1;
  useEffect(() => {
    instance.post(API.V1.TEACHER.INFO.GETINFO,{
        "Username": "testteacher"
    }, {

    } ).then(res => {
      setUserInfo(res.data)
    }).catch(err => {
        console.warn(err);
    })
}, []);
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout>
        <Head history={props.history}/>
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">
            </Row>
            <img src={Profile} style={{ height: 200, marginLeft: 150 }} />
            <div style={{ marginLeft: 150, fontSize: 30, fontWeight: "bold" }} >T.testteacher</div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >Name : {UserInfo.Firstname}</div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >Surname : {UserInfo.Surname}</div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >Teacher Id : {UserInfo.UserID}</div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >E-mail : {UserInfo.Email}</div>
            <div style={{  marginLeft: 1200,marginTop:200}}>
              <Button  style={{background:"#F43A09",color:"#ffffff",width:300,height:70,fontSize:30}}>Edit</Button>
            </div>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default UserInfo;