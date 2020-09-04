import React from 'react'
import { Collapse } from 'reactstrap'
import PersonalDetail from './PersonalDetail'
import PlusButton from './PlusButton'
import PersonalEdit from './PersonalEdit'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import axios from 'axios'
import _ from 'lodash'
import { compose } from 'recompose'
import { withNamespaces } from "../../lib/i18n"
import { _error_handler } from '../../utils/errorHandler'
import { API_USER_PROFILE, API_USER_PROFILE_V010001, API_USER_ANOTHERPROFILE_V010001 } from '../../constant/ENV'
import { withToastManager } from 'react-toast-notifications';
import { fetchProfile } from '../../redux/actions/profileAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Desktop, Mobile } from "../Responsive";
import { getCalendar } from "../../services/personalService";
import AvailableDayItem from "./AvailableDayItem";
import { setCalendar } from "../../redux/actions/personalAction";
import { setMasterNationality } from "../../redux/actions/utilAction";
import { fetchMasterNationality } from "../../services/utilService";

import AvailableDate from "./AvailableDate";

export default compose(withNamespaces(["personal"]), withToastManager, connect(store => {
    return {
        calendars: store.personalReducer.calendars,
        nationalities: store.utilReducer.nationalities
    }
}, { fetchProfile, setCalendar, setMasterNationality }))(class Personal extends React.Component {
    static async getInitialProps(ctx) {
        return {
            namespacesRequired: ['personal'],
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            isMount: false,
            editMode: false,
            personalData: {
                name: "",
                surname: '',
                displayName: '',
                emailAccount: '',
                password: "",
                nationality: '',
                dateOfBirth: null,
                currentLocation: '',
                contactNumber: '',
                calendar: null,
                currentDate: new Date(),
            },
            editData: {
                name: "",
                surname: "",
                displayName: "",
                emailAccount: "",
                password: "",
                nationality: "",
                dateOfBirth: "",
                currentLocation: "bangkok",
                contactNumber: " ",
                currentDate: new Date(),
            },
            errors: {},
            calendars: []
        }
        this.onEditMode = this.onEditMode.bind(this)
    }

    onChangeLocation(val, attribute) {
        console.log('location', val)
        this.setState({
            [attribute]: {
                ...this.state[attribute],
                currentLocation: val
            }
        })
    }

    onChangeDate(name, val, attribute) {
        // console.log(name, val, attribute)
        this.setState({
            [attribute]: {
                ...this.state[attribute],
                [name]: val
            }
        })
    }

    componentDidUpdate(prevProps) {

        if (this.props.data !== prevProps.data) {

            this.setState({
                personalData: {
                    ...this.state.personalData,
                    name: this.props.data.name,
                    surname: this.props.data.surname,
                    displayName: this.props.data.displayName,
                    emailAccount: this.props.data.email,
                    password: "",
                    nationality: this.props.data.nationality,
                    dateOfBirth: !_.isEmpty(this.props.data.dateOfBirth) ? (this.props.data.dateOfBirth) : null,
                    currentLocation: this.props.data.currentLocation,
                    contactNumber: this.props.data.contactNumber,
                    calendar: !_.isEmpty(this.props.data.calendar) ? (this.props.data.calendar) : null,
                }
            })
        }
    }

    async componentDidMount() {
        try {
            this.props.setCalendar(await getCalendar());
            if (this.props.nationalities.length <= 0) {
                this.props.setMasterNationality(await fetchMasterNationality());
            }
            this.setState({
                isMount: true,
                personalData: {
                    ...this.state.personalData,
                    name: this.props.data.name,
                    surname: this.props.data.surname,
                    displayName: this.props.data.displayName,
                    emailAccount: this.props.data.email,
                    password: "",
                    nationality: this.props.data.nationality,
                    dateOfBirth: !_.isEmpty(this.props.data.dateOfBirth) ? (this.props.data.dateOfBirth) : null,
                    currentLocation: this.props.data.currentLocation,
                    contactNumber: this.props.data.contactNumber,
                    calendar: !_.isEmpty(this.props.data.calendar) ? (this.props.data.calendar) : null,
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    onEditMode() {
        this.setState({ editMode: !this.state.editMode })
    }

    onChange(e) {
        const { name, value } = e.target
        if(name === 'contactNumber') {
            for(let i = 0; i < value.length; i++) {
                if(value.charAt(i) < '0' || value.charAt(i) > '9') {
                    return false
                }
            }
        }
        this.setState({
            editData: {
                ...this.state.editData,
                [e.target.name]: e.target.value
            }
        })

    }

    async fetchUserData() {
        try {

            if (this.props.anotherProfile) {

            }
            else {
                //this.response = await axios.get(API_USER_ANOTHERPROFILE_V010001 +this.props.anotherProfileId)
                const response = await axios.get(API_USER_PROFILE_V010001)
                const { data } = response
                const { payload } = data
                const personalData = payload.user
                this.setState({
                    personalData: {
                        ...personalData,
                        currentDate: new Date(),
                        name: personalData.name,
                        dateOfBirth: !_.isEmpty(personalData.dateOfBirth) ? new Date(personalData.dateOfBirth) : null,
                        calendar: new Date(personalData.calendar) ? (personalData.calendar) : null,
                        emailAccount: personalData.email
                    }
                })
            }
            /*const { data } = response
            const { payload } = data
            const personalData = payload.user*/




        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }

    async onSubmit(e) {
        e.preventDefault()

        const data = this.state.editData
        const errors = this.validate(data)
        this.setState({ errors })

        if (Object.keys(errors).length == 0) {
            try {

                const response = await axios.put(API_USER_PROFILE, {
                    name: this.state.editData.name,
                    surname: this.state.editData.surname,
                    displayName: this.state.editData.displayName,
                    nationality: this.state.editData.nationality,
                    email: this.state.editData.emailAccount,
                    dateOfBirth: this.state.editData.dateOfBirth,
                    calendar: this.state.editData.calendar,
                    currentLocation: !_.isEmpty(this.state.editData.currentLocation) ? this.state.editData.currentLocation : "Bangkok",
                    contactNumber: this.state.editData.contactNumber
                })
                this.fetchUserData()
                this.props.fetchProfile()
                this.setState({ editMode: !this.state.editMode })

            } catch (err) {

                _error_handler(this.props.toastManager, err)
            }
        }
    }

    validate(data) {
        const error = {}

        // if(_.isEmpty(data.name)) error.name = this.props.t("errorName")
        // if(_.isEmpty(data.surname)) error.surname =this.props.t("errorSurname")
        // if (_.isEmpty(data.displayName)) error.displayName = this.props.t("errorDisplayName")
        // if(_.isEmpty(data.emailAccount)) error.emailAccount = this.props.t("errorEmailAccount")
        // if(_.isEmpty(data.password)) error.password = this.props.t("errorPassword")
        // if (_.isEmpty(data.nationality)) error.nationality = this.props.t("errorNationality")
        // if(dayjs(data.dateOfBirth).format("L") != data.dateOfBirth) error.dateOfBirth = this.props.t("errorDateOfBirth")   
        // if (_.isNull(data.dateOfBirth) || data.dateOfBirth === "") error.dateOfBirth = this.props.t("errorDateOfBirth")
        // if(dayjs(data.calendar).format("L") != data.calendar) error.calendar = this.props.t("errorCalendar")     
        // if(_.isEmpty(data.currentLocation)) error.currentLocation = this.props.t("errorCurrentLocation")
        // if (_.isEmpty(data.contactNumber)) error.contactNumber = this.props.t("errorContactNumber")
        return error
    }



    onAvailableChange = (name, value) => {
        // console.log(name,value)
    }

    render() {
        const { editMode, personalData, errors, editData, isOpenCalendar } = this.state
        const { t } = this.props
        const anotherProfile = this.props.anotherProfile
        return (
            <div>
                {
                    !editMode ?
                        <div >
                            <PersonalDetail value={personalData.name + " " + personalData.surname} label={t("name")} />
                            {!personalData.displayName || personalData.displayName === "" ? null : (
                                <PersonalDetail value={personalData.displayName} label={t("displayName")} />
                            )}
                            <PersonalDetail value={personalData.emailAccount} label={t("emailAccount")} />
                            {!personalData.nationality || personalData.nationality === "" ? null : (
                                <PersonalDetail value={personalData.nationality} label={t("nationality")} />
                            )}
                            {!personalData.dateOfBirth || personalData.dateOfBirth === "" ? null : (
                                <PersonalDetail value={dayjs(personalData.dateOfBirth).format("DD/MM/YYYY")} label={t("dateOfBirth")} />
                            )}
                            {!personalData.currentLocation || personalData.currentLocation === "" ? null : (
                                <PersonalDetail value={personalData.currentLocation} label={t("currentLocation")} />
                            )}
                            {!personalData.contactNumber || personalData.contactNumber === "" ? null : (
                                <PersonalDetail value={personalData.contactNumber} label={t("contactNumber")} />
                            )}
                            {anotherProfile ? "" :
                                <PlusButton onClick={() => this.setState({ editMode: !editMode, editData: personalData })}
                                    text={t("editOrAddButton")} />
                            }

                        </div>
                        :
                        ""
                }

                <Collapse isOpen={editMode}>
                    {!this.state.isMount ? null : (
                        <PersonalEdit
                            nationalities={this.props.nationalities}
                            onChangeLocation={(val) => this.onChangeLocation(val, editMode ? "editData" : "personalData")}
                            onChangeDate={(name, val) => this.onChangeDate(name, val, editMode ? "editData" : "personalData")}
                            labelText={t} errors={errors} onSubmit={(e) => this.onSubmit(e)}
                            onChange={(e) => this.onChange(e)} onEditMode={this.onEditMode} editData={editData}
                            editMode={editMode} />
                    )}
                </Collapse>

                <AvailableDate calendars={this.props.calendars}
                    anotherProfile={anotherProfile} />
                {/* {
                    isOpenCalendar ?
                    Modal
                    :
                    ""
                } */}
            </div>
        )
    }
})