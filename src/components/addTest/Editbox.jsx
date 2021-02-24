import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import parse from "html-react-parser"
import React, { useState, useEffect } from "react"
import "./Editbox.css"
import { Input, Button, Checkbox, Row, Col } from 'antd';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios';
import API from "../../constants/api.jsx";

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
    // CKEditor 5's FileLoader instance.
    this.loader = props;
    // URL where to send files.
    //this.url = `http://142.93.177.152:10000/testgetimage`;
    this.url = API.V1.TEACHER.COURSE.TEST.UPLOADPIC;
  }


  // Starts the upload process.
  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      }));
    /* const data = new FormData();
     this.loader.file.then(result => {
       data.append('file', result);
       }
     )
     axios.post(`http://142.93.177.152:10000/test`, data, {
 
   }).then(res => {
     console.log(res.data)
   }).catch(err => {
     console.warn(err);
   })*/
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
  const handleChange = (event, editor) => {
    const data = editor.getData();
    setContent(data)

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
  const [text, setText] = useState(props.questionName)
  useEffect(() => {
    //setText(props.questionName)
    props.updatePreview(content)
  }, [content]);
  if (props.value === "Choice") {
    return (
      <Row gutter={16} type="flex" justify="space-around">
        <Col span={24}>
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
        </Col>
        <Col span={12} style={{ marginTop: 20 }}>

          <Input></Input>
        </Col>
        <Col span={12} style={{ marginTop: 20 }} >

          <Checkbox value="B"></Checkbox>
        </Col>
        <Col span={12} style={{ marginTop: 20 }}>

          <Input></Input>
        </Col>
        <Col span={12} style={{ marginTop: 20 }}>

          <Checkbox value="B"></Checkbox>
        </Col>
        <Col span={12} style={{ marginTop: 20 }}>

          <Input></Input>
        </Col>
        <Col span={12} style={{ marginTop: 20 }}>

          <Checkbox value="B"></Checkbox>
        </Col>
        <Col span={24}>


          <div style={{ marginTop: 25, width: 200, height: 60, fontSize: 16, textDecorationLine: 'underline', color: "blue" }} >
            add choice
            </div>
        </Col>



      </Row >
    )
  }
  else if (props.value === "Pair") {
    return (
      <Row gutter={16} type="flex" justify="space-around">
        <Col span={24}>
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
        </Col>
        <Col span={10} style={{ marginTop: 20 }}>

          <Input style={{ minWidth: "400" }}></Input>
        </Col>
        <Col span={10} style={{ marginTop: 20 }}>

          <Input style={{ minWidth: "400" }}></Input>
        </Col>
        <Col span={4} ></Col>
        <Col span={10} style={{ marginTop: 20 }}>

          <Input style={{ minWidth: "400" }}></Input>
        </Col>
        <Col span={10} style={{ marginTop: 20 }}>

          <Input style={{ minWidth: "400" }}></Input>
        </Col>
        <Col span={4} ></Col>
        <Col span={24} >
          <div style={{ marginTop: 25, width: 200, height: 60, fontSize: 16, textDecorationLine: 'underline', color: "blue" }} >
            add choice
            </div>
        </Col>


      </Row>
    )
  }
  else if (props.value === "ShortAnswer") {
    return (
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
        <div>
          <Row gutter={16} type="flex" justify="space-around">
            <Col span={12} style={{ marginTop: 20 }}>

              <Input></Input>
            </Col>
            <Col span={12} >
            </Col>
          </Row>
        </div>
      </div>
    )
  }
  else if (props.value === "Write-up") {
    return (
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
        <div>

        </div>
      </div>
    )
  }
  else if (props.value === "UploadAnswer") {
    return (
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

      </div >
    )
  }

}

export default Editbox