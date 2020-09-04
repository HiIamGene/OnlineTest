import React, { Component } from "react";
import Icon from "../../Icon/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { compose } from "recompose";
import { withRouter } from "next/router";
import { imageWithToken } from "../../../utils/image";
import {API_FEED_EVENT_REQUEST} from "../../../constant/ENV";
import axios from "axios";
import {getMonth, getDiffMinutes, getDay, getYear, getDiffMonth} from "../getEventDate";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequest: "none",
      isFocus: false
    }
    //// console.log(this.props);
  }

  componentWillMount() {
    this._RequestStatus();
  }

  _isFocus = (state) => {
    this.setState({
      isFocus: state
    })
  }

  _RequestStatus = () => {
    const status = this.props.eventData.status;
    if(status == "none") {
      this._isRequest("none");
    }
    else if(status == "requested") {
      this._isRequest("requested");
    }
    else if(status == "receivedInvite"){
      this._isRequest("receivedInvite");
    }
    else {
      this._isRequest("joined");
    }
  }

  _isRequest = (state) => {
    this.setState({
      isRequest: state
    })
  }

  getRequestToJoin = (id) => {
    const { isFocus } = this.state
    if(!isFocus) return false
    axios.post(API_FEED_EVENT_REQUEST, {eventId: id}).then(response => {
      if(response.status == 200) {
        this._isRequest("requested");
      }
    });
  } 

  goToEventDetial = () => {
    //// console.log(this.props.eventData);
    this.props.router.push("/_event?id=" + this.props.eventData.id);
  }

  render() {
    const {eventData} = this.props;
    const {status, publicJoin} = eventData;
    const { isRequest } = this.state;
    const diffDate = getDiffMonth(eventData.startDate, eventData.endDate);

    
    return (
      <div className={"event-container-content"}>
        <div className={"wrapper"} onClick={this.goToEventDetial}>
          <div className={"event-cover-main"}>
            <div className={"event-cover-center"}>
              <img
                src={
                  eventData.images ? imageWithToken(eventData.images) : "../../../static/images/icon/crewhitz-meeting-2.png"
                }
                className={"event-cover"}
                alt={"cover"}
              />
            </div>
          </div>
          <div className={"container-event-name"}>
            <div className={"wrap-name-event"}>
              <img
                src="/static/images/icon/calendar-s.png"
                className={"icon-calendar"}
              />
              <label className={"start"}>{eventData.eventName.length <= 27 ? `${eventData.eventName}` : `${eventData.eventName.substring(0, 27)}...`}</label>
            </div>
            <div className={"captain"}>
              <i className={"fas fa-map-marker-alt"} style={{ marginRight: 10 }} />
              <label className={"start"}>{eventData.location.length <= 30 ? `${eventData.location}` : `${eventData.location.substring(0, 30)}...`}</label>
            </div>
            <div className={"view"}>
              {" "}
              <i className={"fas fa-eye"} /> View : {eventData.privacy == "PUBLIC" ? "Public" : "Private"}
            </div>
          </div>
        </div>
        <div className={"date-content"}>
          <div className={"bold-date"}>
          {"Date : "}
          </div> 
          {`
            ${getDay(eventData.startDate)} ${getMonth(eventData.startDate)} ${getYear(eventData.startDate)} - 
            ${getDay(eventData.endDate)} ${getMonth(eventData.endDate)} ${getYear(eventData.endDate)}
              · ${diffDate[0] <= 30 ? diffDate[0] + " day(s)" 
              : diffDate[1] + " month(s)"
            }
          `}
        </div>
  
        <div className={"content-post"}>
          {eventData.descript ? eventData.descript.length <= 297 ? `${eventData.descript}` : `${eventData.descript.substring(0, 297)}...` : null}
        </div>
  
        <div className={"accept-post"} 
          onMouseEnter={() => this._isFocus(true)}
          onMouseLeave={() => this._isFocus(false)}
        >
          <img
            src={"https://static.thenounproject.com/png/89200-200.png"}
          />
          <label>{`${eventData.members.length} Accept`}</label>
          { isRequest == "none" ?
              publicJoin ?
                <button className={"btn btn-secondary-post"} onClick={() => this.getRequestToJoin(eventData.id)}><span>Request</span></button>
                :
                <button className={"btn btn-secondary-post"}><span>Invite Only</span></button>
              :
            isRequest == "requested" ? 
                <button className={"btn btn-primary-post"}>
                <img
                  src={"../../static/images/icon/AW_CrewHitz_ICON-49.png"}
                />
                <span>Requested</span>
                </button> 
              :
              isRequest == "joined" ?
              <button className={"btn btn-accepted-post"}><span>Accepted</span></button>
              :
              <button className={"btn btn-received-post"}><span>Received Invite</span></button>
          }
        </div>
      </div>
    );
  } 
}

export default compose(
  withRouter
)(Content);
