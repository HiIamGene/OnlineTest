import React, { useState } from "react"
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
function testBanklist() {
    const classlist = [{ Name: 'การออกแบบUI'  }
        , { Name:  'สีกับความรู้สึก'}]
    var i;
    let table = []
    const classlistOut = () => {
        for (i = 0; i < classlist.length; i++) {
            table.push(
                <NavLink to="/InClass">
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>{classlist[i].Name} 

                    </Button>
                    X
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


export default testBanklist