import React from "react";
import { withRouter } from "next/router";
import Card from "../Card"
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withNamespaces } from "../../../lib/i18n";
// import ModalComponent from "./Modal.js";
import { DEFAULT_AVATAR_URL } from "../../../constant";
import { imageWithToken } from "../../../utils/image";
import { API_FEED_EVENT_BOOKMARK } from "../../../constant/ENV";
import axios from "axios";
import MenuContainer from '../menuContainer';
import { withToastManager } from "react-toast-notifications"
import {getMonth, getDiffMinutes, getDay, getYear, getDiffMonth} from "../getEventDate";

class EventsPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      isClick: false,
      currentEvent: {
        id: "",
        message: "",
        images: [],
        createdAt: "",
        privacy: "PUBLIC"
      },
      isBookmark: false
    };

    //// console.log(this.props.eventData);
    this._onClick = this._onClick.bind(this);
    //// console.log(this.props.eventData.bookmark, this.props.eventData.eventName);
  }

  componentDidMount() {
    this.handleCheckBookmark();
  }

  handleCheckBookmark = () => {
    if(this.props.eventData.bookmark === "saved") {
      this._isBookmark(true);
    }
    else {
      this._isBookmark(false);
    }
  }

  _onClick(isClick){
    this.setState({
        isClick
    });
  }

  _isBookmark = (state) => {
    this.setState({
      isBookmark: state
    }, this.forceUpdate)
  }

  _isDelete = () => {
    this.props.isDelete(true);
  }

  saveEventBookmark = () => {
    this._isBookmark(false);
    //// console.log(this.props);
    axios.post(API_FEED_EVENT_BOOKMARK, {eventId: this.props.eventData.id}).then(response => {
        //// console.log(response);
        if(response.status == 200) {
          //// console.log("bookmark success");
          this._isBookmark(true);
          this.props.toastManager.add("Add Event to your Bookmark", {
            appearance: "success",
            autoDismiss: true
          })
        }
    });
  }

  deleteEventBookmark = () => {
    this._isBookmark(true);
    //// console.log(this.props);
    axios.delete(API_FEED_EVENT_BOOKMARK + "/" +this.props.eventData.id).then(response => {
        //// console.log(response);
        // console.log("delete bookmark")
        if(response.status == 200) {
          //// console.log("bookmark success");
          this._isBookmark(false);
          if(this.props.router.query.action == "bookmark") {
            this.props.isDelete(true, 'bookmark');
          }
          this.props.toastManager.add("Remove Event to your Bookmark", {
            appearance: "success",
            autoDismiss: true
          })
        }
    });
  }

  _isEdit = (callback) => {
    //// console.log(callback);
    this.props.isEdit(true);
  }

  render() {
    const { router, t, profile, eventData } = this.props;
    const { isBookmark } = this.state;
    //console.log(eventData);
    // const Create = ({ router, t }) => {
    const different = getDiffMinutes(eventData);
    const hour = Math.round(different/60);
    const day = Math.round(hour/24);
    const minute = different%60;
    //// console.log(hour, minute);
    let { user } = eventData;
    let anotherProfile = false
    let name = `${user.name} ${user.surname}`
    let organization = ""
    if(user.organization !== null) {
       organization = user.organization.length <= 45 ? user.organization : `${user.organization.substring(0, 45)}...`
    }

    return (
      <div className={"header-event"}>
          <div className={"wrapper-profile"}>
        <img
          src={
            user.profilePic
              ? imageWithToken(user.profilePic)
              : DEFAULT_AVATAR_URL
          }
          className={"eventpost-profile"}
        />
        </div>
        <div className={"wrapper-detail margintop-header-event"}>
          <div className={"wrapper-detail-row-event"}>
              <div className={"event-header-name"}><span>{name.length <= 50 ? `${name} ·` : `${name.substring(0, 50)}... ·`}</span></div>
              <div className={"event-header-time"}><span>{hour >= 24 ? `${day} days ago` : different > 59 ? `${hour} hours ago` : minute > 0 ? `${minute} minutes ago` : `few seconds ago`}</span> </div>
          </div>
          <div className={"date"}><span>{user.organization ? organization : null}</span> </div>
        </div>

        <div className={"header-event-right"}>
          <img 
            src= {  isBookmark ? 
                    "/static/images/icon/bookred.png"  
                    :
                    "/static/images/icon/AW_CrewHitz_ICON-67.png" 
                  }
            className={"icon-bookmark"}
            onClick={!isBookmark ? this.saveEventBookmark : this.deleteEventBookmark}
          />
          <div className = {"header-menu-container event-margintop-header"}>
              <MenuContainer user={this.props.profile.user} eventData={eventData} isEdit={this._isEdit} isDelete={this._isDelete}/>
          </div>
        </div>

        
      </div>


    );
  }
}



export default compose(
  withNamespaces("event"),
  connect(store => {
    return {
      profile: store.profileReducer,
      event: store.eventReducer
    };
  }),
  withToastManager,
  withRouter
)(EventsPost);
