import React, { useEffect, useState } from "react"
import { Button } from 'antd';
import axios from 'axios';
import API from "../constants/api.jsx";
import { Link } from 'react-router-dom';
function Classlist(props) {
    const [classlist, setclasslist] = useState([]);
    useEffect(() => {
        axios.post(API.V1.TEACHER.COURSELIST.GETCOURSE, {
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res => {
            setclasslist(res.data)

        }).catch(err => {
            console.warn(err);
        })
    }, []);
    const deleteTeacher =(i)=>{
        /*axios.post(API.V1.TEACHER.COURSELIST.DELETECOURSE, {
            "CourseCode": classlist[i].CourseCode,
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res => {

        }).catch(err => {
            console.warn(err);
        })
        window.location.reload();*/
    }
    var i;
    let table = []
    const classlistOut = () => {
        for (i = 0; i < Object.keys(classlist).length; i++) {
            table.push(
                <div>
                    <Link to={{
                        pathname: "/Teacher/InClass",
                        data: {
                            "courseID": classlist[i].CourseID,
                            "courseCode": classlist[i].CourseCode,
                            "courseName": classlist[i].CourseName
                        }
                    }}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>{classlist[i].CourseID}  {classlist[i].CourseName}  {classlist[i].Year}

                        </Button>
                    </Link>
                    <Button onClick={e=>deleteTeacher()} type="link" style={{ color: "#AAAAAA", fontSize: 50, fontWeight: 'bold', display: "inline-block" }}> x</Button>
                </div>
            )
        }
        return table
    }
    return (
        <table>
            {classlistOut()}
        </table>
    )
}


export default Classlist