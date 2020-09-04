import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from "styled-components"
import { DateRange } from 'react-date-range';
import AvailableDayItem from "./AvailableDayItem";
import _ from "lodash"
import * as PropTypes from "prop-types";
import dayjs from "dayjs";
import axios from "axios";
import { API_USER_PROFILE_CALENDAR } from "../../constant/ENV";
import { _error_handler } from "../../utils/errorHandler";
import { compose } from "recompose";
import { withNamespaces } from "../../lib/i18n";
import { withToastManager } from "react-toast-notifications";
import { connect } from "react-redux";
import { setCalendar } from "../../redux/actions/personalAction";
import { getCalendar } from "../../services/personalService";
import { Desktop, Mobile } from '../Responsive';

const DEFAULT_COLOR = "#45A88C"
const DEFAULT_COLOR_LIST = ["#45A88C", "#45A88C", "#45A88C"]


let keyCount = 1;
class AddCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDate: [],
            selectItem: 0,
            selectMode: 0,
            year: "2019",
            date: null
        }
    }

    handleSelect = (ranges) => {
        const { selectItem, selectDate, selectMode } = this.state
        if (ranges) {
            let select = selectDate.map((item, i) => {
                if (i === selectItem) {
                    return {
                        ...item,
                        startDate: ranges[selectDate[i].key].startDate,
                        endDate: ranges[selectDate[i].key].endDate,
                    }
                }
                return item
            })


            // console.log(ranges,select);
            this.setState({
                selectDate: select,
                selectMode: (selectMode + 1) % 2
            }, () => {
                if (selectMode === 1) {
                    this.onAddDate(new Date(1))
                }
            })
        }

    }

    onSelectToEdit = (key) => {
        this.setState({
            selectItem: key
        })
    }

    onAddDate = async (date = new Date()) => {
        let { selectDate } = this.state;
        selectDate.push({
            startDate: date,
            endDate: date,
            caption: "วันว่าง ",
            key: 'selection' + keyCount++,
        })
        // console.log("Select date", selectDate);
        this.setState({ 
            selectDate: selectDate, 
            selectItem: selectDate.length - 1, 
            date 
        });
    }

    onClearAll = () => {
        this.setState({
            selectDate: [],
            selectItem: 0
        })
    }

    onRemove = (key) => {
        let dateArray = this.state.selectDate
        const index = dateArray.findIndex(element => {
            return element.key === key
        })
        dateArray.splice(index, 1)
        this.setState({
            selectDate: dateArray
        }, () => {
            this.onAddDate(new Date(null))
        })
        //this.onAddDate(new Date())
        /* let deleted = this.state.selectDate.filter((item) => (item.key !== key))
        // console.log("calendar", deleted)
        deleted.pop()
        this.setState({
            selectDate: deleted,
        }, () => {
            this.onAddDate(new Date())
        }); */
    }

    onSaveDate = async () => {
        // console.log("date-calendar",this.state.selectDate)
        let data = this.state.selectDate.map(item => {
            return {
                "title": item.caption,
                "startDate": dayjs(item.startDate).format("YYYY-MM-DD"),
                "endDate": dayjs(item.endDate).format("YYYY-MM-DD"),
            }
        })

        axios.post(API_USER_PROFILE_CALENDAR, data)
            .then(async res => {
                this.props.toastManager.add("Add Calendar Success", { appearance: 'success', autoDismiss: true });
                this.props.handleClose();
                this.props.setCalendar(await getCalendar());
            }).catch(err => {
                _error_handler(this.props.toastManager, err)
            })
    }

    onCaptionChange = (index, caption) => {
        let newList = this.state.selectDate
        newList[index].caption = caption
        this.setState({
            selectDate: newList
        });
    }

    componentDidMount() {
        let selectDate = [];
        if (_.isArray(this.props.calendars)) {
            // console.log("props calendar",this.props.calendars)
            this.props.calendars.map((item, i) => {
                selectDate.push({
                    startDate: new Date(item.startDate),
                    endDate: new Date(item.endDate),
                    caption: item.title,
                    id: item.id,
                    key: 'date' + keyCount++,
                })
            })
        }
        if (selectDate.length === 0) {
            this.onAddDate(new Date(1));
        } else {
            this.setState({ 
                selectDate: selectDate, 
                selectItem: selectDate.length-1
            });
        }
    }

    render() {
        return (
            <Modal onExit={() => {
                keyCount = 1;
            }} isOpen={true} toggle={this.props.handleClose} size={"lg"}>
                <ModalHeader toggle={this.props.handleClose}
                    className={"addcalendar-modalheader calendar-modal"}
                >Calendar</ModalHeader>

                <ModalBody>
                    <div className="addcalendar-content">
                        <div className="addcalendar-datewrap">
                            <DateRange
                                ranges={this.state.selectDate}
                                rangeColors={DEFAULT_COLOR_LIST}
                                color={DEFAULT_COLOR}
                                onChange={this.handleSelect}
                                months={this.props.isMobile ? 1 : 2}
                                focusedRange={[this.state.selectItem, this.state.selectMode]}
                                showDateDisplay={false}
                                direction={"horizontal"}
                                showMonthAndYearPickers={false}
                                className={"addcalendar-font-sm dateRange"}
                                minDate={new Date()}
                            />
                        </div>


                        <div className="addcaendar-dateava-design">
                            <div className="addcalendar-daysheader">วันว่างทั้งหมด</div>
                            <div className="addcalendar-daylist">
                                {this.state.selectDate.map((item, i) => {
                                    //if(i === this.state.selectDate.length - 1 && item.startDate === new Date(1)) return null
                                    if(item.startDate.getFullYear() === new Date(1).getFullYear()) return null
                                    return (
                                        <AvailableDayItem key={i} item={item} startDate={item.startDate}
                                            endDate={item.endDate} caption={item.caption}
                                            ribbonColor={item.color || DEFAULT_COLOR}
                                            onRemove={this.onRemove}
                                            onCaptionChange={(e) => this.onCaptionChange(i, e.target.value)}
                                            isMobile={this.props.isMobile}
                                        />
                                    )

                                })}
                            </div>
                        </div>



                        <div className={"about-btn-wrapper about-font-sm-light"}>
                            <Button color="secondary" className="about-btn-cancel" onClick={this.props.handleClose}>Cancel</Button>
                            <Button className="btn-wrapper-space about-btn-save" onClick={this.onSaveDate}>Save</Button>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        );
    }
}


AddCalendar.propTypes = {
    handleClose: PropTypes.func.isRequired
}

export default compose(
    withNamespaces(["add_calendar"]),
    withToastManager,
    connect(store => {
        return {
            calendars: store.personalReducer.calendars
        }
    }, { setCalendar })
)(AddCalendar);
