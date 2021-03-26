import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination, Spin } from 'antd';
import Editbox from './Editbox';
import { Select } from 'antd';
import { connect } from 'react-redux';
const { Option } = Select;
const mapStateToProps = state => {
  return {
    maxQuestion: state.createTest.maxQuestion,
    currentQuestion: state.createTest.currentQuestion,
    groups: state.createTest.groups,
    questionsTestbank: state.createTest.questionsTestbank
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGroups: (value) => dispatch({ type: 'setGroups', groups: value }),
    setCurrentQuestion: (value) => dispatch({ type: 'setCurrentQuestion', currentQuestion: value }),
    setQuestionsTestbank: (value) => dispatch({ type: 'setQuestionsTestbank', questionsTestbank: value }),
    setHeader: (value) => dispatch({ type: 'setStateHeaders', headers: value }),
  };
}
function Addquestion(props) {
  
  useEffect(() => {
    setQuestionInfo([])
    props.groups.questionList.map((question, index) => {
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
      }
    }
    catch (err) {
      console.log(err)
    }
    questionInfo.map(question => {

      props.questionsTestbank.map((questionTestbank, indexQuestionTestbank) => {
        if (question.questionID === props.questionsTestbank[indexQuestionTestbank].questionID) {
          props.questionsTestbank[indexQuestionTestbank] = question
          props.setQuestionsTestbank([...props.questionsTestbank])
        }
      })
      props.groups.questionList.map((group, index) => {
        if (question.questionID === props.groups.questionList[index].questionID) {
          props.groups.questionList[index] = question
          props.setGroups({...props.groups})
        }
      })
    })
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
  return (
    <>
      {!loading ?
        <Row gutter={16} type="flex" justify="space-around">
          <Col span={22} offset={2}>

            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="type of test"
              optionFilterProp="children"
              onChange={onChange}
              defaultValue={questionInfo[props.currentQuestion - 1].type}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Choice">Choice</Option>
              <Option value="Pair">Pair</Option>
              <Option value="ShortAnswer">Short Answer</Option>
              <Option value="Write-up">Write-up</Option>
              <Option value="UploadAnswer">Upload Answer</Option>
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
            <Pagination simple defaultCurrent={props.currentQuestion} onChange={onChangeQues} total={props.maxQuestion * 10} hideOnSinglePage={true} />
          </Col>
        </Row>
        :
        <Spin />

      }
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Addquestion);