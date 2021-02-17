import React from 'react';
import { Layout, Row, Col, Button, Select, Modal, Upload, message } from 'antd';
import { ContentContainer, Container } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import { UploadOutlined } from '@ant-design/icons';
import Studentlist from '../../components/Studentlist';
import API from "../../constants/api.jsx";
import axios from 'axios';

/*const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}*/

class Student extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      dataUpload: [],
      keyValue: "2",
      form: 3,
      studentID: ""
    }
  }
  toggleVisible = () => {
    if (this.state.visible) {
        window.location.reload()
        /* const data = new FormData();
         data.append('file', this.state.dataUpload);
         axios.post(API.V1.TEACHER.COURSE.ADDSTUDENTFILE, data, {
           headers: {
             'Authorization': localStorage.getItem('token'),
             'CourseCode': "5B104D"
 
           },
         }).then(res => {
           console.log(res.data);
         }).catch(err => {
           console.log(err);
         })*/

    }
    this.setState({ visible: !this.state.visible });
  }
  handleChange = (info) => {
    this.setState({ dataUpload: info })
  }
  setting = {
    accept: ".xlsx",
    action: API.V1.TEACHER.COURSE.ADDSTUDENTFILE,
    headers: {
      'Authorization': localStorage.getItem('token'),
      'coursecode': localStorage.getItem('courseCode')
    },

    enctype: "multipart/form-data",
    method: 'POST',
    name: 'myFile',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
    /*onChange(info){
      this.setState({dataUpload:info.file})
    }*/
    
  }
  updateStudentid(value) {
    this.setState({ studentID: value })
  }
  addStudent() {
    if (this.state.studentID) {
      axios.post(API.V1.TEACHER.COURSE.ADDSTUDENT, {
        'CourseCode': localStorage.getItem('courseCode'),
        "StudentID": this.state.studentID

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
                    Student
                  </div>
                </Col>
                <Col span={6}>

                </Col>
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
                </Col>
                <Col span={4} offset={2} >

                  <input style={{ marginLeft: 15, width: '100%', marginTop: 32 }} onChange={e => this.updateStudentid(e.target.value)} ></input>
                </Col>
                <Col span={1}  >
                  <Button onClick={()=>this.addStudent} type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%', background: '#F43A09', color: '#FFFFFF', height: 32, marginTop: 30 }} >
                    <div style={{ font: 'Josefin Sans', fontSize: 10 }}>+</div>
                  </Button>

                </Col>
                <Col span={3}  >
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%', background: '#F43A09', color: '#FFFFFF',  height: 32, marginTop: 30 }} onClick={() => this.toggleVisible()} >
                    <div style={{ font: 'Josefin Sans', fontSize: 15 }}>Upload</div>
                  </Button>

                </Col>
                <Col span={14}></Col>
                <Col span={24} offset={4} >
                  <Studentlist status={"join"} />
                </Col>
                <Col span={24} offset={2}>
                  <div style={{ color: "#AAAAAA", marginLeft: 100, fontSize: 30, fontWeight: 'bold', display: "inline-block" }}>
                    Pending
                  </div>
                  <Col span={24} offset={1} >
                    <Studentlist status={"pending"} />

                  </Col>

                </Col>
              </Row>
              <Modal
                title="Add Student by upload .XML file"
                centered
                visible={this.state.visible}
                onOk={() => this.toggleVisible()}
                onCancel={() => this.toggleVisible()}
                width={1200}
              >
                <Upload {...this.setting}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Modal>
            </ContentContainer>
          </Layout>
        </Layout>
      </Container>
    );
  }
}

export default Student;