import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Profile from '../../assets/icon/Profile.png';

const { Title } = Typography;

function Class() {
  const UserInfo = { name: "Somchai", surname: "Charoendee", teacherId: "0000001", email: "0000001@kmitl.ac.th" }

  const keyValue = "2";
  const form = 1;
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout>
          <Head />
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">
            </Row>
            <img src={Profile} style={{ height: 200, marginLeft: 150 }} />
            <div style={{ marginLeft: 150, fontSize: 30, fontWeight: "bold" }} >T.{UserInfo.name}</div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >Name : {UserInfo.name}</div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >Surname : {UserInfo.surname}</div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >Teacher Id : {UserInfo.teacherId}</div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >E-mail : {UserInfo.email}</div>
            <div style={{  marginLeft: 1200,marginTop:200}}>
              <Button  style={{background:"#F43A09",color:"#ffffff",width:300,height:70,fontSize:30}}>Edit</Button>
            </div>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Class;