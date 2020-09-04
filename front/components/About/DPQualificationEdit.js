import React, {Component} from "react";
import {Form, FormGroup, Label, Col, Row, Input, Button} from 'reactstrap'
import {faTimes , faLink} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import PlusButton from './PlusButton'
import DatePicker from "react-datepicker";
import axios from 'axios';
import {API_USER_PROFILE_DP_V010001, API_UPLOAD} from "../../constant/ENV";
import dayjs from 'dayjs';
import {storeAboutDp, fetchAboutDp, updateAboutDp} from "../../services/aboutService";
import {setAboutDp, setAboutDpEdit} from "../../redux/actions/aboutAction";
import {connect} from 'react-redux';
import cookies from 'js-cookie'
export default connect(store => {
    return {
        dp: store.aboutReducer.dp
    }
}, {setAboutDp, setAboutDpEdit})(class DPQualificationEdit extends Component {
    constructor(props) {
        super(props);
        this.__openToggle = this.__openToggle.bind(this);
        this.__inputHandler = this.__inputHandler.bind(this);
        this.__submitHandler = this.__submitHandler.bind(this);
    }

    __openToggle() {
        this.props.setAboutDpEdit({
            mode: "add",//!this.props.dp.mode ? "add" : false,
            certificateNumber: "",
            issueAuthority: "",
            issueDate: "",
            expiryDate: "",
            limitation: "",
            attachDocumentation : [],
            type: this.props.type
        });
    }

    __closeToggle = () => {
        this.props.setAboutDpEdit({
            mode: false,
            certificateNumber: "",
            issueAuthority: "",
            issueDate: "",
            expiryDate: "",
            limitation: "",
            attachDocumentation : [],
            type: this.props.type
        });
    }

    __inputHandler(e) {
        const { target } = e
        const { name, value } = target
        if(name === 'certificateNumber') {
            for(let i = 0; i < value.length; i++) {
                if(value.charAt(i) < '0' || value.charAt(i) > '9') {
                    return false
                }
            }
        }
        
        this.props.setAboutDpEdit({
            ...this.props.dp,
            [e.target.name]: e.target.value
        });
    }

    async __submitHandler(e) {
        e.preventDefault();
        let {dp} = this.props;
        // console.log('dp',dp)
        try {
            if (dp.mode === "add") {
               const attachDocumentation = !_.isUndefined(dp.attachDocumentation) ? dp.attachDocumentation.map(data=>data.url || data.imageUrl) : []
                await storeAboutDp({...dp , attachDocumentation   });
            } else if (dp.mode === "edit") {
               const attachDocumentation = !_.isUndefined(dp.attachDocumentation) ? dp.attachDocumentation.map(data=>data.url || data.imageUrl) : []
                await updateAboutDp({...dp , attachDocumentation  });
            }
            this.__closeToggle();
            this.props.setAboutDp(await fetchAboutDp());
        } catch (e) {
            console.log(e);
        }
    }
    async onUploadImageForProfile(e) {
        try {
            let files = Array.from(e.target.files)            
            files.map((file) => {
                var reader = new FileReader();
                reader.onload = async (upload) => {              
                    const inputData = {
                        file : upload.target.result,
                        path: "certificate/dp",                     
                        device : "WWW"
                    }
                    const response = await axios.post(API_UPLOAD + "/dp" , {...inputData})
                    const {data} = response
                    const {payload} = data
                    this.props.setAboutDpEdit({
                        ...this.props.dp,
                        "attachDocumentation" : [
                            ...this.props.dp["attachDocumentation"],
                            {imageUrl : payload.url, name : payload.name},                              
                        ]
                    });               
                }          
                reader.readAsDataURL(file);
            })} 
        catch (err) {
            // _error_handler(this.props.toastManager, err)
        }
    }

    render() {
        let {dp} = this.props;

        return (
            !dp.mode || this.props.type !== dp.type ? <PlusButton text={this.props.plusText} onClick={this.__openToggle}/> :
                <form onSubmit={this.__submitHandler}>
                    <div className="cr-card personal-font-sm cr-bg-gray-3-background">
                        <Form>
                            <div className="dp-qualification-container-exit-edit">
                                <FontAwesomeIcon onClick={this.__closeToggle}
                                                 className="about-identity-edit-fontawesome"
                                                 color="rgb(100,100,100)" icon={faTimes} size="lg"/>
                            </div>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Certificate Number</Label>
                                        <Input className="about-ch-form about-font-sm-light" type="text" name="certificateNumber"
                                               value={dp.certificateNumber} onChange={this.__inputHandler} maxLength={35}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Issue Authority</Label>
                                        <Input className="about-ch-form about-font-sm-light" type="text" name="issueAuthority"
                                               value={dp.issueAuthority} onChange={this.__inputHandler} maxLength={45}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Issue Date</Label>
                                        <DatePicker
                                            className="about-ch-form form-control about-font-sm-light"
                                            dateFormat="d/MM/yyyy"
                                            selected={dp.issueDate === "" || dp.issueDate == null ? null : new Date(dp.issueDate)}
                                            onChange={value => 
                                                this.__inputHandler({
                                                    target: {
                                                        name: "issueDate",
                                                        value: (value)
                                                    }
                                                })
                                            }
                                            minDate={dp.expiryDate === "" || dp.expiryDate == null ? null : new Date(dp.expiryDate)}
                                            showDisabledMonthNavigation
                                            showYearDropdown
                                            scrollableYearDropdown
                                            showMonthDropdown
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Expiry Date</Label>
                                        <DatePicker
                                            className="about-ch-form form-control about-font-sm-light"
                                            dateFormat="d/MM/yyyy"
                                            selected={dp.expiryDate === "" || dp.expiryDate == null ? null : new Date(dp.expiryDate)}
                                            onChange={value => 
                                                this.__inputHandler({
                                                    target: {
                                                        name: "expiryDate",
                                                        value: (value)
                                                    }
                                                })
                                            }
                                            minDate={dp.issueDate === "" || dp.issueDate == null ? null : new Date(dp.issueDate)}
                                            showDisabledMonthNavigation
                                            showYearDropdown
                                            scrollableYearDropdown
                                            showMonthDropdown
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={8}>
                                    <FormGroup>
                                        <Label>Limitation</Label>
                                        <Input required className="about-ch-form about-font-sm-light" type="text" name="limitation"
                                               value={dp.limitation} onChange={this.__inputHandler} maxLength={65}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={8}>
                                    <FormGroup>
                                    <Label >Attach Document</Label>
                                    <input multiple ref={(e) => this.currRef = e} onClick={(e) => this.onUploadImageForProfile(e)} className="none-display" type="file" name="files"/>
                                    <div className="dp-qualification-attact-document">                        
                                        <div className="about-compete-edit-doc-display" onClick={() => this.currRef.click()}>
                                            <FontAwesomeIcon className="edit-fontawe" color={"rgb(60,102,180)"} icon={faLink} fixedWidth/> 
                                        </div>
                                        <div className="dp-qualification-edit-doc" >  
                                        {
                                            !_.isEmpty(dp.attachDocumentation) ? dp.attachDocumentation.map((data , key) => 
                                            <div className="edit-doc1"  key={key} >                         
                                                <img className="edit-doc2" src={(!_.isUndefined(data.imageUrl) ? (data.imageUrl + "?token=" + cookies.get("token") ) :"" ) || ( !_.isUndefined(data.url) ? (data.url + "?token=" + cookies.get("token")) : "") || (!_.isUndefined(data) ? (data + "?token=" + cookies.get("token")) :"") } />                         
                                            </div>
                                            ) 
                                            : 
                                            ""
                                        }
                                        </div>
                                    </div>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={4} sm={6} className="about-btn-wrapper">
                                    <Button className="about-btn-cancel" onClick={this.__closeToggle} block>Cancel</Button>
                                </Col>
                                <Col md={4} sm={6} className="about-btn-wrapper">
                                    <Button className="about-btn-save" type={"submit"} block >Save</Button>
                                </Col>
                            </Row>


                        </Form>
                    </div>
                </form>
        )
    }
});