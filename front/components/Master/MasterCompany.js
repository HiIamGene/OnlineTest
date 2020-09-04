import React, {Component} from "react";
import {imageWithToken} from "../../utils/image";
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import GoogleMapSearchBar from "../Util/GoogleMapSearchBar";
import {masterCompanyFields, storeMasterCompany} from "../../services/masterService";
import {_error_handler} from "../../utils/errorHandler";
import {uploadFile} from "../../services/fileService";
import {withToastManager} from 'react-toast-notifications';
import PropTypes from "prop-types";

class MasterCompany extends Component {
    constructor(props) {
        super(props);
        this.state = masterCompanyFields;

        this.__onUploadImage = this.__onUploadImage.bind(this);
        this.__inputHandler = this.__inputHandler.bind(this);
        this.__submitHandler = this.__submitHandler.bind(this);
        this.__locationHandler = this.__locationHandler.bind(this);
    }

    async __onUploadImage(e) {
        try {
            const image = await uploadFile({
                file: e.target.files[0],
                category: "company",
                path: "company"
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
            const company = await storeMasterCompany(this.state);
            if (this.props.masterCallback) {
                this.props.masterCallback(company);
            }
            this.setState(masterCompanyFields)
        } catch (e) {
            console.log(e);
            _error_handler(this.props.toastManager, e);
        }
    }

    __locationHandler() {
        this.setState({
            locationSearch: true
        });
    }


    render() {
        const {isOpen, toggle, t} = this.props;
        let {image, englishName, localName, location, locationSearch} = this.state;
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
                                        image && image !== "" ?
                                            <img src={imageWithToken(image)} width="70" alt={"Crewhitz"}/> :
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
                                        <Label className="about-font-sm">{t("englishNameExperienceMaster")}</Label>
                                        <Input required className="about-font-sm-light about-ch-form" type="text" name="englishName"
                                               value={englishName}
                                               maxLength={40}
                                               onChange={this.__inputHandler}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="about-font-sm">{t("thaiNameExperienceMaster")}</Label>
                                        <Input required className="about-font-sm-light about-ch-form" type="text" name="localName"
                                               value={localName}
                                               maxLength={40}
                                               onChange={this.__inputHandler}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <div className="row location-container about-font-sm">
                                <div className="col-sm-3">{t("locationExperienceMaster")}</div>
                                <div className="col-sm-9">
                                    {
                                        !locationSearch ?
                                            <div className={"location-text"}>
                                                <FontAwesomeIcon onClick={this.__locationHandler}
                                                                 color="rgb(100,100,100)" icon={faAngleRight}
                                                                 size="lg"/>
                                            </div>
                                            :
                                            <GoogleMapSearchBar
                                                onChangeLocation={(val) => this.__inputHandler({
                                                    target: {
                                                        name: "location",
                                                        value: val
                                                    }
                                                })}
                                                className="about-font-sm-light about-ch-form"
                                                value={location}
                                                maxLength={60}
                                            />
                                    }
                                </div>
                            </div>
                            <hr/>
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

MasterCompany.propTypes = {
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

};

export default withToastManager(MasterCompany)