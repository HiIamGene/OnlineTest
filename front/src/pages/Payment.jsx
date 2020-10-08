import React from 'react';
import SideMenu from '../components/SideMenu';
import Head from '../components/Head';
import { Container, ContentContainer } from '../components/Styles';
import { Layout, Typography, Row, Col } from 'antd';
import PaymentMethod from '../components/AddPayment/PaymentMethod';
import PaymentList from '../components/AddPayment/PaymentList';
import AmountDue from '../components/AddPayment/AmountDue';

const { Title } = Typography;

const keyValue="4"
function Payment() {
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue}/>
        <Layout>
          <Head />
          <ContentContainer>
            <Title level={2}>Payment Settings</Title>
            <br />
            <Row type="flex" justify="space-around">
              <Col span={11} style={{ background: '#fff', borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15) ", padding: 24 }}>
                <PaymentMethod />
              </Col>
              <Col span={11} style={{ background: '#fff', borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)", padding: 24 }}>
                <PaymentList />
              </Col>

            </Row>
            <Layout style={{ padding: '20px 8px 0px' }}></Layout>
            <Title level={2}>Payment History</Title>
            <Row type="flex" justify="space-around">
              <Col span={23} style={{ background: '#fff', borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15) ", padding: 24 }}>
                <AmountDue/>
              </Col>
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Payment;