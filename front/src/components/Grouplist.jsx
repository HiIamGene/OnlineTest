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
                    <div style={{ fontSize: 25, background: '#F4A940',  width: 1400, height: 80, marginTop: 30, display: "block" }}>
                        <Row gutter={24} type="flex" justify="space-around">
                            <Col span={9} offset={1}>

                                <Query />
                            </Col>
                            <Col span={5} offset={1}  style={{color: '#FFFFFF'}}> <div>Number of questions</div>

                            </Col>
                            <Col span={1}>
                                <input style={{ marginTop: 10, height: 35, width: 35 }} />
                                
                            </Col>
                            <Col span={1} style={{color: '#FFFFFF'}}>
                                /6
                            </Col>
                            <Col span={1} style={{ color: '#FFFFFF'}}>
                                Score

                            </Col>
                            <Col span={1}>
                                <input style={{ marginTop: 10, height: 35, width: 35 }} />

                            </Col>
                            <Col span={3} >  <NavLink to="/Question">
                    
                                <Button type="primary" style={{ marginTop: 10,background: '#F43A09'}} >Add Question</Button>
                                </NavLink>

                            </Col>

                        </Row>
                        
                    </div>
                  
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