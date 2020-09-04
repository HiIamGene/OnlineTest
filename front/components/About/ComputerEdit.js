import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormGroup, Label, Col, Row, Button, Input, ModalBody, FormFeedback, Modal, Form } from 'reactstrap'
import React from "react";
import Autocomplete from "../Input/Autocomplete";
import _ from "lodash";
import axios from "axios";
import { API_MASTER_COMPUTER_SKILL, API_MASTER_SOFT_SKILL } from "../../constant/ENV";
import { _error_handler } from "../../utils/errorHandler";
import { withToastManager } from "react-toast-notifications";

class ComputerEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTxt: "",
            modal: false,
            createComputerSkill: "",
            allComSkill: [],
            selected: []
            // {
            //     "id": "",
            //     title:"",
            //     "englishName": "",
            //     "localName": "",
            //     "imageUrl": "",
            //     "creator": ""
            // }
        }
    }

    componentWillUnmount() {
        this.setState({
            selected: {
                "id": "",
                title: "",
                "englishName": "",
                "localName": "",
                "imageUrl": "",
                "creator": ""
            }
        })
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            createComputerSkill: prevState.selected.englishName,
        }));
    }

    _inputChange = async (val) => {
        await this.props.fetchAllComputerSkill(val)
        this.setState({ allComSkill: this.props.allComputerSkill })
    }

    onSelect = async (val) => {
        this.props.onChange(val)
        const selected = await this.props.allComputerSkill.find(item => (item.id === val))
        await this.setState({ selected })
    }

    modalOnInputChange = (e) => {
        const txt = e.target.value
        this.setState((state, props) => ({
            createComputerSkill: txt
        }))
    }

    onCreateComputerSkill = (e) => {
        const data = {
            "nameComputerSkill": this.state.createComputerSkill
        }

        e.preventDefault()
        axios.post(API_MASTER_COMPUTER_SKILL, data)
            .then(async res => {
                this.toggle()
                await this.props.fetchALL();
                this.props.toastManager.add(res.data.message, { appearance: 'success', autoDismiss: true });

            })
            .catch(err => {
                console.error(err)
                _error_handler(this.props.toastManager, err)
            })
    }

    render() {
        const anotherProfile = this.props.anotherProfile
        const { computerData, onChange, onPlus, onEditMode } = this.props
        return (
            <div className="cr-card cr-bg-gray-2">
                <div>{anotherProfile ?
                    <div></div>
                    :
                    <div>
                        <div className="about-health-container-exit">
                            <FontAwesomeIcon onClick={() => { onEditMode(-1); onPlus(); }} className="about-identity-edit-fontawesome" color="rgb(100,100,100)" icon={faTimes} size="lg" />
                        </div>
                        <Row>
                            <Col md={4} sm={4} className="about-btn-wrapper">
                                <Button onClick={() => { onEditMode(-1); onPlus(); }} block>Cancel</Button>
                            </Col>
                            <Col md={4} sm={4} className="about-btn-wrapper">
                                <Button block className="about-btn-save" onClick={this.props.onSave}>Save Change</Button>
                            </Col>
                        </Row>
                        <Modal isOpen={this.state.modal}  >
                            <ModalBody >
                                <div className="about-skill-computer-position" >
                                    <div className="computer-position">
                                        <Form onSubmit={this.onCreateComputerSkill} >
                                            <Row form>
                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Label >Computer Skill Name</Label>
                                                        <Input type="text" name="englishName" value={this.state.createComputerSkill} onChange={this.modalOnInputChange} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <div className={"d-flex justify-content-end about-btn-wrapper mt-3"}>
                                                <Button color="secondary" className="about-btn-cancel mr-3" onClick={this.toggle}>Cancel</Button>
                                                <Button className="about-btn-save"  > Create </Button>{' '}
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>}
                </div>

            </div>
        )
    }

}

export default withToastManager(ComputerEdit)