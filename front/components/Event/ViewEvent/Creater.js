import React, {Component} from "react"
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router"
import { compose } from "recompose";
import DropDown from "./DropDown";
import {API_FEED_EVENT_REQUEST,
        API_FEED_EVENT_INVITATION_ACTION,
        API_FEED_EVENT_LEAVE} from "../../../constant/ENV";
import axios from "axios";
import {imageWithToken} from "../../../utils/image";
import {getMonth, getDiffMinutes, getDay, getYear, getDiffMonth} from "../getEventDate";
import { DropdownButton } from "react-bootstrap"
import DropdownItem from "react-bootstrap/DropdownItem"
import { withToastManager } from "react-toast-notifications"
import ModalLeave from "../modalLeave"
import ModalDelete from "../modalDelete"

class CreaterEvent extends Component {
    constructor(props){
        super(props);
        this.state = {
            day: 0,
            status: "none",
            inviteId: "",
            modalLeaveToggle: false,
            modalDeleteToggle: false
        }
        // console.log(this.props);
    }

    componentWillMount() {
        this.getStatusEvent();
    }

    _modalLeaveOpen = () => {
        this.setState({
            modalLeaveToggle: true
        })
    }

    _modalLeaveClose = () => {
        this.setState({
            modalLeaveToggle: false
        })
    }

    _modalDeleteOpen = () => {
        this.setState({
            modalDeleteToggle: true
        })
    }

    _modalDeleteClose = () => {
        this.setState({
            modalDeleteToggle: false
        })
    }

    getStatusEvent = () => {
        const {status} = this.props.creater;
        const userId = this.props.profile.user.id;
        const inviteData = this.props.creater.eventInvitation.find(e => e.friendId.id == userId)
        this.setState({
            status: status,
        })
        if(inviteData !== undefined) {
            this.setState({
                inviteId: inviteData.id
            })
        }
    }

    invitationAction = (action) => {
        axios.put(API_FEED_EVENT_INVITATION_ACTION + this.state.inviteId, {"action": action}).then(response => {
            if(response.status == 200) {
                if(action == "ACCEPT") {
                    this.setState({
                        status: "joined",
                    })
                }
                else {
                    this.setState({
                        status: "none",
                    })
                }
            }
        })
    }

    leavEvent = () => {
        console.log(this.props.creater.id)
        axios.put(API_FEED_EVENT_LEAVE, {
            "eventId": this.props.creater.id
        }).then(response => {
            console.log(response)
            if(response.status == 200) {
                this.props.toastManager.add("Leave this Event Sucess", {
                    appearance: "success",
                    autoDismiss: true
                })
                this.setState({
                    status: "none"
                })
                this._modalLeaveClose()
            }
            else {
                this.props.toastManager.add("Leave this Event Fail", {
                    appearance: "danger",
                    autoDismiss: true
                })
            }
        })
    }

    setRequestToJoin = () => {
        axios.post(API_FEED_EVENT_REQUEST, {eventId: this.props.creater.id}).then(response => {
            if(response.status == 200) {
                this.setState({
                    status: "requested"
                })
            }
        });
    }

    getInArray = (array, id) => {
        return array.map(index => {
            if(index.user.id == id) {
                return true;
            }
            else {
                return false;
            }
        })
    }

