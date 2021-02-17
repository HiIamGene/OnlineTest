import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button, Switch, Pagination } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Editbox from '../../components/Editbox';
import { Select } from 'antd';

const { Option } = Select;

function Addquestion(props) {
  const [current, setcurrent] = useState(1);
  const onChangeQues = page => {
    console.log(page);
    setcurrent(page);
  };
  const [value, setvalue] = useState("UploadAnswer");
  const keyValue = "2";
  const form = 5;
  function handleClick(value) {
    console.log(JSON.stringify(value));
  }
  function onChange(value) {
    setvalue(value)
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }
  return (
    <Container>
      <Layout>
        <SideMenu keyValue={keyValue} form={form} />
        <Layout  style={{ marginLeft: 180 }}>
          <Head history={props.history}/>
          <ContentContainer >

            <Row gutter={16} type="flex" justify="space-around">
              <Col span={22} offset={2}>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="type of test"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Choice">Choice</Option>
                  <Option value="Pair">Pair</Option>
                  <Option value="ShortAnswer">Short Answer</Option>
                  <Option value="Write-up">Write-up</Option>
                  <Option value="UploadAnswer">Upload Answer</Option>
                </Select>
              </Col>

              <Col span={20} offset={2}>
                <div style={{ width: "100%", background: "#FFB766" }}>
                  <div style={{ marginLeft: 110, paddingTop: 20, paddingBottom: 20 }}>
                    <Editbox value={value} />
                  </div>
                </div>
              </Col> 
              <Col span={2} ></Col>
              <Col span={14} offset={10} >
              <Pagination current={current} onChange={onChangeQues} total={50} />
              </Col> 
              
             
              <Col span={1} offset={16}>
                <div style={{ marginTop: 35, fontSize: 30 }}>
                  Draft
                </div>
              </Col>
              <Col span={1} >
                <Switch defaultChecked style={{ marginTop: 50 }} />
              </Col>
              <Col span={6}>
                <Button onClick={handleClick} type="primary" htmlType="submit" className="login-form-button" style={{ background: '#F43A09', color: '#FFFFFF', width: 300, height: 70, marginTop: 30 }} >
                  <div style={{ fontSize: 30 }}>Save</div>
                </Button>
              </Col>
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Addquestion;