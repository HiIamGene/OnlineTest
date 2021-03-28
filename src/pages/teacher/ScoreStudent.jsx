import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import ScoreStudentList from '../../components/ScoreStudentList';
import API from "../../constants/api.jsx";
import instance from '../../constants/action.js';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    test: state.scoreTest.test,
    header: state.scoreTest.header,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStudentList: (value) => dispatch({ type: 'setStudentList', studentList: value }),
  };
}
function ScoreTestStudent(props) {
  useEffect(() => {
    instance.get(API.V1.TEACHER.TESTBANK.ALLSTUDENTTESTBANK,
      {
        headers: {
          "TestId": props.test.testID,
          "Access-Control-Allow-Headers": "*"
        }
      }).then(res => {
        props.setStudentList(res.data)
      }).catch(err => {
        console.warn(err);
      });
  }, []);
  const [data, setData] = useState();
  const keyValue = "4";
  const form = 6;
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout style={{ marginLeft: 180 }}>
          <ContentContainer >
            <Head history={props.history} />

            <Row gutter={16} type="flex" justify="space-around">

              <Col span={10} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold', display: "inline-block" }}>{props.header.name}</div>
              </Col>

              <Col span={12} ></Col>
              <Col span={22} offset={2}> <div style={{ fontSize: 25, fontWeight: 'bold', display: "inline-block" }}>Student List</div></Col>
              <Col span={22} offset={2} ><ScoreStudentList /></Col>

            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreTestStudent);