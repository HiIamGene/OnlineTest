import React, { Component } from 'react';
import RadioBox from "../RadioBox";
import DatePicker from "react-datepicker";
import OptionDropDown from "../OptionDropDown";
import { Desktop, Mobile } from "../Responsive";
import AddCalendar from "./AddCalendar";
import AvailableDayItem from "./AvailableDayItem";
import PropTypes from "prop-types";
import { API_USER_PROFILE_AVAILABLE, API_USER_PROFILE_CALENDAR } from '../../constant/ENV'
import axios from 'axios'
import dayjs from "dayjs"


const DEFAULT_COLOR = "#45A88C"
const DEFAULT_COLOR_LIST = ["#45A88C", "#45A88C", "#45A88C"]


class AvailableDate extends Component {
    constructor(props) {
        super(props);
        this.availableDay = {
            READY_TO_JOIN: 'Ready to join',
            READY_FROM: 'Ready from',
            CUSTOM_DATE: 'Ready on custom day'
        }

        this.state = {
            showOption: false,
            isOpenCalendar: false,
            startDate: null,
            endDate: null,
            ready: false, // ready from status
            fromTo: true, // from date to date status
            textAvailable: this.availableDay.READY_TO_JOIN
        }

        this.defaultChecked = [] // default checked from database
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.onAvailableChange = this.onAvailableChange.bind(this)
        this.deleteCalenar = this.deleteCalenar.bind(this)

        axios.get(API_USER_PROFILE_AVAILABLE).then(response => {
            let data = response.data.payload
            if (data.availableType == 'READY_TO_JOIN') {
                this.defaultChecked[0] = true
                this.setState({
                    textAvailable: this.availableDay.READY_TO_JOIN
                })
            }
            else if (data.availableType == 'READY_FROM') {
                this.defaultChecked[1] = true
                this.setState({
                    startDate: data.startDate,
                    endDate: data.endDate,
                    ready: true,
                    textAvailable: this.availableDay.READY_FROM
                })
            }
            else if (data.availableType == 'CUSTOM_DATE') {
                this.defaultChecked[2] = true
                this.setState({
                    textAvailable: this.availableDay.CUSTOM_DATE
                })
            }
        })
    }

    async deleteCalenar() {
        axios.post(API_USER_PROFILE_CALENDAR, [{
            title: "string",
            startDate: "2019-06-05",
            endDate: "2019-06-05"
        }])
    }

    // select date and upload
    onAvailableChange = (name, value) => {
        axios.put(API_USER_PROFILE_AVAILABLE, {
            type: value,
            calendars: []
        })

        if (value == 'READY_FROM') {
            this.setState({
                ready: true,
                textAvailable: this.availableDay.READY_FROM
            })
        }
        else if (value == 'READY_TO_JOIN') {
            this.setState({
                ready: false,
                textAvailable: this.availableDay.READY_TO_JOIN
            })
            this.deleteCalenar()
        }
        else {
            this.openCalendar()
            this.setState({
                ready: false,
                textAvailable: this.availableDay.CUSTOM_DATE
            })
            this.deleteCalenar()
        }
    }

