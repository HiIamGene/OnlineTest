import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import axios from 'axios';
import API from "../../constants/api.jsx";
import { Link } from 'react-router-dom';
import Testlist from '../../components/Testlist';

const { Title } = Typography;

function InClass(props) {
  const [announce, setAnnounce] = useState();
  const [description, setDescription] = useState();
  const [couse, setCouse] = useState([]);
  const keyValue = "1";
  const form = 2;
  useEffect(() => {
    if (props.location.data) {
      localStorage.setItem('courseName', props.location.data.courseName);
      localStorage.setItem('courseCode', props.location.data.courseCode);
      localStorage.setItem('courseID', props.location.data.courseID);
    }
    axios.post(API.V1.TEACHER.COURSE.GETANNOUNCE, {

      "CourseCode": localStorage.getItem('courseCode')
    }, {
      headers: {
        'Authorization': localStorage.getItem('token'),
      }
    }).then(res => {
      setAnnounce(res.data)
    }).catch(err => {
      console.warn(err);
    });
    axios.post(API.V1.TEACHER.COURSE.GETDESCRIPT, {
      "CourseCode": localStorage.getItem('courseCode')
    }, {
      headers: {
        'Authorization': localStorage.getItem('token'),
      }
    }).then(res => {
      setDescription(res.data)
    }).catch(err => {
      console.warn(err);
    });

  }, []);

  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout>
          <Head history={props.history} />
          <ContentContainer >
            <Row gutter={16} type="flex" justify="space-around">
              <Col style={{ marginRight: "120px" }} span={18} >
                <div style={{ height: 10 }}>
                </div>
                <div style={{ background: "#FFB766", height: 250 }}>
                  <div style={{ height: "30px" }}></div>
                  <div style={{ marginLeft: "55px", height: "15px" }}>
                    <div style={{ fontSize: 30, color: "#ffffff", fontWeight: "bold" }}>{localStorage.getItem('courseName')}
                    </div>
                    <div style={{ fontSize: 30, color: "#ffffff", height: 100 }}>{description}</div>
                    <div style={{ fontSize: 20, color: "#ffffff" }}>class code: {localStorage.getItem('courseCode')}</div>
                  </div>
                </div>

              </Col>

            </Row>
            <div style={{ height: 20 }}></div>
            <Row>
              <Col span={4} offset={2}>
                <div style={{ marginLeft: 20, background: "#FFB766", height: 250, width: 250 }}>
                  <div style={{ height: "15px" }}></div>
                  <div style={{ color: "#ffffff", height: 250, marginLeft: 20, fontWeight: "bold" }}> <div style={{ fontSize: 30 }}>Announce</div><div style={{ fontSize: 15 }}>{announce}</div></div>
                </div>
              </Col>
              <Col span={15}  >
                <Testlist />
              </Col>
            </Row>
            <Link to={{ pathname: "/Teacher/Detail", }}>
              <div style={{ marginLeft: 1250, marginTop: 200 }}>
                <Button style={{ background: "#F43A09", color: "#ffffff", width: 300, height: 70, fontSize: 30 }} >Add Test</Button>
              </div>
            </Link>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default InClass;