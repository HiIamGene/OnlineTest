import React, { useEffect, useState } from "react"
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import API from "../constants/api.jsx";
import {Link} from 'react-router-dom';
function Classlist(props) {
    const [classlist, setclasslist] = useState([]);
    useEffect(() => {
        axios.post(API.V1.TEACHER.COURSELIST.GETCOURSE,{
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        } ).then(res => {
            setclasslist(res.data)
        }).catch(err => {
            console.warn(err);
        })
    }, []);

    var i;
    let table = []
    const classlistOut = () => {
        for (i = 0; i < Object.keys(classlist).length; i++) {
            table.push(
                <Link to={{
                    pathname:"/Teacher/InClass",
                    data:{"courseID":classlist[i].CourseID}
                }}>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>{classlist[i].CourseID}  {classlist[i].CourseName}  {classlist[i].Year}

                    </Button>
                </Link>
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