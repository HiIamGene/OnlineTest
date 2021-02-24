/*import { Select, Divider, Input, Row, Col, Button } from 'antd';
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
            if(i===0){
            table.push(
                <div>
                    <Row gutter={24} type="flex" justify="space-around">
                        <div style={{ fontSize: 25, background: '#F4A940', width: 1400, height: 50, marginTop: 30, display: "block" }}>
                            <Row gutter={24} type="flex" justify="space-around">
                                <Col span={3} offset={1} style={{ color: '#FFFFFF', fontWeight: "bold" ,marginTop:5}} >
                                Header :
                            </Col>
                                <Col span={12} >

                                <Input></Input>
                                </Col>
                                <Col span={8}>

                                </Col>


                            </Row>


                        </div>
                        <table style={{ marginTop:25,marginLeft: 10, fontSize: 30 }}>
                            <Button type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>
                                x
                                </Button>

                        </table>
                    </Row>
                </div>
            )
            }
            else {
                table.push(
                    <div>
                        <Row gutter={24} type="flex" justify="space-around">
                            <div style={{ fontSize: 25, background: '#F4A940', width: 1400, height: 135, marginTop: 30, display: "block" }}>
                                <Row gutter={24} type="flex" justify="space-around">
                                    <Col span={23} offset={1} style={{ color: '#FFFFFF', fontWeight: "bold" ,marginTop:20}} >
                                        Group
                                </Col>
                                    <Col span={9} offset={1}>
    
                                        <Query />
                                    </Col>
                                    <Col span={5} offset={1} style={{ color: '#FFFFFF' }}> <div>Number of questions</div>
    
                                    </Col>
                                    <Col span={1}>
                                        <input style={{ marginTop: 10, height: 35, width: 35 }} />
    
                                    </Col>
                                    <Col span={1} style={{ color: '#FFFFFF' }}>
                                        /6
                                </Col>
                                    <Col span={1} style={{ color: '#FFFFFF' }}>
                                        Score
    
                                </Col>
                                    <Col span={1}>
                                        <input style={{ marginTop: 10, height: 35, width: 35 }} />
    
                                    </Col>
                                    <Col span={3} >  <NavLink to="/Question">
    
                                        <Button type="primary" style={{ marginTop: 10, background: '#F43A09' }} >Add Question</Button>
                                    </NavLink>
    
                                    </Col>
    
    
                                </Row>
    
    
                            </div>
                            <table style={{ marginTop:20,marginLeft: 10, fontSize: 30 }}>
                                <Button type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>+</Button>
                                <br />
                                <Button type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>
                                    Tt
                                    </Button>
                                <br />
                                <Button type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>
                                    x
                                    </Button>
    
                            </table>
                        </Row>
                    </div>
                )

            }
        }
        return table
    }
    return (
        <table>
            {classlistOut()}
        </table>
    )
}



export default Grouplist*/