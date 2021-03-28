import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import instance from "../../constants/action.js";
import API from "../../constants/api.jsx";
import { Link } from 'react-router-dom';
import Testlist from '../../components/Testlist_s';

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
          <Layout style={{ marginLeft: 180 }}>
            <ContentContainer >
              <Head />
              <Row >
                <Col  span={20} offset={2}>
                  <div style={{ height: 10 }}>
                  </div>
                  <div style={{ background: "#FFB766", height: 250 }}>
                    <div style={{ height: "30px" }}></div>
                    <div style={{ marginLeft: "55px", height: "15px" }}>
                      <div style={{ fontSize: 30, color: "#ffffff", fontWeight: "bold" }}>{localStorage.getItem('courseName')}
                      </div>
                        <div style={{ fontSize: 30, color: "#ffffff", height: 100 }}>{this.state.description}</div>

                      <div style={{ fontSize: 20, color: "#ffffff" }}> Course code: {localStorage.getItem('courseCode')}
                      </div>

                    </div>
                  </div>

                </Col>
                <Col span={2} ></Col>

                <Col span={4} offset={2} style={{ marginTop: "2%" }}>
                  <div style={{ background: "#FFB766", height: 250, width: "100%" }}>
                    <div style={{ height: "15px" }}></div>
                    <div style={{ color: "#ffffff", minHeight: 150, marginLeft: 20, fontWeight: "bold" }}>
                      <div style={{ fontSize: 30 }}>Announce</div>
                        <div style={{ fontSize: 15 }}>{this.state.announce}</div>
                    </div>
                  </div>
                </Col>
                <Col span={16}   >
                  <Testlist />  
                </Col>
                <Col span={2} ></Col>

              </Row>
            </ContentContainer>
          </Layout>
        </Layout>
      </Container>
    );
  }
}
export default InCourse;