import React, { useState, useEffect } from "react"
import { Layout, Typography, Row, Col, Button, Popconfirm } from 'antd';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import { connect } from 'react-redux';
import history from "../..//utils/history";
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import API from "../../constants/api.jsx";
import instance from "../../constants/action.js";
const mapStateToProps = state => {
    return {
        selectColumn: state.testBank.selectColumn,
        questionsTestbank: state.testBank.questionsTestbank
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setSelectColumn: (value) => dispatch({ type: 'setSelectColumn', selectColumn: value }),
        setCurrentQuestion: (value) => dispatch({ type: 'setCurrentQuestion', currentQuestion: value }),
        setQuestionsTestbank: (value) => dispatch({ type: 'setQuestionsTestbank', questionsTestbank: value })
    };
}
function Question(props) {
    useEffect(() => {
        instance.get(API.V1.TEACHER.COURSE.TEST.ALLQUESTIONINTESTBANK,
            {
                headers: {
                    "CourseID": localStorage.getItem('courseID'),
                    "Access-Control-Allow-Headers": "*"
                }
            }).then(res => {
                if (res.data) {
                    props.setQuestionsTestbank(res.data)
                } else {
                    props.setGroupsTestbank([])
                }
            }).catch(err => {
                console.warn(err);
            });
    }, []);
    const keyValue = "3";
    const form = 2;
    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        const copiedItems = Array.from(props.selectColumn.questionList);
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        props.selectColumn.questionList = copiedItems
        props.setSelectColumn({ ...props.selectColumn });

    };
    const onClickAddColumn = () => {
        let id = uuid()
        props.selectColumn.questionList.push({ "questionID": id, "question": "Please edit this question before save" })
        props.questionsTestbank.push({
            "groupID": props.selectColumn.id, "questionID": id, "question": "Please edit this question before save", "type": "", "data": "", "choice":
                [{
                    "check": "false",
                    "choiceID": uuid(),
                    "data": "",
                    "imageLink": [],
                    "questionID": ""
                }]
        })
        props.setQuestionsTestbank([...props.questionsTestbank])
        props.selectColumn.maxQuestion = props.selectColumn.questionList.length.toString()
        props.setSelectColumn({ ...props.selectColumn })


    }
    const onClickdeletColumn = (index) => {
        //let select= temp[e].items[column]
        props.selectColumn.questionList.splice(index - 1, 1)
        props.setSelectColumn({ ...props.selectColumn })
    }
    const onSelectquestionName = (index) => {
        props.selectColumn.maxQuestion = props.selectColumn.questionList.length.toString()
        props.setSelectColumn({ ...props.selectColumn })
        props.setCurrentQuestion(index)
        history.push(`/Teacher/EditQuestionTestBank`)
    }
    return (
        <Container>
            <Layout style={{ marginLeft: 180 }}>
                <SideMenu keyValue={keyValue} form={form} />
                <Layout>
                    <ContentContainer >
                        <Head />
                        <Row gutter={16} type="flex" justify="space-around">
                            <Col span={22} offset={2}>
                                <div style={{ fontSize: 50, fontWeight: 'bold' }}>{props.selectColumn.groupName}</div>
                            </Col>
                            <Col span={24} >
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button onClick={() => { onClickAddColumn() }} type="primary" size="large" style={{ alignItems: "center", background: '#F43A09' }}>Add Question</Button>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                                    <DragDropContext
                                        onDragEnd={onDragEnd}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center"
                                            }}
                                        >
                                            <div style={{ margin: 8 }}>
                                                <Droppable droppableId="selectColumn" >
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div
                                                                {...provided.droppableProps} ref={provided.innerRef} style={{ background: snapshot.isDraggingOver ? "lightblue" : "lightgrey", padding: 4, minWidth: 1470, minHeight: 50, display: "flex", flexDirection: "column", alignItems: "center" }}
                                                            >
                                                                {props.selectColumn.questionList.map((item, index) => {

                                                                    return (
                                                                        <Draggable
                                                                            key={item.questionID}
                                                                            draggableId={item.questionID}
                                                                            index={index}
                                                                        >
                                                                            {(provided, snapshot) => {
                                                                                return (
                                                                                    <div
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        style={{
                                                                                            userSelect: "none",
                                                                                            padding: 16,
                                                                                            margin: "0 0 8px 0",
                                                                                            minHeight: "50px",
                                                                                            backgroundColor: snapshot.isDragging
                                                                                                ? "#1890FF"
                                                                                                : "#70C5FB",
                                                                                            color: "white",
                                                                                            ...provided.draggableProps.style
                                                                                        }}
                                                                                    >
                                                                                        <div>
                                                                                            <Row>
                                                                                                <div style={{ fontSize: 30, fontWeight: "bold", display: "block", color: "#000000" }} >{index + 1}.
                                                                                                    <Button onClick={() => onSelectquestionName(index + 1)} type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1330, height: 100, marginTop: 30, textAlign: 'left' }}>{item.question}</Button>
                                                                                                </div>
                                                                                                <table style={{ marginTop: 30, marginLeft: 20 }}>
                                                                                                    <div style={{ marginTop: 40, marginLeft: 10, fontSize: 30 }}>
                                                                                                        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => onClickdeletColumn(index + 1)}>
                                                                                                            <Button type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>x</Button>
                                                                                                        </Popconfirm>

                                                                                                    </div>
                                                                                                </table>
                                                                                            </Row>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            }}
                                                                        </Draggable>
                                                                    );
                                                                })}
                                                                {provided.placeholder}
                                                            </div>
                                                        );
                                                    }}
                                                </Droppable>
                                            </div>
                                        </div>
                                    </DragDropContext>
                                </div>
                            </Col>
                        </Row>
                    </ContentContainer>
                </Layout>
            </Layout>
        </Container >

    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);