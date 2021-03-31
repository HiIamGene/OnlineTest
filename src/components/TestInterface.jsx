import React, { useEffect, useState } from "react"
import { Button, Popconfirm, Empty, Modal } from 'antd';
import instance from '../constants/action.js';
import API from "../constants/api.jsx";
import { Link } from 'react-router-dom';

function TestInterface(props) {
    const [testList, setTestList] = useState([]);
    const [selectTest, setSelectTest] = useState([]);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        instance.get(API.V1.STUDENT.TESTLIST, {
        }, {
        }).then(res => {
            setTestList(res.data)
            console.log(res.data)
        }).catch(err => {
            console.warn(err);
        })
    }, []);
    const handleOk = () => {

    };
    const handleOpen = (item) => {
        setSelectTest(item)
        setVisible(true)
    }
    const classlistOut = () => {
        if (testList === null) {
            return <Empty style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}
                description={false} />
        }
        else {
            return Object.entries(testList).map(([columnId, column], index) =>
                <div style={{ fontSize: 50 }}>
                    {columnId}
                    {column.map((item, index) => {
                        return (
                            <div key={index}>
                                <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => handleOpen(item)} style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>{item.Timestart} {item.Topic}
                                </Button>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
    return (
        <>
            {classlistOut()}
            <Modal
                visible={visible}
                title={selectTest.Topic}
                onCancel={() => setVisible(false)}
                footer={[
                    <Link to={{
                        pathname: "/Student/DoTest",
                        data: {
                            "selectTest":selectTest
                        }
                    }}>
                        <Button
                            type="primary"
                            onCam
                            onClick={()=>handleOk()}
                        >
                            Start Test
                        </Button>
                    </Link>
                ]}
            >
                <p>{selectTest.Description}</p>

            </Modal>
        </>


    )
}


export default TestInterface