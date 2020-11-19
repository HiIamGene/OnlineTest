import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button, Switch } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Grouplist from '../../components/Grouplist';

const { Title } = Typography;

function Class() {
  const [data, setData] = useState();
  const keyValue = "2";
  const form = 4;
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout>
          <Head />
          <ContentContainer >

            <Row gutter={16} type="flex" justify="space-around">
              <Col span={22} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold' ,color:"#808080"}}>สอบบทที่ 1</div>
                <div style={{ fontSize: 50, fontWeight: 'bold' ,color:"#808080"}}>จงเลือกคำตอบที่ถูกที่สุด</div>
              </Col>
              <Col span={22} offset={2}>
                <Grouplist />
              </Col>
              <Col span={1} offset={17}>
                <Switch defaultChecked style={{ marginTop: 35 }} />
              </Col>
              <Col span={6}>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: '100%', height: 40, marginTop: 30 }} >
                  <div style={{ font: 'Josefin Sans', fontSize: 20 }}>Save</div>
                </Button>
              </Col>
            </Row>

          </ContentContainer>
        </Layout>
      </Layout>
    </Container >
  );
}

export default Class;