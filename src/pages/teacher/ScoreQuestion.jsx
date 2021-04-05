import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button, Pagination, Select, Empty } from 'antd';
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
        scoreQuestion: state.scoreTest.scoreQuestion,
        header: state.scoreTest.header,
        studentList: state.scoreTest.studentList,
        currentQuestion: state.scoreTest.currentQuestion

    };
};

const mapDispatchToProps = dispatch => {
    return {
        setScoreQuestion: (value) => dispatch({ type: 'setScoreQuestion', scoreQuestion: value }),
        setCurrentQuestion: (value) =>dispatch({ type: 'setCurrentQuestion', currentQuestion: value }),
    };
}
function ScoreQuestion(props) {
    useEffect(() => {
        instance.get(API.V1.TEACHER.TESTBANK.ALLANSWER,
            {
                headers: {
                    "TestId": props.test.testID,
                    "StudentID": props.student.studentID,
                    "uuid": props.header.uuid,
                    "Access-Control-Allow-Headers": "*"
                }
            }).then(res => {
                props.setScoreQuestion(res.data)
            }).catch(err => {
                console.warn(err);
            });
    }, []);
    useEffect(() => {
        if (props.scoreQuestion) {
            console.log(props.scoreQuestion)
            setLoading(true)
        }

    }, [props.scoreQuestion]);
    const onChangeScore = (e,current) => {
        props.scoreQuestion[current-1].score =e
        props.setScoreQuestion([... props.scoreQuestion])
    }
    const [loading, setLoading] = useState(false);
    const [current, setcurrent] = useState(1);
    const keyValue = "4";
    const form = 2;
    const onChange = page => {
        setcurrent(page);
    };
    const children = [];
    props.studentList.map((student)=>{
        children.push(<Option key={student.studentID}>{student.studentID}</Option>);
    })
    const onSave = ()=>{
        instance.post(API.V1.TEACHER.SCORETEST,{
            "questionID":props.scoreQuestion[current-1].questionID,
            "score":props.scoreQuestion[current-1].score
        },
            {
                headers: {
                    "TestId": props.test.testID,
                    "StudentID": props.student.studentID,
                    "Access-Control-Allow-Headers": "*"
                }
            }).then(res => {
            }).catch(err => {
                console.warn(err);
            });
    }

    return (
        <Container>
            <Layout >
                <SideMenu keyValue={keyValue} form={form} />
                <Layout style={{ marginLeft: 180 }}>
                    <ContentContainer >

                        <Head history={props.history} />
                        {loading ?
                        <>
                          {props.scoreQuestion[current-1].type === "Write-up" && (
                            <Row gutter={16} type="flex" justify="space-around">
                                <Col span={19} offset={2}>
                                    <div style={{ fontSize: 40, fontWeight: 'bold', display: "inline-block" }}>{props.test.topic} - <Select value= { props.student.studentID} style={{fontSize:30}}>{children}</Select></div>
                                </Col>

                                <Col span={2} ></Col>
                                <Col span={21} offset={2}>
                                    <div style={{ fontSize: 30 }}>     
                                    <p dangerouslySetInnerHTML={{
                                            __html: props.scoreQuestion[current-1].data
                                        }} />   </div>
                                    <br />
                                    <br />
                                    <br />
                                    <div style={{ fontSize: 30 }}>Answer: {props.scoreQuestion[current-1].answer}</div>

                                </Col>
                                <Col span={24} style={{ height: 300 }}></Col>
                                <Col span={2} offset={19} style={{ fontSize: 30 }}>
                                    Score

                            </Col>
                                <Col span={1} style={{ fontSize: 30 }}>
                                    <input value={props.scoreQuestion[current-1].score} onChange={e => onChangeScore(e.target.value,current)} style={{ marginTop: 10, height: 35, width: 35 }} />

                                </Col>
                                <Col span={1} style={{ fontSize: 30 }}>
                                    /{props.scoreQuestion[current-1].maxscore}

                                </Col>
                                <Col span={1}></Col>
                                <Col span={5}>
                                    <Pagination current={current} onChange={onChange} total={props.scoreQuestion.length*10} />
                                </Col>
                                <Col span={6} offset={18}>


                                    <Button onClick={()=>onSave()} type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: 300, height: 70, marginTop: 30 }} >
                                        <div style={{ fontSize: 30 }}>Save</div>
                                    </Button>
                                </Col>
                            </Row>)}
                            {props.scoreQuestion[current-1].type === "Upload Answer" && (
                            <Row gutter={16} type="flex" justify="space-around">
                                <Col span={19} offset={2}>
                                    <div style={{ fontSize: 40, fontWeight: 'bold', display: "inline-block" }}>{props.test.topic} - <Select value= { props.student.studentID} style={{fontSize:30}}>{children}</Select></div>
                                </Col>

                                <Col span={2} ></Col>
                                <Col span={21} offset={2}>
                                    <div style={{ fontSize: 30 }}>     
                                    <p dangerouslySetInnerHTML={{
                                            __html: props.scoreQuestion[current-1].data
                                        }} />   </div>
                                    <br />
                                    <br />
                                    <br />
                                    <a style={{ fontSize: 25 }} href={props.scoreQuestion[current-1].answer}>{props.scoreQuestion[current-1].answer}</a>
                               

                                </Col>
                                <Col span={24} style={{ height: 300 }}></Col>
                                <Col span={2} offset={19} style={{ fontSize: 30 }}>
                                    Score

                            </Col>
                                <Col span={1} style={{ fontSize: 30 }}>
                                    <input value={props.scoreQuestion[current-1].score} onChange={e => onChangeScore(e.target.value,current)} style={{ marginTop: 10, height: 35, width: 35 }} />

                                </Col>
                                <Col span={1} style={{ fontSize: 30 }}>
                                    /{props.scoreQuestion[current-1].maxscore}

                                </Col>
                                <Col span={1}></Col>
                                <Col span={5}>
                                    <Pagination current={current} onChange={onChange} total={props.scoreQuestion.length*10} />
                                </Col>
                                <Col span={6} offset={18}>


                                    <Button onClick={()=>onSave()} type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: 300, height: 70, marginTop: 30 }} >
                                        <div style={{ fontSize: 30 }}>Save</div>
                                    </Button>
                                </Col>
                            </Row>)}
                            </>
                            :

                            <Empty style={{
                                marginLeft: "auto",
                                marginRight: "auto" 
                            }}
                                description={false} />
                        }
                    </ContentContainer>
                </Layout>
            </Layout>
        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreQuestion);