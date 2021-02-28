import React, { useEffect, useState } from "react"
import { Steps, Button, message } from 'antd';
import { Layout , Switch } from 'antd';
import { ContentContainer, Container } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Detail from '../../components/addTest/Detail'
import Group from '../../components/addTest/Group'
import Question from '../../components/addTest/Question'
import AddQuestion from '../../components/addTest/Addquestion'
import Preview from '../../components/addTest/Preview'
import instance from "../../constants/api.jsx";
import API from "../../constants/api.jsx";
import { v4 as uuid } from "uuid";
import Column from "antd/lib/table/Column";
const { Step } = Steps;
const { Header, Content, Footer, Sider } = Layout;
const steps = [
  {
    title: 'first',
    content: 'Second-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];



const columnsFromBackend = {
  "31ded736-4076-4b1c-b38f-7e8d9fa78b41": {
    "name": "จงเลือกคำตอบที่ถูกที่สุด",
    "items": [
      { "id": "c7ac5b7f-59b0-45e3-82fb-b3b0afc05f55", "groupName": "การออกแบบUI", "numQuestion": "5", "score": "6" },
      { "id": "17acf9a1-b2c7-46c6-b975-759b9d9f538d", "groupName": "สีกับความรู้สึก", "numQuestion": "2", "score": "4" },
    ]
  },
  "115f7d04-3075-408a-b8ce-c6e46fe6053f": {
    "name": "",
    "items": []
  },
  "9bcf1415-3a41-43b6-a871-8de1939a75c4": {
    "name": "",
    "items": []
  }
};
function CreateTest(props) {
  const [columns, setColumns] = useState([]);
  const [current, setCurrent] = useState(0);
  const keyValue= "1";
  const form = 4 ;
  useEffect(() => {
    setColumns(columnsFromBackend)
    instance.post("http://142.93.177.152:10000/test",columnsFromBackend
    , {

    } ).then(res => {
      console.log(res.data)
    }).catch(err => {
        console.warn(err);
    })
  }, []);
  //Group
  const onDragEnd = (result, columns) => {
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
    setColumns({ ...temp })
  }
  const onClickAddColumn = (e) => {
    let temp = columns
    temp[e].items.push({ id: uuid(), groupName: "", numQuestion: "", score: "" })
    setColumns({ ...temp })

  }
  const onClickdeletColumn = (e, column) => {
    let temp = columns
    temp[e].items.splice(column, 1)
    setColumns({ ...temp })

  }
  const onSelectgroupName =  (e, column) => {
    setQuestionStatus(false)
    setGroupName(columns[e].items[column].groupName)  
    next()
  }
  //QuestionList
  const [groupName, setGroupName] = useState("");
  //This page
  const [questionStatus, setQuestionStatus] = useState(true);
  const [editqStatus, setEditqStatus] = useState(true);
  const next = () => {
    setCurrent(current + 1 );
  };

  const prev = () => {
    setCurrent(current - 1 );
  };
  const onChange = (current) => {
    setCurrent(current);
  };
  //EditQuestion
  const [questionName, setQuestionName] = useState("");
  const [num, setNum] = useState(0);
  const [maxNum, setMaxNum] = useState(0);
  const [preview, setPreview] = useState("");
  const updatePreview = (e) =>{
    setPreview(e)
  }
  const onSelectquestionName =  (e,value,maxNum) => {
    setNum(value)
    setEditqStatus(false)
    setMaxNum(maxNum)
    //setQuestionName(e)  
    next()
  }
  //var res = str.split("</",1);
  return (

    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout className="site-layout" style={{ marginLeft: 180 }}>
          <ContentContainer style={{ margin: '24px 16px 0', overflow: 'initial' }} >
            <Head />
            <Steps
              type="navigation"
              current={current}
              onChange={onChange}
              className="site-navigation-steps"
            >
              <Step status="process" title="Detail" />
              <Step status="process" title="Group" />
              <Step status="process" disabled={questionStatus} title="Question list" />
              <Step status="process" disabled={editqStatus} title="Edit question" />
              <Step status="process" disabled={editqStatus} title="Preview" />
            </Steps>
            <div className="steps-content">
              {current === 0 && (
                <Detail />
              )}
              {current === 1 && (
                <Group 
                  handlesetColumns={setColumns}
                  onSelectgroupName={onSelectgroupName}
                  onDragEnd={onDragEnd} 
                  onClickAddHeader={onClickAddHeader}
                  onClickdeleteHeader={onClickdeleteHeader}
                  onClickdeletColumn={onClickdeletColumn}
                  onClickAddColumn={onClickAddColumn}
                  columns={columns}

                />
              )}
              {current === 2 && (
                <Question 
                onSelectquestionName={onSelectquestionName}
                groupName={groupName}
                
                />
              )}
              {current === 3 && (
                <AddQuestion 
                  questionName={questionName}
                  num={num}
                  maxNum={maxNum}
                  updatePreview={updatePreview}
                />
              )}
              {current === 4 && (
                              <Preview preview={preview}/>
               
              )}
            </div>
            <div className="steps-action" tyle={{ fontSize: 30 }}>Draft
                <Switch style={{ margin: '0 8px' }} defaultChecked ></Switch>
              {current === steps.length - 1 && (

                < Button style={{ margin: '0 8px' }} type="primary" onClick={() => message.success('Processing complete!')}>Save</Button>
              )}
            </div>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container >

  );

};

export default CreateTest
