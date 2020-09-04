import React, { Component } from "react";
import { imageWithToken } from "../../utils/image";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { setMember, addRoom, addCurrentRoom } from "../../redux/actions/chatAction";
import { ListGroupItem, Button } from "reactstrap";
import axios from "axios";
import {
    API_USER_PROFILE_ANOTHER_PROFILE,
    API_USER_PROFILE_ADD_ANOTHER_PROFILE,
    API_MESSAGE_PRIVATE
} from "../../constant/ENV";

class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusFriend: null,
            isFriend: false
        };
    }

    async componentWillMount() {
        const url = API_USER_PROFILE_ANOTHER_PROFILE + this.props.member.user.id;
        await axios
            .get(url)
            .then(res => {
                const payload = res.data.payload;
                if (payload.friendStatus === "STATUS_TYPE_ADDFRIEND") {
                    this.setState({
                        statusFriend: "Pending..."
                    });
                } else if (payload.friendStatus === "STATUS_TYPE_NO_RELATION") {
                    this.setState({
                        statusFriend: "+ Add Friend"
                    });
                } else {
                    this.setState({
                        statusFriend: "Friend",
                        isFriend: true
                    });
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    chatImageOver(isImageOver) {
        this.setState({
            isImageOver
        });
    }

    kickToggle() {
        this.props.kickToggle();
    }

    setMember(data) {
        this.props.setMember(data);
    }

    async addFriend(userId) {
        await axios
            .post(`${API_USER_PROFILE_ADD_ANOTHER_PROFILE}`, {
                userId
            })
            .then(res => {
                console.log(res);
                this.setState({
                    statusFriend: "Pending..."
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    async addChatRoom(data) {
        await axios
            .post(API_MESSAGE_PRIVATE, {
                userId: data.user.id
            })
            .then(res => {
                console.log(res.data.payload);
                this.props.addRoom({
                    name: data.user.name + " " + data.user.surname,
                    status: data.user.status,
                    profilePic: data.user.profilePic,
                    id: data.user.id,
                    chatRoom: res.data.payload.id,
                    type: res.data.payload.type
                });
                this.props.addCurrentRoom({
                    name: data.user.name + " " + data.user.surname,
                    status: data.user.status,
                    profilePic: data.user.profilePic,
                    id: data.user.id,
                    chatRoom: res.data.payload.id,
                    type: res.data.payload.type
                });
            });
    }

    render() {
        const { member, profile, creatorData, chatlist, index } = this.props;
        const { statusFriend, isFriend } = this.state;
        const memberHasKick = {
            display: "none"
        };
        return statusFriend !== "" ? (
            <div style={chatlist.memberUserId.includes(member.user.id) && chatlist.isKick ? memberHasKick : null}>
                <ListGroupItem key={index}>
                    <div className="list-member" onMouseOver={() => this.setMember(member)}>
                        <div className="left-member">
                            <img
                                className={"member-image"}
                                src={
                                    member.user.profilePic
                                        ? imageWithToken(member.user.profilePic)
                                        : "../../static/images/icon/user_avatar_icon.jpg"
                                }
                            />
                        </div>

                        <div className="center-member">
                            <p className="m-0 ml-3 cloud">
                                {member.user.name.concat(` ${member.user.surname}`).length > 30
                                    ? member.user.name.concat(` ${member.user.surname}`).substring(0, 30)
                                    : member.user.name.concat(` ${member.user.surname}`)}{" "}
                                <span className="member-type-text">{` (${
                                    member.type === "GENERAL" ? "Member" : "Owner"
                                })`}</span>
                            </p>
                        </div>
                        <div className="right-member">
                            {creatorData.type ? (
                                creatorData.user.id === profile.user.id && profile.user.id !== member.user.id ? (
                                    <div>
                                        <img
                                            onClick={async () => {
                                                this.kickToggle();
                                            }}
                                            className="chat-icon mr-4"
                                            src={"../../static/images/icon/AW_CrewHitz_ICON-38.png"}
                                        />
                                    </div>
                                ) : null
                            ) : null}
                            {profile.user.id !== member.user.id ? (
                                <div>
                                    <img
                                        onClick={() => this.addChatRoom(member)}
                                        className="chat-icon"
                                        src={"../../static/images/icon/AW_CrewHitz_ICON-11.png"}
                                    />
                                </div>
                            ) : null}

                            {!isFriend && profile.user.id !== member.user.id && statusFriend !== "Friend" ? (
                                <div className="ml-2">
                                    <Button
                                        color="secondary"
                                        onClick={
                                            statusFriend === "+ Add Friend"
                                                ? () => this.addFriend(member.user.id)
                                                : null
                                        }
                                        disabled={statusFriend === "Pending..." ? true : false}
                                    >
                                        {statusFriend}
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </ListGroupItem>
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
        { setMember, addRoom, addCurrentRoom }
    )
)(Member);
