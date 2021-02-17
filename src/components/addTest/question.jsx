import React, { useState } from "react"
import { Input, Row, Col, Button } from 'antd';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: uuid(), name: "สีอะไรคือสีโทนร้อน?" }
  , { id:uuid(), name: "ทำไมต้องทำ Usability Testing ?" }
  , { id:uuid(), name: "Low-fidelity prototype คือ ?" }
  , { id:uuid(), name: "Hi-fidelity prototype  คือ ?" }]
const columnsFromBackend = {
  ["31ded736-4076-4b1c-b38f-7e8d9fa78b41"]: {
    name: "Requested",
    items: itemsFromBackend
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
function Question(props) {
  const [columns, setColumns] = useState(columnsFromBackend);
  const onClickAddColumn = (e) => {
    let temp = columns
    temp[e].items.push({ id: uuid(), name: "Please enter question" })
    setColumns({ ...temp })

  }
  const onClickdeletColumn = (e, column) => {
    let temp = columns
    delete temp[e].items[column]
    setColumns({ ...temp })
  }

  return (

    <Row gutter={16} type="flex" justify="space-around">
      <Col span={22} offset={2}>
        <div style={{ fontSize: 50, fontWeight: 'bold' }}>การออกแบบUI</div>
      </Col>
      <Col span={24} >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => { onClickAddColumn("31ded736-4076-4b1c-b38f-7e8d9fa78b41") }} type="primary" size="large" style={{ alignItems: "center", background: '#F43A09' }}>Add Header</Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
          <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
          >
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
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps} ref={provided.innerRef} style={{ background: snapshot.isDraggingOver ? "lightblue" : "lightgrey", padding: 4, minWidth: 1470, minHeight: 50, display: "flex", flexDirection: "column", alignItems: "center" }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
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
                                            ? "#263B4A"
                                            : "#456C86",
                                          color: "white",
                                          ...provided.draggableProps.style
                                        }}
                                      >
                                        <div>

                                          <Row>
                                            <div style={{ fontSize: 30, fontWeight: "bold", display: "block", color: "#000000" }} >{index+1}.
                                      <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1330, height: 100, marginTop: 30, textAlign: 'left' }}>{item.name}</Button>
                                            </div>
                                            <table style={{ marginTop: 30, marginLeft: 20 }}>
                                              <div style={{ marginTop: 40, marginLeft: 10, fontSize: 30 }}>
                                                <Button onClick={() => onClickdeletColumn(columnId, index)} type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>x</Button>
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
              );
            })}
          </DragDropContext>
        </div>
      </Col>
    </Row>

  );
}

export default Question;