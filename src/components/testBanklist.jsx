import React, { useEffect, useState } from "react"
import { Button, Popconfirm, Empty } from 'antd';
import { Link } from 'react-router-dom';
import history from "../utils/history";
import { connect } from 'react-redux';
import instance from '../constants/action.js';
import API from "../constants/api.jsx";
const mapStateToProps = state => {
    return {
        selectColumn: state.testBank.selectColumn,
        groupTestList: state.testBank.groupTestList,
    };

};

const mapDispatchToProps = dispatch => {
    return {
        setSelectColumn: (value) => dispatch({ type: 'setSelectColumn', selectColumn: value }),
        setGroupTestList:  (value) => dispatch({ type: 'setGroupTestList', groupTestList: value }),
    };
}

function TestBanklist(props) {
    useEffect(() => {

        instance.get(API.V1.TEACHER.COURSE.TEST.GROUPTESTLIST,
          {
            headers: {
              "TestId": localStorage.getItem('testID'),
              "CourseID": localStorage.getItem('courseID'),
              "Access-Control-Allow-Headers": "*"
            }
          }).then(res => {
            props.setGroupTestList(res.data)
          }).catch(err => {
            console.warn(err);
          });
      }, []);
    const onClickTest = (e) => {
        props.setSelectColumn(e)
        history.push(`/Teacher/QuestionTestBank`)
    }
    const confirm = () => { }
    const listGroupOut = () => {
        if (props.groupTestList === null) {
            return <Empty style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}
                description={false} />
        }
        else {
            return props.groupTestList.map((e, index) =>
                <div key={index}>
                    <Button onClick={() => onClickTest(e)} type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>{e.groupName}</Button>
                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => confirm(e.CourseCode)}>
                        <Button type="link" style={{ color: "#AAAAAA", fontSize: 50, fontWeight: 'bold', display: "inline-block" }}>x</Button>
                    </Popconfirm>
                </div>
            )
        }

    }
    return (

        listGroupOut()

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TestBanklist)