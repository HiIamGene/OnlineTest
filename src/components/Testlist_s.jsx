import React, { useEffect, useState } from "react"
import { Button, Popconfirm } from 'antd';
import instance from '../constants/action.js';
import API from "../constants/api.jsx";
import history from "../utils/history";
function Testlist(props) {
    const [testlist, setTestlist] = useState([]);
    useEffect(() => {
        instance.get(API.V1.TEACHER.COURSE.GETTESTLIST, {
            headers: {
                "CourseCode": localStorage.getItem('courseCode'),
            }
        }).then(res => {
            setTestlist(res.data)
        }).catch(err => {
            console.warn(err);
        });
    }, []);
    const onClickTest =(e)=>{
        localStorage.setItem('testID',e)
        history.push(`/Teacher/Detail`)
    }
    const onClickDelete =(e)=>{
        instance.delete(API.V1.TEACHER.COURSE.DELETETEST, {
            headers: {
                "testId": e,
            }
        }).then(res => {
        }).catch(err => {
            console.warn(err);
        });
        window.location.reload();
    }
    const testlistOut = () => {
        if (testlist === null) {
            return null
        }
        else {
            return testlist.map((e, index) =>
                <div key={index}>

                    <div  type="primary" htmlType="submit" className="login-form-button" style={{ marginLeft: 11, background: "#FFB766", height: 125, width: "93%", marginTop: 30, textAlign: 'left' }}>

                        <div style={{ height: "15px" }}></div>
                        <div style={{ fontSize: 30, color: "#ffffff", marginLeft: 20, fontWeight: "bold" }}>{e.Topic}</div>
                        <div style={{ fontSize: 20, color: "#ffffff", marginLeft: 10, fontWeight: "bold" }}>{e.Datestart} {e.Timestart}</div>

                    </div>

                </div>
            )
        }
    }
    return (
        testlistOut()
    )
}


export default Testlist