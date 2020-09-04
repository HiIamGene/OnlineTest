import { Component } from "react";
import { imageWithToken } from "../../utils/image";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { ADD_ROOM, ADD_CURRENT_ROOM } from "../../redux/reducers/chatReducer";
import { API_MESSAGE_ROOM_DELETE, API_MESSAGE_CHAT_ROOM } from "../../constant/ENV";
import axios from "axios";
import Option from "./Option";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ListMember from "./ListMember";
var moment = require("moment");

class OnlineUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOptionShow: false,
            isOptionOver: false,
            isListFriendOver: false,
            isMemberListShow: false,
            centerStyle: {
                width: "80%"
            }
        };
        this.optionOver = this.optionOver.bind(this);
        this.optionMouseOver = this.optionMouseOver.bind(this);
    }

    checkGroupIsOnline(data) {
        const members = data.member;
        const membersOnline = members.map(member => {
            if (member.status === "ONLINE") return member.status;
            else return member.status;
        });
        return membersOnline.includes("ONLINE") ? "ONLINE" : "OFFLINE";
    }

    optionMouseOver(isOptionShow) {
        this.setState({
            isOptionShow
        });
    }

    optionOver(callBack) {
        this.setState({
            isOptionOver: callBack ? true : false
        });
    }

    addRoom(data) {
        const { isOptionOver, isListFriendOver } = this.state;
        if (!isOptionOver && !isListFriendOver) {
            if (this.props.type == "PRIVATE") {
                this.props.addRoom({
                    name: data.name + " " + data.surname,
                    status: data.status,
                    profilePic: data.profilePic,
                    id: data.id,
                    chatRoom: this.props.chatRoomId,
                    type: this.props.type
                });
                this.props.addCurrentRoom({
                    name: data.name + " " + data.surname,
                    status: data.status,
                    profilePic: data.profilePic,
                    id: data.id,
                    chatRoom: this.props.chatRoomId,
                    type: this.props.type
                });
            } else {
                this.props.addRoom({
                    name: data.name,
                    status: this.checkGroupIsOnline(data),
                    profilePic: data.pic,
                    chatRoom: this.props.chatRoomId,
                    type: data.type
                });
                this.props.addCurrentRoom({
                    name: data.name + " " + data.surname,
                    status: this.checkGroupIsOnline(data),
                    profilePic: data.profilePic,
                    chatRoom: this.props.chatRoomId,
                    type: this.props.type
                });
            }
        }
    }

    listFriendOver(isListFriendOver) {
        this.setState({
            isListFriendOver
        });
    }

    showMemberListModal() {
        this.setState(prevState => ({
            isMemberListShow: !prevState.isMemberListShow
        }));
        this.optionMouseOver(false);
    }

    render() {
        let { data, type, profile } = this.props;
        let { isOptionShow, isMemberListShow, centerStyle } = this.state;
        return (
            <div
                className={"cr-chat"}
                onMouseOver={() => this.optionMouseOver(true)}
                onMouseLeave={() => this.optionMouseOver(false)}
            >
                <div className="friends" onClick={() => this.addRoom(data)}>
                    <div className="left-user">
                        <div className={"chatlist-image-list"}>
                            <img
                                className="image-icon-chatlist-show"
                                src={
                                    data.profilePic
                                        ? imageWithToken(data.profilePic)
                                        : data.pic
                                        ? imageWithToken(data.pic)
                                        : "/static/images/icon/user_avatar_icon.jpg"
                                }
                            />
                        </div>
                    </div>

                    <div className="center" style={centerStyle}>
                        <p>
                            {this.props.type === "PRIVATE"
                                ? data.name.concat(` ${data.surname}`).length > 15
                                    ? data.name
                                          .concat(` ${data.surname}`)
                                          .substring(0, 15)
                                          .concat("...")
                                    : data.name.concat(` ${data.surname}`)
                                : data.name}{" "}
                            <span
                                className="member-count"
                                // onMouseOver={() => this.listFriendOver(true)}
                                // onMouseLeave={() => this.listFriendOver(false)}
                                // onClick={() => this.showMemberListModal()}
                            >
                                {this.props.userLists ? `(${this.props.userLists})` : ""}
                            </span>
                        </p>
                        {isOptionShow && type === "PRIVATE" ? (
                            <Option
                                className={type === "PRIVATE" ? "fas fa-trash" : "fas fa-sign-out-alt"}
                                profile={profile}
                                isOptionShow={isOptionShow}
                                optionOver={this.optionOver}
                                optionShow={this.optionMouseOver}
                                chatRoomId={this.props.chatRoomId}
                                textHeader={type === "PRIVATE" ? "Delete chat" : "Leave group"}
                                text={
                                    type === "PRIVATE"
                                        ? `Are you sure to delete this room?`
                                        : `Are you sure to leave this room?`
                                }
                                type={type === "PRIVATE" ? "chat" : "group"}
                            />
                        ) : null}
                    </div>
                    {this.props.type == "PRIVATE" ? (
                        <div className="right-list">
                            <span>
                                {data.status === "ONLINE" ? (
                                    <div>
                                        <i className="fas fa-circle chat-icon" /> Online
                                    </div>
                                ) : (
                                    moment(data.updatedAt).fromNow()
                                )}
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* <div className="inner-border"></div> */}
                    <Modal isOpen={isMemberListShow} toggle={() => this.showMemberListModal()}>
                        <ModalHeader toggle={() => this.showMemberListModal()}>Group member list</ModalHeader>
                        <ModalBody>
                            <ListMember
                                chatRoomId={this.props.chatRoomId}
                                profile={this.props.profile}
                                optionOver={this.optionOver}
                                optionShow={this.optionMouseOver}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => this.showMemberListModal()}>
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        chatlist: state.chatReducer,
        profile: state.profileReducer
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
)(OnlineUser);
