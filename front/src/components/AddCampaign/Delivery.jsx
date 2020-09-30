import React, { useState } from 'react';
import { Typography, Button, Input, InputNumber } from 'antd';
import { BoxContainer, BoxEditWrapper, FlexRowWrapper } from '../Styles';
import MapWithMarker from '../MapWithMarker';
import MapView from '../MapView';

const { Text, Title } = Typography;

function Delivery(props) {
  const [ edit, setEdit ] = useState(false);
  const [ hasLocation, setLocation ] = useState(false);
  const [ deliveryData, setDeliveryData ] = useState({
    displayTime: props.displayTime,
    location: {
      type: "Point",
      coordinates: props.location
    },
    radius: props.radius
  });

  const toggleEdit = () => {
    setEdit(!edit);
    console.log(deliveryData);
    props.handleValue(deliveryData);
  }

  const toggleLocation = (e) => {
    setLocation(e.target.checked);
    if (e.target.checked === false) {
      setDeliveryData({
        ...deliveryData,
        location: {
          type: "Point",
          coordinates: [0, 0]
        }
      });
    }
  }

  const handleInitialTime = (e) => {
    setDeliveryData({
      ...deliveryData, displayTime: {
        initialTime: e.target.value,
        endTime: deliveryData.displayTime.endTime,
        timePeriod: deliveryData.displayTime.timePeriod
      }
    });
  }

  const handleEndTime = (e) => {
    setDeliveryData({
      ...deliveryData, displayTime: {
        initialTime: deliveryData.displayTime.initialTime,
        endTime: e.target.value,
        timePeriod: deliveryData.displayTime.timePeriod
      }
    });
  }

  const handleTimePeriod = (value) => {
    setDeliveryData({
      ...deliveryData, displayTime: {
        initialTime: deliveryData.displayTime.initialTime,
        endTime: deliveryData.displayTime.endTime,
        timePeriod: value
      }
    });
  }

  const handleRadius = (value) => {
    setDeliveryData({
      ...deliveryData,
      radius: value
    })
  }

  const onChangeLocation = (latlng) => {
    setDeliveryData({
      ...deliveryData,
      location: {
        type: "Point",
        coordinates: [latlng.lat, latlng.lng]
      }
    });
  }

  return(
    <BoxContainer>
      <div style={{ padding: 24, background: '#ffffff', borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)", minHeight: 200}}>
        <BoxEditWrapper>
          <Button type="primary" onClick={toggleEdit} style={{background: '#2FADB9'}}>
            { edit ? "Save" : "Edit" }
          </Button>
        </BoxEditWrapper>
        <Title level={2}>Delivery</Title>
        {
          edit ? 
          <div>
            
              hasLocation ?
              <MapWithMarker 
                zoom={8} 
                center={{ lat: props.location[0], lng: props.location[1] }} 
                handleValue={onChangeLocation}
                onChange={toggleLocation}
              /> 
            <FlexRowWrapper>
              <div>
                <Text strong>Initial Time</Text><br />
                <Input 
                  placeholder="HH:MM" 
                  value={deliveryData.displayTime.initialTime}
                  onChange={handleInitialTime} />
              </div>
              <div>
                <Text strong>End Time</Text><br />
                <Input 
                  placeholder="HH:MM"
                  value={deliveryData.displayTime.endTime}
                  onChange={handleEndTime}
                />
              </div>
              <div>
                <Text strong>Duration</Text><br />
                <InputNumber 
                  onChange={handleTimePeriod}
                  defaultValue={deliveryData.displayTime.timePeriod}
                />
              </div>
              <div>
                <Text strong>Radius</Text><br />
                <InputNumber 
                  onChange={handleRadius}
                  defaultValue={deliveryData.radius}
                />
              </div>
            </FlexRowWrapper>
            <br/>
          </div> : 
          <div>
            <br />
            <Text strong>Ad Location : </Text>
            {
              hasLocation ?
              <>
              <MapView 
                zoom={8}
                center={props.location}
              /><br />
              </>
              :
              <>No location<br /></>
            }
            <Text strong>Ad Radius : </Text>
            {
              deliveryData.radius + "m."
            }<br />
            <Text strong>Ad Schedule : </Text>
            {
              props.displayTime.initialTime + " - " + props.displayTime.endTime
            }<br />
            <Text strong>Delivery Method : </Text>{"Agressive"}
          </div>
        }
      </div>
    </BoxContainer>
  );
}

export default Delivery;