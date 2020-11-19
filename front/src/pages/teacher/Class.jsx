import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button, Select, Modal, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Classlist from '../../components/Classlist';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const { Title } = Typography;

function Class() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();

  const keyValue = "1";
  const form = 1;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout>
          <Head />
          <ContentContainer >
            <Row>
              <Col span={4} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>Your Class</div>
              </Col>
              <Col span={5} >
                <Select mode="tags" style={{ width: '100%', marginTop: 30 }} placeholder="Tags Mode" onChange={handleChange}>
                  {children}
                </Select>
              </Col>
              <Col span={1} >
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: '100%', height: 32, marginTop: 30 }} >
                  <div style={{ font: 'Josefin Sans', fontSize: 10 }}>Search</div>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={24} offset={2}>
                <Classlist />
              </Col>
            </Row>
            <div style={{ marginLeft: 1250, marginTop: 100 }}>
              <Button style={{ background: "#F43A09", color: "#ffffff", width: 300, height: 70, fontSize: 30 }} onClick={() => setVisible(true)}>Add Class</Button>
            </div>
            <Modal
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              width={1200}
            >

              <div style={{ fontSize: 30, display: "block", textAlign: "center" }} >
                Add Class
                </div>
              <div style={{ fontSize: 30, display: "block" }} >
                Course Code : <Input style={{ width: 850 }} />
              </div>
              <div style={{ fontSize: 30, display: "block" }} >
                Classname : <Input style={{ width: 850 }} />
              </div>

              <div style={{ fontSize: 30, display: "block" }} >
                Year : <Input style={{ width: 850 }} />
              </div>
              <div style={{ fontSize: 30, display: "block" }} >
                Permission :   <Select
                  labelInValue
                  defaultValue={{ value: 'private' }}
                  style={{ width: 120 }}
                  onChange={handleChange}
                >
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </div>

            </Modal>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Class;