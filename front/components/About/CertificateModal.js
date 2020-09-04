import React from 'react'
import {Modal, ModalHeader, ModalBody, Label, Button, Input, Form, Row, Col, FormFeedback,} from 'reactstrap'
import DropdownInput from './DropdownInput'
import Autocomplete from 'react-autocomplete'
import {faTimesCircle, faPlus, faLink, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import {_error_handler} from "../../utils/errorHandler";
import {
    API_MASTER_LICENSE,
    API_UPLOAD,
    API_MASTER_PROFICIENCY,
    API_MASTER_TRAINING,
    API_GET_CATEGORY
} from '../../constant/ENV'
import axios from 'axios'
import {withToastManager} from 'react-toast-notifications';
import {compose} from 'recompose'
import DatePicker from "react-datepicker";
import cookies from 'js-cookie'
import dayjs from 'dayjs';
import {connect} from 'react-redux';
import {setMasterCountry} from "../../redux/actions/utilAction";
import {fetchMasterCountry} from "../../services/utilService";

class CertificateModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: "",
            addMasterMode: false,
            activeMaster: 'officer',
            uncomplete: false,
            addToProfileMode: -1,
            certificateData: [],
            categoryID: [],
            editCertificateData: [],
            countCertificate : {},
            searchData: [],
            profileData: {
                level: "CLASS 1",
                certificateNumber: "",
                issueDate: null,
                expiryDate: null,
                issueBy: "",
                attachDocument: [],
                issueAuthority: "",
                remark: "",
                country: "thailand",
                files: []
            },
            data: [],
            errors: {},
            masterData: {
                englishName: "",
                localName: "",
                type: "officer",
                category: "",
                attachDocument: []
            },
            highlightonclick:false,
            highlightindex:0
        }
        this.onFetchMaster = this.onFetchMaster.bind(this)
    }

    isFillAll(data) {
        let complete = true
        if (_.isEmpty(data.issueBy) && !(this.props.type == "Training")) complete = false
        if (_.isEmpty(data.certificateNumber)) complete = false        
        if (_.isEmpty(data.issueAuthority) && (this.props.type == "Training")) complete = false
        if (!_.isDate(data.issueDate)) complete = false
        if (!_.isDate(data.expiryDate)) complete = false

        return complete
    }

    selectMaster(keyname, index, data) {
        // console.log('master data  :',this.state.certificateData)
        this.setState({
            certificateData: [
                ...this.state.certificateData,
                {...data , count : (this.state.countCertificate[data.id] || 0) + 1}

            ],
            countCertificate : {
                ...this.state.countCertificate,
                [data.id] : (this.state.countCertificate[data.id] || 0) + 1
            },
            data: {
                ...this.state.data,
                [keyname]: [...this.state.data[keyname].slice(0, index),
                    {...this.state.data[keyname][index], selected: true } ,
                    ...this.state.data[keyname].slice(index + 1)]
            }
        })

    }

    onChangeEditProfile = (e) => {

        const { target } = e
        const { name, value } = target
        if(name === 'certificateNumber') {
            for(let i = 0; i < value.length; i++) {
                if(value.charAt(i) < '0' || value.charAt(i) > '9') {
                    return false
                }
            }
        }
    
        const index = this.state.addToProfileMode
        const complete = this.isFillAll({
            ...this.state.profileData,
            [e.target.name]: e.target.value
        })
        this.setState({
            profileData: {
                ...this.state.profileData,
                [e.target.name]: e.target.value
            },
            editCertificateData: [
                ...this.state.editCertificateData.slice(0, index),
                {
                    ...this.state.profileData, ...this.state.certificateData[index],
                    [e.target.name]: e.target.value,
                    complete
                },
                ...this.state.editCertificateData.slice(index + 1),
            ],
            certificateData: [
                ...this.state.certificateData.slice(0, index),
                {
                    ...this.state.profileData, ...this.state.certificateData[index],
                    [e.target.name]: e.target.value,
                    complete
                },
                ...this.state.certificateData.slice(index + 1),
            ]

        })

    }

    onChangeEditMaster = e => {

        this.setState({
            masterData: {
                ...this.state.masterData,
                [e.target.name]: e.target.value
            }
        })
    }
    onChangeSearch = async value => {
        try {

            let mode = this.props.type == 'Competency' ? "competencyName" : (this.props.type == "Training" ? "trainingName" : "certificateOfProficiencyName")
            this.setState({
                searchText: value,

            })

            const response = await axios.get(this.props.API_MASTER + "?onlyStatic=false&" + mode + "=" + this.state.searchText + "&type=" + this.state.activeMaster)
            const {data} = response
            const {payload} = data

            const result = this.props.type == 'Competency' ? payload.competency : (this.props.type == "Proficiency" ? payload.proficiency : payload.educations)
            this.setState({
                searchData: result
            })
        } catch (err) {
            // _error_handler(this.props.toastManager,err)
        }

    }

    async onFetchMaster() {
        try {

            const response = await axios.get(this.props.API_MASTER + "?onlyStatic=true&type=" + this.state.activeMaster)
            const {data} = response
            const {payload} = data

            if (!_.isUndefined(payload.competency)) {
                const {competency} = payload
                let allCategory = []
                let objectOfCategory = {}
                competency.forEach(data => {

                    if (!(data.category.category in objectOfCategory)) {
                        allCategory.push({'category': data.category.category, 'id': data.category.id})
                        objectOfCategory[data.category.category] = []
                    }

                })
                competency.forEach(data => {
                    objectOfCategory[data.category.category].push(data)
                })


                this.setState({
                    data: objectOfCategory,
                    // categoryID : allCategory,
                    masterData: {
                        ...this.state.masterData,
                        category: !_.isUndefined(allCategory[0]) ? allCategory[0].category : ""
                    }
                })

            } else if (!_.isUndefined(payload.proficiency)) {
                const {proficiency} = payload
                let allCategory = []
                let objectOfCategory = {}

                proficiency.forEach(data => {

                    if (!(data.category.category in objectOfCategory)) {
                        allCategory.push({'category': data.category.category, 'id': data.category.id})
                        objectOfCategory[data.category.category] = []
                    }

                })
                proficiency.forEach(data => {
                    objectOfCategory[data.category.category].push(data)
                })


                this.setState({
                    data: objectOfCategory,
                    // categoryID : allCategory,
                    masterData: {
                        ...this.state.masterData,
                        category: !_.isUndefined(allCategory[0]) ? allCategory[0].category : ""
                    }
                })
            } else if (!_.isUndefined(payload.educations)) {
                const {educations} = payload
                let allCategory = []
                let objectOfCategory = {}
                educations.forEach(data => {

                    if (!(data.category.category in objectOfCategory)) {
                        allCategory.push({'category': data.category.category, 'id': data.category.id})
                        objectOfCategory[data.category.category] = []
                    }

                })
                educations.forEach(data => {
                    objectOfCategory[data.category.category].push(data)
                })


                this.setState({
                    data: objectOfCategory,
                    // categoryID : allCategory,
                    masterData: {
                        ...this.state.masterData,
                        category: !_.isUndefined(allCategory[0]) ? allCategory[0].category : ""
                    }
                })
            }

        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }

    async componentDidMount() {
        if(this.props.countries.length <= 0){
            this.props.setCountry(await fetchMasterCountry());
        }
        this.onFetchMaster()
        try {
            const response = await axios.get(API_GET_CATEGORY + "?categoryType=" + this.props.type.toUpperCase())
            const {data} = response
            const {payload} = data
            const {category} = payload
            const masterData = category.map((value) => {
                return {
                    category: value.category
                }
            })
            // console.log('masterData', masterData)
            this.setState({
                categoryID: masterData,
                masterdata: {
                    ...this.state.data,
                    category: masterData[0].category
                }
            })
        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }

    onSelect = (value, item) => {
        // console.log(item)

        this.setState({
            certificateData: [
                ...this.state.certificateData,
                item,
            ]
        })
    }
    onSubmitSaveMaster = async e => {
        e.preventDefault()

        const errors = this.validateMaster(this.state.masterData)
        this.setState({errors})
        if (Object.keys(errors).length == 0) {
            const categoryID = !_.isUndefined(this.state.data[this.state.masterData.category]) && !_.isUndefined(this.state.data[this.state.masterData.category][0]) ? this.state.data[this.state.masterData.category][0].category.id : ""
            const inputData = {
                "type": this.state.masterData.type,
                "englishName": this.state.masterData.englishName,
                "localName": this.state.masterData.localName,
                "imageUrl": "https://api-dev.crewhitz.com/service/v1/file/certificate/9db0e89c-eb57-47f9-9580-2f7264f25632",
                "category": this.state.masterData.category,
                "isStatic": "false",
                "attachDocumentation": this.state.masterData.attachDocument
            }
            try {
                const response = await axios.post(this.props.API_MASTER, {...inputData})
                const {data} = response
                const {payload} = data
                // console.log(payload)
                this.setState({
                    certificateData: [
                        ...this.state.certificateData,
                        {...payload, category: {category: this.state.masterData.category}}
                    ],
                    addMasterMode: !this.state.addMasterMode
                })
            } catch (err) {
                _error_handler(this.props.toastManager, err)
            }
        }

    }

    validateMaster(data) {
        let errors = {}

        if (_.isEmpty(data.englishName)) errors.englishName = "English name must be fill"
        if (_.isEmpty(data.localName)) errors.localName = "Local name must be fill"
        if (_.isEmpty(data.type)) errors.type = "Type must be select"
        if (_.isEmpty(data.category) && !(this.props.type == "Training")) errors.category = "category must be select"
        return errors
    }

    onChangeDate(value, attribute) {
        const index = this.state.addToProfileMode
        const complete = this.isFillAll({...this.state.profileData,})
        this.setState({
            profileData: {
                ...this.state.profileData,
                [attribute]: value
            },
            editCertificateData: [
                ...this.state.editCertificateData.slice(0, index),
                {
                    ...this.state.profileData, ...this.state.certificateData[index],
                    [attribute]: value,
                    complete
                },
                ...this.state.editCertificateData.slice(index + 1),
            ],
            certificateData: [
                ...this.state.certificateData.slice(0, index),
                {
                    ...this.state.profileData, ...this.state.certificateData[index],
                    [attribute]: value,
                    complete
                },
                ...this.state.certificateData.slice(index + 1),
            ]

        })
    }

    onDelete = data => {
     
        const categoryIndex = this.state.categoryID.findIndex(d => d.category == (data.category.category || data.category))
        const key = !_.isUndefined(this.state.categoryID[categoryIndex]) ? this.state.categoryID[categoryIndex].category : ""
        const index = this.state.certificateData.findIndex(value => value.id == data.id)
        const index_data = !_.isUndefined(this.state.data[key]) ? this.state.data[key].findIndex(value => value.id == (data.id || data.category) ) : -1
     
        if (!_.isUndefined(this.state.data[key]) && !_.isNull(this.state.data[key]) && !_.isEmpty(this.state.data[key])) {
            this.setState({
                certificateData: [
                    ...this.state.certificateData.slice(0, index),
                    ...this.state.certificateData.slice(index + 1)
                ],
                countCertificate : {
                    ...this.state.countCertificate,
                    [data.id] : (this.state.countCertificate[data.id] || 0) - 1
                },
                data: {
                    ...this.state.data,
                    [key]: [
                        ...this.state.data[key].slice(0, index_data),
                        {...this.state.data[key][index_data], selected: false},
                        ...this.state.data[key].slice(index_data + 1),

                    ]
                }

            })
        } else {
            this.setState({
                certificateData: [
                    ...this.state.certificateData.slice(0, index),
                    ...this.state.certificateData.slice(index + 1)
                ],
            })
        }

    }

    onUploadImage(e) {
        try {
            const index = this.state.addToProfileMode
            let files = Array.from(e.target.files)

            files.map((data) => {
                let reader = new FileReader();
                reader.onloadend = async (upload) => {
                    const inputData = {
                        file: upload.target.result,
                        path: "certificate/" + this.props.type,
                        device: "WWW"
                    }
                    const response = await axios.post(API_UPLOAD + "/" + this.props.type, {...inputData})
                    const {data} = response
                    const {payload} = data
                    if (this.state.addToProfileMode != -1) {
                        this.setState({
                            profileData: {
                                ...this.state.profileData,
                                attachDocument: [...this.state.profileData.attachDocument, payload.url],
                                files: [...this.state.profileData.attachDocument, payload.url]
                            },
                            editCertificateData: [
                                ...this.state.editCertificateData.slice(0, index),
                                {
                                    ...this.state.profileData,
                                    attachDocument: [...this.state.profileData.attachDocument, payload.url]
                                },
                                ...this.state.editCertificateData.slice(index + 1),
                            ],
                            certificateData: [
                                ...this.state.certificateData.slice(0, index),
                                {
                                    ...this.state.profileData, ...this.state.certificateData[index],
                                    attachDocument: [...this.state.profileData.attachDocument, payload.url]
                                },
                                ...this.state.certificateData.slice(index + 1),
                            ],

                        })
                    } else {
                        this.setState({
                            masterData: {
                                ...this.state.masterData,
                                attachDocument: [...this.state.masterData.attachDocument, payload.url]
                            }
                        })
                    }


                };
                reader.readAsDataURL(data);
            })
        } catch (err) {
            console.log(err)
            _error_handler(this.props.toastManager, err)
        }

    }

    onClickNext() {
        const mockEditCertificateData = this.state.certificateData.map((data, index) => {
            return {
                level: "CLASS 1",
                certificateNumber: "",
                issueDate: null,
                expiryDate: null,
                issueBy: "",
                issueAuthority: "",
                remark: "",
                // attachDocument : data.attachDocument||data.documentations||data.documentation,
                attachDocument: [],
                complete: false
            }
        })

        this.setState({
            addToProfileMode: 0,
            editCertificateData: mockEditCertificateData,
            profileData: mockEditCertificateData[0],
            masterData: {
                englishName: "",
                localName: "",
                type: "officer",
                category: "",
                attachDocument: []
            }
        })
    }

    completeValidate(data) {
        let uncomplete = []
        uncomplete = data.map(value => {
            if (_.isEmpty(value.certificateNumber)) {
                return true
            } else if (_.isEmpty(value.issueBy) && (this.props.type == "Proficiency" || this.props.type == "Competency")) {
                return true
            } else if (!_.isDate(value.issueDate)) {
                return true
            } else if (!_.isDate(value.expiryDate)) {
                return true
            }
            return false
        })

        return uncomplete
    }

    onSubmitSaveProfile = async (e) => {
        e.preventDefault()
        // const uncomplete = this.completeValidate(this.state.editCertificateData)
        // this.setState({uncomplete :  uncomplete.indexOf(true) != -1 })
        // if(_.isArray(uncomplete) && uncomplete.indexOf(true) == -1 ){
        try {
            // console.log()
            const input = this.props.type != "Training" ? this.state.certificateData.map(data => {
             
                return {
                    name: data.englishName,
                    level: "--",
                    country: data.country ||this.props.countries[0].country,
                    certificateNumber: data.certificateNumber,
                    issueDate: !data.issueDate ? "" : dayjs(data.issueDate).format("YYYY-MM-DD"),
                    expiryDate: !data.expiryDate ? "" : dayjs(data.expiryDate).format("YYYY-MM-DD"),
                    issueBy: data.issueBy,
                    limitation: data.limitation,
                    [this.props.type == "Competency" ? "masterCompetencyId" : (this.props.type == "Proficiency" ? "masterProficiencyId" : "masterTrainingId")]: data.id,
                    attachDocumentation: !_.isEmpty(data.attachDocument) ? [...data.attachDocument] : []
                }
            }) : this.state.certificateData.map(data => (
                {
                    [this.props.type == "Training" ? 'certificateNo' : "certificateNumber"]: data.certificateNumber,
                    issueDate: !data.issueDate ? "" : dayjs(data.issueDate).format("YYYY-MM-DD"),
                    country : data.country ||this.props.countries[0].country,
                    [this.props.type == "Training" ? 'expDate' : "expiryDate"]: !data.expiryDate ? "" : dayjs(data.expiryDate).format("YYYY-MM-DD"),
                    [this.props.type == "Training" ? 'device' : ""]: "",
                    [this.props.type == "Training" ? 'issueAuthority' : ""]: data.issueAuthority + "",
                    [this.props.type == "Competency" ? "issueBy" : (this.props.type == "Proficiency" ? "issueBy" : "remark")]: this.props.type == "Training" ? (!_.isUndefined(data.remark) ? data.remark : "") : data.issueBy + "",
                    [this.props.type == "Competency" ? "masterCompetencyId" : (this.props.type == "Proficiency" ? "masterProficiencyId" : "masterTrainingId")]: data.id,
                    attachDocumentation: !_.isEmpty(data.attachDocument) ? data.attachDocument : []
                }
            ))
            // console.log('input', input)
            const response = await axios.post(this.props.API_PROFILE, [...input])
            const {data} = response
            const {payload} = data
            this.props.addDataToProfile(payload)
            this.props.toggle()
        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
        // }
    }

    render() {
        const {isOpen, toggle, type, data} = this.props;
        const {searchText, masterData, addMasterMode, profileData, searchData, errors, activeMaster, uncomplete ,countCertificate} = this.state
        // console.log(this.state.countCertificate)
        // console.log(this.state.certificateData)
        return (
            <Modal className={"full-width "} size="lg" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle} className="about-compete-modal-header">{this.props.modalTitle}</ModalHeader>
                <ModalBody className="about-compete-modal-body">
                    {
                        uncomplete ?
                            <div className="modal-texalign">
                                <p className="text-danger modal-font-weight">Please fill all your certificate</p>
                            </div>
                            :
                            ""
                    }

                    <div className="about-compete-modal-container-certificate">
                        {
                            this.state.addToProfileMode < 0 ?
                                <div className="about-compete-modal-container-left-certificate">
                                    <div className="about-compete-modal-search">
                                        <Label className="modal-search-label">Search</Label>

                                        <Autocomplete
                                            getItemValue={(item) => item.englishName}
                                            items={searchData}

                                            shouldItemRender={(item, value) => !_.isUndefined(item["englishName"]) ? item["englishName"].toLowerCase().indexOf(value.toLowerCase()) > -1 : item["englishName"]}
                                            value={searchText}
                                            renderItem={(item) => {

                                                return <div className="modal-search-autocomplete1">
                                                    {item.englishName}
                                                </div>
                                            }}
                                            renderInput={props => {
                                                const {ref, ...rest} = props;
                                                return <Input className="about-ch-form about-font-sm modal-search-autocomplete2"
                                                              placeholder={"Find more..."}   {...rest}
                                                              innerRef={ref}
                                                              maxLength={200}
                                                              />
                                            }
                                            }
                                            onChange={(e) => this.onChangeSearch(e.target.value)}
                                            onSelect={(value, item) => this.onSelect(value, item)}
                                            renderMenu={(items, value, style) =>

                                                <div className="modal-search-autocomplete3">
                                                    <div className="modal-search-autocomplete-width" children={items}/>
                                                    <div className="text-gray-1 cr-text-b cr-p-10 about-font-sm-light">
                                                        What you looking is not in the list?
                                                    </div>
                                                    <div className="modal-search-autocomplete4">
                                                        <div className="modal-search-autocomplete5" onClick={
                                                            () => 
                                                                this.setState({
                                                                    addMasterMode: !this.state.addMasterMode,
                                                                    masterData: {
                                                                        ...this.state.masterData,
                                                                        category: !_.isUndefined(this.state.categoryID[0]) ? this.state.categoryID[0].category : ""
                                                                    }
                                                                })
                                                            }
                                                        >
                                                            <FontAwesomeIcon 
                                                                             className="autocomplete5-fontawe" 
                                                                             color={"#3A6DB5"} icon={faPlus}
                                                                             fixedWidth/>
                                                        </div>
                                                        <div>
                                                            <p className="about-font-sm modal-search-autocomplete6-add-more" 
                                                             onClick={() => this.setState({
                                                                addMasterMode: !this.state.addMasterMode,
                                                                masterData: {
                                                                    ...this.state.masterData,
                                                                    category: !_.isUndefined(this.state.categoryID[0]) ? this.state.categoryID[0].category : ""
                                                                }
                                                            })}>Add More Certificate of {this.props.type}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </div>
                                    {
                                        type == "Competency" ?
                                            <div className="modal-search-type-wrap">
                                                <Row>
                                                    <Col md={3} sm={3} xs={3} className="modal-type">
                                                        <div
                                                            className={`about-compete-modal-filter-master-in-certificate about-font-sm-light ${activeMaster == 'rating' ? "about-compete-modal-filter-master-in-certificate-unactive" : ""}`}
                                                            onClick={() => this.setState({activeMaster: "officer"}, () => this.onFetchMaster())}>
                                                            <p>Officer</p>
                                                        </div>
                                                    </Col>
                                                    <Col md={3} sm={3} xs={3} className="modal-type">
                                                        <div
                                                            className={`about-compete-modal-filter-master-in-certificate about-font-sm-light ${activeMaster == 'officer' ? "about-compete-modal-filter-master-in-certificate-unactive" : ""}`}
                                                            onClick={() => this.setState({activeMaster: 'rating'}, () => this.onFetchMaster())}>
                                                            <p>Rating</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            :
                                            ""
                                    }
                                    <div className="modal-select-type-wrap">
                                        {
                                            Object.keys(this.state.data).map((keyname, i) => (
                                                <div className="select-l-type1">
                                                    <div className="select-l-type2 about-font-sm">
                                                        <p className="select-l-type3">{keyname}</p>
                                                    </div>
                                                    <div className="select-l-type4">
                                                        {this.state.data[keyname].map((value, index) => (
                                                            //// console.log(index, value),
                                                            <div
                                                                className={!_.isUndefined(value.selected) && value.selected || countCertificate[value.id] >0  ? "select-l-selecter cr-bg-base-1 " : null}
                                                                onClick={this.selectMaster.bind(this, keyname, index, value)}
                                                                style={{
                                                                    backgroundColor: !_.isUndefined(value.selected) && value.selected  || countCertificate[value.id] >0 ? "#45A88C" : '',
                                                                    color: !_.isUndefined(value.selected) && value.selected  || countCertificate[value.id] >0 ? "white" : "black",
                                                                    padding: "10px 15px",
                                                                    cursor: "pointer",
                                                                    margin: "center",
                                                                    width: "100%",
                                                                    borderBottom: '1px dashed #ccc'
                                                                }}
                                                                >
                                                                <p className="select-l-type3">{value.englishName}</p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                :
                                <div className="about-compete-modal-container-left-certificate about-font-sm-light">
                                    {
                                        this.state.certificateData.map((data, index) =>
                                            <div onClick={() => this.setState({
                                                addToProfileMode: index, profileData: {
                                                    level: this.state.editCertificateData[index].level,
                                                    certificateNumber: this.state.editCertificateData[index].certificateNumber,
                                                    country: this.state.editCertificateData[index].country ||this.props.countries[0].country,
                                                    issueDate: this.state.editCertificateData[index].issueDate,
                                                    expiryDate: this.state.editCertificateData[index].expiryDate,
                                                    issueBy: this.state.editCertificateData[index].issueBy,
                                                    attachDocument: this.state.editCertificateData[index].attachDocument,
                                                    issueAuthority: this.state.editCertificateData[index].issueAuthority,
                                                    remark: this.state.editCertificateData[index].remark,
                                                }
                                            }, () => console.log(this.state.editCertificateData[index]))
                                            }
                                                 className={"about-compete-modal-container-left-certificate " + (this.state.addToProfileMode == index ? "rightCertificateElementActive" : "")}>
                                                
                                                <h5 onClick={()=>{this.setState({
                                                    // highlightonclick:!this.state.highlightonclick,
                                                    highlightindex: index
                                                })}} className={this.state.highlightindex===index ? "about-compete-right-column1 about-compete-right-column1-hl" : "about-compete-right-column1" }>
                                                {`${data.englishName} ${data.count > 1 ? ("("+((data.count)-1)+ ")") : ""}`}
                                                <img className={this.state.highlightindex===index ? "about-compete-right-column1-pic" : "about-compete-right-column1-pic-hide"} src={"/static/images/icon/AW_CrewHitz_ICON-50.png"}/>
                                                </h5>
                                                
                                                {data.complete ? <FontAwesomeIcon //onClick={() => this.onDelete(data)}
                                                                                  className="about-compete-right-column2"
                                                                                   color={"#45A88C"}
                                                                                  icon={faCheckCircle}
                                                                                  fixedWidth/> : ""}

                                            </div>
                                        )
                                    }
                                </div>
                        }

                        <div className="about-compete-modal-container-right-certificate">
                            <div className="about-compete-display-position2">
                                {
                                    this.state.addToProfileMode < 0 ?
                                        <div className="display-border">
                                            <Label className="about-compete-display-position1 about-font-sm"
                                            >{addMasterMode ? "Create Certificate" : "Your Certificate"}</Label>

                                        </div>
                                        :
                                        <div>

                                        </div>
                                }

                                {addMasterMode ? null : (
                                    data && this.state.addToProfileMode < 0 ? (<div className={"cr-mt-10"}>
                                        {data.map((value, key) => {
                                            return <p className={"cr-radius-10 cr-bg-gray-1 cr-p-10 about-font-sm-light2"} key={key}>
                                                <div>{(!_.isEmpty(value.master) ? value.master.englishName : (value.name || value.englishName) ) }</div>

                                            </p>
                                        })}
                                    </div>) : null
                                )}
                                {this.state.certificateData.length <= 0 && !addMasterMode ? (
                                    <div className="text-gray-1 cr-text-b cr-p-20 about-font-sm-light">Please select certificate on left panel.</div>
                                ) : null}
                                {
                                    addMasterMode ? null :
                                        (this.state.addToProfileMode < 0) ? this.state.certificateData.map((data, index) =>
                                                <div className="about-compete-modal-right-certificate-element">
                                                    <h5 className="about-compete-display-result">{`${data.englishName} ${data.count > 1 ? ("("+((data.count)-1)+ ")") : ""}`}</h5>
                                                    <FontAwesomeIcon onClick={() => this.onDelete(data)}
                                                                     className="about-compete-right-column2"
                                                                     color={"rgb(150,150,150)"} icon={faTimesCircle}
                                                                     fixedWidth/>
                                                </div>
                                            )
                                            :
                                            <div>
                                                <Form enctype="multipart/form-data">
                                                    <Row>
                                                        {/* {
                                                !(type == "Training") ?
                                                <Col md={6}>                                            
                                                    <Label>Level</Label>
                                                    <Input type="select" onChange={this.onChangeEditProfile} name="level" >
                                                        <option value="class 1">Class 1</option>
                                                        <option value="class 2">Class 2</option>
                                                        <option value="class 3">Class 3</option>
                                                    </Input>
                                                </Col>
                                                :
                                                ""
                                            }
                                            */}
                                                        <Col md={6}>
                                                            <Label className="about-font-sm-light">Certificate Number</Label>
                                                            <Input value={profileData.certificateNumber}
                                                                   required={true}
                                                                   className="about-font-sm-light"
                                                                   name="certificateNumber"
                                                                   maxLength={27}
                                                                   onChange={this.onChangeEditProfile}/>
                                                        </Col>
                                                        {
                                                            type == "Training" ?
                                                                <Col md={6}>
                                                                    <Label className="about-font-sm-light">Issue Authority</Label>
                                                                    <Input value={profileData.issueAuthority}
                                                                           required
                                                                           className="about-font-sm-light"
                                                                           name="issueAuthority"
                                                                           maxLength={32}
                                                                           onChange={this.onChangeEditProfile}/>
                                                                </Col>
                                                                :
                                                                <Col md={6}>
                                                                    <Label className="about-font-sm-light">Country</Label>
                                                                    <Input type="select"
                                                                           className="about-font-sm-light"
                                                                           onChange={this.onChangeEditProfile}
                                                                           name="country" value={profileData.country}>
                                                                        {this.props.countries.map((country,countryKey)=>{
                                                                            return <option key={countryKey} value={country.country}>{country.country}</option>
                                                                        })}

                                                                    </Input>
                                                                </Col>
                                                        }
                                                    </Row>
                                                    <Row>
                                                        <Col className="about-compete-column-display" md={6}>
                                                            <Label className="about-font-sm-light">Issue Date</Label>
                                                            <DatePicker
                                                                required
                                                                className="about-font-sm-light about-compete-modal-type-edit about-ch-form form-control"
                                                                dateFormat="d/MM/yyyy"
                                                                selected={profileData.issueDate}
                                                                onChange={val => this.onChangeDate(val, "issueDate")}
                                                                maxDate={profileData.expiryDate}
                                                                showDisabledMonthNavigation
                                                                showYearDropdown
                                                                scrollableYearDropdown
                                                                showMonthDropdown
                                                            />
                                                        </Col>
                                                        <Col className="about-compete-column-display" md={6}>
                                                            <Label className="about-font-sm-light">Expiry Date</Label>
                                                            <DatePicker
                                                                required
                                                                className="about-font-sm-light about-compete-modal-type-edit about-ch-form form-control"
                                                                dateFormat="d/MM/yyyy"
                                                                selected={profileData.expiryDate}
                                                                onChange={val => this.onChangeDate(val, "expiryDate")}
                                                                minDate={profileData.issueDate}
                                                                showDisabledMonthNavigation
                                                                showYearDropdown
                                                                scrollableYearDropdown
                                                                showMonthDropdown
                                                            />
                                                        </Col>
                                                    </Row>
                                                    {
                                                        (type == "Training") ?
                                                            <Row>
                                                                  <Col md={6}>
                                                                    <Label className="about-font-sm-light">Country</Label>
                                                                    <Input  type="select"
                                                                            className="about-font-sm-light"
                                                                            onChange={this.onChangeEditProfile}
                                                                            name="country" value={profileData.country}>
                                                                        {this.props.countries.map((country,countryKey)=>{
                                                                            return <option key={countryKey} value={country.country}>{country.country}</option>
                                                                        })}

                                                                    </Input>
                                                                </Col>
                                                            </Row>
                                                            :
                                                            ""
                                                    }

                                                    <Row>
                                                        {
                                                            type == "Training" ?
                                                                <Col md={6}>
                                                                    <Label className="about-font-sm-light">Remark</Label>
                                                                    <Input value={profileData.remark} name="remark"
                                                                            className="about-font-sm-light"
                                                                            maxLength={32}
                                                                            onChange={this.onChangeEditProfile}/>
                                                                </Col>
                                                                :
                                                                <Col md={12}>
                                                                    <Label className="about-font-sm-light">Issue By</Label>
                                                                    <Input value={profileData.issueBy} 
                                                                           required
                                                                           name="issueBy"
                                                                           maxLength={80}
                                                                           className="about-font-sm-light"
                                                                           onChange={this.onChangeEditProfile}/>
                                                                </Col>
                                                        }

                                                    </Row>
                                                    <Row>
                                                        <Col md={10}>
                                                            <div className=" about-compete-modal-display7 about-compete-create-certi-attach about-compete-display-position1">
                                                                <div className="create-certi-dp">
                                                                    <p className=" about-font-sm-light about-compete-display-position1">
                                                                        Attach Document</p>
                                                                    <p className="about-font-sm-light about-compete-display-position1 ">
                                                                        (ไม่เกิน 2 mb)</p>
                                                                </div>
                                                                <div className="create-certi-dp1">
                                                                    <div className="create-certi-dp2">
                                                                        <Input multiple
                                                                               required
                                                                               onChange={(e) => this.onUploadImage(e)}
                                                                               className="create-certi-input" type="file" name="files"/>
                                                                        <FontAwesomeIcon className="about-compete-right-column2" color={"rgb(23,30,74)"} icon={faLink}
                                                                                         fixedWidth/>
                                                                    </div>
                                                                </div>
                                                                <div className="create-certi-dp3">
                                                                    {
                                                                        this.state.profileData.attachDocument ? this.state.profileData.attachDocument.map((data, index) =>
                                                                                <img className="create-certi-dp4"
                                                                                     src={!_.isUndefined(data.url) ? (data.url + "?token=" + cookies.get("token")) : (!_.isUndefined(data.imageUrl) ? (data.imageUrl + "?token=" + cookies.get("token")) : (!_.isUndefined(data) ? (data + "?token=" + cookies.get("token")) : "/static/images/icon/icon_w.png"))}
                                                                                     width="70px" height="70px"/>
                                                                            )
                                                                            :
                                                                            ""
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>


                                            </div>
                                }
                                {
                                    addMasterMode && (this.state.addToProfileMode < 0) ?
                                        <Form className="about-font-sm-light1" onSubmit={(e) => this.onSubmitSaveMaster(e)}>
                                            <div className="text-gray-1 cr-text-b cr-mb-20 about-font-sm-light">
                                                Your new added certificate will take sometime for verification and match.
                                            </div>
                                            <Row>
                                                <Col md={6}>
                                                    <Label className="about-font-sm-light">English Name</Label>
                                                    {
                                                        !_.isUndefined(errors.englishName) ?
                                                            <div>
                                                                <Input invalid value={masterData.englishName}
                                                                       name="englishName"
                                                                       onChange={this.onChangeEditMaster}
                                                                       className="about-font-sm-light"
                                                                       type={'textarea'}
                                                                       rows={1}
                                                                       wrap
                                                                       maxLength={200}
                                                                       />
                                                                <FormFeedback>{errors.englishName}</FormFeedback>
                                                            </div>
                                                            :
                                                            <Input value={masterData.englishName} name="englishName"
                                                                   onChange={this.onChangeEditMaster}
                                                                   maxLength={200}
                                                                   rows={1}
                                                                   type={'textarea'}
                                                                   wrap
                                                                   className="about-font-sm-light"/>
                                                    }
                                                </Col>
                                                <Col md={6}>
                                                    <Label className="about-font-sm-light">Local Name</Label>
                                                    {
                                                        !_.isUndefined(errors.localName) ?
                                                            <div>
                                                                <Input invalid value={masterData.localName}
                                                                       name="localName"
                                                                       className="about-font-sm-light"
                                                                       maxLength={200}
                                                                       type={'textarea'}
                                                                       rows={1}
                                                                       wrap
                                                                       onChange={this.onChangeEditMaster}/>
                                                                <FormFeedback>{errors.localName}</FormFeedback>
                                                            </div>
                                                            :
                                                            <Input value={masterData.localName} name="localName"
                                                                    className="about-font-sm-light"
                                                                    maxLength={200}
                                                                    type={'textarea'}
                                                                    rows={1}
                                                                    wrap
                                                                   onChange={this.onChangeEditMaster}/>
                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
                                                {
                                                    type == "Competency" ?
                                                        <Col md={6}>
                                                            <Label className="about-font-sm-light">Type</Label>
                                                            {
                                                                !_.isUndefined(errors.type) ?
                                                                    <div>
                                                                        <Input invalid  
                                                                            className="about-compete-modal-type-edit about-ch-form about-font-sm-light" type="select"
                                                                               name="type" value={masterData.type}
                                                                               onChange={this.onChangeEditMaster}>
                                                                            <option value="officer">Officer</option>
                                                                            <option value="rating">Rating</option>
                                                                        </Input>
                                                                        <FormFeedback>{errors.type}</FormFeedback>
                                                                    </div>
                                                                    :
                                                                    <Input defaultValue={"officer"} className="about-compete-modal-type-edit about-ch-form about-font-sm-light" type="select"
                                                                           name="type" value={masterData.type}
                                                                           onChange={this.onChangeEditMaster}>
                                                                        <option value="officer">Officer</option>
                                                                        <option value="rating">Rating</option>
                                                                    </Input>
                                                            }

                                                        </Col>
                                                        :
                                                        ""
                                                }

                                                <Col md={6}>
                                                    <Label className="about-font-sm-light">Category</Label>
                                                    {
                                                        !_.isUndefined(errors.category) ?
                                                            <div>
                                                                <Input invalid type="select"
                                                                       onChange={this.onChangeEditMaster}
                                                                       className="about-compete-modal-type-edit about-ch-form about-font-sm-light" name="category"
                                                                       value={masterData.category}>
                                                                    {
                                                                        this.state.categoryID.map(data => (
                                                                            <option
                                                                                value={data.category}>{data.category}</option>
                                                                        ))
                                                                    }
                                                                </Input>
                                                                <FormFeedback>{errors.category}</FormFeedback>
                                                            </div>
                                                            :
                                                            <Input
                                                                defaultValue={!_.isUndefined(this.state.categoryID[0]) ? this.state.categoryID[0].category : ""}
                                                                type="select" onChange={this.onChangeEditMaster}
                                                                className="about-compete-modal-type-edit about-ch-form about-font-sm-light" name="category"
                                                                value={masterData.category}>
                                                                {
                                                                    this.state.categoryID.map(data => (
                                                                        <option
                                                                            value={data.category}>{data.category}</option>
                                                                    ))
                                                                }
                                                            </Input>
                                                    }

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={10}>
                                                    <div className="about-compete-modal-display1 about-compete-modal-3display1-bg">
                                                        <div className="about-compete-modal-display2">
                                                            <p className="about-compete-display-position1 about-font-sm-light">Attach Document</p>
                                                            <p className="about-compete-display-position1 about-font-sm-light">(ไม่เกิน 2 mb)</p>
                                                        </div>
                                                        <div className="about-compete-modal-display2-1">
                                                            <div className="about-compete-modal-display3">
                                                                <Input multiple onChange={(e) => this.onUploadImage(e)}
                                                                       className="about-compete-modal-display4" type="file" name="files"/>
                                                                <FontAwesomeIcon
                                                                    className="about-compete-modal-display5"
                                                                    color={"rgb(23,30,74)"} icon={faLink} fixedWidth/>
                                                            </div>
                                                        </div>
                                                        <div className="create-certi-dp3">
                                                            {
                                                                this.state.masterData.attachDocument ? this.state.masterData.attachDocument.map((data, index) =>
                                                                        <img className="create-certi-dp4" src={data + "?token=" + cookies.get("token")}
                                                                             width="70px" height="70px"/>
                                                                    )
                                                                    :
                                                                    ""
                                                            }
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="about-compete-modal-display6">
                                                        <Button onClick={() => this.setState({
                                                            addMasterMode: !addMasterMode,
                                                            masterData: {
                                                                englishName: "",
                                                                localName: "",
                                                                type: "officer",
                                                                category: "",
                                                                attachDocument: []
                                                            }
                                                        })} type="submit" className="compete-modal-display6">
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="about-compete-modal-display6">
                                                        <Button type="submit" className="compete-modal-display6 about-btn-save">
                                                            Save
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
                                        :
                                        ""
                                }
                                {this.state.addMasterMode || !(this.state.addToProfileMode < 0) ? <hr/> : ""}
                            </div>

                            {addMasterMode ? null :
                                (this.state.addToProfileMode < 0) ?
                                    <div className="about-compete-modal-container-right-certificate-button">
                                        {
                                            this.state.certificateData.length > 0 ?
                                                <div>
                                                    <Button className="about-compete-modal-display7 about-btn-cancel"
                                                            onClick={() => this.setState({certificateData: [] , data : {} , countCertificate : {}}, () => this.onFetchMaster())}>
                                                        Clear All
                                                    </Button>

                                                    <Button className="about-btn-save"
                                                            onClick={() => this.onClickNext()}>
                                                        Next ({this.state.certificateData.length})
                                                    </Button>

                                                </div>
                                                :
                                                ""
                                        }
                                    </div>
                                    :
                                    <div className="about-compete-modal-container-right-certificate-button">
                                        <div>
                                            <Button className="about-compete-modal-display7" onClick={() => this.setState({
                                                addToProfileMode: -1, editCertificateData: [], profileData: {
                                                    level: "CLASS 1",
                                                    certificateNumber: "",
                                                    issueDate: null,
                                                    expiryDate: null,
                                                    issueBy: "",
                                                    attachDocument: [],
                                                },
                                                // certificateData: []
                                            }, () => this.onFetchMaster())}>
                                                Back
                                            </Button>
                                            <Button onClick={(e) => this.onSubmitSaveProfile(e)}
                                                    className="about-btn-save">
                                                Save All
                                            </Button>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

export default compose(withToastManager,connect(store=>{
    return {
        countries: store.utilReducer.countries
    }
},{setCountry: setMasterCountry}))(CertificateModal)