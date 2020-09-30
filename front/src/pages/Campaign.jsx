import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../components/Styles';
import SideMenu from '../components/SideMenu';
import Head from '../components/Head';
import CampaignList from '../components/CampaignList'

const { Title } = Typography;

function Campaign() {
  const [data, setData] = useState();
  //const [loading, setLoading] = useState(true);

  useEffect(() => {

    Axios.get('https://api-dev.eikon.asia/v1/ad/list/borbier').then((res) => {
      //alert(JSON.stringify(res.data));
      if (res.data) {
        setData(res.data);
        //setLoading(false);
      }


    });
  }, []);
  /*if (data) {
    data.forEach(function(ad, index) {
      ad.key = index;
      console.log(ad);
    })
  }*/
  /*useEffect(async() => {
    const dataset = await Axios.get('https://api-dev.eikon.asia/v1/ad/list/borbier',);
    setData(dataset.data);
    if (data) {
      data.forEach(function(ad, index) {
        ad.key = index;
        console.log(ad);
      })
    }
    });*/

    const keyValue="3";
  return (
    <Container>
      <Layout>
          <SideMenu keyValue={keyValue}/>
        <Layout>
          <Head />
          <ContentContainer >
            <HeadlineWrapper>
              <Title level={2}>Campaign</Title>
              <NavLink to="/campaign/add">
                <Button type="primary" size="large" style={{ background: "#2FADB9" }}>Add New</Button>
              </NavLink>
            </HeadlineWrapper>
            <Row gutter={16} type="flex" justify="space-around">
              <br />
              <Col span={23} style={{ background: '#fff', borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)" }}>
                <CampaignList campaigns={data} />
              </Col>
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Campaign;