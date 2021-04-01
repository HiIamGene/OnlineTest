import React, { useEffect, useState } from "react"
import { Button, Popconfirm, Empty } from 'antd';
import instance from '../../constants/action.js';
import API from "../../constants/api.jsx";
import { Link } from 'react-router-dom';

function Score(props) {
    useEffect(() => {
        instance.get(API.V1.STUDENT.SCORE
            ).then(res => {
    
            console.log(res.data)
        }).catch(err => {
            console.warn(err);
        })
    }, []);


    return (
      <div></div>
    )
}


export default Score