import React, {Component} from "react"
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router"
import { compose } from "recompose";
import SuggestEventFriends from "./SuggestEventFriends";
import AllMember from "./AllMember";
import { API_USER_PROFILE_FRIEND_LIST } from "../../../constant/ENV";
import axios from "axios";
import {imageWithToken} from "../../../utils/image";
import { isUndefined } from "util";
import InvitationBox from "./InvitationBox";
import SeeAllPopup from "./SeeAllPopup"

class InviteEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleOpenInvite: false,
            toggleOpenSeeAll: false,
            toggleOpenSearch: false,
            toggleName: true,
            toggleExp: false,
            toggleCert: false,
            searching: true,
            clear: false,
            isFocus: false,
            inInvitation: [],
            loading: true,
            inviteTemp: [],
            update: false,
            addInvite: []
        }

        this.arrayFriends = [];

        
        //// console.log(this.props);
    }

    componentWillMount() {
        this.getInitailFriendList();     
    }

    getInitailFriendList = () => {
        axios.get(API_USER_PROFILE_FRIEND_LIST).then(response => {
            const data = response.data.payload.listFriends.listFriend;
            data.map(key => {
                this.arrayFriends.push({
                    name : `${key.name} ${key.surname}`,
                    id: key.id,
                    profilePic: key.profilePic
                })
            })
            this.setState({
                loading: false
            })
            //// console.log(this.arrayFriends);
        })
    }

    handdleCloseAll = () => {
        this.setState({
            toggleOpenInvite: false,
            toggleOpenSeeAll: false,
            toggleOpenSearch: false,
            toggleName: true,
            toggleExp: false,
            toggleCert: false,
            searching: true
        })
    }

    handleToggleOpenSeeAll = () => {
        if(this.state.toggleOpenSeeAll) {
            this.handdleCloseAll();
        }
        else {
            this.setState(prevState => ({
                    toggleOpenSeeAll: !prevState.toggleOpenSeeAll,
                    toggleOpenSearch: false,
                    toggleOpenInvite: false
                })
            );
        };
    } 

    handleToggleInvitationBox = (callback) => {
        //// console.log(callback);
        if(this.state.toggleOpenInvite) {
            this.handdleCloseAll();
        }
        else {
            this.setState(prevState => ({
                    toggleOpenSeeAll: false,
                    toggleOpenInvite: !prevState.toggleOpenInvite
                })
            );
        };

        return this.state.toggleOpenInvite;
    }

    _afterAddInvite = (userData) => {
        let { addInvite } = this.state
        addInvite.push(userData)
        this.setState({
            addInvite: addInvite
        })
    }

    _afterInviteBox = (array) => {
        console.log(array)
        this.setState({
            inviteTemp: array,
            update: true
        })
    }

    collapseName = (name ,surname) => {
        const str = name + " " + surname
        return str.length <= 10 ? str : `${str.substring(0, 10)}...`
    }

    render() {
        //get data User
        const props = this.props;
        const {user} = props.profile;
        const { t } = this.props

        //get data Event
        const event = this.props.creater;
        const member = event.members;
        const {guestFriend} = event;

        const state = this.state;
        const { toggleOpenInvite, loading, toggleOpenSeeAll, inviteTemp, update, addInvite } = state;

        const suggestFriend = this.props.suggest;

        let countConnected = 0;
        //// console.log(loading);
        if(!loading) {
            //// console.log(this.arrayFriends);
            member.map(data => {
                data.user.id == user.id || this.arrayFriends.find(e => e.id == data.user.id) != undefined ?
                (countConnected+=1)
                :
                null
            })
        }
        const countOther = member.length - countConnected;

        //// console.log(this.state.searching);

        return (
            <div className={"event-invite-main"}>
                <div className={"event-invite-total"}>
                    <img
                        className={"event-invite-accecpted"}
                        src={"https://png.pngtree.com/svg/20141107/b1a013669c.svg"}
                    />
                    <span className={"event-invite-number"}>{`${member.length} Accept`}</span>
                </div>
                <div className={"event-invited"}>
                    <label className={"event-invite-people"}>
                        {
                            member.map(index => (
                                <img
                                    className={"event-invite-people-pic"}
                                    src={index.user.profilePic ? imageWithToken(index.user.profilePic)
                                        : 
                                        "../../../static/images/icon/user_avatar.png"}
                                />
                            ))
                        }
                    </label>
                    <label className={"event-invite-chatgroup"}>
                        <button className={"event-invite-btn-chatgroup"}>
                            Chat Group
                        </button>
                    </label>
                    <div className={"event-invite-people-name"}>
                        {
                            member.length == 0 ?
                                <label>No friend join at now</label>
                            :
                            <div>
                            {
                                member.map((data ,index) => (
                                    <label>
                                        {index == 1 ? ", " : index == 2 ? " and " : null}
                                        {index < 3 ? 
                                            <span className={"people-name"}>{this.collapseName(data.user.name, data.user.surname)}</span>
                                            :
                                            null
                                        }
                                    </label> 
                                ))
                            }
                            <span>{" are accecpted"}</span><br/>
                            </div>
                        }
                        <div className={"event-invite-see-all"} onClick={this.handleToggleOpenSeeAll}>See all</div>
                    </div>
                    <SeeAllPopup
                        isOpen={toggleOpenSeeAll}
                        countConnected={countConnected}
                        countOther={countOther}
                        memberList={member}
                        friendList={this.arrayFriends}
                        isClose={this.handleToggleOpenSeeAll}
                        user={user}
                        createId={event.user.id}
                        eventId={event.id}
                    />
                </div>
                <div className={"event-invite-suggest"}>
                    <div className={"event-invite-suggest-head"}>
                        <div className={"event-invite-suggest-title"}>Suggested Friends</div>
                        <div 
                            className={guestFriend || user.id == event.user.id ? 
                            "event-invite-suggest-invite" 
                            : 
                            "display-none"
                            }
                            onClick={this.handleToggleInvitationBox}
                        >
                            + {t('INVITE.invite_friend')}
                        </div>
                        <InvitationBox 
                            invitation={this.props.creater.eventInvitation} 
                            toggle={this.handleToggleInvitationBox}
                            isOpen={toggleOpenInvite}
                            friendList={this.arrayFriends}
                            memberList={member}
                            eventId={this.props.creater.id}
                            invited={this._afterInviteBox}
                            createrId={this.props.creater.user.id}
                            addInvite={addInvite}
                        />
                    </div>
                    {
                        !isUndefined(suggestFriend) ?
                        suggestFriend.map(key => (
                            <SuggestEventFriends 
                                bio={key}
                                invitation={this.props.creater.eventInvitation} 
                                eventId={this.props.creater.id}
                                invited={inviteTemp}
                                update={update}
                                addInvite={this._afterAddInvite}
                            />
                        ))
                        :
                        null
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
    withNamespaces('event'),
    withRouter
)(InviteEvent);