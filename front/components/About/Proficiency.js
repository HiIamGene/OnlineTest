import React from 'react'
import ProficiencyEdit from "./ProficiencyEdit";
import Detail from './Detail'
import { Collapse, Form, Row, Col, Input, Label, Button, FormGroup } from 'reactstrap'
import PlusButton from './PlusButton'
import CreateNewDataModal from './CreateNewDataModal'
import axios from 'axios'
import dayjs from 'dayjs'
import { compose } from 'recompose'
import { API_MASTER_PROFICIENCY,API_USER_ANOTHERPROFILE_V010001, API_UPLOAD, API_USER_PROFILE_PROFICIENCY } from '../../constant/ENV'
import { withToastManager } from 'react-toast-notifications';
import { _error_handler } from "../../utils/errorHandler";
import { withNamespaces } from "../../lib/i18n"
import CertificateModal from './CertificateModal'
import { connect } from 'react-redux'
import { fetchMasterCountry } from "../../services/utilService";
import { setMasterCountry } from "../../redux/actions/utilAction";
export default compose(withNamespaces("license"), withToastManager, connect(store => {
    return {
        countries: store.utilReducer.countries
    }
}, { setCountry: setMasterCountry }))(class Proficiency extends React.Component {
    static async getInitialProps(ctx) {
        return {
            namespacesRequired: ['license'],
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            onSelectBtn: [true, false, false],
            isMount: false,
            editMode: -1,
            // editMode = -1 showMode
            // editMode = 0 createMode
            // editMode = 1 showMode
            isModalOpen: false,
            isNewModalOpen: false,
            errors: {},
            licenseData: {
                id: -1,
                title: "",
                localName: "",
                imageUrl: "",
                firstSubtitle: "Level 1",
                img: "",
                issueBy: "",
                limitation: "",
                country: "",
                certificateNumber: "",
                issueDate: "",
                expiryDate: "",
                attachDocument: []
            },
            licenses: [],
            editLicenseData: {
                id: -1,
                title: "",
                localName: "",
                imageUrl: "",
                country: "",
                firstSubtitle: "Level 1",
                img: "",
                limitation: "",
                issueBy: "",
                certificateNumber: "",
                issueDate: "",
                expiryDate: "",
                attachDocument: []
            },
            createNewLicenseData: {
                imageUrl: "",
                englishName: "",
                localName: "",
                type: "officer"
            },
            data: []
        }
        this.setEditMode = this.setEditMode.bind(this)
        this.setModalMode = this.setModalMode.bind(this)
        this.onUploadImage = this.onUploadImage.bind(this)
    }
    setModalMode() {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }
    setEditMode(mode) {

        this.setState({ editMode: mode, isNewModalOpen: mode == 0 ? true : false, licenseData: { ...this.state.licenseData, id: -1 } })
    }
    async onDelete(id) {
        try {

            const response = await axios.delete(`${API_USER_PROFILE_PROFICIENCY}/${id}`)
            const index = this.state.data.findIndex(value => value.id == id)

            // this.setState({
            //     data : [
            //         ...this.state.data.slice(0,index),
            //         ...this.state.data.slice(index + 1)
            //     ]
            // })
            // this.props.onChange("proficiency" , this.state.data.length)
            this.fetchProfileProficiency()
        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }
    setLicense(title) {
        const SelectState = this.state.editMode == 0 ? "licenseData" : (this.state.editMode == 1 ? "editLicense" : "")
        this.setState({
            [SelectState]: {
                ...this.state[SelectState],
                imageUrl: "",
                title

            }
        })
    }
    onSelect(id) {
        const index = this.state.licenses.findIndex(value => value.id == id)

        const SelectState = this.state.editMode == 0 ? "licenseData" : (this.state.editMode == 1 ? "editLicense" : "")
        this.setState({
            [SelectState]: {
                ...this.state[SelectState],
                id: this.state.licenses[index].id,
                title: this.state.licenses[index].englishName,
                imageUrl: this.state.licenses[index].imageUrl,
                localName: this.state.licenses[index].localName,

            }
        })
    }
    async onSubmitCreateNewData(e) {
        e.preventDefault()
        try {
            const response = await axios.post(API_MASTER_PROFICIENCY, { type: this.state.createNewLicenseData.type, englishName: this.state.createNewLicenseData.englishName, localName: this.state.createNewLicenseData.localName, imageUrl: this.state.createNewLicenseData.imageUrl })
            const { data } = response
            const { payload } = data



            this.setState({
                licenseData: {
                    ...this.state.licenseData,
                    id: payload.id,
                    title: payload.englishName,
                    imageUrl: this.state.createNewLicenseData.imageUrl,
                    localName: payload.localName
                },
                isModalOpen: !this.state.isModalOpen
            })

        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }

    async componentDidMount() {
        if (this.props.countries.length <= 0) {
            this.props.setCountry(await fetchMasterCountry());
        }
        // const license = !_.isEmpty(this.props.data)  ? this.props.data.map(data=>({
        //     ...data,
        //     name : data.name,
        //     id : data.id,
        //     level : data.level,
        //     limitation : data.limitation,
        //     masterEnglishName : data.masterEnglishName,
        //     masterLocalName  : data.masterLocalName,
        //     certificateNumber : data.certificateNumber,
        //     issueDate : data.issueDate,
        //     expiryDate : data.expiryDate,
        //     imageUrl : data.imageUrl,
        //     attachDocument : data.documentations
        // })) : []

        this.setState({
            isMount: true,
            //     data : [
            //         ...this.state.data,
            //         ...license
            //     ]
        })
        // this.fetchLicense();
        this.fetchProfileProficiency()
    }
    async fetchProfileProficiency() {

        try {
            if (this.props.anotherProfile) {
                const response = await axios.get(API_USER_ANOTHERPROFILE_V010001+this.props.anotherProfileId)
                const { data } = response


                const { payload } = data

                this.setState({ data: payload.proficiency })

                this.props.onChange("proficiency", this.state.data.length)

            }
            else {
                const response = await axios.get(API_USER_PROFILE_PROFICIENCY)
                const { data } = response


                const { payload } = data

                this.setState({ data: payload.cop })

                this.props.onChange("proficiency", this.state.data.length)

            }

        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }
    onChangeDate(name, val, attribute) {
        this.setState({
            [attribute]: {
                ...this.state[attribute],
                [name]: val
            }
        })
    }

    componentDidUpdate(prevProps) {

        // if (this.props.data !== prevProps.data) {   

        //     const license = !_.isEmpty(this.props.data)  ? this.props.data.map(data=>({
        //         ...data,
        //         name : data.name,
        //         id : data.id,
        //         level : data.level,
        //         limitation : data.limitation,
        //         masterEnglishName : data.masterEnglishName,
        //         masterLocalName  : data.masterLocalName,
        //         certificateNumber : data.certificateNumber,
        //         issueDate : data.issueDate,
        //         expiryDate : data.expiryDate,
        //         imageUrl : data.imageUrl,
        //         attachDocument : data.documentations
        //     })) : []

        //     this.setState({
        //         data : [
        //             ...this.state.data,
        //             ...license
        //         ]
        //     })
        //     this.fetchLicense()
        // }
    }
    async fetchLicense(licenseName = "") {

        try {
            const response = await axios.get(API_MASTER_PROFICIENCY, { licenseName: licenseName })

            const { data } = response
            const { payload } = data
            const licenses = !_.isUndefined(payload.proficiency) ? payload.proficiency : []

            this.setState({ licenses })

        }
        catch (err) {
            _error_handler(this.props.toastManager, err)
        }

    }
    onChangeCreateNewData(e) {
        this.setState({
            createNewLicenseData: {
                ...this.state.createNewLicenseData,
                [e.target.name]: e.target.value
            }
        })
    }
    onChange(e, attribute) {
        const { target } = e
        const { name, value } = target
        if(name === 'certificateNumber') {
            for(let i = 0; i < value.length; i++) {
                if(value.charAt(i) < '0' || value.charAt(i) > '9') {
                    return false
                }
            }
        }

        this.setState({
            [attribute]: {
                ...this.state[attribute],
                [e.target.name]: e.target.value
            }
        })


    }
    async onEditSubmit(e) {
        e.preventDefault()
        let errors = this.validate(this.state.editLicenseData)

        this.setState({ errors })

        if (Object.keys(errors) == 0) {
            try {
                // console.log('this.state.editLicenseData' , this.state.editLicenseData)
                const attachDocument = !_.isUndefined(this.state.editLicenseData.attachDocument) ? this.state.editLicenseData.attachDocument.map(data => (
                    data.imageUrl || data.url
                )) : []

                const inputData = [{
                    proficiencyId: this.state.editLicenseData.id,
                    level: " ",
                    country: this.state.editLicenseData.country,
                    certificateNumber: this.state.editLicenseData.certificateNumber,
                    issueDate: new Date(this.state.editLicenseData.issueDate),
                    expiryDate: new Date(this.state.editLicenseData.expiryDate),
                    limitation: this.state.editLicenseData.limitation,
                    issueBy: this.state.editLicenseData.issueBy,
                    attachDocumentation: attachDocument
                }]
                const response = await axios.put(`${API_USER_PROFILE_PROFICIENCY}`, inputData)

                const { data } = response
                const { payload } = data

                const index = this.state.data.findIndex(value => value.id == this.state.editLicenseData.id)
                this.setState({ data: [...this.state.data.slice(0, index), { ...payload[0], attachDocument: this.state.editLicenseData.attachDocument }, ...this.state.data.slice(index + 1)], editMode: -1 })
                this.props.onChange("license", this.state.data.length)

            } catch (err) {
                _error_handler(this.props.toastManager, err)
            }
        }
    }

    _onClickBtnState = (index) => {
        let { onSelectBtn } = this.state
        for(let i = 0;i < onSelectBtn.length; i++) {
            if(i !== index) {
                onSelectBtn[i] = false
            }
            else {
                onSelectBtn[i] = true
            }
        }
        this.setState({
            onSelectBtn: onSelectBtn
        })
    }

    async onSubmit(e) {
        e.preventDefault()
        let errors = this.validate(this.state.licenseData)

        this.setState({ errors })

        if (Object.keys(errors) == 0) {
            try {
                const attachDocument = !_.isUndefined(this.state.licenseData) ? this.state.licenseData.attachDocument.map(data => (
                    data.imageUrl || data.url
                )) : []
                const input = {
                    masterProficiencyId: this.state.licenseData.id,
                    name: this.state.licenseData.title,
                    level: " ",
                    certificateNumber: this.state.licenseData.certificateNumber,
                    issueDate: dayjs(this.state.licenseData.issueDate).format("YYYY-MM-DD"),
                    expiryDate: dayjs(this.state.licenseData.expiryDate).format("YYYY-MM-DD"),
                    limitation: this.state.licenseData.limitation,
                    attachDocumentation: attachDocument
                }
                const response = await axios.post(API_USER_PROFILE_PROFICIENCY, { ...input })
                const { data } = response
                const { payload } = data



                // still doesn't have localName
                this.setState({ data: [...this.state.data, { ...payload.certificateOfProficiency, id: payload.certificateOfProficiency.id, startWorked: payload.certificateOfProficiency.issueDate, endWorked: payload.certificateOfProficiency.expiryDate, certificateNumber: payload.certificateOfProficiency.certificateNumber, imageUrl: payload.certificateOfProficiency.imageUrl, limitation: payload.certificateOfProficiency.limitation, name: payload.certificateOfProficiency.name, level: payload.certificateOfProficiency.level, localName: payload.certificateOfProficiency.localName, attachDocument: this.state.licenseData.attachDocument }], editMode: -1 })
                this.props.onChange("proficiency", this.state.data.length)


            } catch (err) {

                _error_handler(this.props.toastManager, err)
            }
        }
    }
    validate(data) {
        let error = {}

        // if(_.isEmpty(data.title)) error.title = "License Name is invalid"    
        // if(_.isEmpty(data.certificateNumber)) error.certificateNumber = "Certificate Number is invalid"    
        // if(dayjs(data.expiryDate).format("L") != data.expiryDate) error.expiryDate = "Invalid Date"     
        // if(dayjs(data.issueDate).format("L") != data.issueDate) error.issueDate = "Invalid Date"
        if (_.isNull(data.issueDate) || data.issueDate == "") error.issueDate = this.props.t("errorLicenseDate")
        if (_.isNull(data.expiryDate) || data.expiryDate == "") error.expiryDate = this.props.t("errorLicenseDate")
        if (dayjs(data.expiryDate).diff(dayjs(data.issueDate)) < 0) error.expiryDate = "Issue Date must be less than expiry date"
        return error
    }

    onUploadImage(e) {
        let file = e.target.files[0]
        var reader = new FileReader();
        reader.onload = (upload) => {
            this.setState({
                createNewLicenseData: { ...this.state.createNewLicenseData, imageUrl: upload.target.result }
            })

        };
        reader.readAsDataURL(file);
    }
    onUploadImageForProfile(e, attribute) {
        try {
            let files = Array.from(e.target.files)
            const name = e.target.name
            files.map((file) => {
                var reader = new FileReader();
                reader.onload = async (upload) => {



                    const inputData = {
                        file: upload.target.result,
                        path: "certificate/proficiency",

                        device: "WWW"
                    }
                    const response = await axios.post(API_UPLOAD + "/proficiency", { ...inputData })
                    const { data } = response
                    const { payload } = data
                    this.setState({
                        [attribute]: { ...this.state[attribute], [name]: [...this.state[attribute][name], { imageUrl: payload.url, name: file.name }] }
                    })
                }

                reader.readAsDataURL(file);
            })
        }
        catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }

    render() {
        const { errors, licenseData, editLicenseData, editMode, data, isModalOpen, 
                licenses, createNewLicenseData, isNewModalOpen, onSelectBtn } = this.state
        const { t } = this.props
        const anotherProfile = this.props.anotherProfile

        return (
            <div>
                {
                    editMode == -1 ?
                        <div>
                            <div className="about-btn-wrapper">
                                <button 
                                    className={`${onSelectBtn[0] ? 'about-btn-save about-btn-mockup bout-font-nockup-w' : 'about-btn-cancel about-btn-mockup'}`}
                                    onClick={() => this._onClickBtnState(0)}
                                >All</button>
                                <button 
                                    className={`${onSelectBtn[1] ? 'about-btn-save about-btn-mockup bout-font-nockup-w' : 'about-btn-cancel about-btn-mockup'}`}
                                    onClick={() => this._onClickBtnState(1)}
                                >Active</button>
                                <button 
                                    className={`${onSelectBtn[2] ? 'about-btn-save about-btn-mockup bout-font-nockup-w' : 'about-btn-cancel about-btn-mockup'}`}
                                    onClick={() => this._onClickBtnState(2)}
                                >Expired</button>
                            </div>
                            {anotherProfile ?
                                "" :
                                <div><PlusButton text={t("addMoreLicenseButton")} onClick={this.setEditMode.bind(this, 0)} /></div>}
                            {
                                !_.isEmpty(data) ? data.map((value, key) => (
                                    <Detail
                                        dispState={onSelectBtn}
                                        certificate={"proficiency"}
                                        key={key}
                                        data={{
                                            title: value.name,
                                            firstSubtitle: value.certificateNumber,
                                            img: value.imageUrl,
                                            issueDate: value.issueDate,
                                            expiryDate: value.expiryDate,
                                            certificate: true,
                                        }}
                                        onDelete={() => this.onDelete(value.id)}
                                        onEditMode={(data) => this.setState({
                                            editLicenseData: {
                                                ...this.state.editLicenseData,
                                                id: value.id,
                                                limitation: value.limitation,
                                                title: value.name,
                                                englishName: value.masterEnglishName,
                                                localName: value.masterLocalName,
                                                firstSubtitle: value.level,
                                                issueBy: value.issueBy,
                                                certificateNumber: value.certificateNumber,
                                                imageUrl: value.imageUrl,
                                                issueDate: (value.issueDate),
                                                expiryDate: (value.expiryDate),
                                                attachDocument: value.documentation || value.attachDocument || value.documentations
                                            },
                                            editMode: 1
                                        })}
                                        anotherProfile={anotherProfile} />

                                )) : null
                            }
                        </div>
                        :
                        <div>
                            {!this.state.isMount ? null : (<div>
                                <Collapse isOpen={editMode == 1}>
                                    <ProficiencyEdit countries={this.props.countries} certificate={true} onUploadImageForProfile={(e) => this.onUploadImageForProfile(e, 'editLicenseData')} onChangeDate={(name, val) => this.onChangeDate(name, val, "editLicenseData")} t={t} editMode={editMode} onSelect={(val) => this.onSelect(val)} errors={errors} onSubmit={(e) => this.onEditSubmit(e)} openModal={this.setModalMode} setLicense={(value) => this.setLicense(value)} licenses={licenses} onChange={(e) => this.onChange(e, "editLicenseData")} onEditMode={this.setEditMode.bind(this, -1)} licenseData={editLicenseData} />
                                </Collapse>
                            </div>)}

                            <Collapse isOpen={editMode == 0}>
                                <CertificateModal
                                    data={data}
                                    modalTitle={"Certificate of Proficiency"}
                                    //filterData={licenses}
                                    //data={licenseData}
                                    //errors={errors}
                                    addDataToProfile={() => this.fetchProfileProficiency()}
                                    //addDataToProfile={(data)=>this.setState({data : [...this.state.data , ...data ]} , () => this.props.onChange("proficiency" , this.state.data.length))}
                                    type="Proficiency"
                                    API_MASTER={API_MASTER_PROFICIENCY}
                                    API_PROFILE={API_USER_PROFILE_PROFICIENCY}
                                    isOpen={isNewModalOpen}
                                    toggle={() => this.setState({ isNewModalOpen: !isNewModalOpen, editMode: -1 })}
                                />
                                {/* <ProficiencyEdit onUploadImageForProfile={(e)=>this.onUploadImageForProfile(e , 'licenseData')} onChangeDate={(name , val) => this.onChangeDate(name , val , "licenseData" )} t={t} editMode={editMode} onSelect={(val) => this.onSelect(val)}  errors={errors} onSubmit={(e)=> this.onSubmit(e)} openModal={this.setModalMode} setLicense={(value) => this.setLicense(value)} licenses={licenses} onChange={(e)=>this.onChange(e , "licenseData" )}  onEditMode={this.setEditMode.bind(this,-1)} licenseData={licenseData} /> */}
                            </Collapse>
                        </div>

                }
                <CreateNewDataModal imageUrl={createNewLicenseData.imageUrl} onUploadImage={(imageUrl) => this.onUploadImage(imageUrl)} isOpen={isModalOpen} toggle={() => this.setState({ isModalOpen: !this.state.isModalOpen })}>
                    <Form onSubmit={(e) => this.onSubmitCreateNewData(e)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label >{t("createNewMasterLicenseEnglishName")}</Label>
                                    <Input className="about-ch-form" type="text" name="englishName" value={createNewLicenseData.englishName} onChange={(e) => this.onChangeCreateNewData(e)} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label >{t("createNewMasterLicenseThaiName")}</Label>
                                    <Input className="about-ch-form" type="text" name="localName" value={createNewLicenseData.localName} onChange={(e) => this.onChangeCreateNewData(e)} />
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label >{t("masterTypeLicense")}</Label>
                                    <Input className="about-ch-form" type="select" name="type" value={createNewLicenseData.type} onChange={(e) => this.onChangeCreateNewData(e)}>
                                        <option value="officer">Officer</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>

                                <div className="about-compete-btn-group">
                                    <Button className="btn-cancel" onClick={this.setModalMode}>{t("cancelButtonLicense")}</Button>
                                    <Button type="submit" className="btn-save" >{t("saveButtonLicense")}</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </CreateNewDataModal>
            </div>
        )
    }
})