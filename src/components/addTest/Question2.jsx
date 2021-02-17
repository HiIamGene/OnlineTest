import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button,Switch } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../Styles';
import SideMenu from '../SideMenu';
import Head from '../Head';
import QuestionList from '../QuestionList';

function Question(props) {
  const [data, setData] = useState();
  const keyValue = "2";
  const form = 4;
  return (
    <Container>
      <Layout>   
        <SideMenu keyValue={keyValue}  form={form}/>
        <Layout>
        <ContentContainer >
        <Head history={props.history}/>
            <Row gutter={16} type="flex" justify="space-around">
            <Col span={22} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>การออกแบบUI</div>
              </Col>
              <QuestionList/>
              <Col span={1} offset={16}>
                <div style={{ marginTop: 35 ,fontSize: 30 }}>
                  Draft
                </div>
              </Col>
              <Col span={1} >
                <Switch defaultChecked style={{ marginTop: 50 }} />
              </Col>
              <Col span={6}>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: 300, height: 70, marginTop: 30 }} >
                  <div style={{ fontSize: 30 }}>Save</div>
                </Button>
              </Col>
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Question;