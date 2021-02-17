import React, { useState } from "react"
import { Input, Row, Col, Button } from 'antd';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';
import { v4 as uuid } from "uuid";
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
  
function QuestionList(props) {
    const [columns, setColumns] = useState(props.columnsFromBackend);
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
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => { onClickAddColumn() }} type="primary" size="large" style={{ alignItems: "center", background: '#F43A09' }}>Add Header</Button>
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
                                                                            <Row>
                                                                                <Link to="/AddQuestion">
                                                                                    <div style={{ fontSize: 30, fontWeight: "bold", display: "block", color: "#000000" }} >{ }.
                                                                                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1330, height: 100, marginTop: 30, textAlign: 'left' }}>
                                                                                            asdasd
                                                                                        </Button>

                                                                                    </div>
                                                                                </Link>
                                                                                <table style={{ marginTop: 30, marginLeft: 20 }}>
                                                                                    <div>
                                                                                        <Button type="primary" shape="circle" size="large" style={{ backgroundColor: '#F4A940', justifyContent: 'center', alignContent: 'center', background: '#F4A940', color: '#FFFFFF', width: 50, height: 50 }}>
                                                                                            <div style={{ fontSize: 30 }}>+</div>
                                                                                        </Button>
                                                                                    </div>
                                                                                    <div>
                                                                                        <Button type="primary" shape="circle" size="large" style={{ backgroundColor: '#F4A940', justifyContent: 'center', alignContent: 'center', background: '#F4A940', color: '#FFFFFF', width: 50, height: 50 }}>
                                                                                            <div style={{ fontSize: 30 }}>x</div>
                                                                                        </Button>
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
    )
}


export default QuestionList