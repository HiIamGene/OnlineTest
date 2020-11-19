import React, { useState } from "react"
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
function ScoreTestList() {
    const student = [{ Id: "60010001", Firstname: "Hunt", Lastname: "Danita", status: 0 }
        , { Id: "60010002", Firstname: "Alexander", Lastname: "Shawna", status: 100 },
    { Id: "60010003", Firstname: "Castillo", Lastname: "Thea", status: 100 }
    ]
    var i;
    let table = []
    const classlistOut = () => {
        for (i = 0; i < student.length; i++) {
            table.push(
                <NavLink to="/ScoreQuestion">
                    {student[i].status == 100 ?
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#AFD36C', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>
                            <Row type="flex" justify="space-around">
                                <Col span={2}>{student[i].Id}</Col>
                                <Col span={7}>{student[i].Firstname}</Col>
                                <Col span={7}>{student[i].Lastname}</Col>
                                <Col span={2} offset={4} >process : {student[i].status}%</Col>
                                <Col span={1}></Col>                  
                            </Row>

                        </Button>
                        :
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>

                            <Row type="flex" justify="space-around">
                                <Col span={2}>{student[i].Id}</Col>
                                <Col span={7}>{student[i].Firstname}</Col>
                                <Col span={7}>{student[i].Lastname}</Col>
                                <Col span={2} offset={4} >process : {student[i].status}%</Col>
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