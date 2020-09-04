import React, {Component} from "react";
import {imageWithToken} from "../../utils/image";
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {masterShipFields, storeMasterShip} from "../../services/masterService";
import {_error_handler} from "../../utils/errorHandler";
import {uploadFile} from "../../services/fileService";
import {withToastManager} from 'react-toast-notifications';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {fetchMasterCountry} from "../../services/utilService";
import {setMasterCountry} from "../../redux/actions/utilAction";

class MasterShip extends Component {
    constructor(props) {
        super(props);
        this.state = masterShipFields;

        this.__onUploadImage = this.__onUploadImage.bind(this);
        this.__inputHandler = this.__inputHandler.bind(this);
        this.__submitHandler = this.__submitHandler.bind(this);
    }

    async componentDidMount() {
        if(this.props.countries.length === 0){
            this.props.setMasterCountry(await fetchMasterCountry());
        }
    }

    async __onUploadImage(e) {
        try {
            const image = await uploadFile({
                file: e.target.files[0],
                category: "ship",
                path: "ship"
            });
            this.setState({
                image: image.url
            })
        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }

    __inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async __submitHandler(e) {
        e.preventDefault();
        try {
            const ship = await storeMasterShip({
                ...this.state,
                companyId: this.props.companyId
            });
            if (this.props.masterCallback) {
                this.props.masterCallback(ship);
            }
            this.setState(masterShipFields)
        } catch (e) {
            console.log(e);
            _error_handler(this.props.toastManager, e);
        }
    }

    render() {
        const {isOpen, toggle, t} = this.props;
        return (
            <Modal isOpen={isOpen}>
                <ModalBody>
                    <div className={"master-modal"}>
                        <div className={"close-btn"}>
                            <FontAwesomeIcon onClick={toggle} color="rgb(100,100,100)" icon={faTimes} size="lg"/>
                        </div>
                        <div className={"image-container"}>
                            <div className="upload-container">
                                <div>
                                    <Input onChange={this.__onUploadImage} type="file" name="image"
                                           accept="image/*"/>
                                    {
                                        this.state.image && this.state.image !== "" ?
                                            <img src={imageWithToken(this.state.image)} width="70" alt={"Crewhitz"}/> :
                                            <FontAwesomeIcon color={"rgb(60,102,180)"} icon={faPlus} fixedWidth/>
                                    }
                                </div>
                            </div>
                        </div>
                        <br/>
                        <Form className={"master-form"} onSubmit={this.__submitHandler}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="about-font-sm"l>{t("englishNameExperienceMaster")}</Label>
                                        <Input required className="about-ch-form about-font-sm-light" type="text" name="englishName"
                                               value={this.state.englishName}
                                               maxLength={40}
                                               onChange={this.__inputHandler}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="about-font-sm">{t("thaiNameExperienceMaster")}</Label>
                                        <Input required className="about-ch-form about-font-sm-light" type="text" name="localName"
                                               value={this.state.localName}
                                               maxLength={40}
                                               onChange={this.__inputHandler}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="about-font-sm">Country</Label>
                                        <select name="country"
                                                className="about-ch-form form-control about-font-sm-light"
                                                value={this.state.country}
                                                onChange={this.__inputHandler}
                                                required>
                                            {this.props.countries.map((value,key)=>{
                                                return <option key={key} value={value.country}>{value.country}</option>
                                            })}
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="about-font-sm">Year Built</Label>
                                        <Input required className="about-ch-form form-control about-font-sm-light" type="text" name="yearBuilt"
                                               value={this.state.yearBuilt}
                                               maxLength={40}
                                               onChange={this.__inputHandler}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="about-font-sm">D.W.T</Label>
                                        <Input required className="about-ch-form form-control about-font-sm-light" type="text" name="dwt"
                                               value={this.state.dwt}
                                               maxLength={40}
                                               onChange={this.__inputHandler}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="about-font-sm">N.R.T</Label>
                                        <Input required className="about-ch-form form-control about-font-sm-light" type="text" name="nrt"
                                               value={this.state.nrt}
                                               maxLength={40}
                                               onChange={this.__inputHandler}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="about-font-sm">G.R.T</Label>
                                        <Input required className="about-ch-form form-control about-font-sm-light" type="text" name="grt"
                                               value={this.state.grt}
                                               maxLength={40}
                                               onChange={this.__inputHandler}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="about-font-sm">Type of vessel</Label>
                                        <Input required className="about-ch-form form-control about-font-sm-light" type="text" name="vesselType"
                                               value={this.state.vesselType}
                                               maxLength={40}
                                               onChange={this.__inputHandler}/>
                                    </FormGroup>
                                </Col>

                            </Row>
                            <br/>
                            <div className="text-center bottom-btn">
                                <Button className={"close-modal about-btn-cancel"}
                                        onClick={toggle}>{t("cancelButtonExperience")}</Button>
                                <Button className={"submit-form about-btn-save"} type="submit">{t("saveButtonExperience")}</Button>
                            </div>
                        </Form>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

MasterShip.propTypes = {
    /**
     * Callback function when master was created
     *
     * @params master data (object)
     */
    masterCallback: PropTypes.func,

    /**
     * Modal open status
     */
    isOpen: PropTypes.bool,

    /**
     * Toggle modal function
     */
    toggle: PropTypes.func,

    /***
     * Translate function
     */
    t: PropTypes.func,

    /***
     * ========= Required =========
     * Company ID for add to ship
     */
    companyId: PropTypes.string,

};

export default connect(store=>{
    return {
        countries: store.utilReducer.countries
    }
},{setMasterCountry})(withToastManager(MasterShip));