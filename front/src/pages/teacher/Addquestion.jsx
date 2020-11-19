import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentContainer, Container, HeadlineWrapper } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Editbox from '../../components/Editbox';
import { Select } from 'antd';

const { Option } = Select;
const { Title } = Typography;

function Class() {
  const [value, setvalue] = useState("UploadAnswer");
  const keyValue = "2";
  const form = 5;
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
        <Layout>
          <Head />
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
                  <div style={{ marginLeft: 110, paddingTop:20 }}>
                    <Editbox value={value} />
                  </div>
                </div>
              </Col>
              <Col span={2} ></Col>
            </Row>
          </ContentContainer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Class;