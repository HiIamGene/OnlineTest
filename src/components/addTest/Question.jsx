import React, { useState, useEffect } from "react"
import { Input, Row, Col, Button, Result, Popconfirm } from 'antd';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    groups: state.createTest.groups,
    questionsTestbank: state.createTest.questionsTestbank,
    headers: state.createTest.headers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHeaders: (value) => dispatch({ type: 'setStateHeaders', headers: value }),
    setGroups: (value) => dispatch({ type: 'setGroups', groups: value }),
    setQuestionsTestbank: (value) => dispatch({ type: 'setQuestionsTestbank', questionsTestbank: value }),
  };
}

function Question(props) {
  //const [selectColumn, setSelectColumn] = useState(props.groups.questionList);
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const copiedItems = Array.from(props.groups.questionList);
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    props.groups.questionList = copiedItems
    props.setGroups({ ...props.groups });
  };
  useEffect(() => {
    props.groups.maxQuestion = props.groups.questionList.length.toString()
    props.setGroups({ ...props.groups })
  }, []);
  useEffect(() => {

    for (const [items, name] of Object.entries(props.headers)) {
      for (const [columnId, column] of Object.entries(props.headers[items].items)) {
        if (props.groups.id === props.headers[items].items[columnId].id) {
          props.headers[items].items[columnId] = props.groups
          props.setHeaders({ ...props.headers });
        }
      }

    }
  }, [props.groups]);
  const onClickAddColumn = () => {
    let temp = props.groups
    let id = uuid()
    temp.questionList.push({ "questionID": id, "question": "Please edit this question before save" })
    props.questionsTestbank.push({
      "groupID": props.groups.id, "questionID": id, "question": "Please edit this question before save", "type": "", "data": "", "choice":
        [{
          "check": "false",
          "choiceID": uuid(),
          "data": "",
          "imageLink": [],
          "questionID": ""
        }]
    })
    props.setQuestionsTestbank(props.questionsTestbank)
    temp.maxQuestion = temp.questionList.length.toString()
    props.setGroups({ ...temp })
  }
  const onClickdeletColumn = (index) => {
    let temp = props.groups
    //let select= temp[e].items[column]
    temp.questionList.splice(index, 1)
    temp.maxQuestion = temp.questionList.length.toString()
    props.setGroups({ ...temp gustify="space-around">
      <Col span={22} offset={2}>
        <div style={{ fontSize: 50, fontWeight: 'bold' }}>{props.groups.groupName}</div>
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
                        {props.groups.questionList.map((item, index) => {
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
                                          <Button onClick={() => props.onSelectquestionName(props.groups.questionList[index].question, index, props.groups.questionList.length)} type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1330, height: 100, marginTop: 30, textAlign: 'left' }}>{item.question}</Button>
                                        </div>
                                        <table style={{ marginTop: 30, marginLeft: 20 }}>
                                          <div style={{ marginTop: 20, marginLeft: 10, fontSize: 30 }}>
                                            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => onClickdeletColumn(index)}>
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

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);