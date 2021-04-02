import React, { useEffect, useState } from "react"
import instance from '../../constants/action.js';
import API from "../../constants/api.jsx";
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Button, Popover } from 'antd';
import { ContentContainer, Container } from '../../components/Styles';
import SideMenu from '../../components/SideMen2';
import Head from '../../components/Head';
import TestInterface from '../../components/TestInterface';
import SearchData from '../../components/SearchData';
function Score(props) {
  useEffect(() => {
    instance.get(API.V1.STUDENT.SCORE
    ).then(res => {
      setDatas(res.data)
    }).catch(err => {
      console.warn(err);
    })
  }, []);
  const keyValue = "3";
  const form = 1;
  const [datas, setDatas] = useState([])
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout style={{ marginLeft: 180 }}>
          <ContentContainer >
            <Head />
            <Row >
              <Col span={22} offset={2}>
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>Your Score</div>
              </Col>

              {
                datas.map((data, index) => {
                  return (
                    <Popover content={<div>
                      <p>max : {data.max}</p>
                      <p>min : {data.min}</p>
                      <p>mean : {data.mean}</p>
                      <p>sd : {data.sd}</p>
                    </div>} title={data.topic}>
                      <Col span={22} offset={2}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#989898', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>

                          <Row>
                            <Col span={10}>{data.topic} </Col>
                            <Col span={14}>Score : {data.totalScore}</Col>
                          </Row>
                        </Button>
                      </Col>
                    </Popover>

                  )
                })
              }

            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  )
}


export default Score