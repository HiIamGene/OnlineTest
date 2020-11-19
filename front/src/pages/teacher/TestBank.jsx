import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Classlist from '../../components/ClassList';
import SearchData from '../../components/SearchData';

const { Title } = Typography;

function Class() {
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
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>TestBank</div>
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
                <Classlist />
              </Col>
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container >
  );
}

export default Class;