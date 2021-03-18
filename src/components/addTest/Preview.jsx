import React, { useEffect } from "react"
import { connect } from 'react-redux';
import { Upload, Input, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const mapStateToProps = state => {
    return {
        headers: state.createTest.headers,
        questionsTestbank: state.createTest.questionsTestbank,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
}

function Preview(props) {
    useEffect(() => {

    }, []);
    return (
        <div style={{ justifyContent: "center", height: "100%", width: "100%" }}>
            <div>
                {Object.entries(props.headers).map(([columnId, column], index) => {
                    return (
                        <div>
                            <div style={{ marginTop: 30, background: "#FFB766", height: 100, width: "93%",fontWeight: 'bold', display: "inline-block"  }}>
                                <div style={{ marginLeft:30,color: "#ffffff", fontSize: 60 }}>{column.name}</div>
                            </div>
                            {column.items.map((item, key) => {
                                return (
                                    <>
                                        {item.questionList.map((question, name) => {
                                            return (
                                                <>
                                                    {props.questionsTestbank.map((questionTestbank, questionTestbankId) => {
                                                        return (
                                                            <>
                                                                {questionTestbank.questionID === question.questionID && (
                                                                    <div style={{ background: '70C5FB', fontSize: 25 }}>

                                                                        {name + 1}.
                                                                        <div
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: questionTestbank.data
                                                                            }}></div>
                                                                        {questionTestbank.type === "Pair" && (

                                                                            <div>

                                                                            </div>
                                                                        )}
                                                                        {questionTestbank.type === "Choice" && (

                                                                            <div>

                                                                            </div>
                                                                        )}
                                                                        {questionTestbank.type === "ShortAnswer" && (

                                                                            <Input style={{width:800}}>

                                                                            </Input>
                                                                        )}
                                                                        {questionTestbank.type === "Write-up" && (

                                                                            <TextArea>

                                                                            </TextArea>
                                                                        )}
                                                                        {questionTestbank.type === "Upload Answer" && (

                                                                            <Upload {...props}>
                                                                                <Button icon={<UploadOutlined />}>Upload</Button>
                                                                            </Upload>
                                                                        )}

                                                                    </div>
                                                                )
                                                                }
                                                            </>
                                                        )
                                                    })}
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}

                        </div>)

                })}
            </div>
        </div >
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Preview)