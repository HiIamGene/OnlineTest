import React, { useEffect, useState } from "react"
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import {API_TEACHER_COURSELIST_GETCOURSE} from "../constants/api.jsx";
function Classlist(props) {
    const [classlist, setclasslist] = useState([]);
    const [username, setUsername] = useState({
        data: {
            "Username": "testteacher", // This is the body part
        }
    });
    useEffect(() => {
        axios.post(API_TEACHER_COURSELIST_GETCOURSE,{
            "Username": props.username
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
                <NavLink to="/Teacher/InClass">
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>{classlist[i].CourseID}  {classlist[i].CourseName}  {classlist[i].Year}

                    </Button>
                </NavLink>
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