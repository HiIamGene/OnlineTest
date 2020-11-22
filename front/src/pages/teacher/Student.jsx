import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button, Select, Modal,Upload } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Profile from '../../assets/icon/Profile.png';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function Class() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const keyValue = "2";
  const form = 3;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  const props = {

    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        uid: '3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
      },
    ],
  };
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout>
          <Head />
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">
              <Col span={18} >
                <div style={{ color: "#AAAAAA", marginLeft: 140, fontSize: 50, fontWeight: 'bold', display: "inline-block" }}>
                  Student
                  </div>
              </Col>
              <Col span={1}>
               
              </Col>
              <Col span={4} ></Col>
              <Col span={24} offset={4} >
                <div><hr
                  style={{
                    color: "#AAAAAA",
                    backgroundColor: "#AAAAAA",
                    width: 1200,
                    height: 5,
                    marginRight: 470
                  }}
                /></div>
              </Col>
              <Col span={4} offset={2} >
                <Select mode="tags" style={{ marginLeft: 30, width: '100%', marginTop: 30 }} placeholder="Search" onChange={handleChange}>
                  {children}
                </Select>

              </Col>
              <Col span={1}  >
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%', background: '#F43A09', color: '#FFFFFF', width: '100%', height: 32, marginTop: 30 }} >
                  <div style={{ font: 'Josefin Sans', fontSize: 10 }}>+</div>
                </Button>

              </Col>
              <Col span={3}  >
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%', background: '#F43A09', color: '#FFFFFF', width: '100%', height: 32, marginTop: 30 }} onClick={() => setVisible(true)} >
                  <div style={{ font: 'Josefin Sans', fontSize: 15 }}>Upload</div>
                </Button>

              </Col>
              <Col span={14}></Col>
              <Col span={24} offset={4} >
                <div style={{ marginLeft: 30, paddingTop: 10, fontSize: 30, textAlign: 'left' }}><img src={Profile} style={{ width: 50, height: 50 }}></img>    60010001  Hunt  Danita </div>
                <div style={{ marginLeft: 30, paddingTop: 10, fontSize: 30, textAlign: 'left' }}><img src={Profile} style={{ width: 50, height: 50 }}></img>    60010002  Alexander  Shawna</div>
                <div style={{ marginLeft: 30, paddingTop: 10, fontSize: 30, textAlign: 'left' }}><img src={Profile} style={{ width: 50, height: 50 }}></img>    60010003  Castillo  Thea</div>
              </Col>
              <Col span={24} offset={2}>
                <div style={{ color: "#AAAAAA", marginLeft: 100, fontSize: 30, fontWeight: 'bold', display: "inline-block" }}>
                  Pending
                  </div>
                <Col span={24} offset={1} >
                  <div style={{ marginLeft: 25, paddingTop: 10, fontSize: 30, textAlign: 'left' }}><img src={Profile} style={{ width: 50, height: 50 }}></img>    60010004  Ford  Claudius </div>
                  <div style={{ marginLeft: 25, paddingTop: 10, fontSize: 30, textAlign: 'left' }}><img src={Profile} style={{ width: 50, height: 50 }}></img>    60010005  Morrison  Leondrea  </div>
                </Col>

              </Col>
            </Row>
            <Modal
              title="Add Student by upload .XML file"
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              width={1200}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Modal>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Class;