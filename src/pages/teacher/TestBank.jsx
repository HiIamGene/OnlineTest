import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button,Input} from 'antd';
import { Link } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import TestBanklist from '../../components/testBanklist';
import instance from '../../constants/action.js';
import API from "../../constants/api.jsx";
import { v4 as uuid } from "uuid";
import { connect } from 'react-redux';
const { Title } = Typography;
const mapStateToProps = state => {
  return {
    groupTestList: state.testBank.groupTestList,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setGroupTestList:  (value) => dispatch({ type: 'setGroupTestList', groupTestList: value }),
  };
}

function TestBank(props) {


  const AddGroups = () => {
    props.groupTestList.push(newGroup)
    props.setGroupTestList([ ...props.groupTestList ])
    instance.post(API.V1.TEACHER.COURSE.TEST.GROUPTESTLIST, props.groupTestList, {headers: {
      "CourseID": localStorage.getItem('courseID'),
      "Access-Control-Allow-Headers": "*"
    }}).then(res => {
    }).catch(err => {
      console.warn(err);
    });
  }

  const [input, setInput] = useState("");
  const newGroup =
  {
    "id": uuid(),
    "groupName": input,
    "numQuestion":"",
    "maxQuestion":"",
    "score":"",
    "questionList":[]
  }
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
              <Col span={5} style={{ marginTop: 20 }} >
                <Input placeholder="Group Name" style={{ marginLeft: 15,fontSize:20, width: '100%' }} onChange={e=>setInput(e.target.value)}></Input>
              </Col>
              <Col span={1} >
                <Button onClick={() => AddGroups()} type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: '100%', height: 40, marginTop: 20 }} >
                  <div style={{  fontSize: 20 }} >+</div>
                </Button>
              </Col>
             
              <Col span={12} ></Col>

              <Col span={22} offset={2} >
                <TestBanklist/>
              </Col>

            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TestBank);