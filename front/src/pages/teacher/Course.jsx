import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button, Select, Modal, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Classlist from '../../components/Classlist';
import Search from 'antd/lib/input/Search';
import SearchData from '../../components/SearchData';
import { SecurityScanTwoTone } from '@ant-design/icons';


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
      permission: "",
      year: "",
      courseid: "",
      keyValue: "1",
      form: 1,
    }
  }
  /*updateCourse = (value) => {
    this.setState({
      coursename: value.value
    })
  }
  updateYear = (value) => {
    this.setState({
      year: value.target
    })
  }
  updateCourseid = (value) => {
    this.setState({
      courseid: value.target
    })
  }*/
  handleChange = (value) => {
    this.setState({
      permission: value.target
    })
  }
  addCourse = () => {
    /*console.log(coursename)
    console.log(permission)
    console.log(year)
    console.log(courseid)*/
    console.log(this.state.permission)
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <Container>
        <Layout>
          <SideMenu keyValue={this.state.keyValue} form={this.state.form} />
          <Layout>
          <Head  />
            <ContentContainer >
              <Row >
                <Col span={5} offset={2}>
                  <div style={{ fontSize: 50, fontWeight: 'bold' }}>Your Course</div>
                </Col>
                <Col span={5} >
                  <SearchData style={{ marginTop: 30, width: "100%" }} />
                </Col>
                <Col span={1} >
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: '100%', height: 32, marginTop: 30 }} >
                    <div style={{ font: 'Josefin Sans', fontSize: 10 }}>Search</div>
                  </Button>
                </Col>
                <Col span={12} ></Col>
              </Row>
              <Row>
                <Col span={24} offset={2}>
                  <Classlist username={username} />
                </Col>
              </Row>
              <div style={{ marginLeft: 1250, marginTop: 100 }}>
                <Button style={{ background: "#F43A09", color: "#ffffff", width: 300, height: 70, fontSize: 30 }} onClick={()=>this.setState({ visible: true })}>Add Course</Button>
              </div>
              <Modal
                centered
                visible={this.state.visible}
                onOk={()=>this.addCourse()}
                onCancel={()=>this.setState({ visible: false })}
                width={1200}

              >
                <Row gutter={16} type="flex" justify="space-around">
                  <Col span={24}>
                    <div style={{ fontSize: 30, display: "block", textAlign: "center" }} >
                      Add Course
                  </div>
                  </Col>
                  <Col span={4}>
                    <div style={{ fontSize: 25, display: "block" }} >
                      Course id :
                </div>

                  </Col>
                  <Col span={20}>
                    <Input  //onChange={updateCourseid}  
                      style={{ fontSize: 20, width: 850 }} />
                  </Col>
                  <Col span={4}>
                    <div style={{ fontSize: 25, display: "block" }} >
                      Course name :
                </div>

                  </Col>
                  <Col span={20}>
                    <Input  //onChange={updateCourse} 
                      style={{ fontSize: 20, width: 850 }} />
                  </Col>
                  <Col span={4}>
                    <div style={{ fontSize: 25, display: "block" }} >
                      Year :
                  </div>

                  </Col>
                  <Col span={20}>
                    <Input   //onChange={updateYear} 
                      style={{ fontSize: 20, width: 850 }} />
                  </Col>
                  <Col span={4}>
                    <div style={{ fontSize: 25, display: "block" }} >
                      Permission :
                    </div>
                  </Col>
                  <Col span={20}><Select
                    labelInValue
                    defaultValue={{ value: 'private' }}
                    style={{ width: 120, fontSize: 20 }}
                    value={this.state.permission}
                  >

                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
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