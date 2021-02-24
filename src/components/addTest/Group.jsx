import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Select, Divider, Input, Row, Col, Button ,Popconfirm} from 'antd';
import { Link } from 'react-router-dom';
import Query from '../Query';
import { v4 as uuid } from "uuid";

function Group(props) {
  const max = 6
  const handleNumQ = (numQ, columnId, index) => {
    let temp = props.columns
    temp[columnId].items[index].numQuestion = numQ
    props.handlesetColumns({ ...temp })
  }
  const handleScore = (score, columnId, index) => {
    let temp = props.columns
    temp[columnId].items[index].score = score
    props.handlesetColumns({ ...temp })
  }
  const handleHeader = (header, columnId) => {
    let temp = props.columns
    temp[columnId].name = header
    props.handlesetColumns({ ...temp })
  }
  return (
    <div style={{ justifyContent: "center", height: "100%", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => { props.onClickAddHeader() }} type="primary" size="large" style={{ alignItems: "center", background: '#F43A09' }}>Add Header</Button>
      </div>
      <DragDropContext onDragEnd={result => props.onDragEnd(result, props.columns)}>
        {Object.entries(props.columns).map(([columnId, column], index) => {
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
                    <Col span={3} offset={1} style={{ color: '#FFFFFF', fontWeight: "bold", marginTop: 5 }} >Header :</Col>
                    <Col span={12} >
                      <Input defaultValue={props.columns[columnId].name} onChange={e => { handleHeader(e.target.value, columnId) }}></Input>
                    </Col>
                    <Col span={8}></Col>
                  </Row>
                </div>
                <div style={{ marginTop: 25, marginLeft: 10, fontSize: 30 }}>
                  <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => props.onClickdeleteHeader(columnId)}>
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
                                                defaultValue={props.columns[columnId].items[index].groupName}
                                                handlesetColumns={props.handlesetColumns}
                                                columns={props.columns}
                                                columnId={columnId}
                                                index={index}
                                              />
                                            </Col>
                                            <Col span={5} offset={1} style={{ color: '#FFFFFF' }}><div>Number of questions</div></Col>
                                            <Col span={1} style={{ color: '#000000' }}>
                                              <input defaultValue={props.columns[columnId].items[index].numQuestion} onChange={e => handleNumQ(e.target.value, columnId, index)} style={{ marginTop: 10, height: 35, width: 35 }} />
                                            </Col>
                                            <Col span={1} style={{ color: '#FFFFFF' }}>/{max}</Col>
                                            <Col span={1} style={{ color: '#FFFFFF' }}>Score</Col>
                                            <Col span={1} style={{ color: '#000000' }}>
                                              <input defaultValue={props.columns[columnId].items[index].score} onChange={e => handleScore(e.target.value, columnId, index)} style={{ marginTop: 10, height: 35, width: 35 }} />
                                            </Col>
                                            <Col span={3} >

                                              <Button onClick={() => props.onSelectgroupName(columnId, index)} type="primary" style={{ marginTop: 10, background: '#F43A09' }} >Add Question</Button>

                                            </Col>
                                          </Row>
                                        </div>
                                        <div style={{ marginTop: 40, marginLeft: 10, fontSize: 30 }}>
                                          <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => props.onClickdeletColumn(columnId, index)}>
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
                        <Button onClick={() => props.onClickAddColumn(columnId)} type="primary" shape="circle" size="large" style={{ alignItems: "center", background: '#F4A940', color: '#FFFFFF' }}>+</Button>
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

export default Group;
