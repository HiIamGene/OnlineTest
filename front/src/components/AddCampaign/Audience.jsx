import React, { useState } from 'react';
import { Typography, Button, Checkbox } from 'antd';
import { BoxContainer, BoxEditWrapper } from '../Styles';

const { Text, Title } = Typography;

const ageOptions = ['0-13','15-23','25-35','35-43','45-53','55+'];
const genderOptions = ['female','male'];

function Audience(props) {
  const { age, gender } = props;
  const [ edit, setEdit ] = useState(false);
  const [ audienceData, setAudienceData ] = useState({
    gender: {
      male: false,
      female: false
    },
    age: {
      age0_13: false,
      age15_23: false,
      age25_35: false,
      age35_43: false,
      age43_53: false,
      age55: false
    },
  });

  const toggleEdit = () => {
    setEdit(!edit);
    props.handleValue(audienceData);
  }

  const handleAge = (checkedValue) => {
    const newAge = {
      age0_13: checkedValue.includes("0-13"),
      age15_23: checkedValue.includes("15-23"),
      age25_35: checkedValue.includes("25-35"),
      age35_43: checkedValue.includes("35-43"),
      age43_53: checkedValue.includes("43-53"),
      age55: checkedValue.includes("55+")
    };
    setAudienceData({...audienceData, age: newAge });
  }

  const handleGender = (checkedValue) => {
    let newGender = {
      male: checkedValue.includes('male'),
      female: checkedValue.includes('female')
    };
    setAudienceData({...audienceData, gender: newGender });
  }
  
  return(
    <BoxContainer>
      <div style={{ padding: 24, background: '#ffffff', minHeight: 200, borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)"}}>
        <BoxEditWrapper>
          <Button type="primary" onClick={toggleEdit} style={{background: '#2FADB9'}}>
            { edit ? "Save" : "Edit" }
          </Button>
        </BoxEditWrapper>
        <Title level={2}>Audience</Title>
        {
          edit ? 
          <div>
            <Text strong>Gender</Text><br />
            <Checkbox.Group options={genderOptions} onChange={handleGender} />
            <br />
            <Text strong>Age</Text><br />
            <Checkbox.Group options={ageOptions} onChange={handleAge} />
            <br />
          </div> : 
          <div>
            <br />
            <Text strong>Age : </Text>
            { 
              (age.age0_13 || age.age15_23 || age.age25_35 || age.age35_43 || age.age43_53  || age.age55) 
              ?
                (age.age0_13 ? "0-13 " : "") + 
                (age.age15_23 ? "15-23 " : "") + 
                (age.age25_35 ? "25-35 " : "") + 
                (age.age35_43 ? "35-43 " : "") + 
                (age.age43_53 ? "43-53 " : "") + 
                (age.age55 ? "55+" : "")
              :
                "Not checked yet"
            }
            <br />
            <Text strong>Gender : </Text>
            {
              (gender.male || gender.female) 
              ?
                (gender.male ? "Male " : "") +
                (gender.female ? "Female" : "")
              :
                "Not checked yet"
            }
            <br />
            <Text strong>Visual Keys : </Text>{"test3"}
          </div>
        }
      </div>
    </BoxContainer>
  );
}

export default Audience;