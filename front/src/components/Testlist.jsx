import React, { useEffect, useState } from "react"
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import API from "../constants/api.jsx";
import { Link } from 'react-router-dom';
function Testlist(props) {
    const [testlist, setTestlist] = useState([]);
    useEffect(() => {
        axios.post(API.V1.TEACHER.TEST.GETTESTLIST, {
            "CourseID": "5B104D"
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res => {
            if(res.data){
            setTestlist(res.data)
        }
        }).catch(err => {
            console.warn(err);
        });
    }, []);

    var i;
    let table = []
    const testlistOut = () => {
        for (i = 0; i < Object.keys(testlist).length; i++) {
            table.push(
                <div>
                    <div style={{ marginLeft: 11, marginRight: 62, background: "#FFB766", height: 125 , width: 978}}>
                    <NavLink to="/Teacher/Detail">
                        
                            <div style={{ height: "15px" }}></div>
                            <div style={{ fontSize: 30, color: "#ffffff", marginLeft: 40, fontWeight: "bold" }}>{testlist[i].name}</div>
                            <div style={{ fontSize: 20, color: "#ffffff", marginLeft: 80, fontWeight: "bold" }}>{testlist[i].date}</div>
                        
                    </NavLink>
                    </div>
                    <div style={{ height: 20 }}></div>
                </div>

            )
        }
        return table
    }
    return (
        <table>
            {testlistOut()}
        </table>
    )
}


export default Testlist