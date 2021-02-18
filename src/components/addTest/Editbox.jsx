import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import parse from "html-react-parser"
import React, { useState ,useEffect} from "react"
import "./Editbox.css"
import { Input, Button, Checkbox, Row, Col } from 'antd';
function Editbox(props) {
  const [text, setText] = useState(props.questionName)
  useEffect(() => {
    setText(props.questionName)
  }, []);
  if (props.value === "Choice") {
    return (
      <Row gutter={16} type="flex" justify="space-around">
        <Col span={24}>
          <div className="Editbox">
            <div className="editor">
              <CKEditor
                editor={ClassicEditor}
                data={text}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setText(data)
                }}
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
                editor={ClassicEditor}
                data={text}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setText(data)
                }}
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
            editor={ClassicEditor}
            data={text}
            onChange={(event, editor) => {
              const data = editor.getData()
              setText(data)
            }}
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
            editor={ClassicEditor}
            data={text}
            onChange={(event, editor) => {
              const data = editor.getData()
              setText(data)
            }}
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
            editor={ClassicEditor}
            data={text}
            onChange={(event, editor) => {
              const data = editor.getData()
              setText(data)
            }}
          />

        </div>

      </div>
    )
  }

}

export default Editbox