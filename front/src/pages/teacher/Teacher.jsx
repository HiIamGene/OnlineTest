import React, { useState } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';

import Teacherlist from '../../components/Teacherlist';


function Teacher(props) {
  const keyValue = "1";
  const form = 3;
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
                  Teacher
                  </div>
              </Col>
              <Col span={1}>
                <Button type="link" style={{ color: "#AAAAAA", fontSize: 50, fontWeight: 'bold', display: "inline-block" }}> +</Button>
              </Col>
              <Col span={4} ></Col>
              <Col span={24}offset={4} >
                <div><hr
                  style={{
                    color: "#AAAAAA",
                    backgroundColor: "#AAAAAA",
                    width: 1200,
                    height: 5,
                    marginRight: 470
                  }}
                  
                /></div>
                  <Teacherlist/>
              </Col>
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Teacher;