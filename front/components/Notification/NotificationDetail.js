import React, { Component } from "react";
import { compose } from "redux";
import { withRouter } from "next/router";
import { imageWithToken } from "../../utils/image";
import moment from "moment";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addPost } from '../../redux/actions/postAction'
import { isUndefined } from "util";
import { API_FEED_EVENT_MEMBER, 
        API_FEED_EVENT_INVITATION_ACTION, 
        API_FEED_EVENT_REQUEST_ACTION,
        API_USER_PROFILE_REACT_REQUEST,
        API_USER_PROFILE_FRIEND_LIST,
        API_FEED_EVENT_INVITATION,
        API_USER_PROFILE_ANOTHER_PROFILE } from "../../constant/ENV";
import { ICON, BTN, MY_ACTION, FRIEND_ACTION, ACCEPT, DECLINE } from "./constValue"
import axios from "axios"
import { withToastManager } from "react-toast-notifications"
import ModalEndorse from './ModalEndorse'

class NotificationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myAction: "",
            friendAction: "",
            icon: "",
            name: "",
            profileName: false,
            collaspeNum: this.props.onPage ? 42 : 17,
            friendInEvent: null,
            requestJoinEvent: null,
            connectionRequest: "ADD",
            endorse: false,
            msgToggle: false,
            modalEndorseToggle: false,
            endorseType: '',
            endorseId: ''
        };
        console.log(this.props)
    }

    componentDidMount() {
        this.setMyAction();
    }

    collaspeString = (str, num) => {
        if(str == null) {
            return ""
        }

        else if (str.length <= num) {
            return str
        }
        else {
            return `${str.substring(0, num)}...`
        }
    };

    _modalEndorseOpen = () => {
        this.setState({
            modalEndorseToggle: true
        })
    }

    _modalEndorseClose = () => {
        this.setState({
            modalEndorseToggle: false
        })
    }

    _myAction = action => {
        this.setState({
            myAction: action
        });
    };

    _msgToggle = (callback) => {
        this.setState({
            msgToggle: callback
        })
    }

    _friendAction = action => {
        this.setState({
            friendAction: action
        });
    };

    _icon = icon => {
        this.setState({
            icon: icon
        });
    };

    setEndorseVal = (type, id) => {
        this.setState({
            endorseType: type,
            endorseId: id
        })
    }

    _onClickBtnInviteEvent = (callback) => {
        if(callback === ACCEPT) {
            this.actionInvitationEvent(ACCEPT)
        }
        else if(callback === DECLINE) {
            this.actionInvitationEvent("DELETE")
        }
        
    }

    _onClickBtnRequestEvent = (callback) => {
        if(callback === ACCEPT) {
            this.actionRequestEvent("APPROVE")
        }
        else if(callback === DECLINE) {
            this.actionRequestEvent(DECLINE)
        }
    }

    _onClickBtnConnection = (callback) => {
        if(callback === ACCEPT) {
            this.actionConnection(callback)
        }
        else {
            this.actionConnection('DELETE')
        }
    }

    _onClickBtnEndorse = (callback) => {
        if(callback) {
            this.props.toastManager.add('Endorse already', {
                appearance: "success",
                autoDismiss: true
            })

            this.setState({
                endorse: true
            })
        }
        else {
            this.props.toastManager.add('Endorse failure', {
                appearance: "warning",
                autoDismiss: true
            })
            this.setState({
                endorse: false
            })
        }
        this._modalEndorseClose()
    }

    showBTN = (detail) => {
        const { friendInEvent, connectionRequest, endorse, msgToggle } = this.state
        const { data, type } = detail
        if(type === "EDUCATION" || type === "EXPERIENCE" || type === "SKILL") {
            if(endorse) {
                return (
                    BTN().ENDORSE
                )
            }
            else {
                return (
                    BTN(this._modalEndorseOpen).NO_ENDORSE
                )
            }
        }
        else if(!isUndefined(data) && data.action === "INVITE_USER") {
            if(friendInEvent === null) {
                return (
                    BTN(this._onClickBtnInviteEvent, msgToggle, this._msgToggle).EVENT
                )
            }
            else if(friendInEvent) {
                return (
                    BTN(undefined, msgToggle, this._msgToggle).APPROVE
                )
            }
            else if(!friendInEvent) {
                return (
                    BTN(undefined, msgToggle, this._msgToggle).DECLINE
                )
            }
        }
        else if(!isUndefined(data) && data.action === "REQUEST_FROM_USER") {
            if(friendInEvent) {
                return (
                    BTN(undefined, msgToggle, this._msgToggle).APPROVE
                )
            }
            else {
                return (
                    BTN(this._onClickBtnRequestEvent).EVENT
                )
            }
        }
        else if(!isUndefined(data) && data.action === "FRIEND_REQUEST") {
            if(connectionRequest === "ADD") {
                return (
                    BTN(this._onClickBtnConnection).CONNECTION
                )
            }
            else if(connectionRequest){
                return (
                    BTN(undefined, msgToggle, this._msgToggle).APPROVE
                )
            }
            else if(!connectionRequest){
                /* return (
                    BTN(undefined, msgToggle, this._msgToggle).DECLINE
                ) */
            }
        }
    }

    actionRequestEvent = async (action) => {
        const { detail } = this.props
        const { data } = detail
        try {
            const url = API_FEED_EVENT_REQUEST_ACTION + "/" + data.requestId
            const actionStruct = {
                action: action
            }
            const res = await axios.put(url, actionStruct)
            this.props.toastManager.add(action === "APPROVE" ? "Approve people to Event" : "Decline people to Event", {
                appearance: "success",
                autoDismiss: true
            })
            if(res.status === 200 && action === "APPROVE") {
                this.setState({
                    friendInEvent: true
                })
            }
            else if(action === DECLINE) {
                this.setState({
                    friendInEvent: true
                })
            }
        }
        catch(error) {
            console.log('action-request-event', error)
            this.props.toastManager.add('Cannot do action to this Event', {
                appearance: "warning",
                autoDismiss: true
            })
        }
    }

    actionInvitationEvent = async (action) => {
        console.log(this.props.detail)
        try {
            const { detail } = this.props
            const { data } = detail
            const response = await axios.put(API_FEED_EVENT_INVITATION_ACTION + data.inviteId, {
                action: action
            })
            const { payload } = response.data
            this.props.toastManager.add(action === ACCEPT ? "Join Event" : "Never mind Event", {
                appearance: "success",
                autoDismiss: true
            })
            if(response.status == 200 && action === ACCEPT) {
                this.setState({
                    friendInEvent: true
                })
            }
            else if(action === "DELETE") {
                this.setState({
                    friendInEvent: false
                })
            }
            //console.log(paydload)
        }
        catch(error) {
            console.log('action-invite-event', error)
            this.props.toastManager.add('Cannot do action to this Event', {
                appearance: "warning",
                autoDismiss: true
            })
        }
    }

    actionConnection = async (action) => {
        const { detail } = this.props
        const { data } = detail
        const { requestId } = data
        try {
            const url = API_USER_PROFILE_REACT_REQUEST + "/" + requestId
            const actionStruct = {
                reactType: action
            }
            const res = await axios.put(url, actionStruct)
            if(action === ACCEPT) {
                this.props.toastManager.add('Accept this people to your connection', {
                    appearance: "success",
                    autoDismiss: true
                })
                this.setState({
                    connectionRequest: true
                })
            } 
            else if(action === "DELETE") {
                this.props.toastManager.add('Decline this people to your connection', {
                    appearance: "success",
                    autoDismiss: true
                })
                this.setState({
                    connectionRequest: false
                })
            }   
        }
        catch(error) {
            console.log('action-connection', error)
            this.props.toastManager.add('Cannot do action to this people', {
                appearance: "warning",
                autoDismiss: true
            })
        }
    }

    getInEvent = async (eventId, userId) => {
        try {
            const getData = await axios.get(API_FEED_EVENT_MEMBER + eventId)
            const { payload } = getData.data
            const found = payload.filter((element) => element.user === userId)
            this.setState({
                friendInEvent: found.length > 0 ? true : null
            }, () => {
                found.length === 0 ? this.getEventInvitation(eventId) : null
            })
        }
        catch(error) {
            console.log("get-member-event", error)
        }
    }

    getEventInvitation = async (eventId) => {
        try {
            const res = await axios.get(API_FEED_EVENT_INVITATION)
            const { payload } = res.data
            const { response } = payload
            const found = response.filter((element) => element.eventId === eventId)
            //console.log('event-invitation', response, found)
            this.setState({
                friendInEvent: found.length > 0 ? null : false
            })
        }
        catch(error) {
            console.log("get-event-invitation", error)
        }
    }

    checkConnectionReq = (type) => {
        switch(type) {
            case "STATUS_TYPE_FRIENDED" :
                this.setState({
                    connectionRequest: true
                })
                break
            case "STATUS_TYPE_ADDFRIEND" :
                this.setState({
                    connectionRequest: "ADD"
                })
                break
            case null :
                this.setState({
                    connectionRequest: "ADD"
                })
            break
            default :
                this.setState({
                    connectionRequest: false
                })
                break
        }
    }

    findEndorseType = (type, data) => {
        let id = null
        switch(type) {
            case 'SOFT_SKILL' :
                id = data.userSkillId
                break
            case 'HARD_SKILL' :
                id = data.userSkillId
                break
            case 'EDUCATION' :
                id = data.educationId
                break
            case 'EXPERIENCE' :
                id = data.experienceId
                break
        }
        this.setEndorseVal(type, id)
    }

    setMyAction = () => {
        const { detail } = this.props;
        const { type, message, data } = detail;
        let action = "";
        if (type != "ENDORSEMENT") {
            action = detail.data.action
        } else {
            action = detail.type
        }

        switch (type) {
            case "ENDORSE":
                this._myAction(MY_ACTION.ENDORSE);
                break;
            case "POST":
                this.setFriendAction(action, message);
                this.setState({
                    name:
                        this.props.detail.data.action != "EMOTION_COMMENT" && !isUndefined(this.props.detail.data.post)
                            ? this.props.detail.data.post.message
                            : ""
                });
                break;
            case "EVENT":
                this.setFriendAction(action, type);
                this._myAction(MY_ACTION.JOIN_EVENT);
                this.setState({
                    name: this.props.detail.data.eventName
                });
                this.getInEvent(detail.data.eventId, this.props.profile.user.id)
                break;
            case "FRIEND":
                this.setFriendAction(action);
                break;
            case "EDUCATION":
                //console.log('noti', this.props)
                this.findEndorseType(type, data)
                this._myAction(MY_ACTION.ENDORSE)
                this.setFriendAction(type)
                this.setState({
                    name: detail.data.educationMaster.englishName
                })
                break
            case "EXPERIENCE":
                console.log('noti', this.props)
                this.findEndorseType(type, data)
                this._myAction(MY_ACTION.ENDORSE)
                this.setFriendAction(type)
                this.setState({
                    name: "Cooming Soon..." //detail.data.experience.experience.shipMaster._englishName
                })
                break
            case "SKILL":
                //console.log('noti', this.props)
                this.findEndorseType(data.action, data)
                this._myAction(MY_ACTION.VIEW_SKILL)
                this.setFriendAction(type)
                break
            case "ENDORSEMENT" :
                this.setFriendAction(action, !isUndefined(detail.data) ? detail.data.action : detail.endorseAlert.action)
                break
        }
    };

    setFriendAction = (action, icon) => {
        switch (action) {
            case "INVITE_USER":
                this._friendAction(FRIEND_ACTION.INVITE);
                this._icon(ICON[icon]);
                break;
            case "REQUEST_FROM_USER":
                this._friendAction(FRIEND_ACTION.REQUEST_JOIN);
                this._icon(ICON[icon]);
                break;
            case "ACCEPT_INVITE":
                this._friendAction(FRIEND_ACTION.ACCEPT);
                this._icon(ICON[icon]);
                break;
            case "ACCEPT_REQUEST":
                this._friendAction(FRIEND_ACTION.ACCEPT_REQUEST)
                this._icon(ICON.EVENT)
                break
            case "COMMENT":
                this._friendAction(FRIEND_ACTION.COMMENT);
                this._icon(ICON.HOME);
                break;
            case "EMOTION_POST":
                this._friendAction(FRIEND_ACTION.LIKE_POST);
                this._icon(ICON[icon]);
                break;
            case "EMOTION_COMMENT":
                this._friendAction(FRIEND_ACTION.LIKE_COMMENT);
                this._icon(ICON[icon]);
                break;
            case "FRIEND_REQUEST":
                this._friendAction(FRIEND_ACTION.FRIEND_REQUEST);
                this._icon(ICON.FRIEND);
                this.checkConnectionReq(this.props.detail.fromUser.typeOfFriend)
                break;
            case "REQUEST_ACCEPT":
                this._friendAction(FRIEND_ACTION.FRIEND_ACCEPT);
                this._icon(ICON.FRIEND);
                break;
            case "EDUCATION":
                this._friendAction(FRIEND_ACTION.ATTEND)
                this._icon(ICON.SCHOOL)
                break
            case "EXPERIENCE":
                this._friendAction(FRIEND_ACTION.WORK)
                this._icon(ICON.WORKSTATION)
                break
            case "SKILL":
                this._friendAction(FRIEND_ACTION.SKILL)
                this._icon(ICON.FRIEND)
                break
            case "ENDORSEMENT":
                this._friendAction(FRIEND_ACTION.ENDORSEMENT)
                this._icon(ICON[icon])
                break
        }
    };

    _onClickCenter = () => {
        const { router, detail } = this.props
        const { type, data } = detail
        switch(type) {
            case "EVENT" :
                router.push("/_event?id=" + data.eventId)
                break
            case "FRIEND" :
                router.push("/friend")
                break
            case "SKILL" :
                router.push("/about?action=skill")
                break

            case "POST" :
                this.props.addPosts([data.postId])
                router.push("/postViewer?id=" + data.postId)
                break
            default :
                router.push("/timeline?search=" + detail.fromUser.id)
                break
        }
    }

    _onClickProfile = () => {
        const { router, detail } = this.props
        router.push("/timeline?search=" + detail.fromUser.id)
    }

    _mouseInProfileName = () => {
        this.setState({
            profileName: true
        })
    }

    _mouseOutProfileName = () => {
        this.setState({
            profileName: false
        })
    }

    render() {
        const { detail } = this.props;
        const { fromUser, data } = detail;
        const { myAction, friendAction, icon, name, profileName, 
                collaspeNum, modalEndorseToggle, endorseType, endorseId } = this.state;
        return (
            <div className={detail.status == "READED" ? "notifiaction-page-detail" : "notifiaction-page-detail noread"}>
                <div className={"notification-page-detail-left"}>
                    <img
                        className={"notification-page-avatar-profile"}
                        src={fromUser.profilePic ? imageWithToken(fromUser.profilePic) : ICON.AVATAR}
                        onClick={this._onClickProfile}
                    />
                </div>
                <ModalEndorse 
                    isOpen={modalEndorseToggle}
                    isClose={this._modalEndorseClose}
                    onClick={this._onClickBtnEndorse}
                    id={endorseId}
                    type={endorseType}
                />
                <div className={"notification-page-detail-center"} onClick={!profileName ? this._onClickCenter : null}>
                    <div className={"notification-page-detail-center-top"}>
                        <div className={"notification-page-detail-center-decription"}>
                            <span 
                                className={"notification-page-detail-center-bold-text"} 
                                onClick={this._onClickProfile}
                                onMouseEnter={this._mouseInProfileName}
                                onMouseLeave={this._mouseOutProfileName}
                            >
                                {this.collaspeString(`${fromUser.name} ${fromUser.surname}`, collaspeNum)}
                            </span>
                            <span className={"notification-page-detail-center-text"}>{friendAction}</span>{
                                detail.type === "EDUCATION" || detail.type === "EXPERIENCE" ?
                                <span className={"notification-page-detail-center-bold-text"}>
                                    {this.collaspeString(name, collaspeNum)}
                                </span>
                                :
                                detail.type === "ENDORSEMENT" ?
                                    <span className={"notification-page-detail-center-bold-text"}>
                                        {}
                                        {detail.data === undefined ?
                                            this.collaspeString(detail.endorseAlert.action.charAt(0) + detail.endorseAlert.action.substring(1).toLowerCase()
                                            , collaspeNum)
                                            :
                                            this.collaspeString(detail.data.action.charAt(0) + detail.data.action.substring(1).toLowerCase()
                                            , collaspeNum)
                                        }
                                    </span>
                                    :
                                    null
                            }
                            {detail.location || (detail.type == "EVENT" && detail.data.action != "ACCEPT_INVITE") ? 
                                <span className={"notification-page-detail-center-bold-text"}>
                                    {detail.location || "Event"}
                                </span>
                                :
                                /* detail.type === "POST" && detail.data.action === "EMOTION_COMMENT" ? 
                                    <span className={"notification-page-detail-center-text"}>
                                        {`"${this.collaspeString(name, collaspeNum)}"`}
                                    </span>
                                    : */
                                    null
                            }
                            
                            { detail.type == "EVENT" && detail.data.action != "ACCEPT_INVITE" ?
                                <div>
                                    <span className={"notification-page-detail-center-bold-text"}>
                                        {`"${this.collaspeString(name, collaspeNum)}"`}
                                    </span>
                                </div>
                                :
                                    detail.type != "POST" ?
                                        <div className={"notification-page-detail-center-reaction"} >
                                            {myAction}
                                            {detail.type == "EVENT" ?
                                                <span className={"notification-page-detail-center-bold-text"}>
                                                    {` "${this.collaspeString(name, collaspeNum)}"`}
                                                </span>
                                                :
                                                null
                                            }
                                            
                                        </div>
                                        :
                                        null
                            }
                        </div>
                    </div>
                    <div className={"notification-page-detail-center-bottom"}>
                        <img className={"notification-page-detail-center-icon"} src={icon} />
                        <label className={"notification-page-detail-center-date"}>
                            {`${moment(detail.createdAt).format("DD MMM YYYY")} at ${moment(detail.createdAt).format(
                                "HH:MM"
                            )}`}
                        </label>
                    </div>
                </div>
                <div className={"notification-page-detail-right"}>{
                        this.showBTN(detail)
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPosts: bindActionCreators(addPost, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.dataReducer,
        profile: state.profileReducer
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withToastManager
)(NotificationDetail);
