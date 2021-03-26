import React, { useState } from 'react';
import { Layout, Row, Col, Button, Select, Modal, Input } from 'antd';
import { ContentContainer, Container } from '../../components/Styles';
import SideMenu from '../../components/SideMen2';
import Head from '../../components/Head';
import TestInterface from '../../components/TestInterface';
import SearchData from '../../components/SearchData';
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function Test(props) {
  const [visible, setVisible] = useState(false);

  const keyValue = "1";
  const form = 1;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout style={{ marginLeft: 180 }} >
        
          <ContentContainer >
          <Head />
            <Row >
              <Col span={5} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>Your Test</div>
              </Col>
              <Col span={5} >
                <SearchData style={{ marginTop: 30, width: "100%" }} />
              </Col>
              <Col span={1} >
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: '100%', height: 32, marginTop: 30 }} >
                  <div style={{ font: 'Josefin Sans', fontSize: 10 }}>+</div>
                </Button>
              </Col>
              <Col span={11} ></Col>
            </Row>
            <Row>
              <Col span={23} offset={2}>
                <TestInterface />
              </Col>
            </Row>
           
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Test;