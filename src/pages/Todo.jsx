import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Select, Divider, Input, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import Query from '../components/Query';
import { v4 as uuid } from "uuid";
const itemsFromBackend = [
  { id: "c7ac5b7f-59b0-45e3-82fb-b3b0afc05f55", content: "First task" },
  { id: "17acf9a1-b2c7-46c6-b975-759b9d9f538d", content: "Second task" },
  { id: "07710f91-7969-44a8-8576-280fd534bb3a", content: "Third task" },
  { id: "dfb58089-f603-4140-ae83-886f8abbc064", content: "Fourth task" },
  { id: "8938ec37-8d73-4fbe-9202-936d88437022", content: "Fifth task" }
];

const columnsFromBackend = {
  "31ded736-4076-4b1c-b38f-7e8d9fa78b41": {
    name: "Requested",
    items: itemsFromBackend
  },
  "115f7d04-3075-408a-b8ce-c6e46fe6053f": {
    name: "To do",
    items: []
  },
  "9bcf1415-3a41-43b6-a871-8de1939a75c4": {
    name: "In Progress",
    items: []
  },
  "2f6c1455-6cf9-4009-b86b-de0a0d2204a1": {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
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
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};


function Todo() {
  //const [columns, setColumns] = useState(columnsFromBackend);
  const [columns, setColumns] = useState(columnsFromBackend);
  const onClickdeleteHeader = (e) => {
    let temp = columns
    delete temp[e]
    setColumns({ ...temp })

  }

  const onClickAddHeader = (e) => {
    let temp = columns
    temp[uuid()] = {
      name: "",
      items: []
    }
    console.log(temp)
    setColumns({ ...temp })

  }
  const onClickAddColumn = (e) => {
    let temp = columns
    temp[e].items.push({ id: uuid(), content: "" })
    setColumns({ ...temp })

  }
  const onClickdeletColumn = (e,column) => {
    let temp = columns
    delete temp[e].items[column]
    setColumns({ ...temp })

  }
  return (
    <div style={{ justifyContent: "center", height: "100%", width: "100%" }}>
      <div  style={{ display: "flex",justifyContent: "flex-end"}}>
        <Button onClick={()=>{onClickAddHeader()}} type="primary" size="large" style={{ alignItems: "center", background: '#F43A09' }}>Add Header</Button>
      </div>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
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
                      <Input ></Input>
                    </Col>
                    <Col span={8}></Col>
                  </Row>
                </div>
                <div style={{ marginTop: 25, marginLeft: 10, fontSize: 30 }}>

                  <Button onClick={() => onClickdeleteHeader(columnId)} type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>x</Button>
                </div>
              </Row>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div {...provided.droppableProps} ref={provided.innerRef} style={{ background: snapshot.isDraggingOver ? "lightblue" : "lightgrey", padding: 4, minWidth: 1450, minHeight: 50, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                                            <Col span={9} offset={1}><Query /></Col>
                                            <Col span={5} offset={1} style={{ color: '#FFFFFF' }}><div>Number of questions</div></Col>
                                            <Col span={1}><input style={{ marginTop: 10, height: 35, width: 35 }} /></Col>
                                            <Col span={1} style={{ color: '#FFFFFF' }}>/6</Col>
                                            <Col span={1} style={{ color: '#FFFFFF' }}>Score</Col>
                                            <Col span={1}><input style={{ marginTop: 10, height: 35, width: 35 }} /></Col>
                                            <Col span={3} >
                                              <Link to="/Question">
                                                <Button type="primary" style={{ marginTop: 10, background: '#F43A09' }} >Add Question</Button>
                                              </Link>
                                            </Col>
                                          </Row>
                                        </div>
                                        <div style={{ marginTop: 40, marginLeft: 10, fontSize: 30 }}>
                                          <Button onClick={() => onClickdeletColumn(columnId,index)} type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>x</Button>
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

export default Todo;
