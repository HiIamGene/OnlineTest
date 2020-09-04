import React, { Component } from "react";
import Icon from "../../Icon/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { extend } from "dayjs";
import {API_FEED_EVENT,
        API_FEED_EVENT_INVITATION_ACTION} from "../../../constant/ENV";
import axios from "axios";
import {imageWithToken} from "../../../utils/image";
import {withRouter} from "next/dist/lib/router"
import { compose } from "recompose";
import {getMonth, getDiffMinutes, getDay, getYear, getDiffMonth} from "../getEventDate";
import { withToastManager } from "react-toast-notifications"

class InviteItems extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      loading: true,
      acception: false,
      success: false,
      user: {},
      msgOut: "../../../static/images/icon/AW_CrewHitz_ICON-04.png",
      msgIn: "../../../static/images/icon/AW_CrewHitz_ICON-11.png",
      msgToggle: false
    }
    //// console.log(this.props);
    this.getInitialData();
    
  }

  invitationAction = (action) => {
    axios.put(API_FEED_EVENT_INVITATION_ACTION + this.props.id.id, {"action": action}).then(response => {
      action == "ACCEPT" ? this.setState({acception: true}) : this.setState({acception: false})
      this.click();
    })
  }

  click = () => {
    this.setState({
      toggle: true
    })
    setTimeout(this.props.isClick(true), 1000)
  }

getInitialData = () => {
  axios.get(API_FEED_EVENT + "/" +this.props.id.eventId).then(response => {
    if(response.status == 200) {
      const data = response.data.payload;
      this.setState({
          user: data,
          loading: false,
          success: true
      })
    }
  }).catch(err => {
    //console.log('event-invite-error',err, this.props.index)
    this.props.error(this.props.index)
    this.setState({
      loading: false,
      success: false
    })
  })
}

  render() {
    const { toggle, loading, acception, success, user, msgIn, msgOut, msgToggle } = this.state;

    return (
      loading ?
        <div className={"loading-event"}>
          <img 
              className={"loading-event-gif"}
              src={"../static/images/image-loader/spinner-loader.gif"}
          />
        </div>
      : 
      success ?
        <div className={"invitation-container-content"}>
          <div className={"wrapper-content"}>
            <div className={"wrapper"}>
              <div className={"main"}>
                <div className={"head"} onClick={() => this.props.router.push("/_event?id=" + this.props.id.eventId)}>
                  <img
                    src={user.images ? imageWithToken(user.images) : "../../../static/images/icon/icon_dh.png"}
                    alt={"cover"}
                    className={"head-cover"}
                  />
                  <div className={"container-invite-names"}>
                    <div className={"wrap-name-event"}>
                      <img
                        src="/static/images/icon/calendar-s.png"
                        className={"icon-calendar"}
                      />
                      <span className={"start"}>{user.eventName.length <= 18 ? user.eventName : `${user.eventName.substring(0, 18)}...`}</span>
                    </div>
                    <span className={"captain"}>
                      <i className={"fas fa-map-marker-alt"} style={{ marginRight: 4 }} />
                      {user.location.length <= 27 ? user.location : `${user.location.substring(0, 27)}...`}
                    </span>
                    <div className={"view"}>
                      {" "}
                      <i className={"fas fa-eye"} /> View : {user.privacy == "PUBLIC" ? "Public" : "Private"}
                    </div>
                  </div>
                </div>
                <div className={"date-content"}>
                    <div className={"bold-date"}>
                      Date : 
                    </div> 
                    {`
                      ${getDay(user.startDate)} ${getMonth(user.startDate)} ${getYear(user.startDate)} - 
                      ${getDay(user.endDate)} ${getMonth(user.endDate)} ${getYear(user.endDate)}
                        · ${getDiffMonth(user.startDate, user.endDate)[0] <= 30 ? getDiffMonth(user.startDate, user.endDate)[0] + " day(s)" 
                        : getDiffMonth(user.startDate, user.endDate)[1] + " month(s)"
                      }
                    `}
                </div>
              </div>
              <div className={"wrap-invite-btn"}>
                {
                  !toggle ?
                    (<div className={!toggle ? "invite-accepted" : "none-display"}>
                      <button className={"btn-accepted"} onClick={() => this.invitationAction("ACCEPT")}>Accept</button>
                      <button className={"btn-declined"} onClick={() => this.invitationAction("DELETE")}>Decline</button>
                      <img 
                        className={"img-msg"} 
                        src={msgToggle ? msgIn : msgOut}
                        onMouseEnter={() => this.setState({msgToggle: true})}
                        onMouseOut={() => this.setState({msgToggle: false})}
                        onClick={""/* add function click chat here !!*/} 
                      />
                    </div>)
                  :
                    <label className={"invite-accepted"}>
                      { acception ?
                        <button className={"btn-accepted"} onClick={this.click}><span>Accepted</span></button>
                        :
                        <button className={"btn-declined"} onClick={this.click}><span>Declined</span></button>
                      }
                    </label>
                }
              </div>
            </div>
          </div>
        </div>
        :
        null
    );
  }
}

export default compose(
  withRouter,
  withToastManager
)(InviteItems);
