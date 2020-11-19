import { Select, Divider, Input, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Query from '../components/Query';
function Grouplist() {
    const classlist = [{ classId: 90010100, className: "Data computer", year: 2020, }
        , { classId: 90010101, className: "Food Science", year: 2020 }
        , { classId: 90010101, className: "Food Science", year: 2019 }
        , { classId: 90010103, className: "UX&UI", year: 2020 }]
    var i;
    let table = []
    const classlistOut = () => {
        for (i = 0; i < classlist.length; i++) {
            table.push(
                <div>
                    <div style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 80, marginTop: 30, display: "block" }}>
                        <Row gutter={24} type="flex" justify="space-around">
                            <Col span={10} offset={1}>

                                <Query />
                            </Col>
                            <Col span={6} offset={1}> <div>Number of questions</div>

                            </Col>
                            <Col span={1}>
                                <input style={{ marginTop: 10, height: 35, width: 35 }} />
                                
                            </Col>
                            <Col span={1}>
                                /6
                            </Col>
                            <Col span={1}>
                                Score

                            </Col>
                            <Col span={1}>
                                <input style={{ marginTop: 10, height: 35, width: 35 }} />

                            </Col>
                            <Col span={2}>
                                <Button type="primary" style={{ marginTop: 10,background:"#FFFFFF"}} ></Button>

                            </Col>

                        </Row>
                        
                    </div>
                    <NavLink to="/InClass">
                    </NavLink>
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



export default Grouplist