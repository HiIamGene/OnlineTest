import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import SearchData from '../../components/SearchData';
import ScoreTestList from '../../components/ScoreTestList';

const { Title } = Typography;

function ScoreTest(props) {
  const [data, setData] = useState();
  const keyValue = "4";
  const form = 2;
  return (
    <Container>
      <Layout >   
        <SideMenu keyValue={keyValue}  form={form}/>
        <Layout style={{ marginLeft: 180 }}>
        <ContentContainer >
        <Head history={props.history}/>
            <Row gutter={16} type="flex" justify="space-around">
              <Col span={4} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>Data Communication</div>
              </Col>
              <Col span={18} ></Col>
              <Col span={8} offset={2} style={{ fontSize: 20, fontWeight: 'bold' }}> Test Name</Col>
              <Col span={3} offset={4} style={{ fontSize: 20, fontWeight: 'bold' }}> Member</Col>
              <Col span={7}  style={{ fontSize: 20, fontWeight: 'bold' }}>Process</Col>
              <Col span={22} offset={2} ><ScoreTestList/></Col>
            </Row>
          </ContentContainer>
        </Layout> 
      </Layout>
    </Container>
  );
}

export default ScoreTest;