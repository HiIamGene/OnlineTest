import React, { useState } from 'react';
import axios from 'axios';
import { Layout, Typography, Row, Col, Button, message } from 'antd';
import SideMenu from '../components/SideMenu';
import Head from '../components/Head';
import Audience from '../components/AddCampaign/Audience';
import Delivery from '../components/AddCampaign/Delivery';
import Bidding from '../components/AddCampaign/Bidding';
import AdProperty from '../components/AddCampaign/AdProperty';

import { Container, ContentContainer, HeadlineWrapper } from '../components/Styles';
const { Footer } = Layout;
const { Title } = Typography;

const initialState = {
  name: "Awesome Ads",
  owner: "borbier",
  adType: "Image",
  fileURL: "",
  shortDescription: "Sale with 200%.",
  displayTime: {
    initialTime: "7:00",
    endTime: "22:00",
    timePeriod: 20
  },
  location: {
    type: "Point",
    coordinates: [13.730130307852061, 100.7841968536377]
  },
  radius: 500,
  gender: {
    male: false,
    female: false
  },
  age: {
    age0_13: false,
    age15_23: false,
    age25_35: false,
    age35_43: false,
    age43_53: false,
    age55: false
  },
  budget: 3000
};

function AddCampaign() {
  const [state, setState] = useState(initialState);

  function onChangeBudget(newBudget) {
    setState({ ...state, budget: newBudget });
  }

  function onChangeAudience(newAudienceData) {
    setState({
      ...state,
      gender: newAudienceData.gender,
      age: newAudienceData.age
    });
  }

  function onChangeDelivery(newDeliveryData) {
    setState({
      ...state,
      displayTime: newDeliveryData.displayTime,
      location: newDeliveryData.location
    })
  }

  function onChangeAdProp(newAdProp) {
    setState({
      ...state,
      name: newAdProp.name,
      adType: newAdProp.adType,
      fileURL: newAdProp.fileURL,
      shortDescription: newAdProp.shortDescription
    })
  }

  function handleData() {
    axios.post("https://api.eikon.asia/v1/ad", state, {
      'Content-Type': 'application/json'
    }).then(res => {
      message.success('Advertisement is added.');
    }).catch(err => {
      message.error("Error during add advertisement.");
    });
    setState(initialState);
  }
  

  return (
    <Container>
      <Layout>
        <SideMenu/>
        <Layout>
          <Head />
          <ContentContainer>
            <HeadlineWrapper >
              <Title level={2}>Add Campaign</Title>
              <Button
                type="primary"
                size="large"
                onClick={handleData}
                style={{background: '#2FADB9'}}
                >Submit</Button>
            </HeadlineWrapper>
            <Row gutter={16}>
              <Col span={12} >
                <Audience
                  age={state.age}
                  gender={state.gender}
                  handleValue={onChangeAudience}
                />
                <Delivery
                  displayTime={state.displayTime}
                  location={state.location.coordinates}
                  radius={state.radius}
                  handleValue={onChangeDelivery}
                />
                <Bidding
                  budget={state.budget}
                  handleValue={onChangeBudget}
                />
              </Col>
              <Col span={12}>
                <AdProperty
                  name={state.name}
                  adType={state.adType}
                  displayTime={state.adType}
                  shortDescription={state.shortDescription}
                  fileURL={state.fileURL}
                  handleValue={onChangeAdProp}
                />
              </Col>
            </Row>
          </ContentContainer>
          <Footer></Footer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default AddCampaign;
