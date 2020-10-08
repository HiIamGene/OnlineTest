import React, { useState } from 'react';
import { Table } from 'antd';
import { BoxContainer } from '../Styles';
import Axios from 'axios';

const columns = [
  {
    title: 'Campaigns',
    dataIndex: 'name',
  },
  {
    title: 'Sessions',
    dataIndex: 'session',
  },
  {
    title: 'Delivery Method',
    dataIndex: 'delivery',
  },
  {
    title: 'Avg Cost/Sessions',
    dataIndex: 'avg',
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
  },
  {
    title: 'Bidding Limit',
    dataIndex: 'bidding',
  },
  {
    title: 'Total Spent',
    dataIndex: 'total',
  },
];

// rowSelection object indicates the need for row selection

function DisTable(props) {
  const [data, setData] = useState();
  const apiId = async(id) => {
    try{

    let result=await Axios.get('https://api-dev.eikon.asia/v1/adsummary/timeframe?advertisementId=' + id + '&timeScale=year&year=2019')
      if (result) {
        setData(result);
      };
    }
    catch(error){
      alert(error)
    }
  }
  const [rowData, setrowData] = useState(props.rowData);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      if (selectedRows[0]!== undefined) {
        setrowData(selectedRows[0]._id);
        apiId(rowData);
      }
      //alert(JSON.stringify(data));
      props.handleValue(data);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <BoxContainer>

      <div style={{ padding: 24, background: '#ffffff', minHeight: 200 }}>
        <Table rowSelection={rowSelection} rowKey={"name"} columns={columns} dataSource={props.list} />
      </div>
    </BoxContainer>
  );
}

export default DisTable;
/*
  try {
    let result = await Axios.get('https://api-dev.eikon.asia/v1/adsummary/timeframe?advertisementId=' + id + '&timeScale=year&year=2019');
    result.then((resGraph) => {
      if (resGraph.data) {
        setData(resGraph.data);
      }
    })
  } catch (error) {
    console.log(error)
  };
  */