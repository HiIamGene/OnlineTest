import React, { useEffect, useState } from "react"
import instance from '../constants/action.js';
import API from "../constants/api.jsx";
import Profile from '../assets/icon/Profile.png';
import { Button, Popconfirm } from 'antd';
function Teacherlist(props) {
    const [teacherlist, setTeacherlist] = useState([]);
    const [username,setUsername]=useState("");
    useEffect(() => {
        instance.post(API.V1.USERNAME,{
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        } ).then(res => {
          setUsername(res.data)
        }).catch(err => {
            console.warn(err);
        })
        instance.post(API.V1.TEACHER.COURSE.GETTEACHER, {
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
    const confirm = (e) => {
        instance.post(API.V1.TEACHER.COURSE.DELETETEACHER, {
            "CourseCode":  localStorage.getItem('courseCode'),
            "Username":e
            
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res => {
        }).catch(err => {
            console.warn(err);
        })
        console.log(e)
        window.location.reload();
    }
    const teacherlistOut = () => {
        /*for (i = 0; i < Object.keys(teacherlist).length; i++) {
            table.push(
                <div style={{ marginLeft: 30, paddingTop: 10, fontSize: 30, textAlign: 'left' }}><img src={Profile} style={{ width: 50, height: 50 }}></img>    T.{teacherlist[i].Firstname}  {teacherlist[i].Surname}</div>
            )
        }
        return table*/
        if (teacherlist === null) {
            return null
        }
        else {
            return teacherlist.map((e, index) =>
                <div key={index} style={{ marginLeft: 30, paddingTop: 10, fontSize: 30, textAlign: 'left' }}><img src={Profile} style={{ width: 50, height: 50 }}></img>    {e.Firstname}  {e.Surname}
                {(username===e.Firstname)?
                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => confirm(e.Username)}>
                        <Button type="link" style={{ color: "#AAAAAA", fontSize: 50, fontWeight: 'bold', display: "inline-block" }}>x</Button>
                    </Popconfirm>:<div></div>
        }
                </div>
            )
        }
    }
    return (
         teacherlistOut()

    )
}


export default Teacherlist