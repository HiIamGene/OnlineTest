import React, { useState, useEffect } from 'react';
import SideMenu from '../components/SideMenu';
import Head from '../components/Head';
import styled from 'styled-components';
import { Layout, Typography, Row, Col, TreeSelect } from 'antd';
import Graph from '../components/AddAcquistion/Graph';
import DisTable from '../components/AddAcquistion/DisTable';
import Maps from '../components/AddAcquistion/Maps';
import Axios from 'axios';
const { SHOW_PARENT } = TreeSelect
const initialState = {

  location: {
    type: "Point",
    coordinates: [13.730130307852061, 100.7841968536377]
  },
  Overlay: "",
  data: {}

};

const { Content } = Layout;
const { Title } = Typography;


const Container = styled.div`
  width: "100%";
  margin: '0px auto';
`

const ContentContainer = styled(Content)`
  padding: 20px;
`

function Acquistion() {
  const [state, setState] = useState(initialState);

  function onChangedata(newdata) {
    setState({ ...state, data: newdata });
  }
  const [titleHead1, settitleHead1] = useState();
  const [titleHead2, settitleHead2] = useState();
  const [titleHead3, settitleHead3] = useState();
  const [box1, setbox1] = useState(false);
  const [box2, setbox2] = useState(false);
  const [box3, setbox3] = useState(false);
  const [box4, setbox4] = useState(false);
  const [box5, setbox5] = useState(false);
  const [box6, setbox6] = useState(false);

  //-------------------------------------------------------API-------------------------------------------------------------

  const [list, setList] = useState();
  useEffect(() => {
    Axios.get('https://api-dev.eikon.asia/v1/ad/list/borbier').then((resList) => {
      if (resList.data) {
        setList(resList.data);
      }
    });
  }, []);
  //------------------------------------------Tree select----------------------------------------------------------------
  const treeData = [
    {
      title: 'Sessions',
      value: 'Sessions',
      key: '0-1',
      disabled: box1,
    },
    {
      title: 'Delivery Method',
      value: 'Delivery Method',
      key: '0-2',
      disabled: box2,
    },
    {
      title: 'Avg Cost/Sessions',
      value: 'Avg Cost/Sessions',
      key: '0-3',
      disabled: box3,
    },
    {
      title: 'Budget',
      value: 'Budget',
      key: '0-4',
      disabled: box4,
    },
    {
      title: 'Bidding Limit',
      value: 'Bidding Limit',
      key: '0-5',
      disabled: box5,
    },
    {
      title: 'Total Spent',
      value: 'Total Spent',
      key: '0-6',
      disabled: box6,
    },

  ]
  const [value, setvalue] = useState()
  const [value2, setvalue2] = useState()
  const onChange = value => {
    settitleHead1(value[0]);
    settitleHead2(value[1]);
    settitleHead3(value[2]);
    setvalue(value);
    if (value[2] !== undefined) {
      setbox1(true);
      setbox2(true);
      setbox3(true);
      setbox4(true);
      setbox5(true);
      setbox6(true);
      for (var x = 0; x <= 5; x++) {
        if ((value[0] === treeData[x].value) || (value[1] === treeData[x].value) || (value[2] === treeData[x].value)) {
          switch (x) {
            case 0:
              setbox1(false);
              break;
            case 1:
              setbox2(false);
              break;
            case 2:
              setbox3(false);
              break;
            case 3:
              setbox4(false);
              break;
            case 4:
              setbox5(false);
              break;
            case 5:
              setbox6(false);
              break;
            default:
              console.log("Bug");
          }
        }
      }
    }
    else {
      setbox1(false);
      setbox2(false);
      setbox3(false);
      setbox4(false);
      setbox5(false);
      setbox6(false);
    }

  
  };

  const onChange2 = value2 => {

    setvalue2(value2);

  };
  const tProps = {
    treeData,
    value: value,
    onChange: onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    searchPlaceholder: 'Please select',
    style: {
      width: 300,
      float: "right"  
    },
  };


  const tProps2 = {

    treeData,
    value: value2,
    onChange: onChange2,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    searchPlaceholder: 'Please select',
    style: {
      width: 300,
      float: "right"
    },
  };
  const keyValue="1";

  //---------------------------------------------------bottom-------------------------------------------------------------------


  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue}/>
        <Layout>
          <Head />
          <ContentContainer>
            

            <Row type="flex" justify="space-around">
              <Col className="gutter-row" span={13} >
              <Title level={2} style={{float:"left"}}>Acquistion</Title>
                <TreeSelect {...tProps} />
                <br />
                <br />
                <br />
              </Col>
              <Col span={10} >
                <TreeSelect {...tProps2} />
                <br />
                <br />
                <br />
              </Col>
              <Col span={13} style={{ background: '#fff', borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)", padding: 24 }}>
                <Graph Data={state.data} name1={titleHead1} name2={titleHead2} name3={titleHead3} />
              </Col>
              <Col span={10} style={{ background: '#2FADB9', borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)" }}>
              < Maps
                    location={state.location.coordinates}
                    radius={state.radius}
                  />
                    <Title level={2} style={{ color: '#fff', marginLeft: 10 ,  position: "absolute",bottom: "10px",}}>Heat Maps</Title>

              </Col>
              <Layout style={{ padding: '30px 17px 17px' }}>
                <Col span={24} style={{ background: '#fff', borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)", padding: 24 }}>
                  <DisTable list={list}
                    data={state.data}
                    handleValue={onChangedata} />
                </Col>
              </Layout>
            </Row>

          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Acquistion;