
import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd'; //เอามาจาก react-beautiful-dnd
import initial from './data'; // ข้อมูลที่จะเอามาแสดง มี 20 ตัว
import Column from './column';
import { mutliDragAwareReorder, multiSelectTo as multiSelect } from './utils';

const Container = styled.div`
  display: flex;
  user-select: none;
  justify-content: center;
`;
const getTasks = (entities, columnId) =>
  entities.columns[columnId].taskIds.map(
    (taskId) => entities.tasks[taskId]
  );

class TaskApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entities: initial,
      tasks: {},
      selectedTaskIds: [],
      draggingTaskId: ''
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('keydown', this.onWindowKeyDown);
    window.addEventListener('touchend', this.onWindowTouchEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('keydown', this.onWindowKeyDown);
    window.removeEventListener('touchend', this.onWindowTouchEnd);
  }

  onDragStart = (start) => {
    const id = start.draggableId
    const selected = () => this.state.selectedTaskIds.find((taskId) => taskId === id)

    if (!this.state.selectedTaskIds.some(selected)) {
      this.unselectAll()
    }
    this.setState({
      draggingTaskId: start.draggableId,
    });
  }

  onDragEnd = (result) => {
    const destination = result.destination;
    const source = result.source;

    // nothing to do
    if (!destination || result.reason === 'CANCEL') {
      this.setState({
        draggingTaskId: null,
      });
      return;
    }

    const processed = mutliDragAwareReorder({
      entities: this.state.entities,
      selectedTaskIds: this.state.selectedTaskIds,
      source,
      destination,
    });

    console.log('processed',processed)

    this.setState({
      ...processed,
      draggingTaskId: null,
    });
  }

  onWindowKeyDown = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === 'Escape') {
      this.unselectAll();
    }
  };

  onWindowClick = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    this.unselectAll();
  };

  onWindowTouchEnd = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    this.unselectAll();
  };


  toggleSelection = (taskId) => {
    const selectedTaskIds = this.state.selectedTaskIds;
    const wasSelected = selectedTaskIds.includes(taskId);
    console.log('wasSelected', wasSelected)

    const newTaskIds = (() => {
      // Task was not previously selected
      // now will be the only selected item
      if (!wasSelected) {
        return [taskId];
      }

      // Task was part of a selected group
      // will now become the only selected item
      if (selectedTaskIds.length > 1) {
        return [taskId];
      }

      // task was previously selected but not in a group
      // we will now clear the selection
      return [];
    })();

    this.setState({
      selectedTaskIds: newTaskIds,
    })
  }

  toggleSelectionInGroup = (taskId) => {
    const selectedTaskIds = this.state.selectedTaskIds;
    const index = selectedTaskIds.indexOf(taskId);

    // if not selected - add it to the selected items
    if (index === -1) {
      this.setState({
        selectedTaskIds: [...selectedTaskIds, taskId],
      });
      return;
    }

    // it was previously selected and now needs to be removed from the group
    const shallow = [...selectedTaskIds];
    shallow.splice(index, 1);
    this.setState({
      selectedTaskIds: shallow,
    })
  }

  multiSelectTo = (newTaskId) => {
    const updated = multiSelect(
      this.state.entities,
      this.state.selectedTaskIds,
      newTaskId,
    );

    if (updated == null) {
      return;
    }

    this.setState({
      selectedTaskIds: updated,
    });
  };


  unselectAll = () => {
    this.setState({
      selectedTaskIds: [],
    });
  }

  render() {
    const entities = this.state.entities;
    const selected = this.state.selectedTaskIds;
    console.log('ThisState', this.state)
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
      onDragEnd={this.onDragEnd}
      >
        <Container>
          {entities.columnOrder.map((columnId) => (
            <Column
              column={entities.columns[columnId]}
              tasks={getTasks(entities, columnId)}
              selectedTaskIds={selected}
              key={columnId}
              draggingTaskId={this.state.draggingTaskId}
              toggleSelection={this.toggleSelection}
              toggleSelectionInGroup={this.toggleSelectionInGroup}
              multiSelectTo={this.multiSelectTo}
            />
          ))}
        </Container>
      </DragDropContext>
    )
  }
}

export default TaskApp