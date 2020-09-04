import React, { Component } from 'react';
import Card from "../../../components/Timeline/Card"
import FriendItem from "./FriendItem"
import compose from "recompose/compose";
import { withNamespaces } from "../../../lib/i18n";
import { withRouter } from "next/dist/lib/router";
import {
    API_USER_PROFILE_FRIEND_LIST_V1,
    API_USER_PROFILE_ANOTHER_FRIEND_LIST
} from "../../../constant/ENV"
import axios from "axios"
import SeeMore from "../EventsBox/SeeMore"

class FriendsBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            suggestFriend: new Array()
        }
    }

    componentDidMount() {
        this.getInitialSuggestFriend()
    }

    getInitialSuggestFriend = () => {
        this.setState({
            loading: true
        })
        if (this.props.anotherProfile.search == null) {
            axios.get(API_USER_PROFILE_FRIEND_LIST_V1).then(response => {
                if (response.status == 200) {
                    const suggestFriend = response.data.payload.listFriends.slice(0, 5)
                    this.setState({
                        loading: false,
                        suggestFriend: suggestFriend
                    })
                }
            })
        }
        else {
            axios.get(API_USER_PROFILE_ANOTHER_FRIEND_LIST + this.props.anotherProfile.search).then(response => {
                if (response.status == 200) {
                    const suggestFriend = response.data.payload.listFriends.slice(0, 5)
                    this.setState({
                        loading: false,
                        suggestFriend: suggestFriend
                    })
                }
            })
        }

    }

    onClickSeeMore = () => {
        if (this.props.anotherProfilePage) {
            this.props.router.push("/friend?search=" + this.props.anotherProfile.search)
        }
        else {
            this.props.router.push("/friend")
        }


    }


    render() {
        const { t,anotherProfile } = this.props
        const { suggestFriend, loading } = this.state
        const countSuggestFriend = suggestFriend.length
        return (
            <Card title={t('friends')}>
                <div className={"wrapper"}>
                    {!loading ?
                        <div> {
                            countSuggestFriend > 0 ?
                                suggestFriend.map((key, index) => (
                                    <FriendItem anotherProfile={anotherProfile} detail={key} key={index} />
                                ))
                                :
                                <span>No Friend at now, try connect to someone</span>
                        }
                            {
                                countSuggestFriend > 0 ?

                                    <div>
                                        
                                        <SeeMore text={this.props.anotherProfile? "See more "+this.props.name+"'s Friend":"See more your Friend"} onClick={this.onClickSeeMore} />
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        :
                        <div className={"loading-event"}>
                            <img
                                className={"loading-event-gif"}
                                src={"static/images/image-loader/spinner-loader.gif"}
                            />
                        </div>
                    }
                </div>

                <style jsx>{`
                    .btn-find-friend{
                        transition: all .2s ease-in-out;
                        font-family: "Cloud";
                        color: #31a7d7;
                        cursor: pointer;
                        line-height: 1.2;
                        font-size: 12.8px;
                    }
    
                    .btn-find-friend:hover{
                        transform: scale(1.02);
                    }
                    .wrapper{
                        overflow:hidden;
                    }
                `}</style>
            </Card>
        );
    }
}

export default compose(
    withNamespaces('timeline'),
    withRouter
)(FriendsBox);