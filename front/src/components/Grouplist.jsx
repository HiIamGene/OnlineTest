import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
const { Option } = Select;

let index = 0;
let i = 0;
let table = []

class Grouplist extends React.Component {
    
    state = {
        items: ['jack', 'lucy'],
        name: '',
    };

    onNameChange = event => {
        this.setState({
            name: event.target.value,
        });
    };

    addItem = () => {
        console.log('addItem');
        const { items, name } = this.state;
        this.setState({
            items: [...items, name || `New item ${index++}`],
            name: '',
        });
    };


    classlistOut = () => {
        alert(i);
        const { items, name } = this.state;
        for (i = 0; i < 2; i++) {
            
            table.push(
                <NavLink to="/InClass">
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>
                        <Select
                            style={{ width: 240 }}
                            placeholder="custom dropdown render"
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                        <Input style={{ flex: 'auto' }} value={name} onChange={this.onNameChange} />
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
                    </Button>
                </NavLink>
            )
        }
        return table
    }
    render() {

        return (
            <table>
                { table}
            </table >
        )
    }
}



export default Grouplist