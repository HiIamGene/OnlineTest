import React from 'react';
import { Table } from 'antd';
import { BoxContainer } from '../components/Styles';

const columns = [
  {
    title: 'Campaign',
    dataIndex: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Delivery Method',
    dataIndex: 'delivery',
  },
  {
    title: 'Advertisement Type',
    dataIndex: 'adType',
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
  },
];

function CampaignList(props) {
  return(
    <BoxContainer>
      <div style={{ padding: 24, background: '#ffffff', minHeight: 200}}>
    <Table columns={columns} rowKey={"name"} dataSource={props.campaigns} />
      </div>
    </BoxContainer>
  );
}

export default CampaignList;