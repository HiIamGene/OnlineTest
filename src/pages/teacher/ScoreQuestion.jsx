import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button, Pagination } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import ScoreStudentList from '../../components/ScoreStudentList';
import { PropertySafetyFilled } from '@ant-design/icons';

const { Title } = Typography;
function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
}
function ScoreQuestion(props) {
    const [current, setcurrent] = useState(1);
    const keyValue = "4";
    const form = 2;
    const onChange = page => {
        console.log(page);
        setcurrent(page);
    };
    return (
        <Container>
            <Layout>
                <SideMenu keyValue={keyValue} form={form} />
                <Layout>
                <Head history={props.history}/>
                    <ContentContainer >
                        <Row gutter={16} type="flex" justify="space-around">
                            <Col span={19} offset={2}>
                                <div style={{ fontSize: 50, fontWeight: 'bold', display: "inline-block" }}>Data Communication - 60010001</div>
                            </Col>

                            <Col span={2} ></Col>
                            <Col span={21} offset={2}>
                                <div style={{ fontSize: 40 }}>1. Data Communication ในมุมมองของนักศึกษาหมายถึงอะไร ?</div>
                                <br/>
                                <br/>
                                <br/>
                                <div style={{ fontSize: 30 }}>Answer: การส่งเนื้อหาข้อมูลจากฝ่ายหนึ่งไปยังอีกฝ่ายหนึ่งในรูปแบบใดก็ได้</div>

                            </Col>
                            <Col span={24} style={{height:300}}></Col>
                            <Col span={2} offset={19} style={{ fontSize: 30 }}>
                                Score

                            </Col>
                            <Col span={1} style={{ fontSize: 30 }}>
                                <input style={{ marginTop: 10, height: 35, width: 35 }} />

                            </Col>
                            <Col span={1} style={{ fontSize: 30 }}>
                                /6

                            </Col>
                            <Col span={1}></Col> 
                            <Col span={5}>
                            <Pagination current={current} onChange={onChange} total={50} />
                            </Col>
                            <Col span={6}offset={18}>
                                

                                <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: 300, height: 70, marginTop: 30 }} >
                                    <div style={{ fontSize: 30 }}>Save</div>
                                </Button>
                            </Col>
                        </Row>
                    </ContentContainer>
                </Layout>
            </Layout>
        </Container>
    );
}

export default ScoreQuestion;