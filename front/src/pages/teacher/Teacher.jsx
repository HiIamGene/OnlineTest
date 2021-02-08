import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { ContentContainer, Container } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';

import Teacherlist from '../../components/Teacherlist';
import API from "../../constants/api.jsx";
import axios from 'axios';

class Teacher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyValue: "1",
      form: 3,
      teacherID: ""
    }
  }
  updateTeacherid(value) {
    this.setState({ teacherID: value })
  }
  addTeacher() {
    if (this.state.studentID) {
      axios.post(API.V1.TEACHER.COURSE.ADDTEACHER, {
        'CourseCode': localStorage.getItem('courseCode'),
        "StudentID": this.state.teacherID

      }, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        }
      }).then(res => {
        window.location.reload()
      }).catch(err => {
        console.warn(err);
      })
    }
  }
  render() {
    return (
      <Container>
        <Layout>
          <SideMenu keyValue={this.state.keyValue} form={this.state.form} />
          <Layout>
            <Head />
            <ContentContainer >
              <Row gutter={16} type="flex" justify="space-around">
                <Col span={18} >
                  <div style={{ color: "#AAAAAA", marginLeft: 140, fontSize: 50, fontWeight: 'bold', display: "inline-block" }}>
                    Teacher
                  </div>
                </Col>
                <Col span={1}>

                </Col>
                <Col span={4} ></Col>
                <Col span={24} offset={4} >
                  <div><hr
                    style={{
                      color: "#AAAAAA",
                      backgroundColor: "#AAAAAA",
                      width: 1200,
                      height: 5,
                      marginRight: 470
                    }}
                  /></div>
                  
                  <Col span={4}  offset={2}  >

                    <input style={{ marginLeft: 15, width: '100%', marginTop: 32 }} onChange={e => this.updateTeacherid(e.target.value)} ></input>
                  </Col>
                  <Col span={1}  >
                    <Button onClick={()=>this.addTeacher} type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: '100%', height: 32, marginTop: 30 }} >
                      <div  style={{ font: 'Josefin Sans', fontSize: 10 }}>+</div>
                    </Button>

                  </Col>

                  <Col span={17}></Col>
                  <Col span={24}>
                    <Teacherlist />
                  </Col>

                </Col>
              </Row>
            </ContentContainer>
          </Layout>
        </Layout>
      </Container>
    );
  }
}

export default Teacher;