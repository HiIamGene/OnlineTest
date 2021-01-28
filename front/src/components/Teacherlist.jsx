import React, { useEffect, useState } from "react"
import axios from 'axios';
import API from "../constants/api.jsx";
import { Link } from 'react-router-dom';
import Profile from '../assets/icon/Profile.png';
function Teacherlist(props) {
    const [teacherlist, setTeacherlist] = useState([]);
    useEffect(() => {
        axios.post(API.V1.TEACHER.COURSE.GETTEACHER, {
            "CourseCode": localStorage.getItem('courseCode')
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res => {
            if (res.data) {
                setTeacherlist(res.data)
            }
        }).catch(err => {
            console.warn(err);
        });
    }, []);

    var i;
    let table = []
    const teacherlistOut = () => {
        for (i = 0; i < Object.keys(teacherlist).length; i++) {
            table.push(
                <div style={{ marginLeft: 30, paddingTop: 10, fontSize: 30, textAlign: 'left' }}><img src={Profile} style={{ width: 50, height: 50 }}></img>    T.{teacherlist[i].Firstname}  {teacherlist[i].Surname}</div>
            )
        }
        return table
    }
    return (
        <table>
            {teacherlistOut()}
        </table>
    )
}


export default Teacherlist