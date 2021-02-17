import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button, Switch,Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Grouplist from '../../components/Grouplist';

const { Title } = Typography;

function Group(props) {
  const [data, setData] = useState();
  const keyValue = "2";
  const form = 4;
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout  style={{ marginLeft: 180 }}>
        <ContentContainer >
        <Head history={props.history}/>
            <Row gutter={16} type="flex" justify="space-around">
              <Col span={22} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold', color: "#808080" }}>สอบบทที่ 1</div>
                <div style={{marginLeft:2, fontSize: 30, fontWeight: 'bold', color: "#808080" }}>Edit Test</div> 
              </Col>
              <Col span={22} offset={2}>
                <Grouplist />
              </Col>
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
    </Container >
  );
}

export default Group;