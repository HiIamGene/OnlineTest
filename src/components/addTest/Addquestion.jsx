import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button, Switch, Pagination } from 'antd';
import Editbox from './Editbox';
import { Select } from 'antd';

const { Option } = Select;

function Addquestion(props) {
  const [current, setcurrent] = useState(1);
  const onChangeQues = page => {
    console.log(page);
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
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
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
          onFocus={onFocus}
          onBlur={onBlur}
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
          <div style={{ marginLeft: 110, paddingTop: 20, paddingBottom: 20 }}>
            <Editbox value={value} questionName={props.questionName} updatePreview={props.updatePreview}/>
          </div>
        </div>
      </Col>
      <Col span={2} ></Col>
      <Col span={14} offset={10} >
        <Pagination simple defaultCurrent={props.num} onChange={onChangeQues} total={props.maxNum*10} />
      </Col>



    </Row>
  );
}

export default Addquestion;