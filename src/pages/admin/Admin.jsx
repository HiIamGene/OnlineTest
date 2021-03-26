import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Form } from 'antd';
import { Typography } from 'antd';
import instance from '../../constants/action.js';
import API from "../../constants/api.jsx";

const { Title } = Typography;

function Homepage(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    useEffect(() => {
        /*if (localStorage.getItem('token')) {
            if (localStorage.getItem("role") === "teacher") {
                props.history.push(`/Teacher/Course`)
            }
            else if (localStorage.getItem("role") === "student") {
                props.history.push(`/Student/Test`)
            }
        }*/
    }, [token]);
    const onFinish = values => {
        instance.post(API.V1.LOGIN, null, {
            params: {
                username: values.username
                ,
                password: values.password
            }

        }).then(res => {
            if (res.data === "Wrong Username or Password") {
                alert("Wrong Username or Password")
            }
            else {
                setToken(res.data["token"])
                localStorage.setItem('token', "Bearer " + res.data["token"])
                localStorage.setItem('role', res.data["role"])
            }
        }).catch(err => {
            console.warn(err);
        })
    };
    return (
        <div>
            <Row style={{ background: '#ffffff', marginTop: 90 }}>
                <Col span={14} offset={0}>
                </Col>
                <Col span={12} offset={2}>
                    <Title style={{ font: 'Josefin Sans', fontSize: 30 }}>Admin</Title>
                    Username:<Input onChange={e=>setUsername(e.target.value)}/>
                    Password:<Input onChange={e=>setPassword(e.target.value)}/>
                    Email:<Input onChange={e=>setEmail(e.target.value)}/>
                    <Button>
                        <div style={{ font: 'Josefin Sans', fontSize: 20 }}>Add Teacher</div>
                    </Button>
                </Col>
            </Row >
        </div >
    )

}
export default Homepage;
