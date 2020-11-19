import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Classlist from '../../components/Classlist';

const { Title } = Typography;

function Class() {
  const [data, setData] = useState();
  const keyValue = "3";
  const form = 2;
  return (
    <Container>
      <Layout>   
        <SideMenu keyValue={keyValue}  form={form}/>
        <Layout>
        <Head />
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">
            <Col span={4} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>Your Class</div>
              </Col>
                <Classlist/>
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Class;