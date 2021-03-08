import React from "react"
import { Row, Col, Input, DatePicker, TimePicker } from 'antd';
import { connect } from 'react-redux';
//spiltทิ้ง
const mapStateToProps = state => {
  return {
    detail: state.createTest.detail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDetail: (value) => dispatch({ type: 'setStateHeaders', detail: value }),
  };
}

function Detail(props) {
  const updateTopic= (e) =>{
    let temp = props.detail
    temp.description=e
    props.updateDetail(temp)
  }
  const updateDescription= (e) =>{
    let temp = props.detail
    temp.description=e
    props.updateDetail(temp)
  }
  const updateDateStart= (date, dateString) =>{
    let temp = props.detail
    temp.timeStart=dateString
    props.updateDetail(temp)
  }
  const updateTimeStart= (time,timeString) =>{
    let temp = props.detail
    temp.timeStart=timeString
    props.updateDetail(temp)
  }
  const updateDuration= (e) =>{
    let temp = props.detail
    temp.duration=e
    props.updateDetail(temp)
  }
  return (
    <Row gutter={16} type="flex" justify="space-around">

      <div style={{ height: 30 }} ></div>
      <Col span={22} offset={2} >
        <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
          Topic :
                  <br />
          <Input style={{ width: 850 }} onChange={e=>updateTopic(e.target.value)}/>
        </div>
      </Col>
      <Col span={22} offset={2} >
        <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
          Description :
                  <br />
          <Input style={{ width: 850 }} onChange={e=>updateDescription(e.target.value)}/>
        </div>
      </Col>
      <Col span={22} offset={2} >
        <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
          Date start :
                  <br />
          <DatePicker style={{ width: 850 }} onChange={updateDateStart}/>
        </div>
      </Col>
      <Col span={22} offset={2} >
        <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
          Duration :
                  <br />
          <Input style={{ width: 850 }} onChange={e=>updateDuration(e.target.value)}/>
        </div>
      </Col>
      <Col span={22} offset={2} >
        <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
          Time start :
                  <br />
          <TimePicker  style={{ width: 850 }} onChange={updateTimeStart}/>
        </div>
      </Col>
    </Row>

  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
