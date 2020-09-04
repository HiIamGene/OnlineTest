import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormGroup, Label, Col, Row, Button, Input } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LanguageElement from './LanguageElement'
import React from "react"
import Autocomplete from "../Input/Autocomplete";
import { API_MASTER_LANGUAGE, API_USER_PROFILE_SKILL_LANGUAGE_V010001 } from "../../constant/ENV"
import axios from "axios"
import { withToastManager } from "react-toast-notifications"

class LanguageEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTxt: "",
            modal: false,
            languageList: [],
            selected: []
        }
        this.__inputHandler = this.__inputHandler.bind(this);
    }

    componentWillUnmount() {
        this.setState({
            languageList: this.props.allLangSkill
        })
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    __inputHandler(e) {
    }
    _inputChange = async (val) => {
        await this.props.fetchAllLangSkill(val);
        this.setState({ languageList: this.props.allLangSkill })
    }

    createInputChange = (e) => {
        const selected = this.state.selected
        this.setState({
            selected: {
                ...selected,
                englishName: e.target.value
            }
        });
    }

    onSelect = (val) => {
        this.props.onChange(val)
        const selected = this.props.allLangSkill.find(item => (item.id === val))
        this.setState({ selected })
    }

    openModal = () => {
        this.toggle()
    }

    createLanguage = () => {
        axios.post(API_MASTER_LANGUAGE, { language: this.state.selected.englishName })
            .then(res => {
                this.props.toastManager.add(res.data.message, { appearance: 'success', autoDismiss: true });
                this.toggle()
                this.props.fetchALL();
            })
            .catch(err => {
                this.props.toastManager.add(err.data.message, { appearance: 'error', autoDismiss: true });
            })
    }
    _confirmDelete = (index) => {
        const id = index;
        axios.delete(`${API_USER_PROFILE_SKILL_LANGUAGE_V010001}/${id}`, { data: { device: " " } })
            .then(async res => {
                await this.props.fetchALL()
                this.props.toastManager.add(res.data.message, { appearance: 'success', autoDismiss: true });

            })
            .catch(err => {
                _error_handler(this.props.toastManager, err)
            })
    }
    render() {
        const anotherProfile = this.props.anotherProfile
        const { onChange, languageData, onEditMode, onClick, onSave, inputEnable, userLang } = this.props
        return (
            <div>{anotherProfile ?
                <div className="cr-card personal-font-sm cr-bg-gray-3-background">
                    <div className="about-health-container-exit">

                    </div>
                    <FormGroup row >
                        <Label className={"cr-text-gray-1"} for="ShipInput" md={4} sm={4}>Language</Label>
                        <Col md={8} sm={4}>
                            <div>
                                {/* <DropdownInput
                            onChange={(val) =>this._inputChange(val)} 
                            errors={{}}       
                            isEditMode={inputEnable}                
                            attribute="language"
                            data={!inputEnable ? this.state.selected : languageData}
                            items={this.props.allLangSkill}
                            onSelect={(val)=>this.onSelect(val)}
                            openModal={this.openModal}
                        /> */}

                                {/* <Input className="about-ch-form" onChange={(e) => onChange(e)} value={languageData.nameLangauge} name="nameLangauge"/>                     */}
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        {!userLang ? "" : userLang.map((value) => {
                            const { id, language, speak, reading, listening, write } = value;
                            return (
                                <div className="language-skill-container">

                                    <div className="language-skill-topic"><p className="lang">{language}</p></div>
                                    <div className="softskill-chart">
                                        <div className="softskill-chart-text">
                                            <p>Speak</p>
                                        </div>
                                        <div className="softskill-chart-score-container">
                                            <p className="level">Level</p>
                                            <div className="softskill-chart-score">
                                                <div className={speak >= 0 ? "score-0 action" : "score-0"}>
                                                    <p>0</p>
                                                </div>
                                                <div className={speak >= 1 ? "score-1 action" : "score-1"}>
                                                    <p>1</p>
                                                </div>
                                                <div className={speak >= 2 ? "score-2 action" : "score-2"}>
                                                    <p>2</p>
                                                </div>
                                                <div className={speak == 3 ? "score-3 action" : "score-3"}>
                                                    <p>3</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="softskill-chart">
                                        <div className="softskill-chart-text">
                                            <p>Write</p>
                                        </div>
                                        <div className="softskill-chart-score-container">
                                            <p className="level">Level</p>
                                            <div className="softskill-chart-score">
                                                <div className={write >= 0 ? "score-0 action" : "score-0"}>
                                                    <p>0</p>
                                                </div>
                                                <div className={write >= 1 ? "score-1 action" : "score-1"}>
                                                    <p>1</p>
                                                </div>
                                                <div className={write >= 2 ? "score-2 action" : "score-2"}>
                                                    <p>2</p>
                                                </div>
                                                <div className={write == 3 ? "score-3 action" : "score-3"}
                                                ><p>3</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="softskill-chart">
                                        <div className="softskill-chart-text">
                                            <p>Listening</p>
                                        </div>
                                        <div className="softskill-chart-score-container">
                                            <p className="level">Level</p>
                                            <div className="softskill-chart-score">
                                                <div className={listening >= 0 ? "score-0 action" : "score-0"}>
                                                    <p>0</p>
                                                </div>
                                                <div className={listening >= 1 ? "score-1 action" : "score-1"}>
                                                    <p>1</p>
                                                </div>
                                                <div className={listening >= 2 ? "score-2 action" : "score-2"}>
                                                    <p>2</p>
                                                </div>
                                                <div className={listening == 3 ? "score-3 action" : "score-3"}>
                                                    <p>3</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="softskill-chart">
                                        <div className="softskill-chart-text">
                                            <p>Reading</p>
                                        </div>
                                        <div className="softskill-chart-score-container">
                                            <p className="level">Level</p>
                                            <div className="softskill-chart-score">
                                                <div className={reading >= 0 ? "score-0 action" : "score-0"}>
                                                    <p>0</p>
                                                </div>
                                                <div className={reading >= 1 ? "score-1 action" : "score-1"}>
                                                    <p>1</p>
                                                </div>
                                                <div className={reading >= 2 ? "score-2 action" : "score-2"}>
                                                    <p>2</p>
                                                </div>
                                                <div className={reading == 3 ? "score-3 action" : "score-3"}>
                                                    <p>3</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </FormGroup>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Create Language </ModalHeader>
                        <ModalBody>
                            <Input type={"text"} placeholder="Language Name" value={this.state.selected.englishName} onChange={this.createInputChange} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            <Button className="about-skill-lang-color" onClick={this.createLanguage} > Create </Button>{' '}
                        </ModalFooter>
                    </Modal>


                </div>
                :
                <div className="cr-card personal-font-sm cr-bg-gray-3-background">
                    <div className="about-health-container-exit">

                    </div>
                    <FormGroup row >
                        <Label className={"cr-text-gray-1"} for="ShipInput" md={4} sm={4}>Language</Label>
                        <Col md={8} sm={4}>
                            <div>
                                <Autocomplete
                                    items={!this.state.languageList ? [] : this.state.languageList.map((value) => {
                                        return {
                                            imageUrl: "",
                                            label: [value.englishName],
                                            value: value.id,
                                        };
                                    })}
                                    onCreate={this.toggle}
                                    onCreateBtn={"Create"}
                                    onChange={e => this._inputChange(e.target.value)}
                                    onSelect={(item) => {
                                        this.__inputHandler(item);
                                        onEditMode("add");
                                        onClick({
                                            languageIdMaster: item == null ? "" : item.value,
                                            language: item == null ? "" : item.label,
                                            speak: 0,
                                            write: 0,
                                            listening: 0,
                                            reading: 0
                                        });

                                    }}
                                    onFocus={e => this._inputChange(e.target.value)}
                                    required={true}
                                />

                                {/* <DropdownInput
                        onChange={(val) =>this._inputChange(val)} 
                        errors={{}}       
                        isEditMode={inputEnable}                
                        attribute="language"
                        data={!inputEnable ? this.state.selected : languageData}
                        items={this.props.allLangSkill}
                        onSelect={(val)=>this.onSelect(val)}
                        openModal={this.openModal}
                    /> */}

                                {/* <Input className="about-ch-form" onChange={(e) => onChange(e)} value={languageData.nameLangauge} name="nameLangauge"/>                     */}
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        {!userLang ? "" : userLang.map((value) => {
                            const { id, language, speak, reading, listening, write } = value;
                            return (
                                <div className="language-skill-container">
                                    <div className="language-skill-topic"><p className="lang">{language}</p><p className="delete-language" onClick={() => { this._confirmDelete(id); }}>Delete</p></div>
                                    <div className="softskill-chart">
                                        <div className="softskill-chart-text">
                                            <p>Speak</p>
                                        </div>
                                        <div className="softskill-chart-score-container">
                                            <p className="level">Level</p>
                                            <div className="softskill-chart-score">
                                                <div className={speak >= 0 ? "score-0 action" : "score-0"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: 0,
                                                            write: write,
                                                            listening: listening,
                                                            reading: reading
                                                        })
                                                    }}><p>0</p></div>
                                                <div className={speak >= 1 ? "score-1 action" : "score-1"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: 1,
                                                            write: write,
                                                            listening: listening,
                                                            reading: reading
                                                        })
                                                    }}><p>1</p></div>
                                                <div className={speak >= 2 ? "score-2 action" : "score-2"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: 2,
                                                            write: write,
                                                            listening: listening,
                                                            reading: reading
                                                        })
                                                    }}><p>2</p></div>
                                                <div className={speak == 3 ? "score-3 action" : "score-3"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: 3,
                                                            write: write,
                                                            listening: listening,
                                                            reading: reading
                                                        })
                                                    }}><p>3</p></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="softskill-chart">
                                        <div className="softskill-chart-text">
                                            <p>Write</p>
                                        </div>
                                        <div className="softskill-chart-score-container">
                                            <p className="level">Level</p>
                                            <div className="softskill-chart-score">
                                                <div className={write >= 0 ? "score-0 action" : "score-0"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: 0,
                                                            listening: listening,
                                                            reading: reading
                                                        })
                                                    }}><p>0</p></div>
                                                <div className={write >= 1 ? "score-1 action" : "score-1"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: 1,
                                                            listening: listening,
                                                            reading: reading
                                                        })
                                                    }}><p>1</p></div>
                                                <div className={write >= 2 ? "score-2 action" : "score-2"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: 2,
                                                            listening: listening,
                                                            reading: reading
                                                        })
                                                    }}><p>2</p></div>
                                                <div className={write == 3 ? "score-3 action" : "score-3"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: 3,
                                                            listening: listening,
                                                            reading: reading
                                                        })
                                                    }}><p>3</p></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="softskill-chart">
                                        <div className="softskill-chart-text">
                                            <p>Listening</p>
                                        </div>
                                        <div className="softskill-chart-score-container">
                                            <p className="level">Level</p>
                                            <div className="softskill-chart-score">
                                                <div className={listening >= 0 ? "score-0 action" : "score-0"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: write,
                                                            listening: 0,
                                                            reading: reading
                                                        })
                                                    }}><p>0</p></div>
                                                <div className={listening >= 1 ? "score-1 action" : "score-1"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: write,
                                                            listening: 1,
                                                            reading: reading
                                                        })
                                                    }}><p>1</p></div>
                                                <div className={listening >= 2 ? "score-2 action" : "score-2"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: write,
                                                            listening: 2,
                                                            reading: reading
                                                        })
                                                    }}><p>2</p></div>
                                                <div className={listening == 3 ? "score-3 action" : "score-3"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: write,
                                                            listening: 3,
                                                            reading: reading
                                                        })
                                                    }}><p>3</p></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="softskill-chart">
                                        <div className="softskill-chart-text">
                                            <p>Reading</p>
                                        </div>
                                        <div className="softskill-chart-score-container">
                                            <p className="level">Level</p>
                                            <div className="softskill-chart-score">
                                                <div className={reading >= 0 ? "score-0 action" : "score-0"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: write,
                                                            listening: listening,
                                                            reading: 0
                                                        })
                                                    }}><p>0</p></div>
                                                <div className={reading >= 1 ? "score-1 action" : "score-1"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: write,
                                                            listening: listening,
                                                            reading: 1
                                                        })
                                                    }}><p>1</p></div>
                                                <div className={reading >= 2 ? "score-2 action" : "score-2"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: write,
                                                            listening: listening,
                                                            reading: 2
                                                        })
                                                    }}><p>2</p></div>
                                                <div className={reading == 3 ? "score-3 action" : "score-3"}
                                                    onClick={() => {
                                                        onEditMode("edit");
                                                        onClick({
                                                            languageIdMaster: id,
                                                            language: language,
                                                            speak: speak,
                                                            write: write,
                                                            listening: listening,
                                                            reading: 3
                                                        })
                                                    }}><p>3</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </FormGroup>



                </div>}
            </div>
        )
    }
}


export default withToastManager(LanguageEdit);