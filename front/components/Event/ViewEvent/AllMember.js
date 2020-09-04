import React, {Component} from "react"
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router"
import { compose } from "recompose";
import {imageWithToken} from "../../../utils/image";
import { API_USER_PROFILE_ADD_ANOTHER_PROFILE,
        API_USER_PROFILE_ANOTHER_PROFILE,
        API_FEED_EVENT_KICK } from "../../../constant/ENV"
import axios from "axios"
import { withToastManager } from "react-toast-notifications"
import ModalKick from "../modalKick"

class AllMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            pedding: false,
            modalKick: false
        }

        this.handleToggle = this.handleToggle.bind(this)
    }

    componentDidMount() {
        this.checkFriend()
    }

    modalKickOpen = () => {
        this.setState({
            modalKick: true
        })
    }

    modalKickClose = () => {
        this.setState({
            modalKick: false
        })
    }

    checkFriend = () => {
        const url = API_USER_PROFILE_ANOTHER_PROFILE + this.props.member.id
        axios.get(url).then(response => {
            if(response.status == 200) {
                //console.log(response)
                if(response.data.payload.friendStatus == "STATUS_TYPE_ADDFRIEND") {
                    this.setState({
                        pedding: true
                    })
                }
            }
        })
    }

    handleToggle() {
        this.setState({
            invite: true
        })
    }

    addFriend = (id) => {
        //console.log(this.props)
        axios.post(API_USER_PROFILE_ADD_ANOTHER_PROFILE, {
            "userId": id
        }).then(response => {
            if(response.status == 200) {
                this.props.toastManager.add("Pedding Friend already", {
                    appearance: 'success' ,
                    autoDismiss: true
                })
                this.setState({
                    pedding: true
                })
            }
            else {
                this.props.toastManager.add("Pedding Friend fail", {
                    appearance: 'error' ,
                    autoDismiss: true
                })
            }
        })
    }

    kickMember = (kickId) => {
        this.modalKickClose()
        console.log(this.props, kickId)
        axios.put(API_FEED_EVENT_KICK, {
            eventId: this.props.eventId,
            userId: kickId
        }).then(response => {
            if(response.status == 200) {
                this.props.toastManager.add("Kick Member already", {
                    appearance: "success",
                    autoDismiss: true
                })
                this.props.remove()
            }
        }).catch(err => {
            this.props.toastManager.add("Kick Member Error " + err.response.data.error, {
                appearance: "error",
                autoDismiss: true
            })
        })
    }

    collapseName = (name ,surname) => {
        const str = name + " " + surname
        return str.length <= 60 ? str : `${str.substring(0, 60)}...`
    }

    render() {
        const info = this.props.member;
        const connected = this.props.connect;
        const { pedding, modalKick } = this.state

        return (
            <div className={"allmember-main"}>
                <ModalKick 
                    modalDisplay={modalKick} 
                    modalClose={this.modalKickClose} 
                    kickMember={this.kickMember} 
                    kickName={this.collapseName(info.name, info.surname)}
                    kickId={info.id}
                />
                <div className={"allmember-profile"}>
                    <img
                        className={"allmember-profile-pic"}
                        src={
                                info.profilePic ? imageWithToken(info.profilePic)
                                : 
                                "../../../static/images/icon/user_avatar.png"
                            }
                    />
                </div>
                <div className={"allmember-info"}>
                    <div className={"allmember-name"}>
                        <span>{this.collapseName(info.name, info.surname)}</span>
                    </div>
                    <div className={"allmember-ship"}>
                        <span>{info.organization ? info.organization.length <= 60 ? info.organization : `${info.organization.substring(0, 60)}...` : null}</span>
                    </div>
                </div>
                <div className={"allmember-connecetion"}> {
                    this.props.profile.user.id === this.props.createId && this.props.profile.user.id !== info.id ?
                        <img
                            className={"allmember-connecetion-kick"}
                            src={"../../static/images/icon/AW_CrewHitz_ICON-54.png"}
                            onClick={this.modalKickOpen}
                        />
                    :
                        null
                }
                    {connected ? 
                        this.props.profile.user.id !== info.id ?
                                <button 
                                    className={"allmember-connecetion-bnt-connected"}
                                    onClick={this.handleToggle}
                                >
                                    <img
                                        src={"../../static/images/icon/AW_CrewHitz_ICON-11.png"}
                                    />
                                    <span className={"connected"}></span>
                                </button>
                        :
                            null
                    :
                        <div className={"allmember-connecetion-flex"}> 
                            <button 
                                    className={"allmember-connecetion-bnt-connected"}
                                    onClick={this.handleToggle}
                                >
                                    <img
                                        src={"../../static/images/icon/AW_CrewHitz_ICON-11.png"}
                                    />
                                    <span className={"connected"}></span>
                            </button>
                        {
                        !pedding ?
                                <button 
                                    className={"allmember-connecetion-bnt-other"}
                                    onClick={() => this.addFriend(info.id)}
                                >
                                    <span className={"other"}>+ Add Friend</span>
                                </button>
                                :
                                    <button 
                                        className={"allmember-connecetion-bnt-other"}
                                    >
                                        <span className={"other"}>Pending . . .</span>
                                    </button>
                        }
                        </div>
                    }
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
)(AllMember);