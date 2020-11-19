import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import ScoreStudentList from '../../components/ScoreStudentList';
import { PropertySafetyFilled } from '@ant-design/icons';

const { Title } = Typography;

function ScoreTestStudent() {
  const [data, setData] = useState();
  const keyValue = "4";
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
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>90010103  UX&UI</div>
              </Col>
              <Col span={6} >

              </Col>
              <Col span={12} ></Col>
              <Col span={22} offset={2} ><ScoreStudentList/></Col>
              
            </Row>
          </ContentContainer>
        </Layout> 
      </Layout>
    </Container>
  );
}

export default ScoreTestStudent;