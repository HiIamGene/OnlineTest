import React, { useState } from 'react';
import axios from 'axios';
import { BoxWrapper, BoxEditWrapper, FlexRowWrapper } from '../Styles';
import { Typography, Button, Radio, Input, message } from 'antd';
import { BoxContainer } from '../Styles';
import API from '../../constants/api';

const { Text, Title } = Typography;
const { TextArea } = Input;

function AdProperty(props) {
  const [ edit, setEdit ] = useState(false);
  const [ uploadFile, setUploadFile ] = useState({
    selectedFile: null
  });
  const [ file,setFile]=useState(null)
  const [ adProp, setAdProp ] = useState({
    name: props.name,
    adType: props.adType,
    fileURL: props.fileURL,
    shortDescription: props.shortDescription,
  });

  const toggleEdit = () => {
    setEdit(!edit);
    props.handleValue(adProp);
  }

  const handleName = (e) => {
    setAdProp({
      ...adProp,
      name: e.target.value
    });
  }

  const handleDescription = (e) => {
    setAdProp({
      ...adProp,
      shortDescription: e.target.value
    })
  }

  const handleType = (e) => {
    setAdProp({
      ...adProp,
      adType: e.target.value
    })
  } 

  const fileHandler = (e) => {
    setUploadFile({
      selectedFile: e.target.files[0],
      loaded: 0,
      });
     
  };
  const headers = {
    'Authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIyaEJRT1BRZW9oS21hUE1Ra3lFayJ9.eyJpc3MiOiJodHRwczovL2F1dGgwbG9naW5nb2xpYXRoLmF1dGgwLmNvbS8iLCJzdWIiOiJCWjIzVHhJWFFLeEQwMGswRWE0bFB4QXhaUEVRcHBXeEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90ZXN0LWFwaSIsImlhdCI6MTU5MjU2MDU5MywiZXhwIjoxNTkyNjQ2OTkzLCJhenAiOiJCWjIzVHhJWFFLeEQwMGswRWE0bFB4QXhaUEVRcHBXeCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.JPpzyHOXpCsO3UKKAdvcqoshKI5GT64IbJBiSes1peAXKYflRcroCpsE_BWc8CQdg46EijPjdcKdMKsuBEeqoe2LNxMJDMQ2lMmhksFyvxX8rM2-Ln1Q4aWR6prBlejSK3OL-HJc4CxnekXXIPUTd2g6SY3-ghcAoF-043psJ96styp30TdaEK4hv9XZx6-Gey-gt7jR8IM6KetWuNhDaA3J2QHgfc2XMSN4jMZojUprFQ_ui0fcoQPZ5XkS1KCXgjwbxQtMzcYQTU3lfKaLRHuIXdn8SQ4lm_6HfMstVfMbVE1AtHK4HBZ1LyhnhYgfVGSds_ughVUf4syNj3dvhw'
  }
  const uploadHandler = () => {
    const data = new FormData();
    data.append('file', uploadFile.selectedFile);
    setFile(uploadFile.selectedFile);
    axios.post("http://localhost:8080/upload/v2 ", data, {
      headers: headers,
      
    }).then(res => {
      setAdProp({
        ...adProp,
        fileURL: res.data.fileUrl
      });
      setFile({file:res.data.fileUrl})

      message.success('File uploaded successfully');
    }).catch(err => {
      message.error('Error during upload file.');
    })
    
  }

  return(
    <BoxContainer>
      <div style={{ padding: 24, background: '#ffffff', minHeight: 200, borderRadius: '18px', boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)" }}>
        <BoxEditWrapper>
          <Button type="primary" onClick={toggleEdit} style={{background: '#2FADB9'}}>
            { edit ? "Save" : "Edit" }
          </Button>
        </BoxEditWrapper>
        <div>
          <Title level={2}>Ad Properties</Title>
          <br />{
            edit ? 
            <div>
              <BoxWrapper>
                <Text strong>Choose Ad Placement</Text><br />
                <Radio.Group disabled>
                  <Radio value={1}>Main interactive Carousel</Radio>
                  <Radio value={2}>Geo-Target Sidebar</Radio>
                </Radio.Group>
              </BoxWrapper>
              <BoxWrapper>
                <Text strong>Choose Ad Type</Text><br />
                <Radio.Group onChange={handleType} value={adProp.adType}>
                  <Radio value={"Image"}>Image</Radio>
                  <Radio value={"Video"}>Video</Radio>
                  <Radio value={"Link"}>Link</Radio>
                </Radio.Group>
              </BoxWrapper>
              <br />
              <BoxWrapper>
                <Text strong>Ad Content</Text>
                <Input
                  placeholder={"Ad Title"}
                  value={adProp.name}
                  onChange={handleName}
                />
              </BoxWrapper>
              <BoxWrapper>
                <TextArea
                  rows={4}
                  placeholder={"Description"}
                  value={adProp.shortDescription}
                  onChange={handleDescription}
                />
              </BoxWrapper>
              <br/>
              <FlexRowWrapper>
                <BoxWrapper>
                <input type="file" name="file" onChange={fileHandler} />
                  <Button onClick={uploadHandler}>Upload</Button>
                  
                  
                </BoxWrapper>
              </FlexRowWrapper>
            </div> 
            
            :
            <div>
             
              <Text strong>Ad Title : </Text>{props.name}<br />
              <Text strong>Ad Type : </Text>{props.adType}<br />
              <Text strong>File : </Text>
              
              {
                (props.fileURL) ? "Uploaded to cloud" : "Nothing here yet"
              }<br />
              <Text strong>Ad Description : </Text><br />
              
              <BoxWrapper>
                
                {props.shortDescription}
              </BoxWrapper>
              
            </div>
            
          }
          
        </div>
      </div>
    </BoxContainer>
  );
}

export default AdProperty;
//< img scr={file}/>