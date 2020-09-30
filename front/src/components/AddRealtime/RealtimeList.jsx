import React from 'react';
import { Table } from 'antd';
import { BoxContainer } from '../../components/Styles';

const columns = [
  {
    title: 'Campaign',
    dataIndex: 'name',
  },
  {
    title: 'Section',
    dataIndex: 'number',
  },
  {
    title: 'Event',
    dataIndex: 'delivery',
  },

];

function RealtimeList(props) {
  return(
    <BoxContainer>
      <div style={{ padding: 24, background: '#ffffff', minHeight: 200}}>
    <Table columns={columns} rowKey={"name"} dataSource={props.campaigns} />
      </div>
    </BoxContainer>
  );
}

export default RealtimeList;