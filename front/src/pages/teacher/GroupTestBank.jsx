import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import GroupTestBankList from '../../components/GroupTestBankList';
import SearchData from '../../components/SearchData';

const { Title } = Typography;

function GroupTestBank() {
  const [data, setData] = useState();
  const keyValue = "3";
  const form = 2;
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout>
          <Head />
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">

              <Col span={4} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>UX&UI</div>
              </Col>
              <Col span={5} >
                <SearchData style={{ marginTop: 30, width: "100%" }} />
              </Col>
              <Col span={1} >
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: '100%', height: 32, marginTop: 30 }} >
                  <div style={{ font: 'Josefin Sans', fontSize: 10 }}>Search</div>
                </Button>
              </Col>
              <Col span={12} ></Col>

              <Col span={22} offset={2} >
                <GroupTestBankList />
              </Col>
              <Col span={24} style={{height:300}}></Col>
              <Col span={1} offset={16}>
                <div style={{ marginTop: 30, fontSize: 30 }}>
                  <Button type="primary" shape="circle" size="large" style={{  justifyContent: 'center', alignContent: 'center', background: '#F43A09', color: '#FFFFFF', width: 70, height: 70 }}>
                    <div style={{ fontSize: 30 }}>+</div>
                  </Button>
                </div>
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

export default GroupTestBank;