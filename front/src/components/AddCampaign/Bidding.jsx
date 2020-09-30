import React, { useState } from 'react';
import { Typography, Button, InputNumber } from 'antd';
import { BoxContainer, BoxEditWrapper } from '../Styles';

const { Text, Title } = Typography;

function Bidding(props) {
  const [ edit, setEdit ] = useState(false);
  const [ budget, setBudget ] = useState(props.budget);

  const toggleEdit = () => {
    setEdit(!edit);
    props.handleValue(budget);    
  }

  const handleBudget = (value) => {
    setBudget(value);
  }

  return(
    <BoxContainer>
      <div style={{ padding: 24, background: '#ffffff', minHeight: 200, borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)"}}>
        <BoxEditWrapper>
          <Button type="primary" onClick={toggleEdit} style={{background: '#2FADB9'}}>
            { edit ? "Save" : "Edit" }
          </Button>
        </BoxEditWrapper>
        <Title level={2}>Bidding</Title>
        {
          edit ? 
          <div>
            <Text strong>Daily Budget:</Text><br />
            <InputNumber
              onChange={handleBudget}
              defaultValue={props.budget}
              formatter={budget => `฿ ${budget}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </div> : 
          <div>
            <br />
            <Text strong>Daily Budget: </Text>{props.budget}<br />
            <Text strong>Bidding Method: </Text>{"High"}<br />
            <Text strong>Bidding Limit: </Text>{"0.55"}
        </div>
        }
      </div>
    </BoxContainer>
  );
}

export default Bidding;