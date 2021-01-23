import React, { useEffect, useState } from "react"
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
function Classlist() {
    const [classlist, setclasslist] = useState( [{ classId: "", className: "", year: "" }]);
    const [username, setUsername] = useState({
        data: {
            "Username": "testteacher", // This is the body part
        }
    });
    useEffect(() => {
        console.log(localStorage.getItem('token'))
        axios.post("http://142.93.177.152:10000/getcourselist",{
            "Username": "testteacher"
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
            }
        } ).then(res => {
            alert(JSON.stringify(res.data))
        }).catch(err => {
            console.warn(err);
        })
    }, []);

    /*const classlist = [{ classId: 90010100, className: "Data Communication", year: 2020 }
        , { classId: 90010101, className: "Food Science", year: 2020 }
        , { classId: 90010101, className: "Food Science", year: 2019 }
        , { classId: 90010103, className: "UX&UI", year: 2020 }]*/
    var i;
    let table = []
    const classlistOut = () => {
        for (i = 0; i < classlist.length; i++) {
            table.push(
                <NavLink to="/InClass">
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>{classlist[i].classId}  {classlist[i].className}  {classlist[i].year}

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