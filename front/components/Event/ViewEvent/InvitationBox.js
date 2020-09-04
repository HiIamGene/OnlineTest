import React, { Component } from "react";
import { compose } from "recompose";
import { isUndefined } from "util";
import { API_FEED_EVENT_INVITE,
        API_FEED_EVENT_KICK,
        API_USER_PROFILE_FRIEND_LIST,
        API_FEED_EVENT_MEMBER } from "../../../constant/ENV";
import Member from "./Members";
import axios from "axios";
import { withToastManager } from "react-toast-notifications"
import {imageWithToken} from "../../../utils/image";
import { Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Button } from 'reactstrap'
import {withNamespaces} from "../../../lib/i18n";

class InvitationBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inInvitation: [],
            toggleOpenSearch: false,
            isSearch: true,
            isSearchLoading: false,
            isFocus: false,
            toggleName: true,
            toggleExp: false,
            toggleCert: false,
            isTyping: false,
            invitationList: [],
            searchKey: "",
            msgOut: "../../../static/images/icon/AW_CrewHitz_ICON-04.png",
            msgIn: "../../../static/images/icon/AW_CrewHitz_ICON-11.png",
            msgToggle: false,
            addInvite: this.props.addInvite
        }

        this.friendFound = [];
        this.friendList = this.props.friendList;
        //// console.log(this.props);
    }

    componentWillMount() {
        this.getEventInvitationList();
    }

    componentWillReceiveProps(next) {
        this.getEventInvitationList()
    }

    getEventInvitationList = async() => {
        const invitation = this.props.invitation;
        const { addInvite } = this.state
        let array = [];
        invitation.forEach(index => {
            array.push({
                id: index.friendId.id,
                profilePic: index.friendId.profilePic,
                name: `${index.friendId.name} ${index.friendId.surname}`
            })
        })
        addInvite.forEach((data) => {
            array.push({
                id: data.id,
                profilePic: data.profilePic,
                name: `${data.name} ${data.surname}`
            })
        })

        this.setState({
            invitationList: array
        })
    }

    setEventInvitationList = () => {
        let array = []
        this.state.invitationList.map(data => {
            array.push(data.id);
        })
        const inviteMember = this.props.invitation
        const { addInvite } = this.state
        //console.log(inviteMember)
        inviteMember.forEach((key, index) => {
            if(array.includes(key.friendId.id)) {
                array.splice(index, 1)
            }
        })
        addInvite.forEach((key, index) => {
            if(array.includes(key.id)) {
                array.splice(index, 1)
            }
        })
        // console.log(array, this.props.eventId);
        axios.post(API_FEED_EVENT_INVITE, {
            eventId: this.props.eventId,
            userId: array
        }).then(response => {
            if(response.status == 200) {
                this.props.toastManager.add("Invite already", {
                    appearance: "success",
                    autoDismiss: true
                })
                this.props.invited(array)
                this.handleCloseInvitationBox();
            }
        }).catch(error => {
            //console.log(array)
            this.props.toastManager.add("Add other friend is not in Invitation yet", {
                appearance: "warning",
                autoDismiss: true
            })
        })
    }

    _isFocus = (state) => {
        this.setState({
            isFocus: state
        });
    }

    _isTyping = (state) => {
        this.setState({
            isTyping: state
        });
    }

    _isSearch = (state) => {
        this.setState({
            isSearch: state
        });
    }

    _clearFrienFound = () => {
        this.setState({
            searchKey: ""
        })
        const element = document.getElementsByClassName("event-seacrh-invitation");
        element[0].value = "";
        this.friendFound = [];
    }

    _setFrienFound = (data) => {
        this.friendFound = data;
    }

    handleCloseSearch = () => {
        this._clearFrienFound();
        if(this.state.isFocus) return false;

        this.setState({
            toggleOpenSearch: false,
            toggleName: true,
            toggleExp: false,
            toggleCert: false,
            isSearch: true
        })
        this._isFocus(false);
    }

    handleOpenSearch = () => {
        this._isFocus(true);
        this._clearFrienFound();
        this.setState(prevState => ({
                toggleOpenSeeAll: false,
                toggleOpenSearch: true,
                isSearch: true
            })
        ); 
    }

    searchFrined = (e) => {
        const { toggleCert, toggleExp, invitationList } = this.state
        this.setState({
            searchKey: ""
        })
        this._isSearch(true);
        //this._clearFrienFound();
        let key = e.target.value;
        this.setState({
            searchKey: key
        })
        //// console.log(this.state.inInvitation);

        if(key != "" && !this.state.toggleExp && !this.state.toggleCert) {
            let array = [];
            this.friendList.forEach((index, seq) => {
                //// console.log(index);
                const found = index.name.includes(key);
                if(found) {
                    //// console.log(index.name);
                    if(this.state.invitationList.find(e => e.id === index.id) === undefined
                        && this.props.memberList.find(e => e.user.id === index.id) === undefined) {
                        array.push(index);
                    }
                }
            })
            this._setFrienFound(array);
        }
        else if(key != "") {
            this.setState({
                isSearchLoading: true
            })
            let searchKeyToggle = ''
            if(toggleExp) {
                searchKeyToggle = '?experienceName='
            }
            if(toggleCert) {
                searchKeyToggle = '?certificateName='
            }

            axios.get(API_USER_PROFILE_FRIEND_LIST + searchKeyToggle + key).then(response => {
                if(response.status == 200) {
                    let array = []
                    const friend = response.data.payload.listFriends.listFriend
                    friend.forEach((key1, i1) => {
                        const check = invitationList.find((e) => e.id == key1.id) === undefined
                        if(check) {
                            let tmp = key1
                            tmp.name = `${key1.name} ${key1.surname}`
                            array.push(tmp)
                        }
                    })
                    this._setFrienFound(array);
                    //console.log('exp-search', array)
                }
                this.setState({
                    isSearchLoading: false
                })
            }).catch(error => {
                console.log('invite-event-error', error)
            })
        }
        else {
            this.setState({
                searchKey: ""
            })
        }
        this._isSearch(false);
    }

    handleToggleName = () => {
        this._clearFrienFound();
        this.setState(prevState => ({
                toggleName: true,
                toggleExp: false,
                toggleCert: false,
                clear: true
            })
        );
    }

    handleToggleExp = () => {
        this._clearFrienFound();
        this.setState(prevState => ({
                toggleName: false,
                toggleExp: true,
                toggleCert: false,
                clear: true
            })
        );
    }

    handleToggleCert = () => {
        this._clearFrienFound();
        this.setState(prevState => ({
                toggleName: false,
                toggleExp: false,
                toggleCert: true,
                clear: true
            })
        );
    }

    clickInvitation = (e) => {
        // console.log("click invited")
        this._clearFrienFound();
        const element = document.getElementsByClassName("event-seacrh-invitation");
        element[0].value = "";
        this.setState({
            toggleOpenSearch: false
        })
        let array = this.state.invitationList;
        array.push(e);
        this.setState({
            invitationList: array
        })
    }

    removeInvitation = (index) => {
        let array = this.state.invitationList;
        array.splice(index, 1);
    }
    
    handleCloseInvitationBox = () => {
        this._clearFrienFound();
        this.props.toggle(false);
    }


    render() {
        const { isSearch, toggleName, toggleCert, toggleExp, 
                searchKey, toggleOpenSearch, invitationList, 
                msgIn, msgOut, msgToggle, isSearchLoading} = this.state;
        const { isOpen, t, createrId } = this.props;
        return (
                <Modal className={"invite-friend-popup-open"} isOpen={isOpen} toggle={this.handleCloseInvitationBox}>
                    <div className={"invite-friend-popup-open"} onClick={this.handleCloseSearch}>
                        <ModalHeader className={"invite-friend-popup-head"} toggle={this.handleCloseInvitationBox}>
                            <div className={"invite-friend-popup-head-title"}>{t('CREATE.invite_friend')}</div>
                        </ModalHeader>
                        <ModalBody className={"invite-friend-popup-body"}>
                            <div className={"invite-friend-popup-body-title"}>
                                {t('INVITE.invite_descript')}
                            </div>
                            <div className={"invite-friend-popup-members"}>
                                <div className={"invite-friend-popup-search"}>
                                    <input 
                                        className={"event-seacrh-invitation"}
                                        type={"search"} 
                                        placeholder={"   " + t('CREATE.invite_friend')} 
                                        onClick={this.handleOpenSearch} 
                                        onChange={(e) => this.searchFrined(e)}
                                        onMouseEnter={() => this._isFocus(true)}
                                        onMouseLeave={() => this._isFocus(false)}
                                    />
                                    <img
                                        className={"popup-search-icon"}
                                        src={"../../static/images/icon/AW_CrewHitz_ICON-51.png"}
                                        />
                                    <div 
                                        className={toggleOpenSearch ? "search-box-display" : "search-box-none"}
                                        onMouseLeave={() => this._isFocus(false)}
                                        onMouseEnter={() => this._isFocus(true)}
                                    >
                                        <div className={"search-filter"}>
                                            <div className={toggleName ? "filter-on" : "filter-off"} onClick={this.handleToggleName}>Name</div>
                                            <div className={toggleExp? "filter-on" : "filter-off"} onClick={this.handleToggleExp}>Experience</div>
                                            <div className={toggleCert ? "filter-on" : "filter-off"} onClick={this.handleToggleCert}>Certificate</div>
                                        </div>
                                        <div className={"search-box-body"}>
                                        {
                                            isSearch || searchKey === "" ? 
                                                t('INVITE.input')
                                            :
                                            this.friendFound.length > 0 ? 
                                                this.friendFound.map(index => (
                                                    <div onClick={() => this.clickInvitation(index)}>
                                                        <img
                                                            src={
                                                                index.profilePic ? 
                                                                imageWithToken(index.profilePic) 
                                                                : 
                                                                "../../../static/images/icon/user_avatar.png"
                                                            }
                                                        />
                                                        <label className={"search-box-name"}>{index.name.length <= 60 ? index.name : `${index.name.substring(0, 60)}...`}</label>
                                                        <img 
                                                            className={"img-msg"} 
                                                            src={msgOut}
                                                            onMouseEnter={(e) => e.target.src = msgIn}
                                                            onMouseOut={(e) => e.target.src = msgOut}
                                                            onClick={""/* add function click chat here !!*/} 
                                                        />
                                                    </div>
                                                ))
                                            : !isSearchLoading ?
                                                <div>
                                                    <label>{t('INVITE.not_found')}</label>
                                                </div>
                                                :
                                                <div>
                                                    {t('INVITE.loading')}
                                                </div>
                                        }
                                        </div>
                                    </div>
                                </div>
                                <div className={"invite-fiend-popup-member-list"}>
                                {
                                    invitationList.map((data, index) => (
                                        <Member 
                                            detail={data} 
                                            remove={this.removeInvitation} 
                                            index={index}
                                            createrId={createrId}
                                        />
                                    ))
                                }      
                                </div>
                            </div>
                            <div className={"invite-freind-popup-bnt"}>
                                <Button onClick={this.handleCloseInvitationBox} color={'secondary'}>
                                    <div className={"font12"}>{t('CREATE.cancle')}</div>
                                </Button>
                                <Button onClick={this.setEventInvitationList} color={'primary'}>
                                    <div className={"font12"}>{t('CREATE.share')}</div>
                                </Button> 
                            </div>
                        </ModalBody>
                    </div>
                </Modal>
        )
    }
}

export default compose(
    withNamespaces('event'),
    withToastManager
)(InvitationBox)