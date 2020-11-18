import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button, Input,DatePicker,TimePicker } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';


const { Title } = Typography;
function onChange(date, dateString) {
  console.log(date, dateString);
}

function Class() {
  const [data, setData] = useState();
  const keyValue = "1";
  const form = 4;
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout>
          <Head />
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">
              <Col span={13} >
                <div style={{ height: 30 }} ></div>
                <div style={{  fontSize: 30, fontWeight: "bold",  display:"block" }} >
                  Topic : <Input style={{ width:850}} />
                </div>
                <div style={{  fontSize: 30, fontWeight: "bold",  display:"block" }} >
                  Description : <Input style={{ width:850}} />
                </div>
                <div style={{  fontSize: 30, fontWeight: "bold",  display:"block" }} >
                  Date start : <DatePicker onChange={onChange}  style={{ width:850}} />
                </div>
                <div style={{fontSize: 30, fontWeight: "bold",  display:"block" }} >
                  Time : <Input style={{ width:850}} />
                </div>
                <div style={{  fontSize: 30, fontWeight: "bold",  display:"block" }} >
                  Time start : <TimePicker onChange={onChange} style={{ width:850}} />
                </div>
              </Col>
              <Col span={2} >

              </Col>
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Class;