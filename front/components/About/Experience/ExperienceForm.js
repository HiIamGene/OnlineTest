import React, {Component} from "react";
import {Form, FormGroup, Label, Col, Row, Input, Button} from 'reactstrap'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import DatePicker from "react-datepicker";
import {connect} from 'react-redux';
import Autocomplete from "../../Input/Autocomplete";
import {
    fetchMasterCompnay,
    fetchMasterMajor,
    fetchMasterRank,
    fetchMasterShip,
    fetchMasterWorkscore
} from "../../../services/masterService";
import {fetchExperience, storeExperience, updateExperience} from "../../../services/experienceService";
import dayjs from "dayjs";
import {_error_handler} from "../../../utils/errorHandler";
import {withToastManager} from 'react-toast-notifications';
import {fetchProfile} from "../../../redux/actions/profileAction";
import MasterCompany from '../../Master/MasterCompany';
import MasterShip from '../../Master/MasterShip';
import {
    setExperiences,
    setCompanyMaster,
    editExperience,
    addExperience,
    viewExperience,
    setExperience
} from "../../../redux/actions/experienceAction";
import {ADD_EXPERIENCE, EDIT_EXPERIENCE} from "../../../redux/reducers/experienceReducer";
import cookies from "js-cookie";
import {imageWithToken} from "../../../utils/image";

class ExperienceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: [],
            ships: [],
            ranks: [],
            majors: [],
            workscores: [],
            isCreateCompany: false,
            isCreateShip: false,
        };
        this.__fetchMaster = this.__fetchMaster.bind(this);
        this.__inputHandler = this.__inputHandler.bind(this);
        this.__submitHandler = this.__submitHandler.bind(this);
        this.__masterCompanyToggle = this.__masterCompanyToggle.bind(this);
        this.__masterCompanyCallback = this.__masterCompanyCallback.bind(this);
        this.__masterShipToggle = this.__masterShipToggle.bind(this);
        this.__masterShipCallback = this.__masterShipCallback.bind(this);
    }

    __masterCompanyToggle() {
        this.setState({
            isCreateCompany: !this.state.isCreateCompany
        })
    }

    __masterShipToggle() {
        this.setState({
            isCreateShip: !this.state.isCreateShip
        })
    }

    async __masterCompanyCallback(company) {
        await this.__fetchMaster("company", {
            target: {
                value: company._englishName
            }
        });
        this.__masterCompanyToggle();
    }

    async __masterShipCallback(company) {
        await this.__fetchMaster("ship", {
            target: {
                value: company._englishName
            }
        });
        this.__masterShipToggle();
    }

    async __fetchMaster(masterType, event, inputTyping = false) {
        try {
            let stateKey, stateValue, value = event.target ? event.target.value : null;
            switch (masterType) {
                case "company": {
                    stateKey = "companies";
                    stateValue = await fetchMasterCompnay(value);
                    break;
                }
                case "ship": {
                    stateKey = "ships";
                    stateValue = await fetchMasterShip(value);
                    break;
                }
                case "rank": {
                    if (inputTyping)
                        this.__inputHandler({
                            target: {
                                name: "rank",
                                value
                            }
                        });
                    stateKey = "ranks";
                    stateValue = await fetchMasterRank(value);
                    break;
                }
                case "major": {
                    if (inputTyping)
                        this.__inputHandler({
                            target: {
                                name: "major",
                                value
                            }
                        });
                    stateKey = "majors";
                    stateValue = await fetchMasterMajor(value);
                    break;
                }
                case "workscore": {
                    if (inputTyping)
                        this.__inputHandler({
                            target: {
                                name: "workscore",
                                value
                            }
                        });
                    stateKey = "workscores";
                    stateValue = await fetchMasterWorkscore(value);
                    break;
                }

            }
            this.setState({
                [stateKey]: stateValue
            });

        } catch (e) {
            console.log(e);
            _error_handler(this.props.toastManager, e);
        }

    }

    __inputHandler(e) {
        this.props.setExperience({
            ...this.props.experience,
            [e.target.name]: e.target.value
        });
    }

    async __submitHandler(e) {
        e.preventDefault();
        const {experience} = this.props;
        try {
            let payload = {
                ...experience,
                start: experience.start && experience.start !== "" ? dayjs(experience.start).format("YYYY-MM-DD") : "",
                end: experience.end && experience.end !== "" ? dayjs(experience.end).format("YYYY-MM-DD") : null,
                work: experience.work,
            };
            if (experience.mode === ADD_EXPERIENCE) {
                await storeExperience(payload);
            } else if (experience.mode === EDIT_EXPERIENCE) {
                await updateExperience(payload);
            }

            this.props.setExperiences(await fetchExperience());
            this.props.viewExperience();
            this.props.fetchProfile();
        } catch (e) {
            console.log(e);
            _error_handler(this.props.toastManager, e);
        }
    }

    render() {
        let {t} = this.props;
        let {experience} = this.props;
        return (
            <div className="cr-card personal-font-sm cr-bg-gray-3-background">
                {experience.mode === ADD_EXPERIENCE &&
                <div className="about-font-sm-light">
                    <MasterCompany t={t} toggle={this.__masterCompanyToggle}
                                   masterCallback={this.__masterCompanyCallback}
                                   isOpen={this.state.isCreateCompany}/>
                    <MasterShip t={t} toggle={this.__masterShipToggle} masterCallback={this.__masterShipCallback}
                                isOpen={this.state.isCreateShip} companyId={experience.companyIdMaster}/>
                </div>
                }
                <Form onSubmit={this.__submitHandler} className="about-font-sm-light">
                    <div className="close-container">
                        <FontAwesomeIcon onClick={this.props.viewExperience}
                                         className="about-identity-edit-fontawesome"
                                         color="rgb(100,100,100)" icon={faTimes} size="lg"/>
                    </div>
                    {experience.mode === ADD_EXPERIENCE &&
                    <div className={"pt-40 about-font-sm-light"}>
                        <FormGroup row>
                            <Label for="ShipInput" md={4} sm={4}>{t("Company")}</Label>
                            <Col md={8} sm={8}  className="about-font-sm-light">
                                <Autocomplete
                                    items={!this.state.companies ? [] : this.state.companies.map((value) => {
                                        return {
                                            imageUrl: value._imageUrl,
                                            label: [value._englishName, value._localName],
                                            value: value._id,
                                        };
                                    })}
                                    onCreate={this.__masterCompanyToggle}
                                    onCreateBtn={"Create"}
                                    onChange={e => this.__fetchMaster("company", e)}
                                    onSelect={(item) => {
                                        this.__inputHandler({
                                            target: {
                                                name: "companyIdMaster",
                                                value: item ? item.value : ""
                                            }
                                        });
                                    }}
                                    onFocus={e => this.__fetchMaster("company", e)}
                                    required={true}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="ShipInput" md={4} sm={4}>{t("Ship")}</Label>
                            <Col md={8} sm={8}  className="about-font-sm-light">
                                <Autocomplete
                                    items={!this.state.ships ? [] : this.state.ships.map((value) => {
                                        return {
                                            imageUrl: value._imageUrl,
                                            label: [value._englishName, value._localName],
                                            value: value._id,
                                        };
                                    })}
                                    onCreate={this.__masterShipToggle}
                                    onCreateBtn={"Create"}
                                    onChange={e => this.__fetchMaster("ship", e)}
                                    onSelect={(item) => {
                                        this.__inputHandler({
                                            target: {
                                                name: "shipId",
                                                value: item ? item.value : ""
                                            }
                                        });
                                    }}
                                    onFocus={e => this.__fetchMaster("ship", e)}
                                />
                            </Col>
                        </FormGroup>
                    </div>}

                    {experience.mode === EDIT_EXPERIENCE &&
                    <div className={"cr-flex"}>
                        <div className="master-logo-container1 mr-20">
                            <img src={imageWithToken(experience.companyMaster._imageUrl)}
                                 alt={experience.companyMaster._englishName}/>
                        </div>
                        <div>
                            <h3 className={"cloud about-font-sm"}>{experience.companyMaster._englishName}</h3>
                            {experience.shipMaster && <h4 className={"cloud about-font-sm"}>{experience.shipMaster._englishName}</h4>}
                        </div>
                    </div>
                    }


                    <br/>

                    <Row form>
                        <Col md={5} sm={4} className="about-identity-detail-container">
                            <FormGroup>
                                <Label> {t("timePeriodExperience")}</Label>
                                <Row form>
                                    <Col md={12} sm={12} className="about-exp-detail-container-datepick">
                                        <DatePicker
                                            className="about-ch-form form-control about-font-sm-light"
                                            dateFormat="d/MM/yyyy"
                                            selected={experience.start === "" || !experience.start ? null : new Date(experience.start)}
                                            onChange={value => this.__inputHandler({
                                                target: {name: "start", value}
                                            })}
                                            maxDate={experience.end === "" || !experience.end ? null : new Date(experience.end)}
                                            showDisabledMonthNavigation
                                            showYearDropdown
                                            scrollableYearDropdown
                                            showMonthDropdown
                                        />

                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col className="about-exp-toexp" md={2} sm={2}>
                            <p></p>
                            {experience.work ? null : (
                                <p className="toexp-display">{t("toExperience")}</p>
                            )}
                        </Col>
                        <Col md={5} sm={5} className="about-exp-detail-container-datepick">
                            <FormGroup>
                                <div className="cr-checkbox-large">
                                    <Label className={"cloud"}>
                                        <Input checked={experience.work}
                                               type="checkbox" name="workHere" value={experience.work}
                                               onChange={(e) => this.__inputHandler({
                                                   target: {name: "work", value: !experience.work}
                                               })}/>
                                        {t("currentlyWorkHereExperience")}
                                    </Label>
                                </div>
                                {experience.work ? null : (
                                    <Row form>
                                        <Col md={12} sm={12} className="about-identity-detail-container">
                                            <DatePicker
                                                className="about-ch-form form-control about-font-sm-light"
                                                dateFormat="d/MM/yyyy"
                                                selected={experience.end === "" || !experience.end ? null : new Date(experience.end)}
                                                onChange={value => this.__inputHandler({
                                                    target: {name: "end", value}
                                                })}
                                                minDate={experience.start === "" || !experience.start ? null : new Date(experience.start)}
                                                showDisabledMonthNavigation
                                                showYearDropdown
                                                scrollableYearDropdown
                                                showMonthDropdown
                                            />
                                        </Col>
                                    </Row>
                                )}
                            </FormGroup>
                        </Col>


                    </Row>

                    <div className="cr-checkbox-small">
                        <Label className="about-exp-workhere" for="workHere">
                            <Input checked={experience.work}
                                   type="checkbox" name="workHere" value={experience.work}
                                   onChange={(e) => this.__inputHandler({
                                       target: {name: "work", value: !experience.work}
                                   })}/>
                            {t("currentlyWorkHereExperience")}
                        </Label>
                    </div>
                    <Row>
                        <Col md={8} sm={8}>
                            <FormGroup className={'about-exp-detail-container-datepick'}>
                                <Label>{t("rankExperience")}</Label>
                                <Autocomplete
                                    items={this.state.ranks.map((value) => {
                                        return {
                                            label: [value._name],
                                            value: value._id,
                                        };
                                    })}
                                    value={experience.mode === ADD_EXPERIENCE ? experience.rankMaster : experience.rankMaster._name}
                                    onChange={e => this.__fetchMaster("rank", e, true)}
                                    onSelect={(item) => {
                                        this.__inputHandler({
                                            target: {
                                                name: "rank",
                                                value: item ? item.label[0] : ""
                                            }
                                        });
                                    }}
                                    onFocus={e => this.__fetchMaster("rank", e)}
                                />

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} sm={8}>
                            <FormGroup className={'about-exp-detail-container-datepick'}>
                                <Label>{t("majorOilChateter")}</Label>
                                <Autocomplete
                                    items={this.state.majors.map((value) => {
                                        return {
                                            label: [value._name],
                                            value: value._id,
                                        };
                                    })}
                                    value={experience.mode === ADD_EXPERIENCE ? experience.majorMaster : experience.majorMaster._name}
                                    onChange={e => this.__fetchMaster("major", e, true)}
                                    onSelect={(item) => {
                                        this.__inputHandler({
                                            target: {
                                                name: "major",
                                                value: item ? item.label[0] : ""
                                            }
                                        });
                                    }}
                                    onFocus={e => this.__fetchMaster("major", e)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col md={8} sm={8}>
                            <FormGroup className={'about-exp-detail-container-datepick'}>
                                <Label>{t("workScoreExperience")}</Label>
                                <Autocomplete
                                    items={this.state.workscores.map((value) => {
                                        return {
                                            label: [value._name],
                                            value: value._id,
                                        };
                                    })}
                                    value={experience.mode === ADD_EXPERIENCE ? experience.workscoreMaster : experience.workscoreMaster._name}
                                    onChange={e => this.__fetchMaster("workscore", e, true)}
                                    onSelect={(item) => {
                                        this.__inputHandler({
                                            target: {
                                                name: "workscore",
                                                value: item ? item.label[0] : ""
                                            }
                                        });
                                    }}
                                    className="about-font-sm-light"
                                    onFocus={e => this.__fetchMaster("workscore", e)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} sm={8}>
                            <FormGroup className={'about-exp-detail-container-datepick'}>
                                <Label>{t("scopeOfWork")}</Label>
                                <Row form>
                                    <Col md={12} sm={12} className="about-identity-detail-container">
                                        <Input className="about-ch-form about-font-sm-light" onChange={this.__inputHandler}
                                               type="textarea" name="scope"
                                               maxLength={200}
                                               wrap
                                               value={experience.scope}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} sm={6} className="about-btn-wrapper">
                            <Button className="about-btn-cancel" type={"button"} onClick={this.props.viewExperience}
                                    block>{t("cancelButtonExperience")}</Button>
                        </Col>
                        <Col md={4} sm={6} className="about-btn-wrapper">
                            <Button className="about-btn-save" tyoe="submit" block>{t("saveButtonExperience")}</Button>
                        </Col>
                    </Row>


                </Form>
            </div>
        )
    }
}

export default connect(store => {
    return {
        experience: store.experienceReducer.experience
    }
}, {
    setExperiences,
    fetchProfile,
    setCompanyMaster,
    editExperience,
    addExperience,
    viewExperience,
    setExperience
})(withToastManager(ExperienceForm));