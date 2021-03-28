import API from "../../constants/api.jsx";
import instance from '../../constants/action.js';
import { connect } from 'react-redux';
import React, { useState , useEffect} from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import HeaderList from '../../components/HeaderList';

const mapStateToProps = state => {
    return {
        headerlist: state.scoreTest.headerlist,
        test: state.scoreTest.test,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setHeaderlist: (value) => dispatch({ type: 'setHeaderlist', headerlist: value }),
        //setTest: (value) => dispatch({ type: 'setTest', test: value }),

    };
}
function ScoreHeader(props) {

    useEffect(() => {
        instance.get(API.V1.TEACHER.TESTBANK.ALLHEADERTESTBANK,
            {
                headers: {
                    "TestId": props.test.testID,
                    "Access-Control-Allow-Headers": "*"
                }
            }).then(res => {
                props.setHeaderlist(res.data)
            }).catch(err => {
                console.warn(err);
            });
    }, []);
    const [data, setData] = useState();
    const keyValue = "4";
    const form = 2;
    return (
        <Container>
            <Layout >
                <SideMenu keyValue={keyValue} form={form} />
                <Layout style={{ marginLeft: 180 }}>
                    <ContentContainer >
                        <Head history={props.history} />
                        <Row gutter={16} type="flex" justify="space-around">
                            <Col span={8} offset={2}>
                                <div style={{ fontSize: 50, fontWeight: 'bold' }}>{props.test.topic}</div>
                            </Col>
                            <Col span={14} ></Col>
                            <Col span={22} offset={2} style={{ fontSize: 20, fontWeight: 'bold' }}> Header</Col>
                            <Col span={22} offset={2} ><HeaderList headerlist={props.headerlist}/></Col>
                        </Row>
                    </ContentContainer>
                </Layout>
            </Layout>
        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreHeader)