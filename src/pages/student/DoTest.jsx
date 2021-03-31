import React, { useState, useEffect } from "react"
import { connect } from 'react-redux';
import { Upload, Input, Button,Checkbox, Image, message,Layout, Select } from 'antd';
import {  UploadOutlined } from '@ant-design/icons';
import instance from '../../constants/action.js';
import API from "../../constants/api.jsx";
const { TextArea } = Input;
const mapStateToProps = state => {
    return {
        headers: state.doTest.headers,
        selectTest: state.doTest.selectTest,
        questionsTestbank:state.doTest.questionsTestbank
    };

};

const mapDispatchToProps = dispatch => {
    return {
        setStateHeaders: (value) => dispatch({ type: 'setStateHeaders', headers: value }),
        setQuestionsTestbank: (value) => dispatch({ type: 'setQuestionsTestbank', questionsTestbank: value }),
    };
}
function DoTest(props) {
    useEffect(() => {
        instance.get(API.V1.TEACHER.COURSE.TEST.GROUPSTESTLISTUPDATE,
            {
                headers: {
                    "TestId": props.selectTest.TestID,
                    "CourseID": props.selectTest.CourseID,
                }
            }).then(res => {
                props.setStateHeaders(res.data)
            }).catch(err => {
                console.warn(err);
            });
            instance.get(API.V1.STUDENT.ALLQUESTIONFORTEST,
                {
                    headers: {
                        "TestId": props.selectTest.TestID,
                        "CourseID": props.selectTest.CourseID,
                        "StudentID": props.selectTest.CourseID
                    }
                }).then(res => {
                    props.setQuestionsTestbank(res.data)

                }).catch(err => {
                    console.warn(err);
                });
        
    } , []);

    useEffect(() => {
        Object.entries(props.headers).map(([columnId, column], index) => {
            setPart(index+1)
        })
        
    } , [props.headers]);
    const [part, setPart] = useState(0)
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const onChangeChoice = (e,questionTestbankId,index) => {
        props.questionsTestbank[questionTestbankId].choice[index].answer=e.toString()
        props.setQuestionsTestbank([...props.questionsTestbank])
      }
      const onChangeShortAnswer=(e,questionTestbankId,index)=>{
console.log(e)
      }
      const onChangeWriteup=(e,questionTestbankId,index)=>{
        console.log(e)
    }
    console.log(props.questionsTestbank)

    return (
        <Layout>
        <div style={{ justifyContent: "center", height: "100%", width: "100%" }}>
            <div>
                {Object.entries(props.headers).map(([columnId, column], index) => {
                    if (index === current) {
                        return (
                            <div>
                                <div style={{ marginTop: 30, background: "#FFB766", height: 100, width: "100%", fontWeight: 'bold', display: "inline-block" }}>
                                    <div style={{ marginLeft: 30, color: "#ffffff", fontSize: 60 }}>{column.name}</div>
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
                                                                            <p
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: questionTestbank.data
                                                                                }} />
                                                                            {questionTestbank.type === "Pair" && (
                                                                                <>
                                                                                </>
                                                                            )}
                                                                            {questionTestbank.type === "Choice" && (

                                                                                <>

                                                                                    {questionTestbank.choice.map((choice, index) => {
                                                                                        return (
                                                                                            <div>
                                                                                                <Checkbox
                                                                                                value={(choice.answer=="true")}
                                                                                                onChange={e=>onChangeChoice(e.target.checked,index,questionTestbankId)} //value={this.state.value1}
                                                                                                >
                                                                                                    {choice.data}
                                                                                                </Checkbox>
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

                                                                                <Input  value={questionTestbank.choice[0].answer} onChange={e=>onChangeShortAnswer(e.target,index,questionTestbankId)} style={{ width: 800 }} placeholder="Your answer">

                                                                                </Input>
                                                                            )}
                                                                            {questionTestbank.type === "Write-up" && (

                                                                                <TextArea value={questionTestbank.choice[0].answer} onChange={e=>onChangeWriteup(e.target,index,questionTestbankId)} rows={4}>

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
            <div  style={{marginLeft: 30 }}>
                {current > 0 && (
                    <Button type="primary"  style={{ margin: '0 8px' }}  onClick={() => prev()}>
                        Previous
                    </Button>
                )}
                {current < part - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === part - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}

            </div>
            <div style={{height:100}}>

            </div>
        </div >
        </Layout>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DoTest);