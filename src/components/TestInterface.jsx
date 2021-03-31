import React, { useEffect, useState } from "react"
import { Button, Popconfirm, Empty, Modal } from 'antd';
import instance from '../constants/action.js';
import API from "../constants/api.jsx";
import history from "../utils/history";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {

    };

};

const mapDispatchToProps = dispatch => {
    return {
        setSelectTest:  (value) => dispatch({ type: 'setSelectTest', selectTest: value }),
    };
}
function TestInterface(props) {
    const [testList, setTestList] = useState([]);
    const [selectTest, setTest] = useState([]);
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
        props.setSelectTest(selectTest)
        history.push(`/Student/DoTest`)
    };
    const handleOpen = (item) => {
        setTest(item)
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
                        <Button
                            type="primary"
                            onCam
                            onClick={()=>handleOk()}
                        >
                            Start Test
                        </Button>
                ]}
            >
                <p>{selectTest.Description}</p>

            </Modal>
        </>


    )
}
export default connect(mapStateToProps, mapDispatchToProps)(TestInterface)