    toggleOption = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            showOption: !prevState.showOption
        }));
    }

    openCalendar = () => {
        this.setState({
            isOpenCalendar: true
        });
    }

    handleCloseCalendar = () => {
        this.setState({
            isOpenCalendar: false
        });
    }

    async handleChangeDate(date) {
        if (!this.state.ready) return // no check on Ready From

        if (this.state.fromTo) { // start date
            this.setState({
                startDate: date,
                fromTo: !this.state.fromTo
            })
        }
        else { // end date
            this.setState({
                endDate: date,
                fromTo: !this.state.fromTo
            })

            // upload available status
            axios.put(API_USER_PROFILE_AVAILABLE, {
                type: 'READY_FROM',
                calendars: [{
                    title: 'Available Day',
                    startDate: dayjs(this.state.startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(date).format('YYYY-MM-DD')
                }]
            })

            // upload calendar
            axios.post(API_USER_PROFILE_CALENDAR, [{
                title: 'Available Day',
                startDate: dayjs(this.state.startDate).format('YYYY-MM-DD'),
                endDate: dayjs(date).format('YYYY-MM-DD')
            }])
        }
    }

    render() {
        const optionMenu = [
            {
                label: "Edit",
                func: this.openCalendar,
                icon: "EDIT"
            }
        ]
        const anotherProfile = this.props.anotherProfile

        return (
            <div>
                {anotherProfile ?
                    <div className={"a-personal-available-header"}>
                        <h4 className="a-personal-headerRightSideAboutMainComponent cloud">{"Your Avaliable"}</h4>
                        <span className={"cloud-bold-12"}><span className="dot"></span>{this.state.textAvailable}</span>
                    </div> :
                    <div>
                        <div className={"a-personal-available-header"}>
                            <h4 className="a-personal-headerRightSideAboutMainComponent cloud">{"Your Avaliable"}</h4>
                            <span className={"cloud-bold-12"}><span className="dot"></span>{this.state.textAvailable}</span>
                        </div>

                        <div className={"a-personal-available-panel"}>
                            <div>
                                <RadioBox label="Ready to join" name={"available"} value={"READY_TO_JOIN"} onChange={this.onAvailableChange} defaultChecked={this.defaultChecked[0]} />
                            </div>
                            <div className={"a-personal-ready-from"}>
                                <RadioBox label="Ready from" name={"available"} value={"READY_FROM"} onChange={this.onAvailableChange} defaultChecked={this.defaultChecked[1]} />
                                <div className="a-personal-input-date cloud-light-12">
                                    <DatePicker
                                        className="calendar-input-datepicker "
                                        dateFormat="d/MM/yyyy"
                                        showDisabledMonthNavigation
                                        onChange={(date) => this.handleChangeDate(date)}
                                        selected={this.state.startDate}
                                        showYearDropdown
                                        scrollableYearDropdown
                                        showMonthDropdown
                                        minDate={new Date()}
                                    />
                                    To
                                            <DatePicker
                                        className="calendar-input-datepicker "
                                        dateFormat="d/MM/yyyy"
                                        showDisabledMonthNavigation
                                        onChange={(date) => this.handleChangeDate(date)}
                                        selected={this.state.endDate}
                                        showYearDropdown
                                        scrollableYearDropdown
                                        showMonthDropdown
                                        minDate={this.state.startDate}
                                    />
                                </div>
                            </div>
                            <div className={"a-personal-custom-date"}>
                                <RadioBox label="Select custom date" name={"available"} value={"CUSTOM_DATE"} onChange={this.onAvailableChange} defaultChecked={this.defaultChecked[2]} />
                                <OptionDropDown menu={optionMenu} show={this.state.showOption} toggle={this.toggleOption} />
                            </div>

                        </div>
                        <Desktop>{this.state.isOpenCalendar && <AddCalendar handleClose={this.handleCloseCalendar} />}</Desktop>
                        <Mobile>{this.state.isOpenCalendar && <AddCalendar isMobile={true} handleClose={this.handleCloseCalendar} />}</Mobile>

                        <div>
                            <div className="avaliabledate-design">
                                {this.props.calendars.map((item, i) => (
                                    <AvailableDayItem isShow={true} key={i} item={item} startDate={item.startDate} endDate={item.endDate} caption={item.title}
                                        ribbonColor={item.color || DEFAULT_COLOR}
                                        isMobile={this.props.isMobile}
                                    />
                                ))}
                            </div>
                            {/*<PlusButton onClick={() => this.setState({isOpenCalendar: !isOpenCalendar})}*/}
                            {/*text={t("addCalendar")}/>*/}
                        </div>
                    </div>

                }



            </div>
        );
    }
}

export default AvailableDate

AvailableDate.propTypes = {
    calendars: PropTypes.array.isRequired,
    isMobile: PropTypes.bool
}