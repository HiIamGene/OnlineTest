import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';


const { Title } = Typography;

function Class() {
  const [data, setData] = useState();
  const keyValue = "1";
  const form = 2;
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout>
          <Head />
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">
              <Col style={{ marginRight: "120px" }} span={18} >
                <div style={{ height: 10 }}>
                </div>
                <div style={{ background: "#FFB766", height: 250 }}>
                  <div style={{ height: "30px" }}></div>
                  <div style={{ marginLeft: "55px", height: "15px" }}>
                    <div style={{ fontSize: 30, color: "#ffffff", fontWeight: "bold" }}>UX&UI
                    </div>
                    <div style={{ fontSize: 30, color: "#ffffff", height: 100 }}>เป็นวิชาเกี่ยวกับส่วนของ interface ที่ติดต่อกับ user</div>
                    <div style={{ fontSize: 20, color: "#ffffff" }}>class code: 2n4o5r4</div>
                  </div>
                </div>

              </Col>

            </Row>
            <div style={{ height: 20 }}></div>
            <Row>
              <Col span={4} offset={2}>
                <div style={{ marginLeft: 11, background: "#FFB766", height: 250, width: 250 }}>
                  <div style={{ height: "15px" }}></div>
                  <div style={{ fontSize: 30, color: "#ffffff", height: 250, marginLeft: 20, fontWeight: "bold" }}>Announce</div>
                </div>
              </Col>
              <Col span={15}  >
              <NavLink to="/Detail">
                <div style={{ marginLeft: 11, marginRight: 62, background: "#FFB766", height: 125, }}>
                  <div style={{ height: "15px" }}></div>
                  <div style={{ fontSize: 30, color: "#ffffff", marginLeft: 40, fontWeight: "bold" }}>สอบบทที่ 1</div>
                  <div style={{ fontSize: 20, color: "#ffffff", marginLeft: 80, fontWeight: "bold" }}>Date 9/9/99</div>
                </div>
              </NavLink>
                <div style={{ height: 20 }}></div>
                <div style={{ marginLeft: 11, marginRight: 62, background: "#AAAAAA", height: 125 }}>
                  <div style={{ height: "15px" }}></div>
                  <div style={{ fontSize: 30, color: "#ffffff", marginLeft: 40, fontWeight: "bold" }}>สอบบทที่ 2</div>
                  <div style={{ fontSize: 20, color: "#ffffff", marginLeft: 80, fontWeight: "bold" }}>Date 10/9/99</div>
                </div>
              </Col>
            </Row>
            <Button>Add Test</Button>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Class;