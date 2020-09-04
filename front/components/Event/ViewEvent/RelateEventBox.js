import React, {Component} from "react";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import { compose } from "recompose";
import {imageWithToken} from "../../../utils/image"
import {getMonth, getDiffMinutes, getDay, getYear, getDiffMonth} from "../getEventDate";

class RelateEventBox extends Component{
    constructor(props) {
        super(props);
        //// console.log(this.props);
    }

    goToEventDetail = () => {
        // console.log(this.props.router);
        this.props.router.push("/_event?id=" + this.props.eventData.id);
    }

    render() {
        const event = this.props.eventData;
        return (
            <div className={"relate-event-box-main"} onClick={this.goToEventDetail}>
                <div className={"relate-event-box-head"}>
                    <img
                        src={event.images ? imageWithToken(event.images) : "../../../static/images/icon/crewhitz-meeting-2.png"}
                    />
                </div>
                <div className={"relate-event-box-body"}>
                    <div className={"relate-event-caption"}>
                        <img
                            src={"../../../static/images/icon/AW_CrewHitz_ICON-02.png"}
                        />
                        <span>{event.eventName.length <= 12 ? event.eventName : `${event.eventName.substring(0, 12)}...`}</span>
                    </div>
                    <div className={"relate-event-location"}>
                        {/* <img
                            src={"https://i.pinimg.com/originals/f2/57/78/f25778f30e29a96c44c4f72ef645aa63.png"}
                        /> */}
                        <i className={"event-location fas fa-map-marker-alt"}></i>
                        <span>{event.location.length <= 12 ? event.location : `${event.location.substring(0, 12)}...`}</span>
                    </div>
                </div>
                <div className={"relate-event-box-bottom"}>
                    <span className={"relate-event-date-title"}>Date : </span>
                    <span className={"relate-event-date"}>
                        <span>{`${getDay(event.startDate)} ${getMonth(event.startDate)} ${getYear(event.startDate)}`}</span>
                        <span> - </span>
                        <div>{`${getDay(event.endDate)} ${getMonth(event.endDate)} ${getYear(event.endDate)}`}</div>
                    </span>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
    }
};

export default compose(
    connect(mapStateToProps),
    withRouter
)(RelateEventBox);