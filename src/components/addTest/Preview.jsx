import React, { useState, useEffect } from "react"
import { connect } from 'react-redux';
import { Upload, Input, Button, Checkbox, Image ,message} from 'antd';
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
    const [part, setPart] = useState(0)
    const [allPart, setAllPart] = useState(0)
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    useEffect(()=>{
        //setCurrent()
        Object.entries(props.headers).map(([columnId, column], index) => {

            setPart(index+1)
        })
    })
    return (
        <div style={{ justifyContent: "center", height: "100%", width: "100%" }}>
            <div>
                {Object.entries(props.headers).map(([columnId, column], index) => {
                    if(index===current){
                    return (
                        <div>
                            <div style={{ marginTop: 30, background: "#FFB766", width: "100%", fontWeight: 'bold', display: "inline-block" }}>
                                <div style={{ marginLeft: 30, color: "#ffffff", fontSize: 50 }}>{column.name}</div>
                            </div>
                            {column.items.map((item, key) => {
                                return (
                                    <>
                                        {item.questionList.map((question, name) => {
                                            return (
                                                <>
                                                    {props.questionsTestbank.map((questionTestbank, questionTestbankId) => {
                                                        return (
                                                            <div style={{ fontSize: 30, background: '#FFFFFF', margin: 30, textAlign: 'left' }}>
                                                                {questionTestbank.questionID === question.questionID && (
                                                                    <div style={{ margin: 30 }}>
                                                                        {name + 1}.
                                                                        <span
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: questionTestbank.data
                                                                            }}/> 
                                                                        {questionTestbank.type === "Pair" && (
                                                                            <>
                                                                            </>
                                                                        )}
                                                                        {questionTestbank.type === "Choice" && (

                                                                            <>

                                                                                {questionTestbank.choice.map((choice, index) => {
                                                                                    return (
                                                                                        <div>
                                                                                             <Checkbox>
                                                                                                
                                                                                            </Checkbox> {String.fromCharCode(index + 97)}.) {choice.data}
                                                                                            {choice.imageLink.length >= 1 && (
                                                                                                <div>
                                                                                                    <Image
                                                                                                        width={200}
                                                                                                        src={choice.imageLink[0].url}
                                                                                                    />
                                                                                                </div>
                                                                                            )

                                                                                            }

                                                                                        </div>
                                                                                    )
                                                                                }
                                                                                )}                                                      </>
                                                                        )}
                                                                        {questionTestbank.type === "Short Answer" && (

                                                                            <Input style={{ width: 800 }} placeholder="Your answer">

                                                                            </Input>
                                                                        )}
                                                                        {questionTestbank.type === "Write-up" && (

                                                                            <TextArea style={{fontSize:25}} rows={4}> 

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
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}

                        </div>)
                    }

                })}
            </div>
            <div className="steps-action">
            {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Previous
                </Button>
            )}
            {current < part - 1 && (
                <Button type="primary" onClick={() => next()}>
                    Next
                </Button>
            )}


        </div>
        </div >
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Preview)