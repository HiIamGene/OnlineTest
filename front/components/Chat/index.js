import React, { Component } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { ADD_ROOM, ADD_CURRENT_ROOM } from "../../redux/reducers/chatReducer";
import socketIOclient from "socket.io-client";
import { SOCKET_MESSAGE, API_MESSAGE_LIST, API_MESSAGE_CHAT_ROOM } from "../../constant/ENV";
import axios from "axios";
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            limit: 3,
            count: 0,
            chatRoomId: ""
        };
        this._changeChatLimit = this._changeChatLimit.bind(this);
        this._setChatRoom = this._setChatRoom.bind(this);
        this.socketIO = socketIOclient(SOCKET_MESSAGE, {
            query: {
                authorization: this.props.auth.token
            }
        });
        console.log("socket-msg", this.socketIO);
    }
    _changeChatLimit() {
        // console.log("window.innerWidth : ",this.state.width)
        this.setState({
            width: window.innerWidth
        });
        if (this.state.width >= 1600) {
            this.setState({
                limit: 3
            });
        }
        if (this.state.width < 1600 && this.state.width >= 1200) {
            this.setState({
                limit: 2
            });
        }
        if (this.state.width < 1200) {
            this.setState({
                limit: 1
            });
        }
    }

    componentDidMount() {
        this._changeChatLimit();
        try {
            this.socketIO.on("recive_message", data => this._setChatRoom(data));
        } catch (e) {
            console.log(e);
        }
        window.addEventListener("resize", this._changeChatLimit);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this._changeChatLimit);
    }

    async _setChatRoom(data) {
        console.log(data);
        if (this.props.chatlist.data.length === 0) {
            console.log("data chat list popup", data);
            const res = await axios.get(`${API_MESSAGE_CHAT_ROOM}/${data.chatRoom.id}`);
            const { payload } = res.data;
            let memberOther;
            await payload.member.map(member => {
                if (member.user.id !== this.props.profile.user.id) memberOther = member;
            });
            let audio = new Audio("../../static/audio/ichat_ringtone.mp3");
            if (data.chatRoom.type === "PRIVATE") {
                await this.props.addRoom({
                    name: memberOther.user.name + " " + memberOther.user.surname,
                    status: data.status,
                    profilePic: memberOther.user.profilePic,
                    id: memberOther.user.id,
                    chatRoom: data.chatRoom.id,
                    type: data.chatRoom.type
                });
                await this.props.addCurrentRoom({
                    name: memberOther.user.name + " " + memberOther.user.surname,
                    status: data.status,
                    profilePic: memberOther.user.profilePic,
                    id: memberOther.user.id,
                    chatRoom: data.chatRoom.id,
                    type: data.chatRoom.type
                });
                if (this.props.profile.user.id !== memberOther.user.id) audio.play();
            } else {
                await this.props.addRoom({
                    name: data.chatRoom.name,
                    status: data.status,
                    profilePic: data.chatRoom.pic,
                    chatRoom: data.chatRoom.id,
                    type: data.chatRoom.type
                });
                await this.props.addCurrentRoom({
                    name: data.chatRoom.name,
                    status: data.status,
                    profilePic: data.chatRoom.pic,
                    chatRoom: data.chatRoom.id,
                    type: data.chatRoom.type
                });
            }
            console.log(this.props.chatlist.data);
        }
        else if (this.props.chatlist.data.some(chat => chat.chatRoom.id !== data.chatRoom.id)) {
            console.log("Found v2");
            const res = await axios.get(`${API_MESSAGE_CHAT_ROOM}/${data.chatRoom.id}`);
            const { payload } = res.data;
            let memberOther;
            await payload.member.map(member => {
                if (member.user.id !== this.props.profile.user.id) memberOther = member;
            });
            let audio = new Audio("../../static/audio/ichat_ringtone.mp3");
            if (data.chatRoom.type === "PRIVATE") {
                await this.props.addRoom({
                    name: memberOther.user.name + " " + memberOther.user.surname,
                    status: data.status,
                    profilePic: memberOther.user.profilePic,
                    id: memberOther.user.id,
                    chatRoom: data.chatRoom.id,
                    type: data.status.type
                });
                await this.props.addCurrentRoom({
                    name: memberOther.user.name + " " + memberOther.user.surname,
                    status: data.status,
                    profilePic: memberOther.user.profilePic,
                    id: memberOther.user.id,
                    chatRoom: data.chatRoom.id,
                    type: data.status.type
                });
                if (this.props.profile.user.id !== memberOther.user.id) audio.play();
            } else {
                await this.props.addRoom({
                    name: data.chatRoom.name,
                    status: data.status,
                    profilePic: data.chatRoom.pic,
                    chatRoom: data.chatRoom.id,
                    type: data.chatRoom.type
                });
                await this.props.addCurrentRoom({
                    name: data.chatRoom.name,
                    status: data.status,
                    profilePic: data.chatRoom.pic,
                    chatRoom: data.chatRoom.id,
                    type: data.chatRoom.type
                });
            }
        }
    }
    render() {
        let data = this.state;
        let { chatRoomId } = this.state;
        return (
            <div className={"cr-chat"}>
                <ChatList />
                <div className="chatroom-row-container">
                    {this.props.chatlist.data.map((message, index) => {
                        if (index < data.limit) {
                            return (
                                <ChatBox
                                    key={index}
                                    name={message.name}
                                    status={"● " + message.status}
                                    index={index}
                                    profilePic={message.profilePic}
                                    id={message.type === "PUBLIC" ? message.chatRoom : message.id}
                                    chatRoom={message.chatRoom}
                                    type={message.type}
                                    isSomeoneChat={this.checkChat}
                                />
                            );
                        }
                    })}
                    {this.props.chatlist.data.length > data.limit ? (
                        <div className="chat-limit-number-show">
                            <p onMouseOver={() => console.log("Show", this.props.chatlist.data)}>
                                {this.props.chatlist.data.length - data.limit}
                            </p>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        chatlist: state.chatReducer,
        socket: state.socketReducer,
        auth: state.authReducer,
        profile: state.profileReducer,
        error: state.errorReducer
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
)(Chat);
