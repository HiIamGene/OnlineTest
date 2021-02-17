import React, { useEffect, useState } from "react"
import { Button, Popconfirm, Empty } from 'antd';
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
    const confirm = (e) => {
        axios.post(API.V1.TEACHER.COURSELIST.DELETECOURSE, {
            "CourseCode": e
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



    const classlistOut = () => {
        /* for (i = 0; i < Object.keys(classlist).length; i++) {
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
                     <Button id="delete" value={classlist[i].CourseCode} onClick={()=>deleteTeacher(i)} type="link" style={{ color: "#AAAAAA", fontSize: 50, fontWeight: 'bold', display: "inline-block" }}>x</Button>
                 </div>
             )
     
         }*/
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