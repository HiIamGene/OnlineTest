import React, { useState } from 'react';
import { Layout, Row, Col, Button, Select, Modal, Input } from 'antd';
import { ContentContainer, Container } from '../../components/Styles';
import SideMenu from '../../components/SideMen2';
import Head from '../../components/Head';
import Classlist from '../../components/Courselist_s';
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function Course(props) {
  const [visible, setVisible] = useState(false);

  const keyValue = "2";
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
              <Col span={22} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>Your Course</div>
              </Col>

            </Row>
            <Row>
              <Col span={23} offset={2}>
                <Classlist />
              </Col>
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Course;