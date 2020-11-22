import React, { useState } from "react"
import { Button, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import userInfo from '../assets/icon/userInfo.png'
function ScoreTestList() {
    const classlist = [{ topic: "ข้อสอบท้ายบทที่ 1 ", numberStudent: 60, status: 50 }
        , { topic: "Quiz ครั้งที่ 1", numberStudent: 60, status: 50 }
        , { topic: "ข้อสอบกลางภาค", numberStudent: 60, status: 100 }
        , { topic: "ข้อสอบปลายภาค", numberStudent: 60, status: 100 }]
    var i;
    let table = []
    const classlistOut = () => {
        for (i = 0; i < classlist.length; i++) {
            table.push(
                <NavLink to="/ScoreStudent">
                    {classlist[i].status == 100 ?
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#AFD36C', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>
                            <Row type="flex" justify="space-around">
                                <Col span={9}>{classlist[i].topic}</Col>
                                <Col span={1} offset={6}><img style={{ width: 37, height: 27 }} src={userInfo} /></Col>
                                <Col span={3} >{classlist[i].numberStudent}/{classlist[i].numberStudent}</Col>
                                <Col span={2}>process : {classlist[i].status}%</Col>
                                <Col span={1}></Col>
                            </Row>

                        </Button>
                        :
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>

                            <Row type="flex" justify="space-around">
                                <Col span={9}>{classlist[i].topic}</Col>
                                <Col span={1} offset={6}><img style={{ width: 37, height: 27 }} src={userInfo} /></Col>
                                <Col span={3} >{classlist[i].numberStudent}/{classlist[i].numberStudent}</Col>
                                <Col span={2}>process : {classlist[i].status}%</Col>
                                <Col span={1}></Col>
                            </Row>
                        </Button>
                    }
                </NavLink>
            )
        }
        return table
    }
    return (
        <table>
            {classlistOut()}
        </table>
    )
}



export default ScoreTestList