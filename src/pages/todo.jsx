import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from 'axios';
const itemsFromBackend = [
  { id: "c7ac5b7f-59b0-45e3-82fb-b3b0afc05f55", groupName: "First task" , numQuestion: "First task" ,score:"First task"},
  { id: "17acf9a1-b2c7-46c6-b975-759b9d9f538d", groupName: "First task" , numQuestion: "First task" ,score:"First task" },
  { id: "07710f91-7969-44a8-8576-280fd534bb3a", groupName: "First task" , numQuestion: "First task" ,score:"First task" },
  { id: "dfb58089-f603-4140-ae83-886f8abbc064", groupName: "First task" , numQuestion: "First task" ,score:"First task" },
  { id: "8938ec37-8d73-4fbe-9202-936d88437022", groupName: "First task" , numQuestion: "First task" ,score:"First task" }
];

const columnsFromBackend = {
  ["31ded736-4076-4b1c-b38f-7e8d9fa78b41"]: {
    name: "Requested",
    items: itemsFromBackend
  },
  ["115f7d04-3075-408a-b8ce-c6e46fe6053f"]: {
    name: "To do",
    items: []
  },
  ["9bcf1415-3a41-43b6-a871-8de1939a75c4"]: {
    name: "In Progress",
    items: []
  },
  ["2f6c1455-6cf9-4009-b86b-de0a0d2204a1"]: {
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
  const [columns, setColumns] = useState(columnsFromBackend);
  /*useEffect(() => {
    axios.post("http://142.93.177.152:10000/grouptestlistupdate",
    columnsFromBackend
    , {
    }).then(res => {
      console.log(res.data)
      //setColumns(res.data)
    }).catch(err => {
      console.warn(err);
    })
  }, []);*/
  
  return (
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
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
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
                                    {item.content}
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
  );
}

export default Todo;
