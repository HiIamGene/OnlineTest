import React from 'react'
import ImageProfile from "./ImageProfile"
import Menu from "./Menu"
import Icon from "../../Icon/Icon"
import { Progress, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { WIDTH_BREAKPOINT } from "../../../constant/responsive"
import { Desktop, Mobile } from "../../Responsive"
import compose from "recompose/compose"
import { connect } from "react-redux"
import { withRouter } from "next/router"
import ProfileUploader from "./ProfileUploader"
import { withNamespaces } from '../../../lib/i18n'
import axios from 'axios';
import { API_USER_PROFILE_AVAILABLE } from '../../../constant/ENV';
import { addFriend, friendList, unFriend } from '../../../services/userService';
import { SET } from '../../../redux/reducers/friendReducer';
class TimelineHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileModal: false,
            availableStatus: '',
            loaded: false,
            clickAdded: false,
            friend: 0,
            unFriendMockUp: false,
            isShow: false,
            isConfirmShow: false
        }
        this.availableText()
        this._isShow = this._isShow.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);   
        
        this.checkFriend = this.checkFriend.bind(this)
        this.setAvailableText = this.setAvailableText.bind(this)
        this._addFriend = this._addFriend.bind(this)
        this._unFriend = this._unFriend.bind(this)
        
    }
    async availableText() {
        axios.get(API_USER_PROFILE_AVAILABLE).then(async response => {
            let data = await response.data.payload.availableType
            this.setAvailableText(data)
            this.setState({
                loaded: false
            })
        })
    }
    async _unFriend() {
        // console.log("connect : ",this.props.anotherProfile);
        let res = await unFriend(this.props.anotherProfile.anotherProfile.user.id);
        // console.log("respond : ",res);
        this.setState({
            clickAdded: false
        })
    }
    _isShow(data) {
        this.setState({
            isShow: data
        })
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                isShow: false
            })
        }
    }
    _showConfirm(data) {

    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }
    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    setAvailableText(input) {
        if (this.state.loaded) return this.state.availableStatus

        if (input == 'READY_TO_JOIN') {
            this.setState({
                availableStatus: 'Ready to join'
            })
        }
        else if (input == 'READY_FROM') {
            this.setState({
                availableStatus: 'Ready from'
            })
        }
        else if (input == 'CUSTOM_DATE') {
            this.setState({
                availableStatus: 'Ready on custom date'
            })
        }
        this.setState({
            loaded: true
        })
        return this.state.availableStatus
    }


    viewAbout = () => {
        if (this.anotherProfile === true) {
            this.props.router.push("/about?search="+this.props.anotherProfile.anotherProfile.user.id)
        }
        else {
            this.props.router.push("/about")
        }

    }

    toggleModalProfile = () => {
        this.setState((state => ({
            profileModal: !state.profileModal
        })));
    }

    checkFriend() {
        let data = this.props.anotherProfile;
        return false;
    }
    async _addFriend() {
        let res = await addFriend(this.props.anotherProfile.anotherProfile.user.id);
        this.setState({
            clickAdded: true
        })
    }
    async componentDidMount() {
        let data = await friendList();
        // console.log("data in header : ", data.listFriends.length);
        await this.setState({
            friend: data.listFriends.listFriend.length
        });
        this.props.setPop(this.state);
    }
    showMockupunFriend = () => {
        this.setState(prevState => ({ unFriendMockUp: !prevState.unFriendMockUp }));
    }
    acceptUnFriend = () => {
        this._unFriend();
        this.setState(prevState => ({ unFriendMockUp: !prevState.unFriendMockUp }));
        this.setState({
            clickAdded: false
        })
    }
    /*componentWillUpdate(){
            alert(JSON.stringify(this.props.router))
    }*/
    render(){
       // console.log(this.props.profile)
        let {user,profileStrength} = this.props.profile
        let {friend} = this.state;
        let anotherProfile = false
        const { t, router } = this.props
        if ((router.route === '/friend') || (router.route ==='/timeline') || (router.route ==='/about') || (router.route ==='/photo') || (router.route ==='/event')) {
            // console.log("Header prop : ",this.props);

            if (this.props.anotherProfile.anotherProfile && this.props.router.query.search) {
                user = this.props.anotherProfile.anotherProfile.user
                friend = this.checkFriend()
                anotherProfile = true
                
            }
            else {
                user, profileStrength = this.props.profile;
                anotherProfile = false;
               }
        }
        //console.log("Friends list count", friend);

        return (

            <header className={"timeline-tl-header"}>
                <ProfileUploader isOpen={!anotherProfile ? this.state.profileModal : null} toggle={this.toggleModalProfile} />
                <div className={"timeline-header-left-side"}>
                    <div className={"timeline-header-bar"}>
                        <div className={"abs-wrap-banner"}>
                            <div className={"timeline-wrap-banner"}>

                                <div className={"timeline-wrap-name mb-2"}>
                                    <ImageProfile onChangeProfileClick={this.toggleModalProfile} className="timeline-hide-desktop" />
                                    <div className={"timeline-mobile-wrap-name"}>
                                        <h4 className={"timeline-header-name"}>{user.displayName !== null ? user.displayName.length > 100 ? user.displayName.substring(0, 100).concat('...') : user.displayName : user.name.concat(user.surname).length > 100 ? user.name.concat(user.surname).substring(0, 100).concat('...') : `${user.name} ${user.surname}`}</h4>
                                        <span className={"detail"}>{user.nationality}, {user.currentLocation} </span><br></br>
                                        {!anotherProfile ? <span className={'timeline-available-status'}><span className={'dot'}></span></span> : ""}
                                        <Mobile>
                                            <button className={"timeline-btn-view-resume btn-sm mt-2 mx-auto p-1 "}>{t('view_resume')}</button>
                                        </Mobile>
                                    </div>

                                    <Desktop>
                                        <div className={"timeline-wrap-btn-edit-profile"}>
                                            {anotherProfile ?
                                                <div>
                                                    {this.props.anotherProfile.anotherProfile.user.friendStatus != "STATUS_TYPE_FRIENDED" ?
                                                        <button onClick={() => { !anotherProfile ? this.viewAbout : this._addFriend() }} className={"btn btn-sm btn-edit-about"} >
                                                            {this.state.clickAdded || this.props.anotherProfile.anotherProfile.user.friendStatus == "STATUS_TYPE_ADDFRIEND" ? t('pending...') : t('+ connect')}
                                                        </button>
                                                         :
                                                        <div>
                                                            <button //onMouseOver={() => { this._isShow(true) }}
                                                             onClick={ this.showMockupunFriend }
                                                             className={"btn btn-sm timeline-btn-edit-about"} >
                                                                {t('connecting')}
                                                            </button>

                                                            <Modal isOpen={this.state.unFriendMockUp} toggle={this.showMockupunFriend} className={this.props.className}>
                                                                <ModalHeader toggle={this.showMockupunFriend}>Are you sure</ModalHeader>
                                                                <ModalBody>
                                                                    you will not see post if you unfriend
                                                                </ModalBody>
                                                                <ModalFooter>
                                                                    <Button color="primary" onClick={this.acceptUnFriend}>Unfriend</Button>{' '}
                                                                    <Button color="secondary" onClick={this.showMockupunFriend}>Cancel</Button>
                                                                </ModalFooter>
                                                            </Modal>

                                                            <button className={"btn btn-sm timeline-btn-edit-about"} >
                                                                {t('send message')}
                                                            </button>
                                                            <div>{this.state.isShow ?
                                                                <div className="friend-option-container" ref={this.setWrapperRef} onClick={() => { this._isShow(false) }}>
                                                                    <div className="friend-mini-pointer" />
                                                                    <div className="friend-option" onClick={ this.showMockupunFriend }><i className="fas fa-ban" style={{ paddingRight: "6px" }} /> unfriend</div>
                                                                </div>
                                                                :
                                                                ""
                                                            }
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                :
                                                <div>
                                                    <button onClick={() => { this.viewAbout }} className={"btn btn-sm timeline-btn-edit-about"} >
                                                        {t('edit_update_profile')}
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </Desktop>
                                </div>
                                {
                                    !anotherProfile ?
                                        (
                                            <div>
                                                <div className={"timeline-wrap-progressbar-strength "}>
                                                    <Progress value={!anotherProfile ? (profileStrength.profileStrength.percent) : 0} />
                                                </div>

                                                <div className={"timeline-wrap-profile-strength mt-1 mb-2"}>
                                                    <div className={"timeline-available-status"}>
                                                        <label></label>
                                                        {!anotherProfile ? this.state.availableStatus : this.setAvailableText(user.availableType)}
                                                    </div>
                                                    <div className={"timeline-profile-strength-type"}>
                                                        {t('profile_strength')} : <h5 className={"timeline-strength-percentage"}>{!anotherProfile ? (profileStrength.profileStrength.percent) : profileStrength.percent}%</h5>
                                                    </div>
                                                </div>

                                            </div>
                                        ) : ""
                                }
                            </div>
                        </div>
                    </div>
                    <Desktop>
                        <div className={"timeline-header-menu"}>
                            <ImageProfile url={user.profilePic} onChangeProfileClick={this.toggleModalProfile} className="timeline-pic-hide-mobile" anotherProfile={anotherProfile} />
                            <Menu
                                anotherProfile={this.props.anotherProfile}
                                popularity={!this.props.anotherProfile ? friend : this.props.anotherProfile.anotherProfilePage ? this.props.anotherProfile.anotherProfile.user.numberOfFriend : friend}
                            />
                        </div>
                    </Desktop>
                </div>
                {/* <style >
                    {`
                     @media only screen and (max-width: 767px)  {
                        .progress{
                            height: .3rem !important;
                            margin-right: 1em;
                            margin-left: 1em;
                            margin: 1em;
                        }
                     }
                    `}
                </style> */}
            </header>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
        popularity: state.friendReducer,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPop: (number) => { dispatch({ type: SET, payload: number }) }
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withNamespaces('timeline'),
    withRouter
)(TimelineHeader);
//id={!anotherProfile ? this.props.anotherProfile.anotherProfile.user : ""}