import React from 'react';
import { Checkbox } from 'antd';
import {  Typography , Button } from 'antd';
const { Title } = Typography;
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

function PaymentMethod(){
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 0.25
            }}
        />
    );
    return(
        <div>
        <Title level={4}>Payment  Method</Title>
        <Checkbox onChange={onChange}>Checkbox</Checkbox>
        <Button style={{ float: "right"}} >Edit</Button>
        <br/>
        <br/>
        <br/>
        <ColoredLine color="#AFAFAF" />
        <Checkbox onChange={onChange}>Checkbox</Checkbox>
        <Button style={{ float: "right"}}>Edit</Button>
        <br/>
        <br/>
        <br/>
        <ColoredLine color="#AFAFAF" />
        <Checkbox onChange={onChange}>Checkbox</Checkbox>
        <Button style={{ float: "right"}}>Edit</Button>
        <br/>
        <br/>
        <br/>
        <ColoredLine color="#AFAFAF" />
        <Button style={{ float: "right"}}>+Add New</Button> 
          
        </div>
    );

}
export default PaymentMethod;