    render() {
        //get data User
        const props = this.props;
        const {user} = props.profile;

        //get data Event
        const event = this.props.creater;
        const isUser = user.id === event.user.id
        //console.log("event", event)

        const { status, modalLeaveToggle, modalDeleteToggle } = this.state;
        const invitation = event.eventInvitation;
        const member = event.members;
        const ownEvent = event.user;
        const text = event.descript;

        //get Hour and Minute
        const different = getDiffMinutes(event);
        const hour = Math.round(different/60);
        const minute = different%60;
        const day = Math.round(hour/24);

        //get start-date and end-date
        const startDate = event.startDate;
        const endDate = event.endDate;
        const start = [getDay(startDate), getMonth(startDate), getYear(startDate)];
        const end = [getDay(endDate), getMonth(endDate), getYear(endDate)];
        const diffDate = getDiffMonth(startDate, endDate);

        //check in invitation 
        const inInvitation = this.getInArray(invitation, user.id);

        //check in member
        const inMember = this.getInArray(member, user.id);
        const name = ownEvent.name + " " + ownEvent.surname
        let organization = ""
        if(ownEvent.organization != null) {
            organization = ownEvent.organization.length <= 40 ? ownEvent.organization : `${ownEvent.organization.substring(0, 40)}...`
        }

        return (
            <div className={"creater"}>
                <ModalLeave 
                    modalDisplay={modalLeaveToggle}
                    modalClose={this._modalLeaveClose} 
                    leaveEvent={this.leavEvent}
                />
                <ModalDelete 
                    modalDisplay={modalDeleteToggle}
                    modalClose={this._modalDeleteClose} 
                    deleteEvent={() => this.props.router.push('/event?action=all-events')}
                />
                <div className={"creater-head"}>
                    <div className={"creater-profile"}>
                        <img
                            className={"creater-pic"}
                            src={
                                ownEvent.profilePic ?
                                imageWithToken(ownEvent.profilePic)
                                : "../../../static/images/icon/user_avatar.png"
                            }
                        />
                        <div className={"creater-bio"}>
                            <span className={"creater-name"}>{name.length <= 40 ? name : `${name.substring(0, 40)}...`}</span>
                            <label></label>
                            <span className={"creater-created"}>{day > 0 ? `${day} day ago` : different > 59 ? `${hour} hours ago` : minute > 0 ? `${minute} minutes ago` : `few seconds ago`}</span><br/>
                            <span className={"creater-ship"}>{ownEvent.organization ? organization : ""}</span>
                        </div>
                        <div className={"event-privacy"}> 
                            <img
                                className={"event-privacy-icon"}
                                src={"../../static/images/icon/AW_CrewHitz_ICON-32.png"}
                            />
                            <span className={"event-post-privacy"}>View : {event.privacy == "PUBLIC" ? "Public" : "Private"}</span> 
                        </div>
                    </div>
                    <div className={"creater-event-post"}>
                        <div className={"creater-caption"}>
                            <div className={"display-flex"}>
                                <img
                                    className={"creater-event-icon"}
                                    src={"../../../static/images/icon/AW_CrewHitz_ICON-02.png"}
                                />
                                <label className={"creater-caption-title"}>{event.eventName}</label>
                            </div>
                            
                            <div className={"creater-location"}>
                                {/* <img
                                    className={"creater-location-icon"}
                                    src={"https://i.pinimg.com/originals/f2/57/78/f25778f30e29a96c44c4f72ef645aa63.png"}
                                /> */}
                                <i className={"fas fa-map-marker-alt"}></i>
                                <label className={"creater-location-name"}>{event.location}</label>
                            </div>
                        </div>
                        <div className={"creater-due"}>
                            <span className={"creater-due-head"}>Date :</span>
                            <span className={"creater-due-date"}>{`${start[0]} ${start[1]} ${start[2]}`} - {`${end[0]} ${end[1]} ${end[2]}`}</span>
                            <label></label>
                            <span className={"creater-due-period"}>{diffDate[0] > 30 ? ` ${diffDate[1]} month(s)` : ` ${diffDate[0]} day(s)`}</span>
                        </div>
                        <div className={"creater-request"}>
                            <div className={"creater-acception"}>
                                {
                                    status == "receivedInvite" ? 
                                    (<div>
                                        <button className={"creater-bnt-accept"} onClick={() => this.invitationAction("ACCEPT")}>Accept</button>
                                        <button className={"creater-bnt-decline"} onClick={() => this.invitationAction("DELETE")}>Decline</button>
                                    </div>)
                                    :
                                    (<label>
                                        {
                                            status == "none" ?
                                            <button className={"creater-bnt-requested"} onClick={this.setRequestToJoin}>Send Request</button>
                                            :
                                                status == "joined" ?
                                                    isUser ? 
                                                        <DropdownButton
                                                            title={
                                                                <div className={"creater-btn-request-dropdown"}>
                                                                    <img
                                                                        src={"../../static/images/icon/AW_CrewHitz_ICON-49.png"}
                                                                    />
                                                                    Accepted
                                                                </div>
                                                            }
                                                            variant={"success"}
                                                            size={"sm"}
                                                            className={"creater-btn-request-dropdown"}
                                                            direction={null}
                                                        >
                                                            <DropdownItem 
                                                                eventKey={"1"} 
                                                                className={"creater-bnt-accepted-dropdown"}
                                                                onClick={this._modalDeleteOpen}
                                                            >
                                                                Delete this Event
                                                            </DropdownItem>
                                                        </DropdownButton>
                                                    :
                                                        <DropdownButton
                                                            title={
                                                                <div className={"creater-btn-request-dropdown"}>
                                                                    <img
                                                                        src={"../../static/images/icon/AW_CrewHitz_ICON-49.png"}
                                                                    />
                                                                    Accepted
                                                                </div>
                                                            }
                                                            variant={"success"}
                                                            size={"sm"}
                                                            className={"creater-btn-request-dropdown"}
                                                            direction={null}
                                                        >
                                                            <DropdownItem 
                                                                eventKey={"1"} 
                                                                className={"creater-bnt-accepted-dropdown"}
                                                                onClick={this._modalLeaveOpen}
                                                            >
                                                                Leave this Event
                                                            </DropdownItem>
                                                        </DropdownButton>
                                                :
                                                <button className={"creater-bnt-wait"}>
                                                    <span>Waiting agreement</span>
                                                </button>
                                        }
                                    </label>)
                                }
                                
                            </div>
                            <DropDown id={this.props.creater.id}/>
                        </div>

                    </div>
                </div>
                <div className={"creater-body"}>
                    <div className={"creater-body-detail"}>
                        <span>
                            {text}
                        </span>
                    </div>
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
    withNamespaces(),
    withRouter,
    withToastManager
)(CreaterEvent);