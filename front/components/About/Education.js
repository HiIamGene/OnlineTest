import Detail from './Detail'
import EducationEdit from './EducationEdit'
import React from 'react'
import { Collapse, Form, Row, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap'
import CreateNewDataModal from "./CreateNewDataModal";
import PlusButton from './PlusButton'
import axios from 'axios'
import dayjs from 'dayjs'
import cookies from 'js-cookie'
import _ from 'lodash'
import { API_MASTER_EDUCATION, API_USER_PROFILE_EDUCATION, API_UPLOAD ,API_USER_ANOTHERPROFILE_V010001} from '../../constant/ENV'
import { withToastManager } from 'react-toast-notifications';
import { withNamespaces } from "../../lib/i18n"
import { compose } from 'recompose'
import { _error_handler } from '../../utils/errorHandler'

import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoogleMapSearchBar from '../Util/GoogleMapSearchBar'
export default compose(withNamespaces("education"), withToastManager)(class Education extends React.Component {
    static async getInitialProps(ctx) {
        return {
            namespacesRequired: ['education'],
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            isMount: false,
            errorsNew: {},
            editMode: -1,
            isModalOpen: false,
            isMapOpen: false,
            universitys: [],
            errors: {},
            onClickSearch: false,
            educationData: {
                id: -1,
                title: "",
                startWorked: "",
                endWorked: '',
                firstSubtitle: "",
                localName: "",
                img: "",
                majorOillChateter: "Chevron",
                scopeOfWork: "",
                workHere: false,
                city: '',
                country: '',
                description: '',
                masterEducationID: "",
                attachDocument: []

            },
            editEducationData: {
                id: -1,
                title: "",
                startWorked: '',
                endWorked: '',
                firstSubtitle: "",
                localName: "",
                img: "",
                majorOillChateter: "Chevron",
                scopeOfWork: "",
                workHere: false,
                city: '',
                country: '',
                description: '',
                masterEducationID: "",
                attachDocument: []
            },
            createNewUniversityData: {
                englishName: "",
                localName: "",
                city: "",
                country: "",
                description: "",
                imageUrl: "",
                city: ' ',
                country: ' ',
                imageUrl: "",
                description: '',
                masterEducationID: "",
            },
            data: [],
        }
        this.onOpenModal = this.onOpenModal.bind(this)
        this.onEditMode = this.onEditMode.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }
    onChangeDate(name, val, attribute) {
        this.setState({
            [attribute]: {
                ...this.state[attribute],
                [name]: val
            }
        })
    }
    onChangeLocation(val, attribute) {

        this.setState({
            onClickSearch: false,
            [attribute]: {
                ...this.state[attribute],
                country: val
            }
        })
    }
    async onDelete(id) {

        const index = this.state.data.findIndex(x => x.id == id)

        try {
                const response = await axios.delete(API_USER_PROFILE_EDUCATION, { data: { device: "string", idEducation: id } })
                this.setState({
                    data: [
                        ...this.state.data.slice(0, index),
                        ...this.state.data.slice(index + 1)
                    ],
                    educationData: {
                        id: -1,
                        title: "",
                        startWorked: "",
                        endWorked: "",
                        firstSubtitle: "",
                        img: "",
                        majorOillChateter: "Chevron",
                        scopeOfWork: "",
                        workHere: false,
                        attachDocument: []
                    },

                })
                this.props.onChange("education", this.state.data.length)

            
        }
        catch (err) {
            _error_handler(this.props.toastManager, err)
        }

    }

    onEditMode(mode) {
        this.setState({
            editMode: mode,
            editEducationData: {
                id: -1,
                title: "",
                startWorked: "",
                endWorked: "",
                firstSubtitle: "",
                localName: "",
                img: "",
                majorOillChateter: "Chevron",
                scopeOfWork: "",
                workHere: false,
                city: '',
                country: '',
                description: '',
                masterEducationID: "",
                attachDocument: []
            },
            educationData: {
                id: -1,
                title: "",
                startWorked: "",
                endWorked: "",
                firstSubtitle: "",
                localName: "",
                img: "",
                majorOillChateter: "Chevron",
                scopeOfWork: "",
                workHere: false,
                city: '',
                country: '',
                description: '',
                masterEducationID: "",
                attachDocument: []
            }
        })

        // this.setState({ editMode: !this.state.editMode, editMode: mode, educationData: { ...this.state.educationData, id: -1 } })
    }
    onOpenModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }
    componentDidUpdate(prevProps) {

        // if(this.props.data != prevProps.data){

        //     const education = this.props.data.map(data=>({
        //         ...data,
        //         id : data.id,
        //         city: data.master.city,
        //         country: data.master.country,
        //         description: data.master.description,
        //         englishName: data.master.englishName,
        //         imageUrl: data.master.imageUrl,
        //         localName: data.master.localName,
        //         masterEducationID: data.masterEducationID,
        //         firstSubtitle: data.position,
        //         startWorked: data.startWorked,
        //         endWorked: data.endWorked,
        //     }))

        //     this.setState({
        //         data : [...education]
        //     })
        //    this.fetchEducation()
        // }
    }
    componentDidMount() {
        // const education = this.props.data.map(data=>({
        //     ...data,
        //     id : data.id,
        //     city: data.master.city,
        //     country: data.master.country,
        //     description: data.master.description,
        //     englishName: data.master.englishName,
        //     imageUrl: data.master.imageUrl,
        //     localName: data.master.localName,
        //     masterEducationID: data.masterEducationID,
        //     firstSubtitle: data.position,
        //     startWorked: data.startWorked,
        //     endWorked: data.endWorked,
        // }))

        this.setState({
            isMount: true,
            // data : [...education]
        })
        this.fetchEducation()
        this.fetchProfileEducation()
    }

    async fetchProfileEducation() {

        try {
            if (this.props.anotherProfile) {
                let response = await axios.get(API_USER_ANOTHERPROFILE_V010001 + this.props.anotherProfileId)
                const { data } = response
                const { payload } = data
                const education = payload.educations.map(data => (
                    {
                        city: data.educationMaster.city,
                        country: data.educationMaster.country,
                        description: data.educationMaster.description,
                        endWorked: data.educationMaster.endWorked,
                        englishName: data.educationMaster.englishName,
                        id: data.educationMaster.id,
                        imageUrl: data.educationMaster.imageUrl,
                        localName: data.educationMaster.localName,
                        masterEducationID: data.educationMaster.masterEducationID,
                        firstSubtitle: data.educationMaster.position,
                        startWorked: data.educationMaster.startWorked,
                        attachDocument: data.educationMaster.documentations
                    }
                ))
                this.setState({ data: [...education] })
                this.props.onChange("education", this.state.data.length)
            }
            else {
                const response = await axios.get(API_USER_PROFILE_EDUCATION)
                const { data } = response
                const { payload } = data
                const education = payload.education.map(data => (
                    {
                        city: data.city,
                        country: data.country,
                        description: data.description,
                        endWorked: data.endWorked,
                        englishName: data.englishName,
                        id: data.id,
                        imageUrl: data.imageUrl,
                        localName: data.localName,
                        masterEducationID: data.masterEducationID,
                        firstSubtitle: data.position,
                        startWorked: data.startWorked,
                        attachDocument: data.documentations
                    }
                ))

                this.setState({ data: [...education] })
                this.props.onChange("education", this.state.data.length)
            }
        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }
    async fetchEducation(educationName = "") {

        try {
            const response = await axios.get(API_MASTER_EDUCATION, { educationName: educationName })
            const { data } = response
            const { payload } = data
            const newUniversity = payload.educations

            this.setState({ universitys: newUniversity })

        }
        catch (err) {

            _error_handler(this.props.toastManager, err)
        }

    }
    setUniversity(title) {
        this.fetchEducation()
        this.setState({
            educationData: {
                ...this.state.educationData,
                title: title.target.value,
                imageUrl: "",
            }
        })
    }
    async onSubmit(e) {
        e.preventDefault()
        let errors = this.validate(this.state.educationData)

        this.setState({ errors })

        if (Object.keys(errors).length == 0) {
            try {
                const attachDocument = !_.isUndefined(this.state.educationData) ? this.state.educationData.attachDocument.map(data => (
                    data.imageUrl || data.url
                )) : []
                const response = await axios.post(API_USER_PROFILE_EDUCATION, { attachDocumentation: attachDocument, device: " ", work: !_.isEmpty(this.state.educationData.workHere) ? this.state.educationData.workHere : false, startWorked: dayjs(this.state.educationData.startWorked).format("YYYY-MM-DD"), endWorked: dayjs(this.state.educationData.endWorked).format("YYYY-MM-DD"), position: this.state.educationData.firstSubtitle + " ", educationId: this.state.educationData.id })
                const { data } = response
                const { payload } = data
                const { education } = payload
                const { educationName } = payload

                this.setState({
                    data: [...this.state.data, { ...education, attachDocument: [], id: education.id, imageUrl: educationName[0].imageUrl, masterEducationID: education.masterEducationID, firstSubtitle: education.position, startWorked: education.startWorked, endWorked: education.endWorked, englishName: educationName[0].englishName, localName: educationName[0].localName }], editMode: -1,
                    editEducationData: {
                        id: -1,
                        title: "",
                        startWorked: "",
                        endWorked: "",
                        firstSubtitle: "",
                        localName: "",
                        img: "",
                        majorOillChateter: "Chevron",
                        scopeOfWork: "",
                        workHere: false,
                        city: '',
                        country: '',
                        description: '',
                        masterEducationID: "",
                        attachDocument: []
                    },
                    educationData: {
                        id: -1,
                        title: "",
                        startWorked: "",
                        endWorked: "",
                        firstSubtitle: "",
                        localName: "",
                        img: "",
                        majorOillChateter: "Chevron",
                        scopeOfWork: "",
                        workHere: false,
                        city: '',
                        country: '',
                        description: '',
                        masterEducationID: "",
                        attachDocument: []
                    },
                })
                this.fetchProfileEducation()
                this.props.onChange("education", this.state.data.length)

            }
            catch (err) {
                _error_handler(this.props.toastManager, err)
            }
        }

    }
    async onEditSubmit(e) {
        e.preventDefault()
        let errors = this.validate(this.state.editEducationData)

        this.setState({ errors })

        if (Object.keys(errors).length == 0) {
            try {

                const index = this.state.data.findIndex(value => value.id == this.state.editEducationData.id)
                const attachDocument = !_.isUndefined(this.state.editEducationData) ? this.state.editEducationData.attachDocument.map(data => (
                    data.imageUrl || data.url
                )) : []
                const response = await axios.put(`${API_USER_PROFILE_EDUCATION}/${this.state.editEducationData.id}`, { attachDocumentation: attachDocument, device: " ", work: !_.isEmpty(this.state.educationData.workHere) ? this.state.editEducationData.workHere : false, startWorked: dayjs(this.state.editEducationData.startWorked).format("YYYY-MM-DD"), endWorked: dayjs(this.state.editEducationData.endWorked).format("YYYY-MM-DD"), position: this.state.editEducationData.firstSubtitle + " " })

                const { data } = response
                const { payload } = data

                this.setState({
                    data: [
                        ...this.state.data.slice(0, index),
                        {
                            id: payload.education.id,
                            endWorked: payload.education.endWorked,
                            startWorked: payload.education.startWorked,
                            firstSubtitle: payload.education.position,
                            masterEducationID: payload.education.masterEducationID,
                            englishName: payload.educationName[0].englishName,
                            localName: payload.educationName[0].localName,
                            attachDocument: [],
                            imageUrl: payload.educationName[0].imageUrl
                        },
                        ...this.state.data.slice(index + 1)
                    ],
                    editMode: -1,
                    editEducationData: {
                        id: -1,
                        title: "",
                        startWorked: "",
                        endWorked: "",
                        firstSubtitle: "",
                        localName: "",
                        img: "",
                        majorOillChateter: "Chevron",
                        scopeOfWork: "",
                        workHere: false,
                        city: '',
                        country: '',
                        description: '',
                        masterEducationID: "",
                    }
                })
                this.fetchEducation()
            } catch (err) {
                _error_handler(this.props.toastManager, err)
            }
        }
    }
    validate(data) {
        let error = {}

        if (_.isEmpty(data.title)) error.title = this.props.t("errorEducationName")
        // if(_.isEmpty(data.firstSubtitle)) error.firstSubtitle = this.props.t("errorPositionEducation")   
        // if(dayjs(data.endWorked).format("L") != data.endWorked) error.endWorked = this.props.t("errorInvalidDateEducation")   
        // if(dayjs(data.startWorked).format("L") != data.startWorked) error.startWorked = this.props.t("errorInvalidDateEducation")
        if (_.isNull(data.startWorked) || data.startWorked == "") error.startWorked = this.props.t("errorInvalidDateEducation")
        if (_.isNull(data.endWorked) || data.endWorked == "") error.endWorked = this.props.t("errorInvalidDateEducation")
        if (dayjs(data.endWorked).diff(dayjs(data.startWorked)) < 0) error.endWorked = this.props.t("errorInvalidDateEducation")

        return error
    }
    validateNewData(data) {
        let error = {}

        if (_.isEmpty(data.englishName)) error.englishName = this.props.t("errorEnglishName")
        if (_.isEmpty(data.localName)) error.localName = this.props.t("errorLocalName")
        if (_.isEmpty(data.description)) error.description = this.props.t("errorDescription")
        if (_.isEmpty((data.imageUrl))) error.imageUrl = this.props.t("errorImageUrl")
        return error
    }
    onChange(e, attribute) {
        this.setState({
            [attribute]: {
                ...this.state[attribute],
                [e.target.name]: e.target.value
            }
        })
    }
    onChangeCreateNewData(e) {
        this.setState({
            createNewUniversityData: {
                ...this.state.createNewUniversityData,
                [e.target.name]: e.target.value
            }
        })
    }
    onUploadImage(e) {

        try {
            let file = e.target.files[0]
            var reader = new FileReader();

            reader.onload = async (upload) => {
                const inputData = {
                    file: upload.target.result,
                    path: "education",
                    device: " "

                }

                const response = await axios.post(API_UPLOAD + "/education", { ...inputData })
                const { data } = response
                const { payload } = data
                this.setState({
                    createNewUniversityData: { ...this.state.createNewUniversityData, imageUrl: payload.url }
                })

            };
            reader.readAsDataURL(file);

        } catch (err) {

            _error_handler(this.props.toastManager, err)
        }
    }
    onSelect(title) {
        const index = this.state.universitys.findIndex(value => value.id == title)


        this.setState({
            educationData: {
                ...this.state.educationData,
                title: this.state.universitys[index].englishName,
                id: this.state.universitys[index].id,
                imageUrl: this.state.universitys[index].imageUrl,
                localName: this.state.universitys[index].localName,

            }
        })
    }
    async onSubmitCreateNewData(e) {
        e.preventDefault()
        const errorsNew = this.validateNewData(this.state.createNewUniversityData)

        this.setState({ errorsNew })

        if (Object.keys(errorsNew).length == 0) {
            try {
                const response = await axios.post(API_MASTER_EDUCATION, {
                    englishName: this.state.createNewUniversityData.englishName,
                    localName: this.state.createNewUniversityData.localName,
                    city: this.state.createNewUniversityData.city + " ",
                    country: this.state.createNewUniversityData.country,
                    description: this.state.createNewUniversityData.description,
                    imageUrl: this.state.createNewUniversityData.imageUrl
                })
                const { data } = response
                const { payload } = data



                this.setState({
                    educationData: {
                        ...this.state.educationData,
                        id: payload.id,
                        title: payload.englishName,
                        imageUrl: payload.imageUrl,
                        localName: payload.localName

                    },
                    isModalOpen: !this.state.isModalOpen
                })
            } catch (err) {
                _error_handler(this.props.toastManager, err)

            }
        }
    }
    async onUploadImageForProfile(e, attribute) {

        try {
            let files = Array.from(e.target.files)
            const name = e.target.name
            files.map((file) => {
                var reader = new FileReader();
                reader.onload = async (upload) => {


                    const inputData = {
                        file: upload.target.result,
                        path: "education",
                        device: "WWW"
                    }
                    const response = await axios.post(API_UPLOAD + "/education", { ...inputData })
                    const { data } = response
                    const { payload } = data
                    // console.log('attribute' , attribute)
                    // console.log('this.state[attribute]' ,this.state[attribute] )
                    // console.log('name', name)
                    this.setState({
                        [attribute]: {
                            ...this.state[attribute],
                            [name]: [...this.state[attribute][name], { imageUrl: payload.url, name: payload.name }]
                        }
                    })
                }
                reader.readAsDataURL(file);
            })
        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }
    render() {
        const anotherProfile = this.props.anotherProfile
        const { editMode, errorsNew, editEducationData, educationData, errors, universitys, isModalOpen, data, createNewUniversityData } = this.state
        const { t } = this.props
        // console.log('editEducationData',editEducationData)
        // console.log('educationData',educationData)
        return (
            <div>{anotherProfile ?
                <div>
                    {
                        !_.isEmpty(data) ? data.map((value, key) =>
                            <Detail
                                noExpire={true}
                                key={key}
                                anotherProfile={anotherProfile}
                                data={{
                                    title: value.englishName,
                                    firstSubtitle: value.localName,
                                    issueDate: value.startWorked,
                                    expiryDate: value.endWorked,
                                    img: value.imageUrl,
                                }}
                                onDelete={() => this.onDelete(value.id)}
                                onEditMode={(data) => this.setState({
                                    editEducationData: {
                                        ...editEducationData,
                                        id: value.id,
                                        title: value.englishName,
                                        localName: value.localName,
                                        workHere: value.workHere,
                                        masterEducationID: value.masterEducationID,
                                        firstSubtitle: value.firstSubtitle,
                                        imageUrl: value.imageUrl,
                                        endWorked: (value.endWorked),
                                        startWorked: (value.startWorked),
                                        attachDocument: value.attachDocument || []
                                    },
                                    editMode: 1
                                })} />
                        )
                            :
                            ""
                    }
                </div>


                :
                <div>{editMode != -1 && this.state.isMount ?
                    <div>
                        <Collapse isOpen={editMode == 0}>
                            <EducationEdit onUploadImageForProfile={(e) => this.onUploadImageForProfile(e, 'educationData')} onChangeDate={(name, val) => this.onChangeDate(name, val, "educationData")} t={t} onSelect={(val) => this.onSelect(val)} onSubmit={(e) => this.onSubmit(e)} errors={errors} openModal={this.onOpenModal} setUniversity={(value) => this.setUniversity(value)} universitys={universitys} onChange={(e) => this.onChange(e, "educationData")} onEditMode={this.onEditMode.bind(this, -1)} educationData={educationData} editMode={editMode} />
                        </Collapse>
                        <Collapse isOpen={editMode == 1}>
                            <EducationEdit onUploadImageForProfile={(e) => this.onUploadImageForProfile(e, 'editEducationData')} onChangeDate={(name, val) => this.onChangeDate(name, val, "editEducationData")} t={t} onSelect={(val) => this.onSelect(val)} onSubmit={(e) => this.onEditSubmit(e)} errors={errors} openModal={this.onOpenModal} setUniversity={(value) => this.setUniversity(value)} universitys={universitys} onChange={(e) => this.onChange(e, "editEducationData")} onEditMode={this.onEditMode.bind(this, -1)} educationData={editEducationData} editMode={editMode} />
                        </Collapse>
                    </div>
                    :
                    <div>
                        <PlusButton text={t("addMoreEducationButton")} onClick={this.onEditMode.bind(this, 0)} />
                        {
                            !_.isEmpty(data) ? data.map((value, key) =>
                                <Detail
                                    noExpire={true}
                                    key={key}
                                    anotherProfile={anotherProfile}
                                    data={{

                                        title: value.englishName,
                                        firstSubtitle: value.localName,
                                        issueDate: value.startWorked,
                                        expiryDate: value.endWorked,
                                        img: value.imageUrl,
                                    }}
                                    onDelete={() => this.onDelete(value.id)}
                                    onEditMode={(data) => this.setState({
                                        editEducationData: {
                                            ...editEducationData,
                                            id: value.id,
                                            title: value.englishName,
                                            localName: value.localName,
                                            workHere: value.workHere,
                                            masterEducationID: value.masterEducationID,
                                            firstSubtitle: value.firstSubtitle,
                                            imageUrl: value.imageUrl,
                                            endWorked: (value.endWorked),
                                            startWorked: (value.startWorked),
                                            attachDocument: value.attachDocument || []
                                        },
                                        editMode: 1
                                    })} />
                            )
                                :
                                ""
                        }

                        {_.isEmpty(data) ? "" : <hr />}
                    </div>
                }

                    <CreateNewDataModal errorsNew={errorsNew} imageUrl={!_.isEmpty(this.state.createNewUniversityData.imageUrl) ? (this.state.createNewUniversityData.imageUrl + "?token=" + cookies.get("token")) : ""} onUploadImage={(e) => this.onUploadImage(e)} isOpen={isModalOpen} toggle={this.onOpenModal} >
                        <Form onSubmit={(e) => this.onSubmitCreateNewData(e)} >
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="about-education-font-sm">{t("createNewMasterEducationEnglish")}</Label>
                                        {
                                            !_.isEmpty(errorsNew.englishName) ?
                                                <div>
                                                    <Input maxLength={41} className="about-education-font-sm-light" invalid type="text" name="englishName" value={createNewUniversityData.englishName} onChange={(e) => this.onChangeCreateNewData(e)} />
                                                    <FormFeedback>{errorsNew.englishName}</FormFeedback>
                                                </div>
                                                :
                                                <Input maxLength={41} className="about-education-font-sm-light" type="text" name="englishName" value={createNewUniversityData.englishName} onChange={(e) => this.onChangeCreateNewData(e)} />
                                        }
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="about-education-font-sm">{t("createNewMasterEducationLocal")}</Label>
                                        {
                                            !_.isEmpty(errorsNew.localName) ?
                                                <div>
                                                    <Input maxLength={41} className="about-education-font-sm-light" invalid type="text" name="localName" value={createNewUniversityData.localName} onChange={(e) => this.onChangeCreateNewData(e)} />
                                                    <FormFeedback>{errorsNew.localName}</FormFeedback>
                                                </div>
                                                :
                                                <Input maxLength={41} className="about-education-font-sm-light" type="text" name="localName" value={createNewUniversityData.localName} onChange={(e) => this.onChangeCreateNewData(e)} />
                                        }

                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr />
                            <Row form>
                                <Col md={12}>
                                    <div className="about-education-location about-education-font-sm">
                                        <p className="about-education-location-padding ">{t("createNewMasterEducationLocation")}</p>
                                        {
                                            !this.state.onClickSearch ?
                                                <div className="about-education-location-select">
                                                    <p className="about-insert-u">{createNewUniversityData.country}</p>
                                                    <FontAwesomeIcon onClick={() => this.setState({ onClickSearch: !this.state.onClickSearch })} className="about-insert-u2" color="rgb(100,100,100)" icon={faAngleRight} size="lg" />
                                                </div>
                                                :
                                                <Row >
                                                    <Col md={{ size: 12, offset: 2 }}>
                                                        <GoogleMapSearchBar
                                                            className={"about-edu-border about-education-font-sm-light"}
                                                            onChangeLocation={(val) => this.onChangeLocation(val, "createNewUniversityData")}
                                                            value={createNewUniversityData.country}
                                                            maxLength={42}
                                                        />
                                                    </Col>
                                                </Row>
                                        }
                                    </div>
                                </Col>

                            </Row>
                            <hr />
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label className="about-education-font-sm">{t("createNewMasterEducationDescription")}</Label>
                                        {
                                            !_.isEmpty(errorsNew.description) ?
                                                <div>
                                                    <Input className="about-education-font-sm-light" invalid type="textarea" name="description" value={createNewUniversityData.description} onChange={(e) => this.onChangeCreateNewData(e)} />
                                                    <FormFeedback>{errorsNew.description}</FormFeedback>
                                                </div>
                                                :
                                                <Input className="about-education-font-sm-light" type="textarea" name="description" value={createNewUniversityData.description} onChange={(e) => this.onChangeCreateNewData(e)} />
                                        }


                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={{ size: 6, offset: 6 }}>
                                    <div className="about-edu-button-group">
                                        <Button className="edu-cancel" onClick={this.onOpenModal}>{t("cancelButtonEducation")}</Button>
                                        <Button type="submit" className="edu-submit" >{t("saveButtonEducation")}</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>

                    </CreateNewDataModal>
                </div>
            }
            </div>


        )
    }
})