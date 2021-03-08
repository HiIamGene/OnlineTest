import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import TestBanklist from '../../components/testBanklist';
import instance from '../../constants/action.js';
import API from "../../constants/api.jsx";
import { v4 as uuid } from "uuid";
const { Title } = Typography;

function TestBank(props) {
  useEffect(() => {

    instance.get(API.V1.TEACHER.COURSE.TEST.ALLGROUPTESTLISTestlist, {
      "CourseCode": localStorage.getItem('courseCode')
    }, {
    }).then(res => {
      setListGroupTest(res.data)
    }).catch(err => {
      console.warn(err);
    });
  }, []);
  const newGroup = 
{
  "id": uuid(),
  "groupName": "",
  "questionList": []
}
  const AddGroups =()=>{
    setListGroupTest({...listGroupTest,newGroup})
    instance.post(API.V1.TEACHER.COURSE.TEST.ALLGROUPTESTLISTestlist, listGroupTest,{
      "CourseCode": localStorage.getItem('courseCode')
    }, {
    }).then(res => {
    }).catch(err => {
      console.warn(err);
    });
  }
  const [listGroupTest, setListGroupTest] = useState([])
  const [data, setData] = useState();
  const keyValue = "3";
  const form = 2;
  return (
    <Container>
      <Layout style={{ marginLeft: 180 }}>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout>
          <ContentContainer >
            <Head history={props.history} />

            <Row gutter={16} type="flex" justify="space-around">

              <Col span={4} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>TestBank</div>
              </Col>

              <Col span={1} >
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: '100%', height: 32, marginTop: 30 }} >
                  <div style={{ font: 'Josefin Sans', fontSize: 10 }} onClick={()=>AddGroups()}>+</div>
                </Button>
              </Col>
              <Col span={5} >
              </Col>
              <Col span={12} ></Col>

              <Col span={22} offset={2} >
                <TestBanklist listGroupTest={listGroupTest}/>
              </Col>

            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container >
  );
}

export default TestBank;