import React, {Component} from "react";
import {Form, FormGroup, Label, Col, Row, Input, Button, FormFeedback} from 'reactstrap'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {withNamespaces} from "../../lib/i18n"
import _ from 'lodash'
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';


class IdentityEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMount: false
        }
    }

    componentDidMount() {
        this.setState({
            isMount: true
        })
    }
    render() {
        let {
            errors,
            onSubmit,
            attribute,
            onChange,
            onEditMode,
            leftUpperLabel,
            leftUpperPlaceholder,
            leftUpperName,
            leftUpperValue,
            rightUpperLabel,
            rightUpperPlaceholder,
            rightUpperName,
            rightUpperValue,
            leftLowerLabel,
            leftLowerName,
            leftLowerValue,
            rightLowerLabel,
            rightLowerName,
            rightLowerValue,
            onDelete,
            errorAttribute,
            t,
            onChangeDate
        } = this.props;
        return (
            <div className="cr-card cr-bg-gray-2">

                <div className="about-identity-edit-container-exit">
                    <FontAwesomeIcon onClick={() => onEditMode(-1)} className="about-identity-edit-fontawesome"
                                     color="rgb(100,100,100)" icon={faTimes} size="lg"/>
                </div>
                <Form onSubmit={(e) => onSubmit(e, attribute)} className="">
                    <Row form>
                        <Col md={6}>
                            <FormGroup>

                                <Label>{leftUpperLabel}</Label>
                                {
                                    !_.isEmpty(errors[errorAttribute]) ?
                                        <div>
                                            <Input invalid className="about-ch-form" type="text" name={leftUpperName}
                                                   value={leftUpperValue} placeholder={leftUpperPlaceholder}
                                                   onChange={(e) => onChange(e, attribute)} maxLength={30}/>
                                            <FormFeedback>{errors[errorAttribute]}</FormFeedback>
                                        </div>
                                        :
                                        <Input required className="about-ch-form" type="text" name={leftUpperName}
                                               value={leftUpperValue} placeholder={leftUpperPlaceholder}
                                               onChange={(e) => onChange(e, attribute)} maxLength={30}/>
                                }

                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>{rightUpperLabel}</Label>
                                {
                                    !_.isEmpty(errors.issueAuthority) ?
                                        <div>
                                            <Input invalid className="about-ch-form" type="text" name={rightUpperName}
                                                   value={rightUpperValue} placeholder={rightUpperPlaceholder}
                                                   onChange={(e) => onChange(e, attribute)} maxLength={38}/>
                                            <FormFeedback>{errors.issueAuthority}</FormFeedback>
                                        </div>
                                        :
                                        <Input required className="about-ch-form" type="text" name={rightUpperName}
                                               value={rightUpperValue} placeholder={rightUpperPlaceholder}
                                               onChange={(e) => onChange(e, attribute)} maxLength={38}/>
                                }

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup className="about-identity-edit-formgroup">
                                <Label>{leftLowerLabel}</Label>

                                { !this.state.isMount ? null :
                                    !_.isEmpty(errors.issueDate) ?
                                        <div>
                                            <DatePicker
                                                className="about-ch-form form-control"
                                                dateFormat="d/MM/yyyy"
                                                selected={leftLowerValue === "" ? null : new Date(leftLowerValue)}
                                                onChange={val => onChangeDate(leftLowerName, val)}
                                                maxDate={rightLowerValue === "" ? null : new Date(rightLowerValue)}
                                                showDisabledMonthNavigation
                                            />
                                            <Input invalid className="about-identity-edit-input"/>
                                            <FormFeedback>{errors.issueDate}</FormFeedback>
                                        </div>
                                        :
                                        <DatePicker
                                            className="about-ch-form form-control"
                                            dateFormat="d/MM/yyyy"
                                            selected={leftLowerValue === "" ? null : new Date(leftLowerValue)}
                                            onChange={val => onChangeDate(leftLowerName, val)}
                                            maxDate={rightLowerValue === "" ? null : new Date(rightLowerValue)}
                                            showDisabledMonthNavigation
                                        />
                                }

                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup className="about-identity-edit-formgroup">
                                <Label>{rightLowerLabel}</Label>
                                {
                                    !this.state.isMount ? null :
                                    !_.isEmpty(errors.expiryDate) ?
                                        <div>
                                            <DatePicker
                                                className="about-ch-form form-control"
                                                dateFormat="d/MM/yyyy"
                                                selected={rightLowerValue === "" ? null : new Date(rightLowerValue)}
                                                onChange={val => onChangeDate(rightLowerName, val)}
                                                minDate={leftLowerValue === "" ? null : new Date(leftLowerValue)}
                                            />
                                            <Input invalid className="about-identity-edit-input"/>
                                            <FormFeedback>{errors.expiryDate}</FormFeedback>
                                        </div>
                                        :
                                        <DatePicker
                                            className="about-ch-form form-control"
                                            dateFormat="d/MM/yyyy"
                                            selected={rightLowerValue === "" ? null : new Date(rightLowerValue)}
                                            onChange={val => onChangeDate(rightLowerName, val)}
                                            minDate={leftLowerValue === "" ? null : new Date(leftLowerValue)}
                                            showDisabledMonthNavigation
                                        />
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} sm={6} className="about-identity-edit-column">

                            {!onDelete ?
                                <Button color="danger" onClick={(e) => onDelete(e)} block>{t("deleteButton")}</Button>
                                :
                                <Button className="about-btn-cancel" onClick={(e) => onEditMode(e)} block>{t("cancelButton")}</Button>
                            }
                        </Col>
                        <Col md={4} sm={6} className="about-identity-edit-column">
                            <Button type="submit" block className="about-btn-save">{t("saveButton")}</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

IdentityEdit.getInitialProps = async (ctx) => {
    return {
        namespacesRequired: ['common']
    }
}
export default withNamespaces("common")(IdentityEdit)