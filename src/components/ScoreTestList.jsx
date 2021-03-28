import React, { useState, useEffect } from "react"
import { Button, Row, Col, Empty } from 'antd';
import userInfo from '../assets/icon/userInfo.png'
import API from "../constants/api.jsx";
import { Link } from 'react-router-dom';
import instance from '../constants/action.js';
import history from "../utils/history";
import { connect } from 'react-redux';
const mapStateToProps = state => {
    return {
        test: state.scoreTest.test,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTest: (value) => dispatch({ type: 'setTest', test: value }),

    };
}
function ScoreTestList(props) {
    const [testlist, setTestlist] = useState([])

    useEffect(() => {
        instance.get(API.V1.TEACHER.TESTBANK.ALLTESTINTESTBANK,
            {
                headers: {
                    "CourseCode": localStorage.getItem('courseCode'),
                    "Access-Control-Allow-Headers": "*"
                }
            }).then(res => {
                setTestlist(res.data)
            }).catch(err => {
                console.warn(err);
            });
    }, []);
    const onClickTest =(e)=>{
        props.setTest(e)
        history.push(`/Teacher/ScoreHeader`)
    }
    const classlistOut = () => {
        if (testlist === null) {
            return <Empty style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}
                description={false} />
        }
        else {
            return testlist.map((e, index) =>
                <div key={index}>
                    {e.process == "100.00" ?

                            <Button onClick={()=>onClickTest(e)} type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#AFD36C', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>
                                <Row type="flex" justify="space-around">
                                    <Col span={9}>{e.topic}</Col>
                                    <Col span={1} offset={6}><img style={{ width: 37, height: 27 }} src={userInfo} /></Col>
                                    <Col span={3} >{e.paticipant}</Col>
                                    <Col span={2}>process : {e.process}%</Col>
                                    <Col span={1}></Col>
                                </Row>
                            </Button>
                        :
                            <Button onClick={()=>onClickTest(e)} type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>
                                <Row type="flex" justify="space-around">
                                    <Col span={9}>{e.topic}</Col>
                                    <Col span={1} offset={6}><img style={{ width: 37, height: 27 }} src={userInfo} /></Col>
                                    <Col span={3} >{e.paticipant}</Col>
                                    <Col span={2}>process : {e.process}%</Col>
                                    <Col span={1}></Col>
                                </Row>
                            </Button>
                    }
                </div>
            )
        }
    }
    return (
        classlistOut()

    )
}



export default connect(mapStateToProps, mapDispatchToProps)(ScoreTestList)