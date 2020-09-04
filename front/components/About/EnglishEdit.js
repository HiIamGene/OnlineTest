import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormGroup, Label, Col, Row, Button, Input } from 'reactstrap'
import React from "react";

const genIeltsLevel = (n, select) => {
    const render = []
    for (let i = 1; i <= n; i++) {
        render.push(<option value={i} selected={select == i}>{i}</option>)
    }

    return render
}


export default ({ onChange, englishData, onEditMode, onSubmit,anotherProfile }) => {

    return (
        <div>
            {anotherProfile?
                ""
                :
            <div className="cr-card personal-font-sm cr-bg-gray-3-background">
                <div className="about-health-container-exit">
                </div>
                <FormGroup row>

                    <Col className={"cr-text-gray-1 about-skill-eng-edit"} md={5} sm={5}>
                        <h3 className="eng-tofel about-font-sm-light">{"TOFEL : "}</h3>
                        <h3 className="eng-data about-font-sm-light">{" " + englishData && englishData.tofel}</h3>
                    </Col>

                </FormGroup>
                <FormGroup row>
                    <Label className={"cr-text-gray-1"} md={4} sm={4}>Speak</Label>
                    <Col md={8} sm={4}>
                        <div>
                            <Input type={"number"} min={0} max={30} className="about-ch-form about-font-sm-light" onChange={(e) => onChange(e)}
                                value={englishData.speak} name="speak" />
                        </div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label className={"cr-text-gray-1"} md={4} sm={4}>Write</Label>
                    <Col md={8} sm={4}>
                        <div>
                            <Input type={"number"} min={0} max={30} className="about-ch-form about-font-sm-light" onChange={(e) => onChange(e)}
                                value={englishData.write} name="write" />

                        </div>

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label className={"cr-text-gray-1"} md={4} sm={4}>Listening</Label>
                    <Col md={8} sm={4}>
                        <div>
                            <Input type={"number"} min={0} max={30} className="about-ch-form about-font-sm-light" onChange={(e) => onChange(e)}
                                value={englishData.listening} name="listening" />

                        </div>

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label className={"cr-text-gray-1"} md={4} sm={4}>Reading</Label>
                    <Col md={8} sm={4}>
                        <div>
                            <Input type={"number"} min={0} max={30} className="about-ch-form about-font-sm-light" onChange={(e) => onChange(e)}
                                value={englishData.reading} name="reading" />

                        </div>

                    </Col>
                </FormGroup>
                <hr />
                <FormGroup row>
                    <Label className={"cr-text-gray-1"} md={4} sm={4}>IELTS</Label>
                    <Col md={8} sm={4}>
                        <div>
                            <Input min={1} max={9} className="about-ch-form about-font-sm-light" type="select" name="ielts"
                                onChange={onChange}>
                                {genIeltsLevel(9, englishData.ielts)}
                            </Input>
                        </div>

                    </Col>
                </FormGroup>
                <hr />
                <FormGroup row>
                    <Label className={"cr-text-gray-1"} md={4} sm={4}>TOEIC</Label>
                    <Col md={8} sm={4}>
                        <div>
                            <Input min={0} max={900} type={"number"} className="about-ch-form about-font-sm-light" onChange={(e) => onChange(e)}
                                value={englishData.toeic} name="toeic" />

                        </div>

                    </Col>
                </FormGroup>
                <Row>
                    <Col md={4} sm={4} className="about-btn-wrapper">
                        <Button onClick={onSubmit} block className="about-btn-save">Save Change</Button>
                    </Col>
                </Row>
            </div>
            }
        </div>

    )
}