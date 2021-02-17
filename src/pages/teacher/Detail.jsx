import React, { useEffect, useState } from "react"
import { Steps, Button, message } from 'antd';
import { Layout, Typography, Row, Col, Input, DatePicker, TimePicker, Switch } from 'antd';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Detail from '../../components/addTest/Detail'
import Group from '../../components/addTest/group'
import axios from 'axios';
import API from "../../constants/api.jsx";
const { Step } = Steps;

const steps = [
  {

  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];


class AddTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      keyValue: "1",
      form: 4
    };
  }
  next = () => {
    this.setState({ current: this.state.current + 1 });
  };

  prev = () => {
    this.setState({ current: this.state.current - 1 });
  };
  onChange = (current) => {
    this.setState({ current: current });
  };
  render() {
    return (
      <>
        <Container>
          <Layout>
            <SideMenu keyValue={this.state.keyValue} form={this.state.form} />
            <Layout>
              <Head />
              <ContentContainer >
                <Steps
                  type="navigation"
                  current={this.state.current}
                  onChange={this.onChange}
                  className="site-navigation-steps"
                >
                  <Step status="finish" title="Detail" />
                  <Step status="process" title="Group" />
                  <Step status="process" title="Question list" />
                  <Step status="process" title="Edit question" />
                </Steps>
                <div className="steps-content">
                  {this.state.current === 0 && (
                    <Detail />
                  )}
                  {this.state.current === 1 && (
                    <Group />
                  )}
                  {this.state.current === 2 && (
                    <Detail />
                  )}
                  {this.state.current === 3 && (
                    <Detail />
                  )}
                </div>
                <div sclassName="steps-action" tyle={{fontSize: 30 }}>
                    Draft
               
                <Switch style={{ margin: '0 8px' }} defaultChecked ></Switch>
              
                  {this.state.current > 0 && (
                      <Button onClick={() => this.prev()}>
                        Previous
                    </Button>

                  )}
                  {this.state.current < steps.length - 1 && (
                       
                    <Button style={{ margin: '0 8px' }} type="primary" onClick={() => this.next()}>
                      Next
                    </Button>
                  )}
                  {this.state.current === steps.length - 1 && (

                    <Button style={{ margin: '0 8px' }} type="primary" onClick={() => message.success('Processing complete!')}>
                      Save
                    </Button>
                  )}
                </div>
              </ContentContainer>
            </Layout>
          </Layout>
        </Container>

      </>
    );
  }
};

export default AddTest
