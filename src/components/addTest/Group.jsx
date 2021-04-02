import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Select, Divider, Input, Row, Col, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import Query from '../Query';
import { v4 as uuid } from "uuid";
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    headers: state.createTest.headers,
    groups: state.createTest.groups,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHeader: (value) => dispatch({ type: 'setStateHeaders', headers: value }),
    setGroups: (value) => dispatch({ type: 'setGroups', groups: value }),
  };
}

const onDragEnd = (result, columns, setHeader) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setHeader({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setHeader({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};
function Group(props) {
  const setDefaultValue = (index, columnId, e) => {
    let temp = props.headers
    // console.log('header before temp: ',props.headers)
    temp[columnId].items[index] = { "id": uuid(), "groupName": e, "numQuestion": "0", "maxQuestion": "0", "score": "", "questionList": [] }
    props.setHeader({ ...temp })
  }
  const onClickAddHeader = () => {
    let temp = props.headers
    temp[uuid()] = {
      "name": "",
      "items": []
    }
    props.setHeader({ ...temp })
  }
  const onClickdeleteHeader = (e) => {
    let temp = props.headers
    delete temp[e]
    props.setHeader({ ...temp })

  }
  const onClickAddColumn = (e) => {
    let temp = props.headers
    temp[e].items.push({ "id": uuid(), "groupName": "", "numQuestion": "0", "maxQuestion": "0", "score": "", "questionList": [] })
    props.setHeader({ ...temp })

  }
  const onClickdeletColumn = (e, column) => {
    let temp = props.headers
    temp[e].items.splice(column, 1)
    props.setHeader({ ...temp })

  }

  const handleNumQ = (numQ, columnId, index) => {
    if (parseInt(numQ) <= parseInt(props.headers[columnId].items[index].maxQuestion)) {
      let temp = props.headers
      temp[columnId].items[index].numQuestion = numQ
      props.setHeader({ ...temp })
    }
    else {
      alert(numQ + " is more than max of question")
    }
  }
  const handleScore = (score, columnId, index) => {
    let temp = props.headers
    temp[columnId].items[index].score = score
    props.setHeader({ ...temp })
  }
  const handleHeader = (header, columnId) => {
    let temp = props.headers
    temp[columnId].name = header
    props.setHeader({ ...temp })
  }
  const selectAddQuestion = (columns, e, column) => {
    props.setGroups({ ...columns[e].items[column] })
    props.onSelectgroupName(columns, e, column)
  }
  return (
    <div style={{ justifyContent: "center", height: "100%", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => onClickAddHeader()} type="primary" size="large" style={{ alignItems: "center", background: '#F43A09' }}>Add Header</Button>
      </div>
      <DragDropContext onDragEnd={result => onDragEnd(result, props.headers, props.setHeader)}>
        {Object.entries(props.headers).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <Row gutter={2} type="flex" justify="space-around">
                <div style={{ fontSize: 25, background: '#F4A940', width: 1400, height: 50, marginTop: 30, display: "block" }}>
                  <Row gutter={2} type="flex" justify="space-around">
                    <Col span={3} offset={1} style={{ color: '#FFFFFF', fontWeight: "bold", marginTop: 5 }} >Part :</Col>
                    <Col span={12} >
                      <Input style={{ fontSize: 20 ,marginTop:5}} defaultValue={props.headers[columnId].name} onChange={e => { handleHeader(e.target.value, columnId) }}></Input>
                    </Col>
                    <Col span={8}></Col>
                  </Row>
                </div>
                <div style={{ marginTop: 25, marginLeft: 10, fontSize: 30 }}>
                  <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => onClickdeleteHeader(columnId)}>
                    <Button type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>x</Button>
                  </Popconfirm>

                </div>
              </Row>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div {...provided.droppableProps} ref={provided.innerRef} style={{ background: snapshot.isDraggingOver ? "lightblue" : "lightgrey", padding: 4, minWidth: 1470, minHeight: 50, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
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

                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <div>
                                      <Row gutter={24} type="flex" justify="space-around">
                                        <div style={{ fontSize: 25, background: '#F4A940', width: 1400, height: 135, display: "block" }}>
                                          <Row gutter={24} type="flex" justify="space-around">
                                            <Col span={23} offset={1} style={{ color: '#FFFFFF', fontWeight: "bold", marginTop: 20 }} >Group</Col>
                                            <Col span={9} offset={1}>
                                              <Query
                                                defaultValue={props.headers[columnId].items[index].groupName}
                                                setDefaultValue={setDefaultValue}
                                                columnId={columnId}
                                                index={index}
                                                style={{fontSize:25}}
                                              />
                                            </Col>
                                            <Col span={5} offset={1} style={{ color: '#FFFFFF' }}><div>Number of questions</div></Col>
                                            <Col span={1} style={{ color: '#000000' }}>
                                              <input defaultValue={props.headers[columnId].items[index].numQuestion} onChange={e => handleNumQ(e.target.value, columnId, index)} style={{  marginLeft:20, height: 35, width: 35 }} />
                                            </Col>
                                            <Col span={1} style={{ color: '#FFFFFF' }}>/{props.headers[columnId].items[index].maxQuestion}</Col>
                                            <Col span={1} style={{ color: '#FFFFFF' }}>Score</Col>
                                            <Col span={1} style={{ color: '#000000' }}>
                                              <input  defaultValue={props.headers[columnId].items[index].score} onChange={e => handleScore(e.target.value, columnId, index)} style={{ marginLeft:10, height: 35, width: 35 }} />
                                            </Col>
                                            <Col span={3} >
                                              <Button onClick={() => selectAddQuestion(props.headers, columnId, index)} type="primary" style={{ marginTop: 10, background: '#F43A09' }} >Add Question</Button>
                                            </Col>
                                          </Row>
                                        </div>
                                        <div style={{ marginTop: 40, marginLeft: 10, fontSize: 30 }}>
                                          <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => onClickdeletColumn(columnId, index)}>
                                            <Button type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>x</Button>
                                          </Popconfirm>
                                        </div>
                                      </Row>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>

                          );
                        })}
                        <Button onClick={() => onClickAddColumn(columnId)} type="primary" shape="circle" size="large" style={{ alignItems: "center", background: '#F4A940', color: '#FFFFFF' }}>+</Button>
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Group)
