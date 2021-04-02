import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Form } from 'antd';
import { Typography } from 'antd';
import instance from '../../constants/action.js';
import API from "../../constants/api.jsx";
import Head from '../../components/Head';
const { Title } = Typography;

function Homepage(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const onAdd = values => {
        instance.post(API.V1.ADMIN, null, {
            headers: {
                username: username
                ,
                password: password,
                email:email,
            }

        }).then(res => {
            
        }).catch(err => {
            console.warn(err);
        })
    };
    return (
        <div>
                     <Head />
            <Row style={{ background: '#ffffff', marginTop: 90 }}>
                <Col span={14} offset={0}>
                </Col>
                <Col span={12} offset={2}>
                    <Title style={{ font: 'Josefin Sans', fontSize: 30 }}>Admin</Title>
                    Username:<Input onChange={e=>setUsername(e.target.value)}/>
                    Password:<Input onChange={e=>setPassword(e.target.value)}/>
                    Email:<Input onChange={e=>setEmail(e.target.value)}/>
                    <Button onClick={()=>onAdd()}>
                        <div style={{ font: 'Josefin Sans', fontSize: 20 }}>Add Teacher</div>
                    </Button>
                </Col>
            </Row >
        </div >
    )

}
export default Homepage;
