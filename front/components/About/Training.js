import React from 'react'
import TrainingEdit from "./TrainingEdit";
import Detail from './Detail'
import { Collapse, Form, FormGroup, Input, Label, Row, Col, Button } from 'reactstrap'
import PlusButton from './PlusButton'
import CreateNewDataModal from './CreateNewDataModal'
import dayjs from 'dayjs'
import { withNamespaces } from "../../lib/i18n"
import { _error_handler } from '../../utils/errorHandler'
import { withToastManager } from 'react-toast-notifications';
import { compose } from 'recompose'
import _ from 'lodash'
import axios from 'axios'
import CertificateModal from './CertificateModal'
import { API_MASTER_TRAINING,API_USER_ANOTHERPROFILE_V010001, API_USER_PROFILE_TRAINING, API_UPLOAD } from '../../constant/ENV';
import { connect } from 'react-redux'
import { fetchMasterCountry } from "../../services/utilService";
import { setMasterCountry } from "../../redux/actions/utilAction";
export default compose(withNamespaces("training"), withToastManager, connect(store => {
    return {
        countries: store.utilReducer.countries
    }
}, { setCountry: setMasterCountry }))(class Training extends React.Component {
    static async getInitialProps(ctx) {
        return {
            namespacesRequired: ["training"]
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            onSelectBtn: [true, false, false],
            isMount: false,
            editMode: -1,
            isModalOpen: false,
            isNewModalOpen: false,
            errors: {},
            trainingData: {
                id: "",
                title: "",
                firstSubtitle: "",
                imageUrl: "",
                issueAuthority: "",
                certificateNumber: "",
                issueDate: "",
                expiryDate: "",
                country: "thailand",
                remark: "",
                masterTrainingId: "",
                attachDocument: []
            },
            editTrainingData: {
                id: "",
                title: "",
                firstSubtitle: "",
                imageUrl: "",
                issueAuthority: "",
                certificateNumber: "",
                issueDate: "",
                expiryDate: "",
                country: "thailand",
                remark: "",
                masterTrainingId: "",
                attachDocument: []
            },
            trainings: [],
            createNewTrainingData: {
                englishName: "",
                localName: "",
                type: "",
                img: "",
                limitation: "",
                certificateNumber: "",
                issueDate: "",
                expiryDate: "",
                imageUrl: ""
            },
            data: []
        }
    }

    setTraining = async (title) => {
        const selectState = this.state.editMode == 0 ? "trainingData" : (this.state.editMode == 1 ? "editTrainingData" : "")

        this.fetchTraining(title);

        this.setState({
            [selectState]: {
                ...this.state[selectState],
                imageUrl: "",
                title,
                englishName: title,
            }
        })
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
        //     // console.log(this.props.data)
        //     const data = !_.isEmpty(this.props.data) ? this.props.data.map(value => ({
        //         ...value.master,
        //         ...value,
        //         attachDocument: value.documentations
        //     })) : []
        //     this.setState({
        //         data
        //     })
        //     this.fetchTraining()
        // }
    }

    async componentDidMount() {
        if (this.props.countries.length <= 0) {
            this.props.setCountry(await fetchMasterCountry());
        }
        // // console.log(this.props.data)
        // const data = !_.isEmpty(this.props.data) ? this.props.data.map(value => ({
        //     ...value.master,
        //     ...value,
        //     attachDocument: value.documentations
        // })) : []
        this.setState({
            isMount: true,
            //     data
        })
        // this.fetchTraining()
        this.fetchProfileTraining()
    }

    async fetchProfileTraining() {
        try {
            if (this.props.anotherProfile) {
                const response = await axios.get(API_USER_ANOTHERPROFILE_V010001+this.props.anotherProfileId)
                const { data } = response
                const { payload } = data
                // console.log("training" ,payload)
                this.setState({ data: payload.trainings })
                this.props.onChange("training", this.state.data.length)
            }
            else {
                const response = await axios.get(API_USER_PROFILE_TRAINING)
                const { data } = response
                const { payload } = data
                // console.log("training" ,payload)
                this.setState({ data: payload.training })
                this.props.onChange("training", this.state.data.length)
            }

        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }

    }
    async fetchTraining(trainingName = "") {

        try {
            const response = await axios.get(API_MASTER_TRAINING + (trainingName !== "" ? `?trainingName=${trainingName}` : ""))

            const { data } = response
            const { payload } = data
            let trainings = payload.educations

            this.setState({ trainings })

        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }

    }

    async onEditSubmit(e) {
        e.preventDefault()
        // console.log(this.state.editTrainingData)
        const errors = this.validate(this.state.editTrainingData)
        this.setState({ errors })
        if (Object.keys(errors).length == 0) {
            try {
                const attachDocument = !_.isUndefined(this.state.editTrainingData) ? this.state.editTrainingData.attachDocument.map(data => (
                    data.imageUrl || data.url
                )) : []
                const response = await axios.put(`${API_USER_PROFILE_TRAINING}`, [{
                    trainingId: this.state.editTrainingData.id,
                    device: " ",
                    certificateNo: this.state.editTrainingData.certificateNumber,
                    issueDate: (this.state.editTrainingData.issueDate),
                    expDate: (this.state.editTrainingData.expiryDate),
                    issueAuthority: this.state.editTrainingData.issueAuthority,
                    remark: !_.isUndefined(this.state.editTrainingData.remark) && !_.isNull(this.state.editTrainingData.remark) ? this.state.editTrainingData.remark : " ",
                    masterTrainingId: this.state.editTrainingData.masterTrainingId,
                    country: !_.isUndefined(this.state.editTrainingData.country) && !_.isNull(this.state.editTrainingData.country) ? this.state.editTrainingData.country : "thailand",
                    attachDocumentation: attachDocument
                }])
                const index = this.state.data.findIndex(data => data.trainingId == this.state.editTrainingData.trainingId)
                const { data } = response
                const { payload } = data
                this.setState({
                    data: [...this.state.data.slice(0, index), {
                        ...payload[0],
                        id: payload[0].trainingId,
                        trainingId: payload[0].trainingId,
                        masterTrainingId: payload[0].masterTrainingId,
                        imageUrl: payload[0].imageUrl,
                        issueDate: payload[0].issueDate,
                        expiryDate: payload[0].expDate,
                        limitation: payload[0].limitation,
                        certificateNo: payload[0].certificateNo,
                        firstSubtitle: payload[0].certificateNo,
                        englishName: payload[0].englishName,
                        attachDocument: payload[0].documentations
                    }, ...this.state.data.slice(index + 1)], editMode: -1
                })
            } catch (err) {
                _error_handler(this.props.toastManager, err)
            }
        }
    }


    async onSubmit(e) {
        e.preventDefault()
        const errors = this.validate(this.state.trainingData)
        this.setState({ errors })
        if (Object.keys(errors).length == 0) {
            try {
                const attachDocument = !_.isUndefined(this.state.trainingData) ? this.state.trainingData.attachDocument.map(data => (
                    data.imageUrl
                )) : []
                const response = await axios.post(API_USER_PROFILE_TRAINING,
                    {
                        certificateNo: this.state.trainingData.certificateNumber,
                        issueAuthority: this.state.trainingData.issueAuthority,
                        remark: this.state.trainingData.remark,
                        issueDate: new Date(this.state.trainingData.issueDate),
                        expDate: new Date(this.state.trainingData.expiryDate),
                        masterTrainingId: this.state.trainingData.masterTrainingId,
                        attachDocumentation: attachDocument
                    })
                const { data } = response

                const { payload } = data

                this.setState({
                    data: [...this.state.data,
                    {
                        issueAuthority: payload.training.issueAuthority,
                        id: payload.training.trainingId,
                        trainingId: payload.training.trainingId,
                        masterTrainingId: payload.training.masterTrainingId,
                        imageUrl: payload.training.imageUrl,
                        issueDate: payload.training.issueDate,
                        expiryDate: payload.training.expDate,
                        limitation: payload.training.limitation,
                        certificateNo: payload.training.certificateNo,
                        firstSubtitle: payload.training.certificateNo,
                        englishName: payload.training.englishName,
                        localName: payload.training.localName,
                    }], editMode: -1, trainingData: {
                        id: "",
                        title: "",
                        firstSubtitle: "",
                        img: "",
                        limitation: "",
                        certificateNumber: "",
                        issueDate: "",
                        expiryDate: "",
                        remark: "",
                    }
                })
                this.props.onChange("training", this.state.data.length)
            } catch (err) {
                _error_handler(this.props.toastManager, err)
            }
        }

    }

    async onDelete(id) {
        try {
            const repsonse = await axios.delete(`${API_USER_PROFILE_TRAINING}/${id}`)
            let filtered = this.state.data.filter(item => item.trainingId != id)
            this.setState({
                data: filtered
            })
            this.props.onChange("training", this.state.data.length)
        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }

    validate(data) {
        let error = {}
        // console.log(data)
        // if(_.isEmpty(data.title)) error.title = "Certificate Name  is invalid"    
        // if(_.isEmpty(data.certificateNumber)) error.certificateNumber = "Certificate Number is invalid"    
        // if(_.isEmpty(data.limitation)) error.limitation = "Limitation is invalid"  
        if (_.isNull(data.issueDate) || data.issueDate == "") error.issueDate = this.props.t("errorTrainingDate")
        if (_.isNull(data.expiryDate || data.expDate) || data.expiryDate == "") error.expiryDate = this.props.t("errorTrainingDate")
        // if(dayjs(data.expiryDate).format("L") != data.expiryDate) error.expiryDate = "Invalid Date"     
        // if(dayjs(data.issueDate).format("L") != data.issueDate) error.issueDate = "Invalid Date"
        // if(dayjs(data.expiryDate).diff(dayjs(data.issueDate)) < 0) error.expiryDate = "Issue Date must be less than expiry date"
        return error
    }

    onChange(e) {
        const selectState = this.state.editMode == 0 ? "trainingData" : (this.state.editMode == 1 ? "editTrainingData" : "")

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
            [selectState]: {
                ...this.state[selectState],
                [e.target.name]: e.target.value
            }
        })
    }

    onChangeCreateNewData(e) {
        this.setState({
            createNewTrainingData: {
                ...this.state.createNewTrainingData,
                [e.target.name]: e.target.value
            }
        })
    }

    async onSubmitCreateNewData(e) {
        e.preventDefault()
        try {
            const response = await axios.post(API_MASTER_TRAINING, {
                "englishName": this.state.createNewTrainingData.englishName,
                "localName": this.state.createNewTrainingData.localName,
                "type": !_.isEmpty(this.state.createNewTrainingData.type) ? this.state.createNewTrainingData.type : "Officer",
                "imageUrl": this.state.createNewTrainingData.imageUrl
            })
            const { data } = response
            const { payload } = data
            this.setState({
                trainingData: {
                    ...this.state.trainingData,
                    masterTrainingId: payload.id,
                    title: payload.englishName,
                    localName: payload.localName,
                    imageUrl: payload.imageUrl
                },
                isModalOpen: !this.state.isModalOpen
            })

        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }

    onUploadImage(e) {
        let file = e.target.files[0]
        var reader = new FileReader();
        reader.onload = (upload) => {
            this.setState({
                createNewTrainingData: { ...this.state.createNewTrainingData, imageUrl: upload.target.result }
            })

        };
        reader.readAsDataURL(file);
    }

    onSelect(id) {

        const index = this.state.trainings.findIndex(value => value.id == id)
        const SelectState = this.state.editMode == 0 ? "trainingData" : (this.state.editMode == 1 ? "editTrainingData" : "")
        this.setState({
            [SelectState]: {
                ...this.state[SelectState],
                title: this.state.trainings[index].englishName,
                masterTrainingId: this.state.trainings[index].id,

                imageUrl: this.state.trainings[index].imageUrl,
                localName: this.state.trainings[index].localName,

            }
        })
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
                        path: "certificate/training",

                        device: "WWW"
                    }
                    const response = await axios.post(API_UPLOAD + "/training", { ...inputData })
                    const { data } = response
                    const { payload } = data
                    this.setState({
                        [attribute]: { ...this.state[attribute], [name]: [...this.state[attribute][name], { imageUrl: payload.url, name: file.name }] }
                    })
                }

                reader.readAsDataURL(file);
                // let file = e.target.files[0]
                // var reader = new FileReader();
                // reader.onload = async (upload) => {
                //     const inputData = {
                //         file: upload.target.result,
                //         path: "certificate/training",
                //         device: " "
                //     }
                //     const response = await axios.post(API_UPLOAD + "/training", {...inputData})
                //     const {data} = response
                //     const {payload} = data
                //     // console.log(this.state[attribute])
                //     this.setState({
                //         [attribute]: {
                //             ...this.state[attribute],
                //             ["attachDocument"]: [...this.state[attribute]["attachDocument"], {
                //                 imageUrl: payload.url,
                //                 name: file.name
                //             }]
                //         }
                //     })
                // }

                // reader.readAsDataURL(file);
            })
        }
        catch (err) {
            _error_handler(this.props.toastManager, err)
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

    render() {
        const anotherProfile = this.props.anotherProfile
        const { errors, trainingData, editTrainingData, editMode, onSelectBtn,
                data, createNewTrainingData, trainings, isModalOpen, isNewModalOpen } = this.state
        const { t } = this.props
        // console.log(data)
        console.log(editTrainingData)
        return (
            <div>
                {anotherProfile ?
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
                        {
                            !_.isEmpty(data) ? data.map((value, key) => (
                                <Detail
                                    dispState={onSelectBtn}
                                    certificate={"training"}
                                    key={key}
                                    data={{
                                        title: value.master ? value.master.englishName : value.englishName ? value.englishName : "",
                                        firstSubtitle: value.certificateNo,
                                        issueDate: value.issueDate,
                                        trainingId: value.trainingId,
                                        expiryDate: value.expiryDate || value.expDate,
                                        img: value.imageUrl,
                                        certificate: true,
                                    }}
                                    onDelete={() => this.onDelete(value.trainingId)}
                                    onEditMode={() => {
                                        console.log('value', value); this.setState({
                                            editTrainingData: {
                                                ...editTrainingData,
                                                id: value.trainingId,
                                                title: value.englishName,
                                                trainingId: value.trainingId,
                                                localName: value.localName,
                                                imageUrl: value.imageUrl,
                                                remark: value.remark,
                                                issueAuthority: value.issueAuthority,
                                                firstSubtitle: value.firstSubtitle,
                                                masterTrainingId: value.masterTrainingId,
                                                issueDate: (value.issueDate),
                                                country: value.country,
                                                expiryDate: (value.expiryDate || value.expDate),
                                                certificateNumber: value.certificateNo,
                                                limitation: value.limitation,
                                                attachDocument: value.documentation || value.attachDocument || value.documentations
                                            },
                                            editMode: 1
                                        })
                                    }}
                                    anotherProfile={anotherProfile} />
                            ))
                                :
                                ""
                        }
                    </div>
                    :
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
                                    <PlusButton text={t("addMoreYourCertificate")}
                                        onClick={() => this.setState({ editMode: 0, isNewModalOpen: true })} />
                                    {
                                        !_.isEmpty(data) ? data.map((value, key) => (
                                            <Detail
                                                dispState={onSelectBtn}
                                                certificate={"training"}
                                                key={key}
                                                data={{
                                                    title: value.master ? value.master.englishName : value.englishName ? value.englishName : "",
                                                    firstSubtitle: value.certificateNo,
                                                    issueDate: value.issueDate,
                                                    trainingId: value.trainingId,
                                                    expiryDate: value.expiryDate || value.expDate,
                                                    img: value.imageUrl,
                                                    certificate: true,
                                                }}
                                                onDelete={() => this.onDelete(value.trainingId)}
                                                onEditMode={() => {
                                                    console.log('value', value); this.setState({
                                                        editTrainingData: {
                                                            ...editTrainingData,
                                                            id: value.trainingId,
                                                            title: value.englishName,
                                                            trainingId: value.trainingId,
                                                            localName: value.localName,
                                                            imageUrl: value.imageUrl,
                                                            remark: value.remark,
                                                            issueAuthority: value.issueAuthority,
                                                            firstSubtitle: value.firstSubtitle,
                                                            masterTrainingId: value.masterTrainingId,
                                                            issueDate: (value.issueDate),
                                                            country: value.country,
                                                            expiryDate: (value.expiryDate || value.expDate),
                                                            certificateNumber: value.certificateNo,
                                                            limitation: value.limitation,
                                                            attachDocument: value.documentation || value.attachDocument || value.documentations
                                                        },
                                                        editMode: 1
                                                    })
                                                }}
                                                anotherProfile={anotherProfile} />
                                        ))
                                            :
                                            ""
                                    }
                                </div>
                                :
                                <div>
                                    {!this.state.isMount ? null : (
                                        <div>
                                            <Collapse isOpen={editMode == 1}>
                                                <TrainingEdit certificate={true}
                                                    countries={this.props.countries}
                                                    onUploadImageForProfile={(e) => this.onUploadImageForProfile(e, 'editTrainingData')}
                                                    onChangeDate={(name, val) => this.onChangeDate(name, val, "editTrainingData")}
                                                    t={t} editMode={editMode} onSelect={(val) => this.onSelect(val)}
                                                    onSubmit={(e) => this.onEditSubmit(e)} errors={errors}
                                                    openModal={() => this.setState({ isModalOpen: !isModalOpen })}
                                                    setTraining={(value) => this.setTraining(value)}
                                                    trainings={trainings} onChange={(e) => this.onChange(e)}
                                                    onEditMode={() => this.setState({ editMode: -1 })}
                                                    trainingData={editTrainingData} />
                                            </Collapse>
                                        </div>
                                    )}

                                    <Collapse isOpen={editMode == 0}>
                                        <CertificateModal
                                            data={data}
                                            modalTitle={"Training Certificate"}
                                            //filterData={licenses}
                                            //data={licenseData}
                                            //errors={errors}
                                            addDataToProfile={() => this.fetchProfileTraining()}
                                            //addDataToProfile={(data) => this.setState({data: [...this.state.data, ...data]})}
                                            type="Training"
                                            API_MASTER={API_MASTER_TRAINING}
                                            API_PROFILE={API_USER_PROFILE_TRAINING}
                                            isOpen={isNewModalOpen}
                                            toggle={() => this.setState({ isNewModalOpen: !isNewModalOpen, editMode: -1 })}
                                        />
                                        {/* <TrainingEdit  onUploadImageForProfle={(e)=>this.onUploadImageForProfle(e , 'editTrainingData')} onChangeDate={(name , val) => this.onChangeDate(name , val , "editTrainingData" )} t={t} editMode={editMode} onSelect={(val)=>this.onSelect(val)} onSubmit={(e)=>this.onEditSubmit(e)} errors={errors} openModal={()=>this.setState({isModalOpen : !isModalOpen})} setTraining={(value)=>this.setTraining(value)} trainings={trainings} onChange={(e)=>this.onChange(e)} onEditMode={()=>this.setState({editMode : -1})} trainingData={editTrainingData} /> */}
                                    </Collapse>
                                </div>

                        }
                        <CreateNewDataModal onUploadImage={(e) => this.onUploadImage(e)}
                            imageUrl={createNewTrainingData.imageUrl} isOpen={isModalOpen}
                            toggle={() => this.setState({ isModalOpen: !this.state.isModalOpen })}>
                            <Form onSubmit={(e) => this.onSubmitCreateNewData(e)}>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>{t("createNewMasterTrainingEnglishName")}</Label>
                                            <Input className="about-ch-form" type="text" name="englishName"
                                                value={createNewTrainingData.englishName}
                                                onChange={(e) => this.onChangeCreateNewData(e)} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>{t("createNewMasterTrainingThaiName")}</Label>
                                            <Input className="about-ch-form" type="text" name="localName"
                                                value={createNewTrainingData.localName}
                                                onChange={(e) => this.onChangeCreateNewData(e)} />
                                        </FormGroup>
                                    </Col>
                                </Row>


                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>{t("masterTypeTraining")}</Label>
                                            <Input className="about-ch-form" type="select" name="type"
                                                value={createNewTrainingData.type}
                                                onChange={(e) => this.onChangeCreateNewData(e)}>
                                                <option value="officer">Officer</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>

                                        <div className="about-compete-btn-group">
                                            <Button className="btn-cancel"
                                                onClick={() => this.setState({ isModalOpen: !isModalOpen })}>{t("cancelButtonTraining")}</Button>
                                            <Button type="submit" className="btn-save">{t("saveButtonTraining")}</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </CreateNewDataModal>

                    </div>

                }</div>
        )
    }
})