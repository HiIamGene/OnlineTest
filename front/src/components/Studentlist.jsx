import React, { useEffect, useState } from "react"
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import API from "../constants/api.jsx";
import { Link } from 'react-router-dom';
import Profile from '../assets/icon/Profile.png';
function Studentlist(props) {
    const [studentlist, setStudentlist] = useState([]);
    useEffect(() => {
        axios.post(API.V1.TEACHER.COURSE.GETSTUDENT, {
            "CourseCode": "5B104D"
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

    var i;
    let table = []
    const studentlistOut = () => {
        for (i = 0; i < Object.keys(studentlist).length; i++) {
            if (props.status == studentlist[i].status ) {
                table.push(
                    <div style={{ marginLeft: 30, paddingTop: 10, fontSize: 30, textAlign: 'left' }}><img src={Profile} style={{ width: 50, height: 50 }}></img>    {studentlist[i].StudentID}  {studentlist[i].Firstname}  {studentlist[i].Surname} </div>
                )
            }
        }
        return table
    }
    return (
        <table>
            {studentlistOut()}
        </table>
    )
}


export default Studentlist