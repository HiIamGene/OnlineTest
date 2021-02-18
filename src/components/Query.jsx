import React from 'react';
import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

let index = 0;

class Query extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: ['การออกแบบUI', 'สีกับความรู้สึก'],
      name: '',
    };
  }
  onNameChange = event => {
    this.setState({
      name: event.target.value,
    });


  };
  updateColumn= (e)=>{
    let temp = this.props.columns
    temp[this.props.columnId].items[this.props.index].groupName=e
    this.props.handlesetColumns({ ...temp })
  }
  addItem = () => {
    console.log('addItem');
    //const { items, name } = this.setState;
    this.setState({
      items: [...this.state.items, this.state.name || `New item ${index++}`],
      name: '',
    });
  };

  render() {
    const { items, name } = this.state;
    return (
      <Select
        style={{ width: 540 }}
        placeholder="Select Group"
        defaultValue={this.props.defaultValue}
        onSelect={e=>this.updateColumn(e)}
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }}  />
            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <Input style={{ flex: 'auto' }}  value = {name}onChange={this.onNameChange} />
              <a
                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                onClick={this.addItem}
              >
                <PlusOutlined /> Add item
              </a>
            </div>
          </div>
        )}
      >
        {items.map(item => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
    );
  }
}

export default Query;