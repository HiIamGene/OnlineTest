import React, { useEffect, useState } from "react"
import instance from '../../constants/action.js';
import API from "../../constants/api.jsx";
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Button, Select, Modal, Input } from 'antd';
import { ContentContainer, Container } from '../../components/Styles';
import SideMenu from '../../components/SideMen2';
import Head from '../../components/Head';
import TestInterface from '../../components/TestInterface';
import SearchData from '../../components/SearchData';
function Score(props) {
    useEffect(() => {
        instance.get(API.V1.STUDENT.SCORE
            ).then(res => {
    
            console.log(res.data)
        }).catch(err => {
            console.warn(err);
        })
    }, []);
    const keyValue = "3";
    const form = 1;

    return (
        <Container>
        <Layout>
          <SideMenu keyValue={keyValue} form={form} />
          <Layout style={{ marginLeft: 180 }}>
            <ContentContainer >
              <Head />
              <Row >
        

              </Row>
            </ContentContainer>
          </Layout>
        </Layout>
      </Container>
    )
}


export default Score