import React, { useState, useEffect } from "react"
import { connect } from 'react-redux';
import { Upload, Input, Button, Checkbox, Image, message, Layout, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import instance from '../../constants/action.js';
import API from "../../constants/api.jsx";
import history from "../../utils/history";
const { TextArea } = Input;
const mapStateToProps = state => {
    return {
        headers: state.doTest.headers,
        selectTest: state.doTest.selectTest,
        questionsTestbank: state.doTest.questionsTestbank
    };

};

const mapDispatchToProps = dispatch => {
    return {
        setStateHeaders: (value) => dispatch({ type: 'setStateHeaders', headers: value }),
        setQuestionsTestbank: (value) => dispatch({ type: 'setQuestionsTestbank', questionsTestbank: value }),
    };
}
function DoTest(props) {
    const [loading, setLoading] = useState(false)
    const [number, setNumber] = useState(0)
    const [newHeader, setnewHeader] = useState({})
    const [questionsInTest, setQuestionsInTest] = useState([])
    const [part, setPart] = useState(0)
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        instance.get(API.V1.TEACHER.COURSE.TEST.GROUPSTESTLISTUPDATE,
            {
                headers: {
                    "TestId": props.selectTest.TestID,
                    "CourseID": props.selectTest.CourseID,
                }
            }).then(res => {
                props.setStateHeaders({ ...res.data })
            }).catch(err => {
                console.warn(err);
            });
        instance.get(API.V1.STUDENT.ALLQUESTIONFORTEST,
            {
                headers: {
                    "TestId": props.selectTest.TestID,
                    "CourseID": props.selectTest.CourseID,

                }
            }).then(res => {
                props.setQuestionsTestbank([...res.data])
            }).catch(err => {
                console.warn(err);
            });
        setLoading(true)
    }, []);
    useEffect(() => {
        Object.entries(props.headers).map(([columnId, column], index) => {
            column.items.map((item, key) => {
                num = props.headers[columnId].items[key].questionList.length
                while (num > parseInt(props.headers[columnId].items[key].numQuestion)) {
                    props.headers[columnId].items[key].questionList.splice(Math.floor(Math.random() * num), 1)
                    num = num - 1
                }
            })

        })
        setnewHeader({ ...props.headers })
        setQuestionsInTest([])
    }, [props.headers]);
    let num = 0;
    useEffect(() => {

        Object.entries(newHeader).map(([columnId, column], index) => {
            column.items.map((item, key) => {
                item.questionList.map((question, name) => {
                    props.questionsTestbank.map((questionTestbank, questionTestbankId) => {
                        if (questionTestbank.questionID == question.questionID) {
                            setQuestionsInTest(questionsInTest => [...questionsInTest, props.questionsTestbank[questionTestbankId]])
                            console.log("add")
                        }
                    })
                }
                )
            })
            setPart(index + 1)
        })
        console.log(props.questionsTestbank)
        console.log(newHeader)
    }, [newHeader]);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const update = () => {
        instance.post(API.V1.STUDENT.UPDATEINPUTEXAM, questionsInTest,
            {
                headers: {
                    "TestId": props.selectTest.TestID,
                    "CourseID": props.selectTest.CourseID,
                }
            }).then(res => {

            }).catch(err => {
                console.warn(err);
            });

    }
    const onChangeChoice = (e, index, questionTestbankId) => {
        questionsInTest[questionTestbankId].choice[index].answer = e.toString()
        setQuestionsInTest([...questionsInTest])
        update()
    }
    const onChangeShortAnswer = (e, questionTestbankId) => {

        questionsInTest[questionTestbankId].choice[0].answer = e
        setQuestionsInTest([...questionsInTest])
        update()
    }
    const onChangeWriteup = (e, questionTestbankId) => {
        questionsInTest[questionTestbankId].choice[0].answer = e
        setQuestionsInTest([...questionsInTest])
        update()
    }
    const saveAll = () => {
        instance.post(API.V1.STUDENT.SUBMIT, questionsInTest,
            {
                headers: {
                    "TestId": props.selectTest.TestID,
                    "CourseID": props.selectTest.CourseID,
                }
            }).then(res => {

            }).catch(err => {
                console.warn(err);
            });
        history.push(`/`)
        message.success('Processing complete!')
    }
    const onhandleChange = (newFileList, questionTestbankId) => {
        if (newFileList.file.status === "done") {
            /*props.questionInfo[props.currentQuestion - 1].choice[index].imageLink = [{ uid: '-1', url: newFileList.file.response.URL }]
            //setChoice([...choice])
            //props.questionInfo[props.currentQuestion - 1].choice = choice;
            props.setQuestionInfo([...props.questionInfo])*/
            questionsInTest[questionTestbankId].choice[0].answer = newFileList.file.response.URL
            setQuestionsInTest([...questionsInTest])
        }
        if (newFileList.file.status === "removed") {
            /*props.questionInfo[props.currentQuestion - 1].choice[index].imageLink = []
            props.setQuestionInfo([...props.questionInfo])*/
        }
    }
    return (
        <>
            {loading ?
                <Layout>
                    <div style={{ justifyContent: "center", height: "100%", width: "100%" }}>
                        <div>
                            {Object.entries(newHeader).map(([columnId, column], index) => {
                                if (index === current) {
                                    return (
                                        <div>
                                            <div style={{ marginTop: 30, background: "#FFB766", width: "100%", fontWeight: 'bold', display: "inline-block" }}>
                                                <div style={{ marginLeft: 30, color: "#ffffff", fontSize: 40 }}>{column.name}</div>
                                            </div>
                                            {column.items.map((item, key) => {
                                                return (
                                                    <>
                                                        {item.questionList.map((question, name) => {
                                                            return (
                                                                <>
                                                                    {questionsInTest.map((questionTestbank, questionTestbankId) => {
                                                                        return (
                                                                            <div style={{ fontSize: 30, background: '#FFFFFF', margin: 30, textAlign: 'left' }}>
                                                                                {questionTestbank.questionID === question.questionID && (
                                                                                    <div style={{ margin: 30 }}>
                                                                                        {name + 1}.
                                                                                        <span
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
                                                                                                                checked={(choice.answer == "true") }
                                                                                                                onChange={e => onChangeChoice(e.target.checked, index, questionTestbankId)}
                                                                                                                style={{ fontSize: 25 }}
                                                                                                            >

                                                                                                            </Checkbox>     {String.fromCharCode(index + 97)}.) {choice.data}
                                                                                                            {choice.imageLink.length >= 1 && (
                                                                                                                <div>
                                                                                                                    <Image
                                                                                                                        width={200}
                                                                                                                        src={choice.imageLink[index].url}
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

                                                                                            <Input value={questionTestbank.choice[0].answer} onChange={e => onChangeShortAnswer(e.target.value, questionTestbankId)} style={{ fontSize: 30, width: 800 }} placeholder="Your answer">

                                                                                            </Input>
                                                                                        )}
                                                                                        {questionTestbank.type === "Write-up" && (

                                                                                            <TextArea style={{ fontSize: 25 }} value={questionTestbank.choice[0].answer} onChange={e => onChangeWriteup(e.target.value, questionTestbankId)} rows={4}>

                                                                                            </TextArea>
                                                                                        )}
                                                                                        {questionTestbank.type === "Upload Answer" && (
                                                                                            <div>
                                                                                                <Upload
                                                                                                    action={API.V1.TEACHER.COURSE.TEST.UPLOADPIC}
                                                                                                    defaultFileList={[]}
                                                                                                    onChange={e => onhandleChange(e, questionTestbankId)}
                                                                                                    name="myFile"
                                                                                                    maxCount={1}
                                                                                                >
                                                                                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                                                                                </Upload>

                                                                                            </div>

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
                        <div style={{ marginLeft: 20, marginTop: 100 }}>
                            {current > 0 && (
                                <Button type="primary" style={{ height: 60, width: 150, margin: '0 8px', fontSize: 20 }} onClick={() => prev()}>
                                    Previous
                                </Button>
                            )}
                            {current < part - 1 && (
                                <Button type="primary" style={{ height: 60, width: 150, margin: '0 8px', fontSize: 20 }} onClick={() => next()}>
                                    Next
                                </Button>
                            )}
                            {current === part - 1 && (
                                <Button type="primary" style={{ height: 60, width: 150, margin: '0 8px', fontSize: 20 }} onClick={() => saveAll()}>
                                    Done
                                </Button>
                            )}

                        </div>
                        <div style={{ height: 100 }}>

                        </div>
                    </div >
                </Layout>
                : <></>
            }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DoTest);
