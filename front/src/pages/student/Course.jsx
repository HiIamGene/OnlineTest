import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button, Select, Modal, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Classlist from '../../components/Classlist';
import Search from 'antd/lib/input/Search';
import SearchData from '../../components/SearchData';
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const { Title } = Typography;

function Course(props) {
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
          <Head history={props.history}/>
          <ContentContainer >
            <Row >
              <Col span={5} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>Your Course</div>
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
            </Row>
            <Row>
              <Col span={24} offset={2}>
                <Classlist />
              </Col>
            </Row>
            <div style={{ marginLeft: 1250, marginTop: 100 }}>
              <Button style={{ background: "#F43A09", color: "#ffffff", width: 300, height: 70, fontSize: 30 }} onClick={() => setVisible(true)}>Add Course</Button>
            </div>
            <Modal
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              width={1200}

            >
              <Row gutter={16} type="flex" justify="space-around">
                <Col span={24}>
                  <div style={{ fontSize: 30, display: "block", textAlign: "center" }} >
                    Add Course
                  </div>
                </Col>
                <Col span={4}>
                  <div style={{ fontSize: 25, display: "block" }} >
                    Course id :
                </div>

                </Col>
                <Col span={20}>
                  <Input style={{ fontSize: 20, width: 850 }} />
                </Col>
                <Col span={4}>
                  <div style={{ fontSize: 25, display: "block" }} >
                    Course name :
                </div>

                </Col>
                <Col span={20}>
                  <Input style={{ fontSize: 20, width: 850 }} />
                </Col>
                <Col span={4}>
                  <div style={{ fontSize: 25, display: "block" }} >
                    Year :
                </div>

                </Col>
                <Col span={20}>
                  <Input style={{ fontSize: 20, width: 850 }} />
                </Col>
                <Col span={4}>
                  <div style={{ fontSize: 25, display: "block" }} >
                    Permission :
                    </div>
                </Col>
                <Col span={20}><Select
                  labelInValue
                  defaultValue={{ value: 'private' }}
                  style={{ width: 120 ,fontSize:20 }}
                  onChange={handleChange}
                >

                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>

                </Col>
              </Row>

            </Modal>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Course;