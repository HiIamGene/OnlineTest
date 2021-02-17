import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import Query from '../../components/Query';
const finalSpaceCharacters = [
  {
    QuestionGroupIDL: "1234",
    Name: "choice",
    CourseID: "12345678",
    Type: "choice"
  },
  {
    QuestionGroupIDL: "1234",
    Name: "choice",
    CourseID: "12345678",
    Type: "choice"
  },
  {
    QuestionGroupIDL: "4453",
    Name: "choice",
    CourseID: "12345678",
    Type: "choice"
  },
  {
    QuestionGroupIDL: "4542",
    Name: "choice",
    CourseID: "12345678",
    Type: "choice"
  },
  {
    QuestionGroupIDL: "2341",
    Name: "choice",
    CourseID: "12345678",
    Type: "choice"
  },
]

function Group() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({ QuestionGroupIDL, Name, CourseID, Type }, index) => {
                  return (
                    <Draggable key={QuestionGroupIDL} draggableId={QuestionGroupIDL} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        
                            {QuestionGroupIDL}


                        </div>
                      )}
                    </Draggable>

                  );
                })}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default Group;
