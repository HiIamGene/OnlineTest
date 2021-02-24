import React, { useState, useEffect } from "react"
import { Layout, Typography, Row, Col, Button, Popconfirm } from 'antd';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
const itemsFromBackend = [
    { id: uuid(), name: "สีอะไรคือสีโทนร้อน?" }
    , { id: uuid(), name: "ทำไมต้องทำ Usability Testing ?" }
    , { id: uuid(), name: "Low-fidelity prototype คือ ?" }
    , { id: uuid(), name: "Hi-fidelity prototype  คือ ?" }]
const columnsFromBackend = {
    [uuid()]: {
        name: "การออกแบบUI",
        items: itemsFromBackend
    },
    [uuid()]: {
        name: "สีกับความรู้สึก",
        items: []
    }

};
const newForm = {
    [uuid()]: {
        name: "",
        items: []
    },

};

function Question(props) {
    const keyValue = "3";
    const form = 2;
    const [columns, setColumns] = useState(columnsFromBackend);
    const [selectColumn, setSelectColumn] = useState([]);
    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        const copiedItems = Array.from(selectColumn);
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setSelectColumn([...copiedItems]);

    };
    useEffect(() => {
        for (const [columnId, column] of Object.entries(columns)) {
            if (column.name === props.groupName) {
                setSelectColumn(column.items)
            }
            else {
                //delete temp[columnId]
            }
        }
        /*if (!selectColumn) {
          temp = newForm
          setSelectColumn({ ...temp })
        }*/

    }, [props.groupName]);
    const onClickAddColumn = () => {
        let temp = selectColumn
        temp.push({ id: uuid(), name: "Please enter question" })
        setSelectColumn([...temp])

    }
    const onClickdeletColumn = (index) => {
        let temp = selectColumn
        //let select= temp[e].items[column]
        temp.splice(index, 1)
        setSelectColumn([...temp])

    }

    return (
        <Container>
            <Layout style={{ marginLeft: 180 }}>
                <SideMenu keyValue={keyValue} form={form} />
                <Layout>
                    <ContentContainer >
                        <Head history={props.history} />
                        <Row gutter={16} type="flex" justify="space-around">
                            <Col span={22} offset={2}>
                                <div style={{ fontSize: 50, fontWeight: 'bold' }}>{props.location.data.groupName}</div>
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
                                                                {selectColumn.map((item, index) => {
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
                                                                                                ? "#1890FF"
                                                                                                : "#70C5FB",
                                                                                            color: "white",
                                                                                            ...provided.draggableProps.style
                                                                                        }}
                                                                                    >
                                                                                        <div>
                                                                                            <Row>
                                                                                                <div style={{ fontSize: 30, fontWeight: "bold", display: "block", color: "#000000" }} >{index + 1}.
                                                                                                    <Button onClick={() => props.onSelectquestionName(selectColumn[index].name, index + 1)} type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1330, height: 100, marginTop: 30, textAlign: 'left' }}>{item.name}</Button>
                                                                                                </div>
                                                                                                <table style={{ marginTop: 30, marginLeft: 20 }}>
                                                                                                    <div style={{ marginTop: 40, marginLeft: 10, fontSize: 30 }}>
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
                    </ContentContainer>
                </Layout>
            </Layout>
        </Container >

    );
}

export default Question;