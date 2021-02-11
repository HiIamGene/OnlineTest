import React, { useEffect, useState } from "react"
import {  Button, message } from 'antd';
import { Layout, Typography, Row, Col, Input, DatePicker, TimePicker, Switch } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';

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


            <ContentContainer >
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
              </Row>
            </ContentContainer>
      </Container>

    </>
  );
};

export default Detail
