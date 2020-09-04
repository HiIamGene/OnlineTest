import React, {Component} from "react"
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router"
import { compose } from "recompose";
import {imageWithToken} from "../../../utils/image";
import axios from 'axios'
import { withToastManager } from "react-toast-notifications"
import { API_FEED_EVENT_INVITE } from '../../../constant/ENV' 

class SuggestEventFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invite: false,
            update: false
        }

        this.handleToggle = this.handleToggle.bind(this)
        //// console.log(this.props.bio);
    }

    componentWillMount() {
        const { invitation, bio, invited } = this.props
        const found = invitation.find((e) => bio.id === e.friendId.id )
        //console.log('sugges', invitation, bio)
        //console.log('found', found)
        if(found !== undefined) {
            this.setState({
                invite: true
            })
        }
        else {
            //console.log(invited)
            const found2 = invited.find((e) => e === bio.id)
            if(found2 !== undefined) {
                this.setState({
                    invite: true
                })
            }
        }
    }

    componentDidUpdate() {
        const { update } = this.state
        if(this.props.update) {
            if(!update) {
                this.setState({
                    update: true
                }, this.componentWillMount)
            }
        }
    }

    componentWillReceiveProps() {
        //this.componentWillMount()
    }

    _onClickInvite = async(eventId, userId) => {
        try {
            const data = {
                eventId: eventId,
                userId: [userId]
            }
            const res = await axios.post(API_FEED_EVENT_INVITE, data)
            const { bio } = this.props
            const structBio = {
                id: bio.id,
                profilePic: bio.profilePic,
                name: bio.name,
                surname: bio.surname
            }
            this.props.addInvite(structBio)
            this.handleToggle()
            this.props.toastManager.add("Invited already", {
                appearance: "success",
                autoDismiss: true
            })
        }
        catch(error) {
            console.log(eventId, userId)
            this.props.toastManager.add("Cannot Invite this friend", {
                appearance: "warning",
                autoDismiss: true
            })
        }
    }

    handleToggle() {
        this.setState({
            invite: true
        })
    }

    collapseName = (name ,surname) => {
        const str = name + " " + (surname ? surname : "")
        return str.length <= 60 ? str : `${str.substring(0, 60)}...`
    }

    render() {
        const invite = this.state.invite;
        const bioInfo = this.props.bio;
        const status = bioInfo.status == "ONLINE";
        const { t, eventId } = this.props
        return (
            <div className={"suggest-friend-main"}>
                <div className={"suggest-friend-pic"}>
                    <img
                        className={"friend-profile-pic"}
                        src={bioInfo.profilePic ? imageWithToken(bioInfo.profilePic)
                            : 
                            "../../../static/images/icon/user_avatar.png"}
                    />
                    {status ? <label></label> : null}
                </div>
                <div className={"suggest-friend-info"}>
                    <div className={"suggest-friend-name"}>
                        <span>{this.collapseName(bioInfo.name, bioInfo.surname)}</span>
                    </div>
                    <div className={"suggest-friend-ship"}>
                        <span>{bioInfo.organization ? this.collapseName(bioInfo.organization) : null}</span>
                    </div>
                    <div className={status ? "suggest-friend-status" : "event-status-offline"}>
                        <span>{bioInfo.status}</span>
                    </div>
                </div>
                <div className={"suggest-friend-invite"}>
                    {invite ? 
                                <button 
                                    className={"suggest-friend-bnt-invited"}
                                    onClick={this.handleToggle}
                                >
                                    <img
                                        src={"../../static/images/icon/AW_CrewHitz_ICON-49.png"}
                                    />
                                    <span className={"invited"}>{t('INVITE.invited')}</span>
                                </button>
                    :
                                <button 
                                    className={"suggest-friend-bnt-invite"}
                                    onClick={() => this._onClickInvite(eventId, bioInfo.id)}
                                >
                                    <span className={"invite"}>{t('INVITE.invite')}</span>
                                </button>}
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
    withNamespaces('event'),
    withRouter,
    withToastManager
)(SuggestEventFriends);