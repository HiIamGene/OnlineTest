import React, { useState } from "react"
import { Button, Row, Col,Empty } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import history from "../utils/history";
const mapStateToProps = state => {
    return {
        studentList: state.scoreTest.studentList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setStudent: (value) => dispatch({ type: 'setStudent', student: value }),
    };
}
function ScoreTestList(props) {
    const onClickTest =(e)=>{
        props.setStudent(e)
        history.push(`/Teacher/ScoreQuestion`)
    }
    const classlistOut = () => {
        if (props.studentList === null) {
            return <Empty style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}
                description={false} />
        }
        else {
            return props.studentList.map((e, index) =>
                <div>
                    {e.completePercent == "100.00" ?
                        <Button onClick={()=>onClickTest(e)}type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#AFD36C', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>
                            <Row type="flex" justify="space-around">
                                <Col span={3}>{e.studentID}</Col>
                                <Col span={3}>{e.firstname}</Col>
                                <Col span={9}>{e.surname}</Col>
                                <Col span={2} offset={5} >process : {e.completePercent}%</Col>
                                <Col span={1}></Col>
                            </Row>

                        </Button>
                        :
                        <Button onClick={()=>onClickTest(e)} type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>

                            <Row type="flex" justify="space-around">
                                <Col span={3}>{e.studentID}</Col>
                                <Col span={3}>{e.firstname}</Col>
                                <Col span={9}>{e.surname}</Col>
                                <Col span={2} offset={5} >process : {e.completePercent}%</Col>
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