import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Profile from '../../assets/icon/Profile.png';

const { Title } = Typography;

function Class() {
  const [data, setData] = useState();
  const keyValue = "2";
  const form = 1;
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout>
          <Head />
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">
            </Row>
            <img src={Profile} style={{ height: 200 , marginLeft: 100}} />
            หกดหกดหกวสาดสวกหาสาสาแปวอกไหาสฟาหกวสฟหากสวฟาหก
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Class;