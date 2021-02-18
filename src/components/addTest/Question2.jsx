import React, { useState } from "react"
import { Button, Row } from 'antd';
import { NavLink } from 'react-router-dom';
function QuestionList() {
    const QuestionList = [{ Id: 1, name: "สีอะไรคือสีโทนร้อน?" }
        , { Id: 2, name: "ทำไมต้องทำ Usability Testing ?" }
        , { Id: 3, name: "Low-fidelity prototype คือ ?" }
        , { Id: 4, name: "Hi-fidelity prototype  คือ ?" }]
        
    var i;
    let table = []
    const classlistOut = () => {
        for (i = 0; i < QuestionList.length; i++) {
            table.push(
                <div>
                    <Row>
                        <NavLink to="/AddQuestion">
                            <div style={{ fontSize: 30, fontWeight: "bold", display: "block", color: "#000000" }} >{QuestionList[i].Id}.
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1330, height: 100, marginTop: 30, textAlign: 'left' }}>
                                    {QuestionList[i].name}
                                </Button>

                            </div>
                        </NavLink>
                        <table style={{ marginTop: 30, marginLeft: 20 }}>
                            <div>
                                <Button type="primary" shape="circle" size="large" style={{ backgroundColor: '#F4A940', justifyContent: 'center', alignContent: 'center', background: '#F4A940', color: '#FFFFFF', width: 50, height: 50 }}>
                                    <div style={{ fontSize: 30 }}>+</div>
                                </Button>
                            </div>
                            <div>
                                <Button type="primary" shape="circle" size="large" style={{ backgroundColor: '#F4A940', justifyContent: 'center', alignContent: 'center', background: '#F4A940', color: '#FFFFFF', width: 50, height: 50 }}>
                                    <div style={{ fontSize: 30 }}>x</div>
                                </Button>
                            </div>
                        </table>
                    </Row>
                </div>
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


export default QuestionList