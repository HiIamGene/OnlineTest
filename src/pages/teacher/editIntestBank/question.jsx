import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Pagination, Spin, Button, message } from 'antd';
import Editbox from './EditQuestionTestBank';
import { Select } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../components/SideMenu';
import Head from '../../../components/Head';
import { ContentContainer, Container } from '../../../components/Styles';
import API from "../../../constants/api.jsx";
import instance from "../../../constants/action.js";
const { Option } = Select;
const mapStateToProps = state => {
  return {
    selectColumn: state.testBank.selectColumn,
    questionsTestbank: state.testBank.questionsTestbank,
    currentQuestion: state.testBank.currentQuestion,
    groupTestList: state.testBank.groupTestList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setQuestionsTestbank: (value) => dispatch({ type: 'setQuestionsTestbank', questionsTestbank: value }),
    setSelectColumn: (value) => dispatch({ type: 'setSelectColumn', selectColumn: value }),
    setCurrentQuestion: (value) => dispatch({ type: 'setCurrentQuestion', currentQuestion: value }),
    setGroupTestList: (value) => dispatch({ type: 'setGroupTestList', groupTestList: value }),
  }
}
function Newone(props) {
  const keyValue = "3";
  const form = 2;
  useEffect(() => {
    setQuestionInfo([])
    props.selectColumn.questionList.map((question, index) => {
      props.questionsTestbank.map((questionTestbank, index) => {
        if (question.questionID === questionTestbank.questionID) {
          setQuestionInfo(questionInfo => [...questionInfo, questionTestbank])
        }
      })
    }
    )
    try {
      if (questionInfo.length > 0) {
        setLoading(false)
        setvalue(questionInfo[props.currentQuestion - 1].type)
      }
    }
    catch (err) {
      console.log(err)
    }
  }, [props.currentQuestion]);
  const [questionInfo, setQuestionInfo] = useState([]);

  useEffect(() => {
    try {
      if (questionInfo.length > 0) {
        setLoading(false)
        setvalue(questionInfo[props.currentQuestion - 1].type)
      }
    }
    catch (err) {
      console.log(err)
    }
    /*uestionInfo.map(question => {

      props.questionsTestbank.map((questionTestbank, indexQuestionTestbank) => {
        if (question.questionID === props.questionsTestbank[indexQuestionTestbank].questionID) {
          props.questionsTestbank[indexQuestionTestbank] = question
          props.setQuestionsTestbank([...props.questionsTestbank])
        }
      })
      props.selectColumn.questionList.map((group, index) => {
        if (question.questionID === props.selectColumn.questionList[index].questionID) {
          props.selectColumn.questionList[index] = question
          props.setSelectColumn({ ...props.setSelectColumn })
        }
      })
    })*/
  }, [questionInfo]);

  const onChangeQues = page => {
    props.setCurrentQuestion(page);
  };
  const [value, setvalue] = useState("");
  const [loading, setLoading] = useState(true);
  const setQuestionInfoFunc = (e) => {
    let temp = props.questionsTestbank
    if (props.questionsTestbank.length !== 0) {
      props.questionsTestbank.map((questionTestbank, indexQuestionTestbank) => {
        if (questionInfo[props.currentQuestion - 1].questionID === questionTestbank.questionID) {
          temp[indexQuestionTestbank].data = questionInfo[props.currentQuestion - 1].data
        }
      })

    }
    props.setQuestionsTestbank([...temp])
    setQuestionInfo(e)
  }
  function onChange(value) {
    let temp = props.questionsTestbank
    if (props.questionsTestbank.length !== 0) {
      props.questionsTestbank.map((questionTestbank, indexQuestionTestbank) => {
        if (questionInfo[props.currentQuestion - 1].questionID === questionTestbank.questionID) {
          temp[indexQuestionTestbank].type = value
        }
      })
    }
    props.setQuestionsTestbank([...temp])
    setvalue(value)
  }
  const onSave = async () => {
    props.groupTestList.map((group, index) => {
      if (props.groupTestList[index].id == props.selectColumn.id) {
        props.groupTestList[index]= props.selectColumn
      }
    }
    )
    await instance.post(API.V1.TEACHER.COURSE.TEST.ALLGROUPTESTBANK, props.groupTestList, {
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
        "CourseID": localStorage.getItem('courseID'),
      }
    }).then(res => {
    }).catch(err => {
      console.warn(err);
    });

    message.success('Processing complete!')
  }
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout style={{ marginLeft: 180 }}>
          <ContentContainer >
            <Head />
            {!loading ?
              <Row gutter={16} type="flex" justify="space-around">
                <Col span={22} offset={2}>

                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="type of test"
                    optionFilterProp="children"
                    onChange={onChange}
                    value={questionInfo[props.currentQuestion - 1].type}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="Choice">Choice</Option>
                    <Option value="Pair">Pair</Option>
                    <Option value="Short Answer">Short Answer</Option>
                    <Option value="Write-up">Write-up</Option>
                    <Option value="Upload Answer">Upload Answer</Option>
                  </Select>


                </Col>
                <Col span={20} offset={2}>
                  <div style={{ width: "100%", background: "#FFB766" }}>
                    <div style={{ marginLeft: 50, paddingTop: 20, paddingBottom: 20 }}>
                      <Editbox value={value} setQuestionInfo={setQuestionInfoFunc} questionInfo={questionInfo} />
                    </div>
                  </div>
                </Col>
                <Col span={2} ></Col>
                <Col span={14} offset={10} >
                  <Pagination simple defaultCurrent={props.currentQuestion} onChange={onChangeQues} total={parseInt(props.selectColumn.maxQuestion) * 10} hideOnSinglePage={true} />
                </Col>
                <Col span={6} offset={18} >
                  <Button onClick={() => onSave()} type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: 270, height: 70, marginTop: 30 }} >
                    <div style={{ fontSize: 30 }}>Save</div>
                  </Button>
                </Col>
              </Row>
              :
              <Spin />

            }
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Newone);