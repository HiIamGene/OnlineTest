import React, { useEffect, useState } from "react"
import { Steps, Button, message, Spin } from 'antd';
import { Layout, Switch } from 'antd';
import { ContentContainer, Container } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Detail from '../../components/addTest/Detail'
import Group from '../../components/addTest/Group'
import Question from '../../components/addTest/Question'
import AddQuestion from '../../components/addTest/Addquestion'
import Preview from '../../components/addTest/Preview'
import instance from "../../constants/action.js";
import axios from "axios"
import API from "../../constants/api.jsx";
import { v4 as uuid } from "uuid";
import Column from "antd/lib/table/Column";
import { connect } from 'react-redux';
const { Step } = Steps;
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
const mapStateToProps = state => {
  return {
    groups: state.createTest.groups,
    maxQuestion: state.createTest.maxQuestion,
    headers: state.createTest.headers,
    detail: state.createTest.detail,
    draft: state.createTest.draft,
    currentQuestion: state.createTest.currentQuestion,
    groupsTestbank: state.createTest.groupsTestbank,
    questionsTestbank: state.createTest.questionsTestbank,
  };
  //localStorage.getItem('courseCode')
}
const mapDispatchToProps = dispatch => {
  return {
    setDraft: (value) => dispatch({ type: 'setDraft', draft: value }),
    setGroups: (value) => dispatch({ type: 'setGroups', groups: value }),
    setMaxQuestion: (value) => dispatch({ type: 'setMaxQuestion', maxQuestion: value }),
    setQuestionCurrent: (value) => dispatch({ type: 'setQuestionCurrent', questionCurrent: value }),
    setHeader: (value) => dispatch({ type: 'setStateHeaders', headers: value }),
    setCurrentQuestion: (value) => dispatch({ type: 'setCurrentQuestion', currentQuestion: value }),
    setQuestionsTestbank: (value) => dispatch({ type: 'setQuestionsTestbank', questionsTestbank: value }),
    setGroupsTestbank: (value) => dispatch({ type: 'setStateGroups', groupsTestbank: value }),
    setDetail: (value) => dispatch({ type: 'updateDetail', detail: value }),
  };
}
function CreateTest(props) {
  const [columns, setColumns] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const keyValue = "1";
  const form = 4;
  useEffect(() => {
    if (localStorage.getItem('testID')) {
      instance.get(API.V1.TEACHER.COURSE.TEST.GROUPSTESTLISTUPDATE,
        {
          headers: {
            "TestId": localStorage.getItem('testID'),
            "CourseCode": localStorage.getItem('courseCode'),
            "CourseID": localStorage.getItem('courseID'),
          }
        }).then(res => {
          props.setHeader(res.data)
        }).catch(err => {
          console.warn(err);
        });
      instance.get(API.V1.TEACHER.COURSE.TEST.UPDATEDETAILLIST,
        {
          headers: {
            "TestId": localStorage.getItem('testID'),
            "CourseCode": localStorage.getItem('courseCode'),
            "Access-Control-Allow-Headers": "*"
          }
        }).then(res => {
          props.setDetail(res.data)
        }).catch(err => {
          console.warn(err);
        });
      instance.get(API.V1.TEACHER.COURSE.TEST.UPDATEDRAFT,
        {
          headers: {
            "TestId": localStorage.getItem('testID'),
            "CourseCode": localStorage.getItem('courseCode'),
            "Access-Control-Allow-Headers": "*"
          }
        }).then(res => {
          props.setDraft(res.data.toString())
        }).catch(err => {
          console.warn(err);
        });
    }
    else {
      props.setHeader([])
      props.setDetail({
        "Topic": "",
        "Description": "",
        "Datestart": "2021-03-03",
        "Timestart": "12:00",
        "Duration": ""
      })
      props.setDraft("true")
    }

    instance.get(API.V1.TEACHER.COURSE.TEST.ALLGROUPTESTBANK,
      {
        headers: {

          "CourseID": localStorage.getItem('courseID'),
          "Access-Control-Allow-Headers": "*"
        }
      }).then(res => {
        if (res.data) {
          props.setGroupsTestbank(res.data)
        }
        else {
          props.setGroupsTestbank([])
        }
      }).catch(err => {
        console.warn(err);
      });
    instance.get(API.V1.TEACHER.COURSE.TEST.ALLQUESTIONINTESTBANK,
      {
        headers: {
          "CourseID": localStorage.getItem('courseID'),
          "Access-Control-Allow-Headers": "*"
        }
      }).then(res => {
        if (res.data) {
          props.setQuestionsTestbank(res.data)
        } else {
          props.setGroupsTestbank([])
        }
      }).catch(err => {
        console.warn(err);
      });
    setLoading(false)
  }

    , []);
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
  const onHandleDraft = (e) => {
    props.setDraft(e.toString())

  }
  const onClickSave = async () => {
    let testNewId = ""
    await instance.post(API.V1.TEACHER.COURSE.TEST.ALLGROUPTESTBANK, props.groupsTestbank, {
      headers: {
        "CourseID": localStorage.getItem('courseID'),
      }

    }).then(res => {
    }).catch(err => {
      console.warn(err);
    });
    // console.log(props.questionsTestbank)

    await instance.post(API.V1.TEACHER.COURSE.TEST.ALLQUESTIONINTESTBANK, props.questionsTestbank, {
      headers: {
        "TestId": localStorage.getItem('testID'),
        "CourseID": localStorage.getItem('courseID'),
      }

    }).then(res => {
      testNewId = res.data
    }).catch(err => {
      console.warn(err);
    });
    if (testNewId === "") {
      testNewId = localStorage.getItem('testID')
    }
    await instance.post(API.V1.TEACHER.COURSE.TEST.GROUPSTESTLISTUPDATE, props.headers, {
      headers: {
        "TestId": testNewId,
        "CourseCode": localStorage.getItem('courseCode'),
        "CourseID": localStorage.getItem('courseID'),
      }

    }).then(res => {
    }).catch(err => {
      console.warn(err);
    });


    await instance.post(API.V1.TEACHER.COURSE.TEST.UPDATEDETAILLIST, props.detail, {
      headers: {
        "TestId": testNewId,
        "CourseCode": localStorage.getItem('courseCode'),
      }
    }).then(res => {
    }).catch(err => {
      console.warn(err);
    });
    await instance.post(API.V1.TEACHER.COURSE.TEST.UPDATEDRAFT, {}, {
      headers: {
        "TestId": testNewId,
        "CourseCode": localStorage.getItem('courseCode'),
        "Status": props.draft,
      }
    }).then(res => {
    }).catch(err => {
      console.warn(err);
    });

    message.success('Processing complete!')
  }
  const onSelectgroupName = (columns, e, column) => {
    setQuestionStatus(false)
    next()
  }
  //QuestionList
  const [groupName, setGroupName] = useState("");
  //This page
  const [questionStatus, setQuestionStatus] = useState(true);
  const [editqStatus, setEditqStatus] = useState(true);
  const next = () => {
    setCurrent(current + 1);
  };

  const onChange = (current) => {
    setCurrent(current);
  };
  //EditQuestion
  const onSelectquestionName = (e, index, maxNum) => {
    props.setMaxQuestion(maxNum)
    props.setCurrentQuestion(index + 1)
    setEditqStatus(false)
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
            {loading ?
              <Spin /> :
              <>
                <div className="steps-content">
                  {current === 0 && (
                    <Detail />
                  )}
                  {current === 1 && (
                    <Group
                      handlesetColumns={setColumns}
                      onSelectgroupName={onSelectgroupName}
                      onDragEnd={onDragEnd}
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
                    <AddQuestion />
                  )}
                  {current === 4 && (
                    <Preview />
                  )}
                </div>
                <div className="steps-action" tyle={{ fontSize: 30 }}>
                  <Switch style={{ margin: '0 8px' }} checked={(props.draft === 'true')} onChange={e => onHandleDraft(e)}></Switch>
              Draft

              {current === steps.length - 1 && (

                    < Button style={{ margin: '0 8px' }} type="primary" onClick={() => onClickSave()}>Save</Button>
                  )}
                </div>
              </>
            }
          </ContentContainer>
        </Layout>
      </Layout>
    </Container >

  );

};
export default connect(mapStateToProps, mapDispatchToProps)(CreateTest);
