import React, { Component } from 'react'
import compose from "recompose/compose"
import { withNamespaces } from "../../../lib/i18n"
import { withRouter } from "next/dist/lib/router"
import { imageWithToken } from "../../../utils/image"
import { DEFAULT_AVATAR_URL } from "../../../constant"
import { addFriend, checkFriend } from '../../../services/userService'
import { withToastManager } from "react-toast-notifications"
import {
    API_USER_PROFILE_ANOTHER_PROFILE
} from "../../../constant/ENV"
import axios from "axios"

class FriendItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addFriend: false,
            isFriend: false,
            clickAdded: false,
            friendStatus: [],
        }
        //console.log("suggest friend detail => ", this.props.detail)
    }

    _getData = () => {
        const url = API_USER_PROFILE_ANOTHER_PROFILE + this.props.detail.id
        axios.get(url).then(response => {
            if (response.status == 200) {
                const getData = response.data.payload
                this.setState({
                    friendStatus: getData.friendStatus
                }
                )
            }
        }
        )
    }


    collaspeString = (str, num) => {
        if (str.length <= num) {
            return str
        }
        else return `${str.substring(0, num)}...`

    }
    _checkFriend = async () => {
        const res = await checkFriend(this.props.detail.id)
        this.setState({
            isFriend: res
        })
    }

    handleAddFriend = async () => {
        const add = await addFriend(this.props.detail.id)
        this.setState({
            addFriend: true,
            clickAdded: true
        })
        this.props.toastManager.add("Add Friend Success", {
            appearance: 'success',
            autoDismiss: true,
        });
    }

    onClickToProfile = () => {
        this.props.router.push(`/timeline?search=${this.props.detail.id}`)

    }
    componentDidMount() {
        this._getData()
        this._checkFriend()

    }

    render() {
        const { addFriend } = this.state
        const { t, detail } = this.props
        const { name, surname } = detail
        const numCollaspeString = 16
        return (
            <div className={"friend-item-profile"}>
                <div className={"f-wrapper"}>
                    <div className={"friend-profile"} onClick={this.onClickToProfile}>
                        <img
                            src={detail.profilePic ?
                                imageWithToken(detail.profilePic)
                                :
                                DEFAULT_AVATAR_URL
                            }
                            alt=""
                        />
                    </div>
                    <div className={"detail"}>
                        <span onClick={this.onClickToProfile}>{`
                            ${this.collaspeString(name, numCollaspeString)} ${this.collaspeString(surname, numCollaspeString)}
                        `}</span>
                        <small>{detail.organization != null ?
                            this.collaspeString(detail.organization, 12)
                            :
                            null
                        }</small>
                        <div className={"mutual-friend"}>
                            <div className={"sm-profile"}>
                                <img
                                    src={DEFAULT_AVATAR_URL}
                                    alt=""
                                />
                            </div>
                            <span className={"mutual"}>
                                0 {t('FRIENDS.mutual_connection')}
                            </span>
                        </div>
                    </div>

                    {this.state.isFriend ?
                        <button className={"btn-add-friend"}>
                            <img src={"static/images/icon/message.png"} className={"btn-message-profile"} />
                        </button>
                        :
                        <div className={"info-container"}>
                            <button className="button-connectedFriend" onClick={() => { this.handleAddFriend() }}>
                                {this.state.clickAdded || this.state.friendStatus == "STATUS_TYPE_ADDFRIEND" ? t('pending...') : t('+ connect')}
                            </button>
                            <button className={"btn-add-friend"}>
                                <img src={"static/images/icon/message.png"} className={"btn-message-profile"} />
                            </button>
                        </div>
                    }

                </div>
            </div>
        );
    }
}

export default compose(
    withNamespaces('timeline'),
    withRouter,
    withToastManager
)(FriendItem);