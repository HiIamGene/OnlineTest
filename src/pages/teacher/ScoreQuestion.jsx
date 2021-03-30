import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button, Pagination, Select } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import { PropertySafetyFilled } from '@ant-design/icons';
import API from "../../constants/api.jsx";
import instance from '../../constants/action.js';
import { connect } from 'react-redux';

const { Option } = Select;

const mapStateToProps = state => {
    return {
        student: state.scoreTest.student,
        test: state.scoreTest.test,
        ScoreQuestion: state.scoreTest.ScoreQuestion,
        header: state.scoreTest.header
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setScoreQuestion: (value) => dispatch({ type: 'setScoreQuestion', studentList: value }),
    };
}
function ScoreQuestion(props) {
    useEffect(() => {   
        instance.get(API.V1.TEACHER.TESTBANK.ALLANSWER,
            {
                headers: {
                    "TestId": props.test.testID,
                    "StudentID": props.student.student,
                    "uuid": props.header.uuid,
                    "Access-Control-Allow-Headers": "*"
                }
            }).then(res => {
                props.setScoreQuestion(res.data)
            }).catch(err => {
                console.warn(err);
            });
    }, []);
    const onChangeScore = () => {

    }
    const [current, setcurrent] = useState(1);
    const keyValue = "4";
    const form = 2;
    const onChange = page => {
        setcurrent(page);
    };
    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    return (
        <Container>
            <Layout >
                <SideMenu keyValue={keyValue} form={form} />
                <Layout style={{ marginLeft: 180 }}>
                    <ContentContainer >
                        <Head history={props.history} />

                        <Row gutter={16} type="flex" justify="space-around">
                            <Col span={19} offset={2}>
                                <div style={{ fontSize: 50, fontWeight: 'bold', display: "inline-block" }}>{props.test.topic} - <Select style={{ width: 200 }}>
                                    {children}
                                </Select></div>
                            </Col>

                            <Col span={2} ></Col>
                            <Col span={21} offset={2}>
                                <div style={{ fontSize: 40 }}>1. Data Communication ในมุมมองของนักศึกษาหมายถึงอะไร ?</div>
                                <br />
                                <br />
                                <br />
                                <div style={{ fontSize: 30 }}>Answer: การส่งเนื้อหาข้อมูลจากฝ่ายหนึ่งไปยังอีกฝ่ายหนึ่งในรูปแบบใดก็ได้</div>

                            </Col>
                            <Col span={24} style={{ height: 300 }}></Col>
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
                            <Col span={6} offset={18}>


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

export default connect(mapStateToProps, mapDispatchToProps)(ScoreQuestion);