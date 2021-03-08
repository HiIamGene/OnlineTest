import React, { useEffect, useState } from "react"
import { Button, Popconfirm, Empty } from 'antd';
import { Link } from 'react-router-dom';


function TestBanklist(props) {
    const confirm = () => {}
    const listGroupOut = () => {
        if (props.listGroupTest === null) {
            return <Empty style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}
                description={false} />
        }
        else {
            return props.listGroupTest.map((e, index) =>
                <div key={index}>
                    <Link to={{
                        pathname: "/Teacher/QuestionTestBank",
                        data: {
                            "id": e.id,
                            "groupName": e.groupName
                        }
                    }}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>{e.groupName}

                        </Button>
                    </Link>
                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => confirm(e.CourseCode)}>
                        <Button type="link" style={{ color: "#AAAAAA", fontSize: 50, fontWeight: 'bold', display: "inline-block" }}>x</Button>
                    </Popconfirm>
                </div>
            )
        }

    }
    return (

        listGroupOut()

    )
}

export default TestBanklist