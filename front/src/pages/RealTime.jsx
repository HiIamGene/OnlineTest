import React from 'react';
import SideMenu from '../components/SideMenu';
import Head from '../components/Head';
import { Container, ContentContainer } from '../components/Styles';
import { Layout, Typography, Row, Col } from 'antd';
import Chart from '../components/AddRealtime/Chart';
import RealtimeList from '../components/AddRealtime/RealtimeList';

const { Title } = Typography;
let readings = [
  {
      name: 'Male',
      value: 44.6,
      color: '#2980AE'
  },
  {
      name: 'Female',
      value: 55.4,
      color: '#22a6b3'
  },

];
let readings2 = [
  {
      name: '0-14',
      value: 10,
      color: '#D5D5D5'
  },
  {
      name: '15-24',
      value: 23,
      color: '#C6C6C6'
  },
  {
      name: '25-34',
      value: 35,
      color: '#A2A2A2'
  },
  {
      name: '35-44',
      value: 17,
      color: '#808080'
  },
  {
      name: '45 >=',
      value: 15,
      color: '#4D4D4D'
  }
];

function RealTime() {
  const keyValue="2"
  return( 
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue}/>
        <Layout>
          <Head />
          <ContentContainer>
            <Title level={2}>RealTime</Title>
            <br />
            <Row type="flex" justify="space-around">
              <Col span={13} style={{ background: '#fff',borderRadius:'18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)", padding: 24 }}>


              </Col>
              <Col span={10} style={{background: '#fff',borderRadius:'18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)"}}>


                <Col span={24} style={{ background: '#2FADB9' ,borderRadius:'18px'}}>

                  <Title level={2} style={{ color: '#fff', marginLeft: 10 }}>Heat Maps</Title>
                </Col>
              </Col>
              </Row>
              <Layout style={{ padding: '20px 8px 0px' }}></Layout>
              <Row type="flex" justify="space-around">
       
                <Col span={13} style={{ background: '#fff',borderRadius:'18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)" }}>
                <RealtimeList />
               </Col>
               <Col span={10} style={{ background: '#fff',borderRadius:'18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)" }}>
               <Title level={4} style={{padding:"20px 20px"}}>Demographic</Title>
               <Chart readings={readings}/>
               <Chart readings={readings2}/>
               </Col>
              
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default RealTime;