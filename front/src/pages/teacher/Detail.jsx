import React, { useEffect, useState } from "react"
import { Steps, Button, message } from 'antd';
import { Layout, Typography, Row, Col, Input, DatePicker, TimePicker, Switch } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
const { Step } = Steps;

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];
function onChange(date, dateString) {
  console.log(date, dateString);
}

function Detail(props) {
  const [data, setData] = useState();
  const keyValue = "1";
  const form = 4;
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Container>
        <Layout>
          <SideMenu keyValue={keyValue} form={form} />
          <Layout>
            <Head history={props.history} />
            <ContentContainer >
              <Steps current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">{steps[current].content}</div>

              <Row gutter={16} type="flex" justify="space-around">

                <div style={{ height: 30 }} ></div>
                <Col span={22} offset={2} >
                  <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
                    Topic :
                  <br />
                    <Input style={{ width: 850 }} />
                  </div>
                </Col>
                <Col span={22} offset={2} >
                  <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
                    Description :
                  <br />
                    <Input style={{ width: 850 }} />
                  </div>
                </Col>
                <Col span={22} offset={2} >
                  <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
                    Date start :
                  <br />
                    <DatePicker onChange={onChange} style={{ width: 850 }} />
                  </div>
                </Col>
                <Col span={22} offset={2} >
                  <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
                    Duration :
                  <br />
                    <Input style={{ width: 850 }} />
                  </div>
                </Col>
                <Col span={22} offset={2} >
                  <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
                    Time start :
                  <br />
                    <TimePicker onChange={onChange} style={{ width: 850 }} />
                  </div>
                </Col>
                <Col span={1} offset={16}>
                  <div style={{ marginTop: 35, fontSize: 30 }}>
                    Draft
                </div>
                </Col>
                <Col span={1} >
                  <Switch defaultChecked style={{ marginTop: 50 }} />
                </Col>
                <Col span={6}>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: 300, height: 70, marginTop: 30 }} >
                    <div style={{ fontSize: 30 }}>Save</div>
                  </Button>
                </Col>
              </Row>
              <div className="steps-action">
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Save
                  </Button>
                )}
                {current > 0 && (
                  <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Previous
                  </Button>
                )}
              </div>
            </ContentContainer>
          </Layout>
        </Layout>
      </Container>

    </>
  );
};

export default Detail
