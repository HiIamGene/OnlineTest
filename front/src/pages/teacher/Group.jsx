import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Grouplist from '../../components/Grouplist';

const { Title } = Typography;

function Class() {
  const [data, setData] = useState();
  const keyValue = "2";
  const form = 4;
  return (
    <Container>
      <Layout>   
        <SideMenu keyValue={keyValue}  form={form}/>
        <Layout>
        <Head />
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">
              <Grouplist/>
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Class;