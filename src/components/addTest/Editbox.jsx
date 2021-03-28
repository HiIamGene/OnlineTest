import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import parse from "html-react-parser"
import React, { useState, useEffect } from "react"
import "./Editbox.css"
import { Input, Button, Checkbox, Row, Col, Upload, Spin, Popconfirm } from 'antd';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
import instance from '../../constants/action.js';
import API from "../../constants/api.jsx";
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { v4 as uuid } from "uuid";
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
  const token = { 'Authorization': localStorage.getItem('token') }
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  /*useEffect(() => {
    console.log(choice)
    if (props.questionInfo.length !== 0) {
      setChoice(props.questionInfo[props.currentQuestion - 1].choice)
    }
  }, []);*/
  useEffect(() => {
    if (props.questionInfo.length !== 0) {
      setContent(props.questionInfo[props.currentQuestion - 1].data)
      if (props.questionInfo[props.currentQuestion - 1].type === "Pair") {
        props.questionInfo[props.currentQuestion - 1].choice.map((item, index) => {
        })
      }
      setLoading(false)
    }
  }, [content]);
  useEffect(() => {

    if (props.questionInfo.length !== 0) {
      setContent(props.questionInfo[props.currentQuestion - 1].data)
      setChoice(props.questionInfo[props.currentQuestion - 1].choice)
      setLoading(false)
    }
  }, [props.currentQuestion]);
  const [choice, setChoice] = useState([])
  const [choicePair, setChoicePair] = useState([[], []])
  const [fileList, setFileList] = useState("")

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setContent(data)
    props.questionInfo[props.currentQuestion - 1].data = data
    props.questionInfo[props.currentQuestion - 1].question = data.split("</", 1)[0];
    props.setQuestionInfo([...props.questionInfo])

  }
  const onhandleChange = (newFileList, index) => {
    if (newFileList.file.status === "done") {
      props.questionInfo[props.currentQuestion - 1].choice[index].imageLink = [{ uid: '-1', url: newFileList.file.response.URL }]
      //setChoice([...choice])
      //props.questionInfo[props.currentQuestion - 1].choice = choice;
      props.setQuestionInfo([...props.questionInfo])
    }
    if (newFileList.file.status === "removed") {
      props.questionInfo[props.currentQuestion - 1].choice[index].imageLink = []
      //setChoice([...choice])
      //props.questionInfo[props.currentQuestion - 1].choice = choice;
      props.setQuestionInfo([...props.questionInfo])
    }
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
  const addChoice = () => {
    let id = uuid()
    let questionID = props.questionInfo[props.currentQuestion - 1].questionID
    //setChoice([...choice, { "choiceID": id, "questionID": questionID, "data": "", "imageLink": "", "check": "false" }])
    props.questionInfo[props.currentQuestion - 1].choice = [...props.questionInfo[props.currentQuestion - 1].choice, { "choiceID": id, "questionID": questionID, "data": "", "imageLink": [], "check": "false" }];
    props.setQuestionInfo([...props.questionInfo])
  }
  const onChangeInput = (value, index) => {
    props.questionInfo[props.currentQuestion - 1].choice[index].data = value
    //setChoice([...choice])
    //props.questionInfo[props.currentQuestion - 1].choice = choice;
    props.setQuestionInfo([...props.questionInfo])
  }
  const onChangeUpdateCheckbox = (value, index) => {
    props.questionInfo[props.currentQuestion - 1].choice[index].check = value.toString()
    //setChoice([...choice])
    //props.questionInfo[props.currentQuestion - 1].choice = choice;
    props.setQuestionInfo([...props.questionInfo])

  }
  const deleteChoice = (index) => {
    if (choice.length < 1) {
      alert("You must have more than 1 choice")
    } else {
      props.questionInfo[props.currentQuestion - 1].choice.splice(index, 1)
      //setChoice([...choice])
      //props.questionInfo[props.currentQuestion - 1].choice = choice;
      props.setQuestionInfo([...props.questionInfo])
    }
  }
  return (
    <>
      {loading ? <Spin /> :
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
                {props.questionInfo[props.currentQuestion - 1].choice.map((item, index) => {

                  return (
                    <Row gutter={16} type="flex" justify="space-around">
                      <Col span={12} style={{ marginTop: 20 }}>
                        <Input defaultValue={item.data} onChange={e => onChangeInput(e.target.value, index)}></Input>
                      </Col>
                      <Col span={1} style={{ marginTop: 20 }} >
                        <Checkbox defaultChecked={(item.check === 'true')} onChange={e => onChangeUpdateCheckbox(e.target.checked, index)}></Checkbox>
                      </Col>
                      <Col span={3}>
                        <Upload
                          action={API.V1.TEACHER.COURSE.TEST.UPLOADPIC}
                          listType="picture-card"
                          fileList={item.imageLink}
                          headers={token}
                          onChange={e => onhandleChange(e, index)}
                          name="myFile"
                          maxCount={1}
                        >
                          {item.imageLink.length >= 1 ? null : uploadButton}
                        </Upload>


                      </Col>
                      <Col span={8} style={{ marginTop: 20 }}>
                        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => deleteChoice(index)}>
                          <Button type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>x</Button>
                        </Popconfirm>
                      </Col>
                    </Row>
                  )
                })}
                <Button type="link" style={{ marginTop: 25, width: 200, fontSize: 16, textDecorationLine: 'underline', color: "blue" }} onClick={() => addChoice()}>add choice</Button>

              </>
            )}
            {props.value === "Pair" && (
              <>
                {props.questionInfo[props.currentQuestion - 1].choice.map((item, index) => {
                  return (
                    <Row gutter={16} type="flex" justify="space-around">
                      <Col span={8} style={{ marginTop: 20 }}>
                        <Input defaultValue={item.data} onChange={e => onChangeInput(e.target.value, index)}></Input>
                      </Col>
                      <Col span={3} style={{ maxHeight: 10 }}>
                        <Upload
                          action={API.V1.TEACHER.COURSE.TEST.UPLOADPIC}
                          listType="picture-card"
                          fileList={item.imageLink}
                          headers={token}
                          onChange={e => onhandleChange(e, index)}
                          name="myFile"
                          maxCount={1}
                        >
                          {item.imageLink.length >= 1 ? null : uploadButton}
                        </Upload>

                      </Col>
                      <Col span={8} style={{ marginTop: 20 }}>
                        <Input defaultValue={item.data} onChange={e => onChangeInput(e.target.value, index)}></Input>
                      </Col>
                      <Col span={3} style={{ maxHeight: 10 }}>
                        <Upload
                          action={API.V1.TEACHER.COURSE.TEST.UPLOADPIC}
                          listType="picture-card"
                          fileList={item.imageLink}
                          headers={token}
                          onChange={e => onhandleChange(e, index)}
                          name="myFile"
                          maxCount={1}
                        >
                          {item.imageLink.length >= 1 ? null : uploadButton}
                        </Upload>
                      </Col>
                      <Col span={1} style={{ maxHeight: 10 }}>
                        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => deleteChoice(index)}
                        >
                          <Button type="primary" shape="circle" size="large" style={{ background: '#F4A940', color: '#FFFFFF' }}>x</Button>
                        </Popconfirm>
                      </Col>
                      <Col span={1} >
                      </Col>
                    </Row>
                  )
                })}
                <Button type="link" style={{ marginTop: 25, width: 200, fontSize: 16, textDecorationLine: 'underline', color: "blue" }} onClick={() => addChoice()}>add choice</Button>
              </>
            )}
            {props.value === "Short Answer" && (
              <Row gutter={16} type="flex" justify="space-around">
                <Col span={12} style={{ marginTop: 20 }}>
                  <Input value={props.questionInfo[props.currentQuestion - 1].choice[0].data} onChange={e => onChangeInput(e.target.value, 0)}></Input>
                </Col>
                <Col span={12} >
                </Col>
              </Row>
            )}
            {(props.value === "Write-up") || (props.value === "Upload Answer") && (
              <>
              </>
            )}
          </div>

        </>
      }
    </>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(Editbox);
