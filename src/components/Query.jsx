import React, { useState, useEffect } from 'react';
import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { v4 as uuid } from "uuid";
const { Option } = Select;

let index = 0;
const mapStateToProps = state => {
  return {
    groupsTestbank: state.createTest.groupsTestbank,
    headers: state.createTest.headers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGroupsTestbank: (value) => dispatch({ type: 'setStateGroups', groupsTestbank: value }),
    setGroupsSelect: (value) => dispatch({ type: 'setStateGroupSelect', groupSelect: value }),
    setStateHeaders: (value) => dispatch({ type: 'setStateHeaders', grouheaderspSelect: value }),
  };
}
function Query(props) {
  /*useEffect(() => {
    console.log(props.groupsTestbank)

  });*/
  const [name, setName] = useState("")
  const onNameChange = event => {
    setName(event.target.value)
  };
  const onSelectGroup = (e) => {
    props.setDefaultValue(props.index, props.columnId, e)
    if (props.groupsTestbank.map(function (el) { return el.groupName; }).includes(e)) {
      for (const [columnId, column] of Object.entries(props.groupsTestbank)) {
        if(props.groupsTestbank[columnId].groupName===e){
          let temp = props.headers
          temp[props.columnId].items[props.index]=props.groupsTestbank[columnId].groupName
          props.setStateHeaders({...temp})
        }
      }
      //let temp = props.headers
     // temp[props.columnId].items[props.index].groupName = e
     // console.log( props.groupsTestbank.groupName[])
      //setStateHeaders
      //props.setStateHeaders({...temp})
    }
  }
  const addItem = () => {
    if (!props.groupsTestbank.map(function (el) { return el.groupName; }).includes(name)) {
      let temp = props.groupsTestbank
      temp.push({
        "id": uuid(),
        "groupName": name,
        "questionList": []
      })
      props.setGroupsTestbank(temp)
      //props.setGroupsTestbank({...temp})
    }
  };

  return (
    <Select
      style={{ width: 540 }}
      placeholder="Select Group"
      defaultValue={props.defaultValue}
      onSelect={e => onSelectGroup(e)}
      dropdownRender={menu => (
        <div>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
            <Input style={{ flex: 'auto' }} value={name} onChange={onNameChange} />
            <a
              style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
              onClick={addItem}
            >
              <PlusOutlined /> Add item
              </a>
          </div>
        </div>
      )}
    >
      {props.groupsTestbank.map(function (el) { return el.groupName; }).map(item => (
        <Option key={item}>{item}</Option>
      ))}
    </Select>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(Query)