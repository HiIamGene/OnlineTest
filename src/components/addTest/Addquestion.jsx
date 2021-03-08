import React, { useState ,useEffect } from 'react';
import {Row, Col, Pagination } from 'antd';
import Editbox from './Editbox';
import { Select } from 'antd';
import { connect } from 'react-redux';
const { Option } = Select;
const mapStateToProps = state => {
  return {
    maxQuestion: state.createTest.maxQuestion,
    questionCurrent: state.createTest.questionCurrent,
    groups: state.createTest.groups

  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGroups: (value) => dispatch({ type: 'setGroups', groups: value }),
  };
}
function Addquestion(props) {
  useEffect(() => {
    if(props.groups.questionList){
      setQuestion(props.groups.questionList[current])
    }

  }, []);
  const [question, setQuestion] = useState("");
  const [current, setcurrent] = useState(props.questionCurrent);
  const onChangeQues = page => {
    setcurrent(page);
  };
  const [value, setvalue] = useState("UploadAnswer");
  const keyValue = "2";
  const form = 5;
  function handleClick(value) {
    console.log(JSON.stringify(value));
  }
  function onChange(value) {
    setvalue(value)
  }



  function onSearch(val) {
    console.log('search:', val);
  }
  return (

    <Row gutter={16} type="flex" justify="space-around">
      <Col span={22} offset={2}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="type of test"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
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
            <Editbox value={value} questionName={props.questionName} updatePreview={props.updatePreview}/>
          </div>
        </div>
      </Col>
      <Col span={2} ></Col>
      <Col span={14} offset={10} >
        <Pagination simple defaultCurrent={props.questionCurrent} onChange={onChangeQues} total={props.maxQuestion*10}  hideOnSinglePage={true}/>
      </Col>
    </Row>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Addquestion);