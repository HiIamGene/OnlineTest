import React, { useEffect, useState } from "react"
import { Button , Popconfirm } from 'antd';
import axios from 'axios';
import API from "../constants/api.jsx";
import Profile from '../assets/icon/Profile.png';
function Studentlist(props) {
    const [studentlist, setStudentlist] = useState([]);
    useEffect(() => {
        axios.post(API.V1.TEACHER.COURSE.GETSTUDENT, {
            "CourseCode": localStorage.getItem('courseCode')
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res => {
            if (res.data) {
                setStudentlist(res.data)
            }
        }).catch(err => {
            console.warn(err);
        });
    }, []);
    const confirm = (e) => {
        axios.post(API.V1.TEACHER.COURSE.DELETESTUDENT, {
            "CourseCode": localStorage.getItem('courseCode'),
            "Username":e
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res => {
        }).catch(err => {
            console.warn(err);
        })

       // window.location.reload();
    }
    const studentlistOut = () => {
        if (studentlist === null) {
            return null
        }
        else {
            return studentlist.map((e, index) => {

                if (e.Status === props.status) {
                    return(
                    <div key={index} style={{ marginLeft: 30, paddingTop: 10, fontSize: 30, textAlign: 'left' }}><img src={Profile} style={{ width: 50, height: 50 }}></img>    {e.StudentID}  {e.Firstname}  {e.Surname}
                        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => confirm(e.Firstname)}>
                            <Button type="link" style={{ color: "#AAAAAA", fontSize: 50, fontWeight: 'bold', display: "inline-block" }}>x</Button>
                        </Popconfirm>
                    </div>)
                }

            }
            )
        }
    }
    return (
            studentlistOut()
    )
}


export default Studentlist