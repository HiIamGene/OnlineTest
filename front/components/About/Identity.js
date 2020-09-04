import React from 'react'
import IdentityDetail from './IdentityDetail'
import PlusCircleButton from './PlusCircleButton'
import IdentityEdit from "./IdentityEdit";
import { Collapse } from 'reactstrap'
import _ from 'lodash'
import dayjs from 'dayjs'
import axios from 'axios';
import { withNamespaces } from "../../lib/i18n"
import { withToastManager } from 'react-toast-notifications';
import { compose } from 'recompose'
import { _error_handler } from '../../utils/errorHandler'
import {
    API_USER_PROFILE_PASSPORT,
    API_USER_PROFILE_SEAMANBOOK,
    API_USER_PROFILE_VISA,
    API_USER_PROFILE_IDCARD,
    API_USER_PROFILE_IDENTITY
} from '../../constant/ENV'
import PlusButton from './PlusButton'

export default compose(withNamespaces("identity"), withToastManager)(class IdentityDocument extends React.Component {
    static async getInitialProps(ctx) {
        return {
            namespacesRequired: ['identity'],
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            isMount: false,
            editIndex: -1,
            errors: {},
            currentDate: new Date(),
            editPassportData: {
                passportNumber: "",
                issueAuthority: "",
                issueDate: "",
                expiryDate: "",
            },
            editSeamanData: {
                seamanBookNumber: "",
                issueAuthority: "",
                issueDate: "",
                expiryDate: "",
            },
            editIdCardData: {
                idCardNumber: "",
                issueAuthority: "",
                issueDate: "",
                expiryDate: "",
            },
            editVisaDocumentData: {
                visaDocumentNumber: "",
                issueAuthority: "",
                issueDate: "",
                expiryDate: "",
            },
            passportData: {
                passportNumber: "",
                issueAuthority: "",
                issueDate: "",
                expiryDate: "",
            },
            seamanData: {
                seamanBookNumber: "",
                issueAuthority: "",
                issueDate: "",
                expiryDate: "",
            },
            idCardData: {
                idCardNumber: "",
                issueAuthority: "",
                issueDate: "",
                expiryDate: "",
            },
            visaDocumentData: {
                visaDocumentNumber: "",
                issueAuthority: "",
                issueDate: "",
                expiryDate: "",
            },

        }
    }

    componentDidMount() {
        // if (this.props.data.passport && this.props.data.seamanbook && this.props.data.idCard && this.props.data.visaDocument) {
        //     this.setState({
        //         isMount: true,
        //         currentDate: (new Date()),
        //         passportData: {
        //             passportNumber: this.props.data.passport.documentNumber,
        //             issueAuthority: this.props.data.passport.issuingAuthority,
        //             issueDate: !_.isEmpty(this.props.data.passport.issueDate) ? (this.props.data.passport.issueDate) : '',
        //             expiryDate: !_.isEmpty(this.props.data.passport.expiryDate) ? (this.props.data.passport.expiryDate) : '',
        //         },
        //         seamanData: {
        //             seamanBookNumber: this.props.data.seamanbook.documentNumber,
        //             issueAuthority: this.props.data.seamanbook.issuingAuthority,
        //             issueDate: !_.isEmpty(this.props.data.seamanbook.issueDate) ? (this.props.data.seamanbook.issueDate) : '',
        //             expiryDate: !_.isEmpty(this.props.data.seamanbook.expiryDate) ? (this.props.data.seamanbook.expiryDate) : '',
        //         },
        //         idCardData: {
        //             idCardNumber: this.props.data.idCard.documentNumber,
        //             issueAuthority: this.props.data.idCard.issuingAuthority,
        //             issueDate: !_.isEmpty(this.props.data.idCard.issueDate) ? (this.props.data.idCard.issueDate) : '',
        //             expiryDate: !_.isEmpty(this.props.data.idCard.expiryDate) ? (this.props.data.idCard.expiryDate) : '',
        //         },
        //         visaDocumentData: {
        //             visaDocumentNumber: this.props.data.visaDocument.documentNumber,
        //             issueAuthority: this.props.data.visaDocument.issuingAuthority,
        //             issueDate: !_.isEmpty(this.props.data.visaDocument.issueDate) ? (this.props.data.visaDocument.issueDate) : '',
        //             expiryDate: !_.isEmpty(this.props.data.visaDocument.expiryDate) ? (this.props.data.visaDocument.expiryDate) : '',
        //         },
        //     })
        // }
        this.fetchIdentity()
    }

    componentDidUpdate(prevProps) {

        if (this.props.data && this.props.data !== prevProps.data) {
            if (this.props.anotherProfile) {

            }
            else {
                this.setState({
                    currentDate: (new Date()),
                    passportData: {
                        passportNumber: this.props.data.passport.documentNumber,
                        issueAuthority: this.props.data.passport.issuingAuthority,
                        issueDate: !_.isEmpty(this.props.data.passport.issueDate) ? (this.props.data.passport.issueDate) : '',
                        expiryDate: !_.isEmpty(this.props.data.passport.expiryDate) ? (this.props.data.passport.expiryDate) : '',
                    },
                    seamanData: {
                        seamanBookNumber: this.props.data.seamanbook.documentNumber,
                        issueAuthority: this.props.data.seamanbook.issuingAuthority,
                        issueDate: !_.isEmpty(this.props.data.seamanbook.issueDate) ? (this.props.data.seamanbook.issueDate) : '',
                        expiryDate: !_.isEmpty(this.props.data.seamanbook.expiryDate) ? (this.props.data.seamanbook.expiryDate) : '',
                    },
                    idCardData: {
                        idCardNumber: this.props.data.idCard.documentNumber,
                        issueAuthority: this.props.data.idCard.issuingAuthority,
                        issueDate: !_.isEmpty(this.props.data.idCard.issueDate) ? (this.props.data.idCard.issueDate) : '',
                        expiryDate: !_.isEmpty(this.props.data.idCard.expiryDate) ? (this.props.data.idCard.expiryDate) : '',
                    },
                    visaDocumentData: {
                        visaDocumentNumber: this.props.data.visaDocument.documentNumber,
                        issueAuthority: this.props.data.visaDocument.issuingAuthority,
                        issueDate: !_.isEmpty(this.props.data.visaDocument.issueDate) ? (this.props.data.visaDocument.issueDate) : '',
                        expiryDate: !_.isEmpty(this.props.data.visaDocument.expiryDate) ? (this.props.data.visaDocument.expiryDate) : '',
                    },
                })
            }

        }
    }

    async fetchIdentity() {
        try {
            if (this.props.anotherProfile) {

            }
            else{
                const response = await axios.get(API_USER_PROFILE_IDENTITY)
                const { data } = response
                const { payload } = data
                const { identityDocument } = payload
                // console.log('identityCount',identityDocument)
                if (!_.isEmpty(identityDocument)) {
                    const indexVisa = identityDocument.IdentityDocuments.findIndex(value => value.type == "VISA_DOCUMENT")
                    const indexIDCard = identityDocument.IdentityDocuments.findIndex(value => value.type == "ID_CARD")
                    const indexSeamanbook = identityDocument.IdentityDocuments.findIndex(value => value.type == "SEAMANBOOK")

                    const indexPassport = identityDocument.IdentityDocuments.findIndex(value => value.type == "PASSPORT")

                    const visaDocumentData = indexVisa != -1 ? {
                        visaDocumentNumber: identityDocument.IdentityDocuments[indexVisa].documentNumber,
                        issueAuthority: identityDocument.IdentityDocuments[indexVisa].issuingAuthority,
                        issueDate: (identityDocument.IdentityDocuments[indexVisa].issueDate),
                        expiryDate: (identityDocument.IdentityDocuments[indexVisa].expiryDate),
                    } : {
                            visaDocumentNumber: "",
                            issueAuthority: "",
                            issueDate: "",
                            expiryDate: ""
                        }

                    const idCardData = indexIDCard != -1 ? {
                        idCardNumber: identityDocument.IdentityDocuments[indexIDCard].documentNumber,
                        issueAuthority: identityDocument.IdentityDocuments[indexIDCard].issuingAuthority,
                        issueDate: (identityDocument.IdentityDocuments[indexIDCard].issueDate),
                        expiryDate: (identityDocument.IdentityDocuments[indexIDCard].expiryDate),
                    } : {
                            idCardNumber: "",
                            issueAuthority: "",
                            issueDate: "",
                            expiryDate: ""
                        }

                    const seamanData = indexSeamanbook != -1 ? {
                        seamanBookNumber: identityDocument.IdentityDocuments[indexSeamanbook].documentNumber,
                        issueAuthority: identityDocument.IdentityDocuments[indexSeamanbook].issuingAuthority,
                        issueDate: (identityDocument.IdentityDocuments[indexSeamanbook].issueDate),
                        expiryDate: (identityDocument.IdentityDocuments[indexSeamanbook].expiryDate),
                    } : {
                            seamanBookNumber: "",
                            issueAuthority: "",
                            issueDate: "",
                            expiryDate: ""
                        }


                    const passportData = indexPassport != -1 ? {
                        passportNumber: identityDocument.IdentityDocuments[indexPassport].documentNumber,
                        issueAuthority: identityDocument.IdentityDocuments[indexPassport].issuingAuthority,
                        issueDate: (identityDocument.IdentityDocuments[indexPassport].issueDate),
                        expiryDate: (identityDocument.IdentityDocuments[indexPassport].expiryDate),
                    } : {
                            passportNumber: "",
                            issueAuthority: "",
                            issueDate: "",
                            expiryDate: ""
                        }

                    this.setState({
                        visaDocumentData,
                        idCardData,
                        seamanData,
                        passportData
                    })

                    this.props.onChange("identity", identityDocument.IdentityDocuments.length)
                }

            }

            } catch (err) {
                _error_handler(this.props.toastManager, err)
            }
            /* 
            this.setState({
                editPassportData ,
                passportData,
                editSeamanData,
                seamanData,
                editIdCardData
                idCardData,            
                editVisaDocumentData,
                visaDocumentData
            })
            */

        }

    onChangeDate(name, val, attribute) {
            this.setState({
                [attribute]: {
                    ...this.state[attribute],
                    [name]: val
                }
            })
        }

        async onSubmit(e, attribute) {
            e.preventDefault()
            let API = ""
            let data = {}
            let errors = {}

            if (attribute == "editPassportData") {
                API = API_USER_PROFILE_PASSPORT
                data = {
                    documentNumber: this.state.editPassportData.passportNumber,
                    issuingAuthority: this.state.editPassportData.issueAuthority,
                    issueDate: new Date(this.state.editPassportData.issueDate),
                    expiryDate: new Date(this.state.editPassportData.expiryDate),
                }
                errors = this.validate(this.state.editPassportData, "passportNumber")
            } else if (attribute == "editSeamanData") {
                API = API_USER_PROFILE_SEAMANBOOK
                data = {
                    documentNumber: this.state.editSeamanData.seamanBookNumber,
                    issuingAuthority: this.state.editSeamanData.issueAuthority,
                    issueDate: new Date(this.state.editSeamanData.issueDate),
                    expiryDate: new Date(this.state.editSeamanData.expiryDate),
                }
                errors = this.validate(this.state.editSeamanData, "seamanBookNumber")
            } else if (attribute == "editIdCardData") {
                API = API_USER_PROFILE_IDCARD
                data = {
                    documentNumber: this.state.editIdCardData.idCardNumber,
                    issuingAuthority: this.state.editIdCardData.issueAuthority,
                    issueDate: new Date(this.state.editIdCardData.issueDate),
                    expiryDate: new Date(this.state.editIdCardData.expiryDate),
                }
                errors = this.validate(this.state.editIdCardData, "idCardNumber")
            } else if (attribute == "editVisaDocumentData") {
                API = API_USER_PROFILE_VISA
                data = {
                    documentNumber: this.state.editVisaDocumentData.visaDocumentNumber,
                    issuingAuthority: this.state.editVisaDocumentData.issueAuthority,
                    issueDate: new Date(this.state.editVisaDocumentData.issueDate),
                    expiryDate: new Date(this.state.editVisaDocumentData.expiryDate),
                }
                errors = this.validate(this.state.editVisaDocumentData, "visaDocumentNumber")
            }

            this.setState({ errors })
            if (Object.keys(errors).length == 0) {
                try {
                    const response = await axios.post(API, { ...data })
                    const responseData = response.data
                    const { payload } = responseData
                    const { identityDocument } = payload
                    switch (attribute) {
                        case "editPassportData":
                            this.setState({
                                passportData: {
                                    passportNumber: identityDocument.showMessage.documentNumber,
                                    issueAuthority: identityDocument.showMessage.issuingAuthority,
                                    issueDate: (identityDocument.showMessage.issueDate),
                                    expiryDate: (identityDocument.showMessage.expiryDate),
                                },
                                editIndex: -1,
                            })
                            break;
                        case "editSeamanData":
                            this.setState({
                                seamanData: {
                                    seamanBookNumber: identityDocument.showMessage.documentNumber,
                                    issueAuthority: identityDocument.showMessage.issuingAuthority,
                                    issueDate: (identityDocument.showMessage.issueDate),
                                    expiryDate: (identityDocument.showMessage.expiryDate),
                                },
                                editIndex: -1,
                            })
                            break;
                        case "editIdCardData":
                            this.setState({
                                idCardData: {
                                    idCardNumber: identityDocument.showMessage.documentNumber,
                                    issueAuthority: identityDocument.showMessage.issuingAuthority,
                                    issueDate: (identityDocument.showMessage.issueDate),
                                    expiryDate: (identityDocument.showMessage.expiryDate),
                                },
                                editIndex: -1
                            })
                            break;
                        case "editVisaDocumentData":
                            this.setState({
                                visaDocumentData: {
                                    visaDocumentNumber: identityDocument.showMessage.documentNumber,
                                    issueAuthority: identityDocument.showMessage.issuingAuthority,
                                    issueDate: (identityDocument.showMessage.issueDate),
                                    expiryDate: (identityDocument.showMessage.expiryDate),
                                },
                                editIndex: -1
                            })
                            break;
                    }
                    // waiting Merge Request

                    this.props.onChange("identity", this.props.totalNumber + 1)
                } catch (err) {
                    _error_handler(this.props.toastManager, err)
                }
            }
        }

        validate(data, title) {
            const error = {}

            if (_.isEmpty(data[title])) {
                switch (title) {
                    case "passportNumber":
                        error[title] = this.props.t("errorPassport");
                        break;
                    case "seamanBookNumber":
                        error[title] = this.props.t("errorSeaman");
                        break;
                    case "idCardNumber":
                        error[title] = this.props.t("errorIdCard");
                        break;
                    case "visaDocumentNumber":
                        error[title] = this.props.t("errorVisaDocumentNumber");
                        break;
                }
            }
            if (_.isEmpty(data.issueAuthority)) error.issueAuthority = this.props.t("errorIssueAuthority")
            // if(dayjs(data.expiryDate).format("L") != data.expiryDate) error.expiryDate = this.props.t("errorExpiryDate")
            // if(dayjs(data.issueDate).format("L") != data.issueDate) error.issueDate =  this.props.t("errorIssueDate")
            if (_.isNull(data.expiryDate) || data.expiryDate == "") error.expiryDate = this.props.t("errorExpiryDate")
            if (_.isNull(data.issueDate) || data.issueDate == "") error.issueDate = this.props.t("errorIssueDate")
            if (dayjs(data.expiryDate).diff(dayjs(data.issueDate)) < 0) error.expiryDate = this.props.t("errorDiffDate")
            return error
        }

        async onDelete(e, attribute) {
            e.preventDefault()

            try {
                if (attribute == "editPassportData") {

                    const response = await axios.delete(API_USER_PROFILE_PASSPORT)
                    this.setState({
                        passportData: {
                            passportNumber: "",
                            issueAuthority: "",
                            issueDate: "",
                            expiryDate: "",
                        }
                    })

                } else if (attribute == "editSeamanData") {

                    const response = await axios.delete(API_USER_PROFILE_SEAMANBOOK)
                    this.setState({
                        seamanData: {
                            seamanBookNumber: "",
                            issueAuthority: "",
                            issueDate: "",
                            expiryDate: "",
                        }
                    })

                } else if (attribute == "editIdCardData") {

                    const response = await axios.delete(API_USER_PROFILE_IDCARD)
                    this.setState({
                        idCardData: {
                            idCardNumber: "",
                            issueAuthority: "",
                            issueDate: "",
                            expiryDate: "",
                        }
                    })

                } else if (attribute == "editVisaDocumentData") {

                    const response = await axios.delete(API_USER_PROFILE_VISA)
                    this.setState({
                        visaDocumentData: {
                            visaDocumentNumber: "",
                            issueAuthority: "",
                            issueDate: "",
                            expiryDate: "",
                        }
                    })


                }


                this.setState({ editIndex: -1 })
            } catch (err) {
                _error_handler(this.props.toastManager, err)
            }
        }

        onChange(e, attribute) {
            const { target } = e
            const { name ,value } = target
            // console.log(name, typeof(name), value.length)
            if(name === 'passportNumber' || name === 'seamanBookNumber' || name === 'idCardNumber' || name === 'visaDocumentNumber') {
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

        __isHasValue(data) {
            let isHasValue = false;
            Object.values(data).forEach((value) => {
                if (value && value !== "") {
                    isHasValue = true;
                }
            });
            return isHasValue;
        }

        render() {
            const anotherProfile = this.props.anotherProfile;
            const { errors, editIndex, currentDate, passportData, seamanData, idCardData, visaDocumentData, editPassportData, editSeamanData, editIdCardData, editVisaDocumentData } = this.state
            const { t } = this.props;
            let isPassportExpire = passportData.expiryDate ? dayjs(passportData.expiryDate).diff(dayjs(), 'day') <= 30 : false;
            let isSeamanBookExpire = seamanData.expiryDate ? dayjs(seamanData.expiryDate).diff(dayjs(), 'day') <= 30 : false;
            let isIdCardExpire = idCardData.expiryDate ? dayjs(idCardData.expiryDate).diff(dayjs(), 'day') <= 30 : false;
            let isVisaDocumentExpire = visaDocumentData.expiryDate ? dayjs(visaDocumentData.expiryDate).diff(dayjs(), 'day') <= 30 : false;
            return (
                <div>
                    {anotherProfile ?




                        <div>
                            <div className={
                                (this.__isHasValue(passportData) || editIndex === 0 ?
                                    "cr-bg-gray-3-background2 cr-card" : "cr-pl-20 cr-pr-20") + " cr-mb-10 " + (isPassportExpire && " cr-card-expire ")
                            }>
                                {this.__isHasValue(passportData) && <IdentityDetail isExpire={isPassportExpire} title={t("passportTitle")} data={[
                                    { label: t("passportNumber"), text: editIndex != 0 ? passportData.passportNumber : "" },
                                    { label: t("issueAuthority"), text: editIndex != 0 ? passportData.issueAuthority : "" },
                                    {
                                        label: t("issueDate"),
                                        text: editIndex != 0 && (passportData.issueDate) != "" ?
                                            dayjs(passportData.issueDate).format("DD/MM/YYYY") : ""
                                    },
                                    {
                                        label: t("expiryDate"), text: editIndex != 0 && (passportData.expiryDate) != "" ?
                                            dayjs(passportData.expiryDate).format("DD/MM/YYYY") : ""
                                    }
                                ]} />}

                            </div>

                        </div>
                        :

                        <div>
                            <div className={
                                (this.__isHasValue(passportData) || editIndex === 0 ?
                                    "cr-bg-gray-3-background2 cr-card" : "cr-pl-20 cr-pr-20") + " cr-mb-10 " + (isPassportExpire && " cr-card-expire ")
                            }>
                                {this.__isHasValue(passportData) && <IdentityDetail isExpire={isPassportExpire} title={t("passportTitle")} data={[
                                    { label: t("passportNumber"), text: editIndex != 0 ? passportData.passportNumber : "" },
                                    { label: t("issueAuthority"), text: editIndex != 0 ? passportData.issueAuthority : "" },
                                    {
                                        label: t("issueDate"),
                                        text: editIndex != 0 && (passportData.issueDate) != "" ?
                                            dayjs(passportData.issueDate).format("DD/MM/YYYY") : ""
                                    },
                                    {
                                        label: t("expiryDate"), text: editIndex != 0 && (passportData.expiryDate) != "" ?
                                            dayjs(passportData.expiryDate).format("DD/MM/YYYY") : ""
                                    }
                                ]} />}
                                {editIndex != 0 &&
                                    <div>
                                        <PlusButton text={t("editPassportButton")} onClick={() => this.setState({
                                            editIndex: 0,
                                            editPassportData: {
                                                ...passportData,
                                                issueDate: (passportData.issueDate) != "" ? (passportData.issueDate) : "",
                                                expiryDate: (passportData.expiryDate) != "" ? (passportData.expiryDate) : ""
                                            }
                                        })} />
                                        {!this.__isHasValue(passportData) && <hr />}
                                    </div>}

                                <Collapse isOpen={editIndex == 0}>
                                    <IdentityEdit
                                        onChangeDate={(name, val) => this.onChangeDate(name, val, "editPassportData")}
                                        onDelete={(e) => this.onDelete(e, "editPassportData")}
                                        errors={errors}
                                        onSubmit={(e, attribute) => this.onSubmit(e, attribute)}
                                        errorAttribute={"passportNumber"}
                                        attribute={"editPassportData"}
                                        onChange={(e, attribute) => this.onChange(e, attribute)}
                                        onEditMode={(index) => this.setState({ editIndex: index, editPassportData: passportData })}
                                        leftUpperLabel={t("passportNumber")}
                                        leftUpperValue={editPassportData.passportNumber}
                                        leftLowerPlaceholder="dd/mm/yyyy"
                                        rightLowerPlaceholder="dd/mm/yyyy"
                                        leftUpperName="passportNumber"
                                        rightUpperLabel={t("issueAuthority")}
                                        rightUpperValue={(editPassportData.issueAuthority)}
                                        rightUpperName="issueAuthority"
                                        leftLowerLabel={t("issueDate")}
                                        leftLowerValue={editPassportData.issueDate}
                                        leftLowerName="issueDate"
                                        rightLowerLabel={t("expiryDate")}
                                        rightLowerValue={editPassportData.expiryDate}
                                        rightLowerName="expiryDate"
                                        currentDate={currentDate}
                                    />
                                </Collapse>
                            </div>
                            <div
                                className={(this.__isHasValue(seamanData) || editIndex === 1 ?
                                    "cr-bg-gray-3-background2 cr-card" : "cr-pl-20 cr-pr-20") + " cr-mb-10" + (isSeamanBookExpire && " cr-card-expire ")
                                }>
                                {this.__isHasValue(seamanData) && <IdentityDetail isExpire={isSeamanBookExpire} title={t("seamanTitle")} data={[{
                                    label: t("seamanNumber"),
                                    text: editIndex != 1 ? seamanData.seamanBookNumber : ""
                                }, {
                                    label: t("issueAuthority"),
                                    text: editIndex != 1 ? seamanData.issueAuthority : ""
                                }, {
                                    label: t("issueDate"),
                                    text: editIndex != 1 && (seamanData.issueDate) != "" ? dayjs(seamanData.issueDate).format("DD/MM/YYYY") : ""
                                }, {
                                    label: t("expiryDate"),
                                    text: editIndex != 1 && (seamanData.expiryDate) != "" ? dayjs(seamanData.expiryDate).format("DD/MM/YYYY") : ""
                                }]} />}

                                {editIndex != 1 && (
                                    <div>
                                        <PlusButton text={t("editSeamanButton")} onClick={() => this.setState({
                                            editIndex: 1,
                                            editSeamanData: {
                                                ...seamanData,
                                                issueDate: !_.isEmpty(seamanData.issueDate) ? (seamanData.issueDate) : "",
                                                expiryDate: !_.isEmpty(seamanData.expiryDate) ? (seamanData.expiryDate) : ""
                                            }
                                        })} />
                                        {!this.__isHasValue(seamanData) && <hr />}
                                    </div>
                                )}
                                <Collapse isOpen={editIndex === 1}>
                                    <IdentityEdit
                                        onChangeDate={(name, val) => this.onChangeDate(name, val, "editSeamanData")}
                                        onDelete={(e) => this.onDelete(e, "editSeamanData")}
                                        errors={errors}
                                        errorAttribute={"seamanBookNumber"}
                                        onSubmit={(e, attribute) => this.onSubmit(e, attribute)}
                                        attribute={"editSeamanData"}
                                        onChange={(e, attribute) => this.onChange(e, attribute)}
                                        onEditMode={(index) => this.setState({ editIndex: index, editSeamanData: seamanData })}
                                        leftUpperLabel={t("seamanNumber")}
                                        leftUpperValue={editSeamanData.seamanBookNumber}
                                        leftUpperName="seamanBookNumber"
                                        rightUpperLabel={t("issueAuthority")}
                                        leftLowerPlaceholder="dd/mm/yyyy"
                                        rightLowerPlaceholder="dd/mm/yyyy"
                                        rightUpperValue={editSeamanData.issueAuthority}
                                        rightUpperName="issueAuthority"
                                        leftLowerLabel={t("issueDate")}
                                        leftLowerValue={editSeamanData.issueDate}
                                        leftLowerName="issueDate"
                                        rightLowerLabel={t("expiryDate")}
                                        rightLowerValue={editSeamanData.expiryDate}
                                        rightLowerName="expiryDate"
                                        currentDate={currentDate}
                                    />

                                </Collapse>
                            </div>
                            <div className={
                                (this.__isHasValue(idCardData) || editIndex === 2 ?
                                    "cr-bg-gray-3-background2 cr-card" : "cr-pl-20 cr-pr-20") + " cr-mb-10" + (isIdCardExpire && " cr-card-expire ")
                            }>

                                {this.__isHasValue(idCardData) && <IdentityDetail isExpire={isIdCardExpire} title={t("idCardTitle")} data={[{
                                    label: t("idCardNumber"),
                                    text: editIndex != 2 ? idCardData.idCardNumber : ""
                                }, {
                                    label: t("issueAuthority"),
                                    text: editIndex != 2 ? idCardData.issueAuthority : ""
                                }, {
                                    label: t("issueDate"),
                                    text: editIndex != 2 && (idCardData.issueDate) != "" ? dayjs(idCardData.issueDate).format("DD/MM/YYYY") : ""
                                }, {
                                    label: t("expiryDate"),
                                    text: editIndex != 2 && (idCardData.issueDate) != "" ? dayjs(idCardData.expiryDate).format("DD/MM/YYYY") : ""
                                }]} />}
                                {editIndex !== 2 && (
                                    <div>
                                        <PlusButton text={t("editIdCardButton")} onClick={() => this.setState({
                                            editIndex: 2,
                                            editIdCardData: {
                                                ...idCardData,
                                                issueDate: !_.isEmpty(idCardData.issueDate) ? (idCardData.issueDate) : "",
                                                expiryDate: !_.isEmpty(idCardData.expiryDate) ? (idCardData.expiryDate) : ""
                                            }
                                        })} />
                                        {!this.__isHasValue(idCardData) && <hr />}
                                    </div>
                                )}
                                <Collapse isOpen={editIndex == 2}>
                                    <IdentityEdit
                                        onChangeDate={(name, val) => this.onChangeDate(name, val, "editIdCardData")}
                                        onDelete={(e) => this.onDelete(e, "editIdCardData")}
                                        errors={errors}
                                        onSubmit={(e, attribute) => this.onSubmit(e, attribute)}
                                        errorAttribute={"idCardNumber"}
                                        attribute={"editIdCardData"}
                                        onChange={(e, attribute) => this.onChange(e, attribute)}
                                        onEditMode={(index) => this.setState({ editIndex: index, editIdCardData: idCardData })}
                                        leftUpperLabel={t("idCardNumber")}
                                        leftUpperValue={editIdCardData.idCardNumber}
                                        leftUpperName="idCardNumber"
                                        leftLowerPlaceholder="dd/mm/yyyy"
                                        rightLowerPlaceholder="dd/mm/yyyy"
                                        rightUpperLabel={t("issueAuthority")}
                                        rightUpperValue={editIdCardData.issueAuthority}
                                        rightUpperName="issueAuthority"
                                        leftLowerLabel={t("issueDate")}
                                        leftLowerValue={editIdCardData.issueDate}
                                        leftLowerName="issueDate"
                                        rightLowerLabel={t("expiryDate")}
                                        rightLowerValue={editIdCardData.expiryDate}
                                        rightLowerName="expiryDate"
                                        currentDate={currentDate}
                                    />
                                </Collapse>
                            </div>
                            <div className={
                                (this.__isHasValue(visaDocumentData) || editIndex === 3 ?
                                    "cr-bg-gray-3-background2 cr-card" : "cr-pl-20 cr-pr-20") + " cr-mb-10" + (isVisaDocumentExpire && " cr-card-expire ")
                            }>

                                {this.__isHasValue(visaDocumentData) && <IdentityDetail isExpire={isVisaDocumentExpire} title={t("visaDocumentTitle")} data={[{
                                    label: t("visaDocumentNumber"),
                                    text: editIndex != 3 ? visaDocumentData.visaDocumentNumber : ""
                                }, {
                                    label: t("issueAuthority"),
                                    text: editIndex != 3 ? visaDocumentData.issueAuthority : ""
                                }, {
                                    label: t("issueDate"),
                                    text: editIndex != 3 && (visaDocumentData.issueDate) != "" ? dayjs(visaDocumentData.issueDate).format("DD/MM/YYYY") : ""
                                }, {
                                    label: t("expiryDate"),
                                    text: editIndex != 3 && (visaDocumentData.expiryDate) != "" ? dayjs(visaDocumentData.expiryDate).format("DD/MM/YYYY") : ""
                                }]} />}
                                {editIndex != 3 &&
                                    <div>
                                        <PlusButton text={t("editPassportButton")} onClick={() => this.setState({
                                            editIndex: 3,
                                            editVisaDocumentData: {
                                                ...visaDocumentData,
                                                issueDate: !_.isEmpty(visaDocumentData.issueDate) ? (visaDocumentData.issueDate) : "",
                                                expiryDate: !_.isEmpty(visaDocumentData.expiryDate) ? (visaDocumentData.expiryDate) : ""
                                            }
                                        })} />
                                        {!this.__isHasValue(visaDocumentData) && <hr />}
                                    </div>
                                }
                                <Collapse isOpen={editIndex === 3}>
                                    <IdentityEdit
                                        onChangeDate={(name, val) => this.onChangeDate(name, val, "editVisaDocumentData")}
                                        onDelete={(e) => this.onDelete(e, "editVisaDocumentData")}
                                        errors={errors}
                                        onSubmit={(e, attribute) => this.onSubmit(e, attribute)}
                                        attribute={"editVisaDocumentData"}
                                        errorAttribute={"visaDocumentNumber"}
                                        onChange={(e, attribute) => this.onChange(e, attribute)}
                                        onEditMode={(index) => this.setState({
                                            editIndex: index,
                                            editVisaDocumentData: visaDocumentData
                                        })}
                                        leftUpperLabel={t("visaDocumentTitle")}
                                        leftUpperValue={editVisaDocumentData.visaDocumentNumber}
                                        leftUpperName="visaDocumentNumber"
                                        rightUpperLabel={t("issueAuthority")}
                                        rightUpperValue={editVisaDocumentData.issueAuthority}
                                        rightUpperName="issueAuthority"
                                        leftLowerLabel={t("issueDate")}
                                        leftLowerValue={editVisaDocumentData.issueDate}
                                        leftLowerName="issueDate"
                                        rightLowerLabel={t("expiryDate")}
                                        rightLowerValue={editVisaDocumentData.expiryDate}
                                        rightLowerName="expiryDate"
                                        currentDate={currentDate}
                                    />
                                </Collapse>
                            </div>
                        </div>
                    }
                </div>
            )
        }
    })