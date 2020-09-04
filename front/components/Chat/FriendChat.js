import React, { Component } from "react";
import Option from "./Option";
import { imageWithToken } from "../../utils/image";
import axios from "axios";
import { API_MESSAGE_PRIVATE } from "../../constant/ENV";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { ADD_ROOM, ADD_CURRENT_ROOM } from "../../redux/reducers/chatReducer";

const friendStyle = {
    padding: "10px"
};
class FriendChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOptionShow: false,
            isOptionOver: false,
            isUnfriend: false,
            friendId: ""
        };
        this.optionOver = this.optionOver.bind(this);
        this.optionMouseOver = this.optionMouseOver.bind(this);
        this.unfriend = this.unfriend.bind(this);
    }
    optionMouseOver(isOptionShow) {
        this.setState({
            isOptionShow
        });
    }

    unfriend(callBack, friendId) {
        if (callBack) {
            this.setState({
                isUnfriend: callBack,
                friendId
            });
        }
    }

    optionOver(callBack) {
        this.setState({
            isOptionOver: callBack ? true : false
        });
    }
    async addRoom(data) {
        const { isOptionOver, isListFriendOver } = this.state;
        if (!isOptionOver && !isListFriendOver) {
            await axios
                .post(`${API_MESSAGE_PRIVATE}`, {
                    userId: data.id
                })
                .then(res => {
                    const { payload } = res.data;
                    this.props.addRoom({
                        name: data.name + " " + data.surname,
                        status: data.status,
                        profilePic: data.profilePic,
                        id: data.id,
                        chatRoom: payload.id,
                        type: payload.type
                    });
                    this.props.addCurrentRoom({
                        name: data.name + " " + data.surname,
                        status: data.status,
                        profilePic: data.profilePic,
                        id: data.id,
                        chatRoom: payload.id,
                        type: payload.type
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }
    render() {
        const { friend } = this.props;
        const { isOptionShow, isUnfriend, friendId } = this.state;
        return !isUnfriend && friend.id !== friendId ? (
            <div
                className={"cr-chat"}
                onMouseOver={() => this.optionMouseOver(true)}
                onMouseLeave={() => this.optionMouseOver(false)}
            >
                <div className="friends" onClick={() => this.addRoom(friend)}>
                    <div className="left-user">
                        <div className={"chatlist-image-list"}>
                            <img
                                className="image-icon-chatlist-show"
                                src={
                                    friend.profilePic
                                        ? imageWithToken(friend.profilePic)
                                        : "/static/images/icon/user_avatar_icon.jpg"
                                }
                            />
                        </div>
                    </div>

                    <div className="center" style={{ width: "100%" }}>
                        <p>
                            {friend.name.concat(` ${friend.surname}`).length > 15
                                ? friend.name
                                      .concat(` ${friend.surname}`)
                                      .substring(0, 15)
                                      .concat("...")
                                : friend.name.concat(` ${friend.surname}`)}
                            <span
                                className="member-count"
                                onMouseOver={() => this.listFriendOver(true)}
                                onMouseLeave={() => this.listFriendOver(false)}
                                onClick={() => this.showMemberListModal()}
                            ></span>
                        </p>
                        {isOptionShow ? (
                            <Option
                                className="fas fa-user-slash"
                                isOptionShow={isOptionShow}
                                optionOver={this.optionOver}
                                optionShow={this.optionMouseOver}
                                chatRoomId={this.props.chatRoomId}
                                textHeader={"Unfriend"}
                                text={
                                    <span>
                                        Are you sure to unfriend with <span className="cloud">{friend.name}</span>?
                                    </span>
                                }
                                type={"friend"}
                                friendId={friend.id}
                                unfriend={this.unfriend}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        ) : null;
    }
}

const mapStateToProps = state => {
    return {
        chatlist: state.chatReducer
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addRoom: component => {
            dispatch({
                type: ADD_ROOM,
                payload: component
            });
        },
        addCurrentRoom: component => {
            dispatch({
                type: ADD_CURRENT_ROOM,
                payload: component
            });
        }
    };
};
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FriendChat);
