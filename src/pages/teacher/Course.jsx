import React from 'react';
import { Layout, Typography, Row, Col, Button, Select, Modal, Input } from 'antd';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Courselist from '../../components/Courselist';
import SearchData from '../../components/SearchData';
import API from "../../constants/api.jsx";
import instance from "../../constants/action.js";


const { Option } = Select;
const username = "testteacher";
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const { Title } = Typography;

class Course extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      data: "",
      coursename: "",
      permission: "Private",
      year: "",
      courseid: "",
      keyValue: "1",
      form: 1,
      courseAddid: "",
    }
  }
  updateCourse = (value) => {
    this.setState({
      coursename: value
    })
  }
  updateYear = (value) => {
    this.setState({
      year: value
    })
  }
  updateCourseid = (value) => {
    this.setState({
      courseid: value
    })
  }
  updatePermission = (value) => {
    this.setState({
      permission: value
    })
  }
  updateAddCourse = (value) => {
    this.setState({
      courseAddid: value
    })
  }
  addCourse = () => {
    instance.post(API.V1.TEACHER.COURSELIST.TEACHERADDCOURSE, {
      headers:{
      "CourseCode": this.state.courseAddid,
    }}, {

    }).then(res => {
      if (res.data.CourseID && res.data.CourseID !== this.state.courseid) {
        alert(res.data.CourseID)
      }
      window.location.reload()
    }).catch(err => {
      console.warn(err);
    })
  }
  addNewCourse = () => {
    if (this.state.courseid || this.state.year || this.state.coursename) {
      instance.post(API.V1.TEACHER.COURSELIST.CREATECOURSE, {
        "CourseName": this.state.coursename,
        "CourseID": this.state.courseid,
        "Year": this.state.year,
        "Permission": this.state.permission,
        "Announcement": "",
        "Description": "",
      }, {

      }).then(res => {
        if (res.data.CourseID && res.data.CourseID !== this.state.courseid) {
          alert(res.data.CourseID)
        }
        window.location.reload()
      }).catch(err => {
        console.warn(err);
      })

    }
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <Container>
        <Layout>
          <SideMenu keyValue={this.state.keyValue} form={this.state.form} />
          <Layout style={{ marginLeft: 180 }}>
            <ContentContainer >
              <Head />

              <Row >
                <Col span={5} offset={2}>
                  <div style={{ fontSize: 50, fontWeight: 'bold' }}>Your Course</div>
                </Col>
                <Col span={5} >
                  <Input style={{ marginTop: 30, width: "100%" }} onChange={(e) => this.updateAddCourse(e.value.target)} />
                </Col>
                <Col span={1} >
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: '100%', height: 32, marginTop: 30 }} onClick={() => this.addCourse}>
                    <div style={{ font: 'Josefin Sans', fontSize: 10 }}>+</div>
                  </Button>
                </Col>
                <Col span={11} ></Col>
                <Col span={23} offset={1}>
                  <Courselist />
                </Col>
              </Row>
              <div style={{ marginLeft: 1250, marginTop: 100 }}>
                <Button style={{ background: "#F43A09", color: "#ffffff", width: 300, height: 70, fontSize: 30 }} onClick={() => this.setState({ visible: true })}>Add Course</Button>
              </div>
              <Modal
                centered
                visible={this.state.visible}
                onOk={() => this.addNewCourse()}
                onCancel={() => this.setState({ visible: false })}
                width={1200}
              >
                <Row gutter={16} type="flex" justify="space-around">
                  <Col span={24}>
                    <div style={{ fontSize: 30, display: "block", textAlign: "center" }} >Add Course</div>
                  </Col>
                  <Col span={4}>
                    <div style={{ fontSize: 25, display: "block" }} >Course id :</div>

                  </Col>
                  <Col span={20}>
                    <Input onChange={e => this.updateCourseid(e.target.value)}
                      style={{ fontSize: 20, width: 850 }} />
                  </Col>
                  <Col span={4}>
                    <div style={{ fontSize: 25, display: "block" }} >Course name :</div>

                  </Col>
                  <Col span={20}>
                    <Input onChange={e => this.updateCourse(e.target.value)}
                      style={{ fontSize: 20, width: 850 }} />
                  </Col>
                  <Col span={4}>
                    <div style={{ fontSize: 25, display: "block" }} >Year :</div>
                  </Col>
                  <Col span={20}>
                    <Input onChange={e => this.updateYear(e.target.value)}
                      style={{ fontSize: 20, width: 850 }} />
                  </Col>
                  <Col span={4}>
                    <div style={{ fontSize: 25, display: "block" }} >Permission :</div>
                  </Col>
                  <Col span={20}><Select
                    labelInValue
                    defaultValue={{ value: 'private' }}
                    style={{ width: 120, fontSize: 20 }}
                    onChange={e => this.updatePermission(e.value)}
                  >
                    <Option value="Private">Private</Option>
                    <Option value="Public">Public</Option>
                  </Select>

                  </Col>
                </Row>

              </Modal>
            </ContentContainer>
          </Layout>
        </Layout>
      </Container>
    );
  }
}

export default Course;