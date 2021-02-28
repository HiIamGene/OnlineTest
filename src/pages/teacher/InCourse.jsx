import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import instance from "../../constants/action.js";
import API from "../../constants/api.jsx";
import { Link } from 'react-router-dom';
import Testlist from '../../components/Testlist';

const { TextArea } = Input;
class InCourse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      announce: "",
      description: "",
      couse: "",
      courseid: "",
      keyValue: "1",
      form: 2,
      editAnnounce: false,
      editDescription: false,
    }
  }
  componentWillMount() {
    if (this.props.location.data) {
      localStorage.setItem('courseName', this.props.location.data.courseName);
      localStorage.setItem('courseCode', this.props.location.data.courseCode);
      localStorage.setItem('courseID', this.props.location.data.courseID);
    }
    instance.post(API.V1.TEACHER.COURSE.GETANNOUNCE, {

      "CourseCode": localStorage.getItem('courseCode')
    }, {

    }).then(res => {
      this.setState({ announce: res.data })
    }).catch(err => {
      console.warn(err);
    });
    instance.post(API.V1.TEACHER.COURSE.GETDESCRIPT, {
      "CourseCode": localStorage.getItem('courseCode')
    }, {
    }).then(res => {
      this.setState({ description: res.data })
    }).catch(err => {
      console.warn(err);
    });

  }
  toggleAnnounce() {
    if (this.state.editAnnounce) {
      instance.post(API.V1.TEACHER.COURSE.EDITANNOUNCE, {
        "CourseCode": localStorage.getItem('courseCode'),
        "Announcement": this.state.announce
      }, {

      }).then(res => {

      }).catch(err => {
        console.warn(err);
      });
    }
    this.setState({ editAnnounce: !this.state.editAnnounce })
  }
  toggleDescription() {

    if (this.state.description) {

      instance.post(API.V1.TEACHER.COURSE.EDITDESCRIPT, {
        "CourseCode": localStorage.getItem('courseCode'),
        "Description": this.state.description
      }, {

      }).then(res => {

      }).catch(err => {
        console.warn(err);
      });
    }
    this.setState({ editDescription: !this.state.editDescription })
  }
  render() {
    return (
      <Container>
        <Layout>
          <SideMenu keyValue={this.state.keyValue} form={this.state.form} />    
          <Layout  style={{ marginLeft: 180 }}>
          <ContentContainer >
            <Head />
              <Row gutter={16} type="flex" justify="space-around">
                <Col style={{ marginRight: "120px" }} span={18} >
                  <div style={{ height: 10 }}>
                  </div>
                  <div style={{ background: "#FFB766", height: 250 }}>
                    <div style={{ height: "30px" }}></div>
                    <div style={{ marginLeft: "55px", height: "15px" }}>
                      <div style={{ fontSize: 30, color: "#ffffff", fontWeight: "bold" }}>{localStorage.getItem('courseName')}
                      </div>
                      {this.state.editDescription ?
                        <TextArea rows={4} style={{ width: "90%" }} defaultValue={this.state.description} onChange={e => this.setState({ description: e.target.value })} />

                        :
                        <div style={{ fontSize: 30, color: "#ffffff", height: 100 }}>{this.state.description}</div>
                      }

                      <div style={{ fontSize: 20, color: "#ffffff" }}> Course code: {localStorage.getItem('courseCode')}
                        <Button type="link" onClick={() => { this.toggleDescription() }} style={{ fontSize: 20, color: "#ffffff", marginLeft: "70%" }}>edit</Button>
                      </div>

                    </div>
                  </div>

                </Col>
                <Col span={5} ></Col>
                <Col span={24} >
                  <Col span={4} offset={2} style={{ marginTop: "2%" }}>
                    <div style={{ marginLeft: 20, background: "#FFB766", height: "400%", width: "100%" }}>
                      <div style={{ height: "15px" }}></div>
                      <div style={{ color: "#ffffff", minHeight: 150, marginLeft: 20, fontWeight: "bold" }}>
                        <div style={{ fontSize: 30 }}>Announce</div>
                        {this.state.editAnnounce ?
                          <TextArea rows={4} style={{ width: "90%" }} defaultValue={this.state.announce} onChange={e => this.setState({ announce: e.target.value })} />
                          :
                          <div style={{ fontSize: 15 }}>{this.state.announce}</div>
                        }
                      </div>
                      <Button type="link" onClick={() => { this.toggleAnnounce() }} style={{ fontSize: 20, color: "#ffffff", marginLeft: "70%" }}>edit</Button>
                    </div>
                  </Col>
                  <Col span={20}  >
                    <Testlist />
                  </Col>
                </Col>
                <Link to={{ pathname: "/Teacher/Detail", }}>
                  <div style={{ marginLeft: 1250, marginTop: 200 }}>
                    <Button style={{ background: "#F43A09", color: "#ffffff", width: 300, height: 70, fontSize: 30 }} >Add Test</Button>
                  </div>
                </Link>
              </Row>
            </ContentContainer>
          </Layout>
        </Layout>
      </Container>
    );
  }
}
export default InCourse;