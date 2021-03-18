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
    setStateHeaders: (value) => dispatch({ type: 'setStateHeaders', headers: value }),
  };
}
function Query(props) {
  /*useEffect(() => {
    console.log(props.groupsTestbank)

  });*/
  const [name, setName] = useState("")
  const [fixbug,setFixbug] = useState(0)
  const onNameChange = event => {
    setName(event.target.value)
    //console.log(event.target.value, name)
  };

  const onSelectGroup = (e) => {
    
    for (const [column, data] of Object.entries(props.groupsTestbank)){
      if(props.groupsTestbank[column].groupName===e){
        let temp = props.headers
        temp[props.columnId].items[props.index] = data
        //console.log(temp)
        props.setStateHeaders({...temp})
      }
    }
    /*if (props.headers[props.columnId].map(function (el) { return el.groupName; }).includes(e)) {
      for (const [columnId, column] of Object.entries(props.herders)) {
        if (props.herders[columnId].items[props.index].groupName === e) {
          //props.setDefaultValue(props.index, props.columnId, e)
          props.herders[columnId].items[props.index].groupName
          //let temp = props.headers
          //temp[props.columnId].items[props.index] = props.groupsTestbank[columnId].groupName
         // props.setStateHeaders({ ...temp })
        }
      }
      //let temp = props.headers
      // temp[props.columnId].items[props.index].groupName = e
      // console.log( props.groupsTestbank.groupName[])
      //setStateHeaders
      //props.setStateHeaders({...temp})
    }*/
  }

  const addItem = () => {
    if (!props.groupsTestbank.filter(function (el) { return el.groupName; }).includes(name)) {
      let temp = props.groupsTestbank
      temp.push({
        "id": uuid(),
        "groupName": name,
        "questionList": []
      })
      //props.setGroupsTestbank(temp)
    //   console.log(typeof temp)
    // console.log(temp, props.groupsTestbank)
      //setFixbug(fixbug+1)
      props.setGroupsTestbank([...temp])
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
      {
        props.groupsTestbank.map((data) => {
          // console.log(data)
          return (<Option key={data.groupName}>{data.groupName}</Option>)
        }
        )
      }

    </Select>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(Query)