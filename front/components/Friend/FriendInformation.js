import React, { Component } from 'react'
import { imageWithToken } from "../../utils/image";
import { DEFAULT_AVATAR_URL } from "../../constant";
import compose from "recompose/compose";
import router, { withRouter } from "next/dist/lib/router";
import axios from "axios"
import API from "../../constant/ENV"
class FriendInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isConfirmShow: false
        }
        this._redirect = this._redirect.bind(this);
        this._isShow = this._isShow.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this._showConfirm = this._showConfirm.bind(this);
        this._removeFriend = this._removeFriend.bind(this);
    }
    _redirect() {
        router.push('/timeline?search=' + this.props.data.id);
    }
    _isShow(data) {
        this.setState({
            isShow: data
        })
    }
    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                isShow: false
            })
        }
    }
    async _removeFriend() {
        await axios.delete(API.USER.PROFILE.FRIEND.DELETE_V010000 + this.props.data.id);
        this.props.reload();
    }
    _showConfirm(data) {
        this.setState({
            isConfirmShow: data
        })
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }
    render() {
        const anotherProfile = this.props.anotherProfile
        // console.log("FreindInformation : ",this.props);
        return (
            <div className="friend-information-wrapper">
                <div className="image-state">
                    <img className="friend-img" src={this.props.data.profilePic ? imageWithToken(this.props.data.profilePic) :
                        DEFAULT_AVATAR_URL
                    } alt="friends_list" />
                </div>
                <div className="text">
                    <div className="information-state">
                        <p className="p-name" onClick={() => { this._redirect(); }}>{this.props.data.name.concat(` ${this.props.data.surname}`).length > 50 ? this.props.data.name.concat(` ${this.props.data.surname}`).substring(0, 50) : this.props.data.name.concat(` ${this.props.data.surname}`)}</p>
                        <p className="p-content">{this.props.data.nationality}</p>
                        <p className="p-content">Ship Expert</p>
                    </div>
                    <div className="connection-state">
                        <div className="button-state">
                            <button className="button-connected" onMouseOver={() => { this._isShow(true) }}><i className="fas fa-check" /> Connected</button>
                            {anotherProfile ?
                                ""
                                :
                                <div>
                                    {this.state.isShow ?
                                        <div className="friend-option-container" ref={this.setWrapperRef} onClick={() => { this._isShow(false) }}>
                                            <div className="friend-mini-pointer" />
                                            <div className="friend-option" onClick={() => { this._showConfirm(true) }}><i className="fas fa-ban" style={{ paddingRight: "6px" }} /> Delete</div>
                                        </div>
                                        :
                                        ""
                                    }
                                </div>
                            }
                            {this.state.isConfirmShow ?
                                <div className="modal-post">
                                    <div className="modal-post-main">
                                        <div className="option-post-wrapper">
                                            <div className="option-header">
                                                <div className="option-name-header">Remove Friend</div>
                                                <div className="option-name-close" onClick={() => {
                                                    this._showConfirm(false)
                                                }}><i className="fas fa-times" /></div>
                                            </div>
                                            <div className="option-detail">Are you sure to remove ?</div>
                                            <div className="option-button-container">
                                                <button className="option-button red" onClick={() => {
                                                    this._removeFriend();
                                                    this._showConfirm(false)
                                                }}>
                                                    Remove
                                        </button>
                                                <button className="option-button grey" onClick={() => {
                                                    this._showConfirm(false)
                                                }}>
                                                    Cancel
                                        </button>
                                            </div>
                                        </div>
                                    </div></div> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    withRouter
)(FriendInformation)