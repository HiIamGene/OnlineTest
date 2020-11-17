import React, { useState } from "react"
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
function QuestionList() {
    const QuestionList = [{ Id: 1, name: "Data computer"}
        , { Id: 2, name: "Food Science" }
        , { Id: 3, name: "Food Science" }
        , { Id: 4, name: "UX&UI" }]
    var i;
    let table = []
    const classlistOut = () => {
        for (i = 0; i < QuestionList.length; i++) {
            table.push(
                <NavLink to="/InClass">
                    <div  style={{  fontSize: 30, fontWeight: "bold",  display:"block" }} >QuestionList
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>{classlist[i].classId}  {classlist[i].className}  {classlist[i].year}

                    </Button>
                    </div>
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


export default QuestionList