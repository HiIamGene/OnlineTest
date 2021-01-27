import React, { useState,useEffect } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Profile from '../../assets/icon/Profile.png';
import API from "../../constants/api.jsx";
import axios from 'axios';
const { Title } = Typography;

function UserInfo(props) {
  const [UserInfo,setUserInfo] =useState( { })
  const [ edit, setEdit ] = useState(false);
  const keyValue = "2";
  const form = 1;
  const toggleEdit = () => {
    setEdit(!edit);
    //props.handleValue(adProp);
  }
  useEffect(() => {
    axios.post(API.V1.TEACHER.INFO.GETINFO,{
        "Username": "testteacher"
    }, {
        headers: {
            'Authorization': localStorage.getItem('token'),
        }
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
        <Head history={props.history}/>{edit?<div>
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">
            </Row>
            <img src={Profile} style={{ height: 200, marginLeft: 150 }} />
            <div style={{ marginLeft: 150, fontSize: 30, fontWeight: "bold" }} >T.testteacher</div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >Name : <input defaultValue={UserInfo.Firstname}></input></div>
            
            <div style={{ marginLeft: 150, fontSize: 30 }} >Surname : <input defaultValue={UserInfo.Surname}></input></div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >E-mail : <input defaultValue={UserInfo.Email} tyle={{height:50}}></input></div>
            <div style={{  marginLeft: 1200,marginTop:200}}>
              <Button onClick={toggleEdit} style={{background:"#F43A09",color:"#ffffff",width:300,height:70,fontSize:30}}>Save</Button>
            </div>
          </ContentContainer>
        </div>:<div>
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">
            </Row>
            <img src={Profile} style={{ height: 200, marginLeft: 150 }} />
            <div style={{ marginLeft: 150, fontSize: 30, fontWeight: "bold" }} >T.testteacher</div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >Name : {UserInfo.Firstname}</div>
            
            <div style={{ marginLeft: 150, fontSize: 30 }} >Surname : {UserInfo.Surname}</div>
            <div style={{ marginLeft: 150, fontSize: 30 }} >E-mail : {UserInfo.Email}</div>
            <div style={{  marginLeft: 1200,marginTop:200}}>
              <Button onClick={toggleEdit} style={{background:"#F43A09",color:"#ffffff",width:300,height:70,fontSize:30}}>Edit</Button>
            </div>
          </ContentContainer>
          </div>}
        </Layout>
      </Layout>
    </Container>
  );
}

export default UserInfo;