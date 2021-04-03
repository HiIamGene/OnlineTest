import React from "react"
import { Row, Col, Input, DatePicker, TimePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment'
const mapStateToProps = state => {
  return {
    detail: state.createTest.detail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDetail: (value) => dispatch({ type: 'updateDetail', detail: value }),
  };
}

function Detail(props) {
  const updateTopic= (e) =>{
    let temp = props.detail
    temp.Topic=e
    props.updateDetail({...temp})
  }
  const updateDescription= (e) =>{
    let temp = props.detail
    temp.Description=e
    props.updateDetail({...temp})
  }
  const updateDateStart= (date, dateString) =>{
    let temp = props.detail
    temp.Datestart=dateString
    props.updateDetail({...temp})
  }
  const updateTimeStart= (time,timeString) =>{
    let temp = props.detail
    temp.Timestart=timeString
    props.updateDetail({...temp})
  }
  const updateDuration= (e) =>{
    let temp = props.detail
    temp.Duration=e
    props.updateDetail({...temp})
  }
  return (
    <Row gutter={16} type="flex" justify="space-around">

      <div style={{ height: 30 }} ></div>
      <Col span={22} offset={2} >
        <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
          Topic :
                  <br />
          <Input style={{ width: 850 }} value={props.detail.Topic} onChange={e=>updateTopic(e.target.value)}/>
        </div>
      </Col>
      <Col span={22} offset={2} >
        <div style={{ fontSize: 30, fontWeight: "bold", display: "block"}}  >
          Description :
                  <br />
          <Input style={{ width: 850 }} value={props.detail.Description} onChange={e=>updateDescription(e.target.value)}/>
        </div>
      </Col>
      <Col span={22} offset={2} >
        <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
          Date start :
                  <br />
          <DatePicker style={{ width: 850 }} value={moment(props.detail.Datestart, 'YYYY-MM-DD')} onChange={(e,dateString)=>updateDateStart(e,dateString)}/>
        </div>
      </Col>
      <Col span={22} offset={2} >
        <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
          Duration (Minute) :
                  <br />
          <Input style={{ width: 850 }} value={props.detail.Duration} onChange={e=>updateDuration(e.target.value)}/>
        </div>
      </Col>
      <Col span={22} offset={2} >
        <div style={{ fontSize: 30, fontWeight: "bold", display: "block" }} >
          Time start :
                  <br />
          <TimePicker format="h:mm" style={{ width: 850 }} value={moment(props.detail.Timestart, 'h:mm')} onChange={(e,timeString)=>updateTimeStart(e,timeString)}/>
        </div>
      </Col>
    </Row>

  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
