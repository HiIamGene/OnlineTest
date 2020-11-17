import React, { useState } from "react"
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
function Classlist() {
    const classlist = [{ classId: 90010100, className: "Data computer", year: 2020, }
        , { classId: 90010101, className: "Food Science", year: 2020 }
        , { classId: 90010101, className: "Food Science", year: 2019 }
        , { classId: 90010103, className: "UX&UI", year: 2020 }]
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