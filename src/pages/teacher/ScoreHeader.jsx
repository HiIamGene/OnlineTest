import API from "../../constants/api.jsx";
import instance from '../../constants/action.js';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button, Modal } from 'antd';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import HeaderList from '../../components/HeaderList';

const mapStateToProps = state => {
    return {
        headerlist: state.scoreTest.headerlist,
        test: state.scoreTest.test,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setHeaderlist: (value) => dispatch({ type: 'setHeaderlist', headerlist: value }),
        //setTest: (value) => dispatch({ type: 'setTest', test: value }),

    };
}
function ScoreHeader(props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        instance.get(API.V1.TEACHER.TESTBANK.ALLHEADERTESTBANK,
            {
                headers: {
                    "TestId": props.test.testID,
                    "Access-Control-Allow-Headers": "*"
                }
            }).then(res => {
                props.setHeaderlist(res.data)
            }).catch(err => {
                console.warn(err);
            });
    }, []);
    const onClickSee = () => {
        instance.get(API.V1.TEACHER.COURSE.SCORE.GETSCORE,
            {
                headers: {
                    "TestId": props.test.testID,
                    "Access-Control-Allow-Headers": "*"
                }
            }).then(res => {
                setData(res.data)
            }).catch(err => {
                console.warn(err);
            });
        instance.get(API.V1.TEACHER.COURSE.SCORE.GETCV,
            {
                headers: {
                    "TestId": props.test.testID,
                    "Access-Control-Allow-Headers": "*"
                }
            }).then(res => {
                setCV(res.data)
            }).catch(err => {
                console.warn(err);
            });

        setVisible(true)
    }
    const [cv, setCV] = useState({});
    const [data, setData] = useState([]);
    const keyValue = "4";
    const form = 2;
    return (
        <Container>
            <Layout >
                <SideMenu keyValue={keyValue} form={form} />
                <Layout style={{ marginLeft: 180 }}>
                    <ContentContainer >
                        <Head history={props.history} />
                        <Row gutter={16} type="flex" justify="space-around">
                            <Col span={16} offset={2}>
                                <div style={{ fontSize: 50, fontWeight: 'bold' }}>{props.test.topic}</div>
                            </Col>
                            <Col span={6} ></Col>
                            <Col span={2} offset={2} style={{ fontSize: 30, fontWeight: 'bold' }}>Part</Col>
                            <Col span={20} style={{ fontSize: 30, fontWeight: 'bold' }}>
                                {props.test.process !== "100.00" ?
                               <></>
                                    :
                                    <Button onClick={() => onClickSee()}>See Score</Button>
                                    
                                }
                            </Col>
                            <Col span={22} offset={2} ><HeaderList headerlist={props.headerlist} /></Col>
                        </Row>
                        <Modal
                            visible={visible}
                            title={props.test.topic}
                            onOk={() => setVisible(false)}
                        >
                            <p style={{ fontSize: 25 }}>max : {cv.max} min : {cv.min} mean : {cv.mean} sd : {cv.sd}</p>
                                {data.map((student, index) => {
                                    <Row gutter={16} type="flex" justify="space-around">
                                        <Col span={6} >{student.studentID}</Col>
                                          <Col span={6} >{student.firstname} </Col>
                                          <Col span={6} > {student.surname} </Col>                                   
                                          <Col span={6} >{student.totalScore}</Col>
                                         
                                    </Row>
                                })}
                        </Modal>
                    </ContentContainer>
                </Layout>
                </Layout>
        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreHeader)