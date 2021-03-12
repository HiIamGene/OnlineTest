import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import parse from "html-react-parser"
import React, { useState, useEffect } from "react"
import "./Editbox.css"
import { Input, Button, Checkbox, Row, Col, Upload, Modal, Popconfirm } from 'antd';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
import instance from '../../constants/action.js';
import API from "../../constants/api.jsx";
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    groups: state.createTest.groups,
    currentQuestion: state.createTest.currentQuestion,
};
//localStorage.getItem('courseCode')
}
const mapDispatchToProps = dispatch => {
  return {
    setGroups: (value) => dispatch({ type: 'setGroups', groups: value }),
  };
}
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader)
  }
}
ClassicEditor
  .create(document.querySelector('#editor'), {
    extraPlugins: [MyCustomUploadAdapterPlugin],

    // ...
  })
  .catch(error => {
    console.log(error);
  });
class MyUploadAdapter {
  constructor(props) {
    this.loader = props;
    this.url = API.V1.TEACHER.COURSE.TEST.UPLOADPIC;
  }

  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      }));
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();

    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    xhr.setRequestHeader('Authorization', localStorage.getItem('token'))

  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response.URL
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest() {
    const data = new FormData();

    this.loader.file.then(result => {
      data.append('myFile', result);
      this.xhr.send(data);
    }
    )
  }

}
function Editbox(props) {

  const [content, setContent] = useState("")
  useEffect(() => {
    if(props.questionInfo.length!==0){
      setContent(props.questionInfo[props.currentQuestion-1].data)
    }
  }, [content]);
  useEffect(() => {
    if(props.questionInfo.length!==0){
      setContent(props.questionInfo[props.currentQuestion-1].data)
    }
  }, [props.questionInfo]);
  const [choice, setChoice] = useState([
    { input: "asd" },
    { input: "bbc" },
    { input: "rrd" }
  ])

  const [fileList, setFileList] = useState(
    [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ]
  )

  const handleChange = (event, editor) => {
    const data = editor.getData();
    let temp = props.questionInfo
    temp[props.currentQuestion-1].data=data
    props.setQuestionInfo(temp)
    setContent(data)

  }
  const onhandleChange = ({ fileList: newFileList }) => {//setFileList(fileList );
    setFileList(newFileList)
  }
  const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'blockQuote',
        'insertTable',
        '|',
        'imageUpload',
        'undo',
        'redo'
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    }
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const [text, setText] = useState("")
  const addChoice = ( )=>{
    
    setChoice([...choice,{ input: "rrdasd"}])

  }
  return (
    <>
      <div className="Editbox">
        <div className="editor">
          <CKEditor
            required
            data={content}
            editor={ClassicEditor}
            config={custom_config}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        {props.value === "Choice" && (
          <>
            {choice.map((item, index) => {
              return (
                <Row gutter={16} type="flex" justify="space-around">
                  <Col span={12} style={{ marginTop: 20 }}>
                    <Input defaultValue={item.input}></Input>
                  </Col>
                  <Col span={1} style={{ marginTop: 20 }} > 
                    <Checkbox ></Checkbox>
                  </Col>
                  <Col span={11} style={{ maxHeight: 10 }}>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onhandleChange}
                      name="myfile"
                      maxCount={1}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" //onConfirm={() => props.onClickdeleteHeader(columnId)}
                    >
                      <Button type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>x</Button>
                    </Popconfirm>

                  </Col>
                </Row>
              )
            })}
            <Button type="link" style={{ marginTop: 25, width: 200, fontSize: 16, textDecorationLine: 'underline', color: "blue" }} onClick={()=>addChoice()}>add choice</Button>

          </>
        )}
        {props.value === "Pair" && (
          <>
          {choice.map((item, index) => {
              return (
                <Row gutter={16} type="flex" justify="space-around">
                  <Col span={8} style={{ marginTop: 20 }}>
                    <Input defaultValue={item.input}></Input>
                  </Col>
                  <Col span={3} style={{ maxHeight: 10 }}>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onhandleChange}
                      name="myfile"
                      maxCount={1}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>

                  </Col>
                  <Col span={8} style={{ marginTop: 20 }}>
                    <Input defaultValue={item.input}></Input>
                  </Col>
                  <Col span={3} style={{ maxHeight: 10 }}>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onhandleChange}
                      name="myfile"
                      maxCount={1}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                  </Col>
                  <Col span={1} style={{ maxHeight: 10 }}>
                  <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" //onConfirm={() => props.onClickdeleteHeader(columnId)}
                    >
                      <Button type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>x</Button>
                    </Popconfirm>
                    </Col>
                    <Col span={1} >
                    </Col>
                </Row>
              )
            })}
            <Button type="link" style={{ marginTop: 25, width: 200, fontSize: 16, textDecorationLine: 'underline', color: "blue" }} onClick={()=>addChoice()}>add choice</Button>
          </>
        )}
        {props.value === "ShortAnswer" && (
          <Row gutter={16} type="flex" justify="space-around">
            <Col span={12} style={{ marginTop: 20 }}>
              <Input></Input>
            </Col>
            <Col span={12} >
            </Col>
          </Row>
        )}
        {(props.value === "Write-up") || (props.value === "UploadAnswer") && (
          <>
          </>
        )}
      </div>

    </>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(Editbox);
