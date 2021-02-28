import React, { useEffect, useState } from "react"
import { Button, Popconfirm, Empty } from 'antd';
import instance from '../constants/action.js';
import API from "../constants/api.jsx";
import { Link } from 'react-router-dom';

function Classlist(props) {
    const [classlist, setclasslist] = useState([]);
    useEffect(() => {
        instance.post(API.V1.TEACHER.COURSELIST.GETCOURSE, {
        }, {
        }).then(res => {
            setclasslist(res.data)

        }).catch(err => {
            console.warn(err);
        })
    }, []);
    const confirm = (e) => {
        instance.post(API.V1.TEACHER.COURSELIST.DELETECOURSE, {
            "CourseCode": e
        }, {
        }).then(res => {
        }).catch(err => {
            console.warn(err);
        })
        console.log(e)
        window.location.reload();
    }



    const classlistOut = () => {
        if (classlist === null) {
            return <Empty style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}
                description={false} />
        }
        else {
            return classlist.map((e, index) =>
                <div key={index}>
                    <Link to={{
                        pathname: "/Teacher/InCourse",
                        data: {
                            "courseID": e.CourseID,
                            "courseCode": e.CourseCode,
                            "courseName": e.CourseName
                        }
                    }}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>{e.CourseID}  {e.CourseName}  {e.Year}

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
            classlistOut()
    )
}


export default Classlist