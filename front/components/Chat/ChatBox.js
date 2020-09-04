import React, { Component } from "react";
import { imageWithToken } from "../../utils/image";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { DELETE_ROOM } from "../../redux/reducers/chatReducer";
import { SET_MESSAGE_OF_CHAT, DELETE_MESSAGE_OF_CHAT } from "../../redux/reducers/messageReducer";
import { VIDEO_CALL_COUNT } from "../../redux/reducers/chatReducer";
import { withRouter } from "next/router";
import cookies from "js-cookie";
import ChatInput from "./ChatInput";
import axios from "axios";
import { API_MESSAGE_HISTORY, API_MESSAGE_CHAT_ROOM, SOCKET_MESSAGE } from "../../constant/ENV";
import Link from "next/link";
import ChatPrivate from "./ChatPrivate";
import ChatGroup from "./ChatGroup";
import socketIOclient from "socket.io-client";
class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideChatroom: true,
            display: false,
            socketConnect: false,
            message: "",
            addClick: false,
            image: "",
            file: "",
            filename: "",
            chatPage: 1,
            chatHistory: [],
            scrollHeight: 0,
            showRead: false,
            chatRoomId: this.props.chatlist.currentData.chatRoom,
            myProfile: this.props.profile.user,
            members: [],
            chatRoomType: "PRIVATE",
            friendData: {
                id: this.props.id,
                name: this.props.name,
                profilePic: this.props.profilePic
            }
        };
        this.closeChat = this.closeChat.bind(this);
        this.hideChat = this.hideChat.bind(this);
        this._sendmessage = this._sendmessage.bind(this);
        this._messageReceiver = this._messageReceiver.bind(this);
        this._isAddclick = this._isAddclick.bind(this);
        this._photoReceiver = this._photoReceiver.bind(this);
        this._fileReceiver = this._fileReceiver.bind(this);
        this._sendPhoto = this._sendPhoto.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this._ConnectChat = this._ConnectChat.bind(this);
        this._loadHistory = this._loadHistory.bind(this);
        this._msgHover = this._msgHover.bind(this);
        this.socketIO = this.props.auth.isLogin
            ? socketIOclient(SOCKET_MESSAGE, {
                  query: {
                      authorization: this.props.auth.token
                  }
              })
            : "";
        // this._isClick = this._isClick.bind(this);
    }

    async componentWillMount() {
        const res = await axios.get(`${API_MESSAGE_CHAT_ROOM}/${this.props.chatRoom}`);
        const chatRoomData = res.data.payload;
        const members = [];
        await this._loadHistory(this.state.chatPage);
        chatRoomData.member.map(member => {
            if (member.user.id !== this.props.profile.user.id) {
                members.push(member);
            }
        });
        this.setState({
            chatRoomType: chatRoomData.type,
            members
        });
        this.socketIO.emit("read-at", {
            chatRoomId: chatRoomData.id
        });
        this.getDataReadAt();
        let chatbody = document.getElementsByClassName("conversation-area");
        chatbody[this.props.index].scrollTop = chatbody[this.props.index].scrollHeight;
    }

    getDataReadAt() {
        this.socketIO.on("get-read-at", socket => {
            console.log(socket);
        });
    }

    hideChat() {
        this.setState({
            hideChatroom: !this.state.hideChatroom
        });
    }
    async closeChat() {
        const { chatRoom, index } = this.props;
        await this.props.deleteMessageOfChat(chatRoom);
        await this.props.deleteRoom(index);
        this.setState({
            hideChatroom: true
        });
    }
    async componentDidMount() {
        if (this.socketIO && !this.state.socketConnect) {
            // // console.log("Chat room start");
            this.socketIO.on("recive_message", this._ConnectChat);
            this.setState({
                socketConnect: true
            });
        }
        document.querySelector(".conversation-area").addEventListener("scroll", () => {
            this.scrollToTop();
        });
        let chatbody = document.getElementsByClassName("conversation-area");
        chatbody[this.props.index].scrollTop = chatbody[this.props.index].scrollHeight;
    }

    componentWillReceiveProps(nextProps) {
        let chatbody = document.getElementsByClassName("conversation-area");
        chatbody[this.props.index].scrollTop = chatbody[this.props.index].scrollHeight;
        this.getDataReadAt();
    }

    componentWillUnmount() {
        this.socketIO.removeListener("recive_message", this._ConnectChat);
        document.querySelector(".conversation-area").removeEventListener("scroll", () => {
            this.scrollToTop();
        });
        this.setState({});
    }
    async _loadHistory(page) {
        let { chatHistory } = this.state;
        let res = await axios.get(`${API_MESSAGE_HISTORY}?chatRoomId=${this.props.chatRoom}&page=${page}`);
        // // console.log("Chat History res : ",res.data.payload);
        let { data } = res;
        let { payload } = data;
        let { message } = payload;
        message.reverse();
        await this.setState({
            chatHistory: [...message, ...chatHistory]
        });
        // // console.log("chatHistory : ",this.state.chatHistory);
    }
    _msgHover(data) {
        this.setState({
            showRead: data
        });
    }
    _ConnectChat(data) {
        const { profile } = this.props;
        if (data.chatRoom.id === this.props.chatRoom) {
            this.props.setMessageOfChat({
                chatRoom: data.chatRoom.id,
                message: {
                    id: data.message.message[0].id,
                    text: data.message.message[0].message,
                    fromUserId: data.message.message[0].fromUserId,
                    photo: data.message.message[0].file
                }
            });
        }
    }
    _messageReceiver(message) {
        if (message != null) {
            // console.log("_messageReceiver",message);
            this.setState({
                message: message
            });
            this._sendmessage(message);
        }
    }
    async _photoReceiver(photo) {
        if (photo != null) {
            // // console.log("_photoReceiver : ",photo);
            await this.setState({
                image: photo
            });
            await this._sendPhoto(this.state.image);
        }
    }
    async _fileReceiver(file, filename) {
        if (file != null) {
            // // console.log("_fileReceiver : ",file,filename);
            await this.setState({
                file: file,
                filename: filename.name
            });
            await this._sendFile(this.state.file, this.state.filename);
        }
    }
    async _sendPhoto(photo) {
        // // console.log("_sendphoto",this.props,photo);
        let data = {
            listId: this.props.chatRoom,
            file: photo,
            authorization: cookies.get("token")
        };
        // console.log("data : ",data);
        await this.socketIO.emit("send_message", data);
    }
    async _sendFile(file, filename) {
        // // console.log("_sendFile",this.props,file);
        let data = {
            listId: this.props.chatRoom,
            message: filename,
            file: file,
            authorization: cookies.get("token")
        };
        // // console.log("data : ",data);
        await this.socketIO.emit("send_message", data);
    }
    _sendmessage(message) {
        // // console.log("_sendmessage",this.props);
        let data = {
            listId: this.props.chatRoom,
            message: message,
            authorization: cookies.get("token")
        };
        console.log("data : ", data);
        this.socketIO.emit("send_message", data);
    }
    _isAddclick(data) {
        if (data == null) {
            this.setState({
                addClick: !this.state.addClick
            });
        } else {
            this.setState({
                addClick: data
            });
        }
    }
    async scrollToTop() {
        let chatbody = document.getElementsByClassName("conversation-area");
        if (chatbody[this.props.index].scrollTop == 0) {
            await this.setState({
                scrollHeight: chatbody[this.props.index].scrollHeight,
                chatPage: this.state.chatPage + 1
            });
            await this._loadHistory(this.state.chatPage);
            chatbody[this.props.index].scrollTop = chatbody[this.props.index].scrollHeight - this.state.scrollHeight;
        }
    }
    render() {
        var chatroomStyle = {
            display: "block"
        };
        let { profile, chatRoom, index } = this.props;
        let { chatRoomType, members, chatHistory, friendData } = this.state;
        return (
            <div className="chatroom-container" key={index}>
                <div className="chatroom" style={chatroomStyle}>
                    <div className="friendName">
                        <div
                            className="friendsName2"
                            href="javascript:void(0);"
                            onClick={() => {
                                this.hideChat();
                                this._isAddclick(false);
                            }}
                        >
                            <div className="chatroom-left">
                                <div className={"chatlist-image"}>
                                    <img
                                        src={
                                            this.props.profilePic
                                                ? imageWithToken(this.props.profilePic)
                                                : "/static/images/icon/user_avatar_icon.jpg"
                                        }
                                    />
                                </div>
                            </div>

                            <div className="chat-head-center">
                                <p>{this.props.name}</p>
                            </div>

                            <div className="statusPosition">
                                <p style={{ color: this.props.status == "● ONLINE" ? "green" : "grey" }}>●</p>
                            </div>
                            <div className="chat-header-menu">
                                <div>
                                    <div
                                        className="d-flex"
                                        style={{
                                            zIndex: "1"
                                        }}
                                    >
                                        <div className="chatroom-image">
                                            <Link
                                                href={`http://call-dev.crewhitz.com/?roomId=${this.state.chatRoomId}&myUserId=${this.state.myChatRoomMemberId}&anotherUserId=${this.state.anotherChatRoomId}&action=${this.state.action}`}
                                            >
                                                <a target="blank">
                                                    <img
                                                        className="image"
                                                        src={"/static/images/icon/AW_CrewHitz_ICON-29.png"}
                                                    />
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div onClick={() => this.closeChat(chatRoom)}>
                                        <div className={"chatroom-image"}>
                                            <img src="/static/images/icon/AW_CrewHitz_ICON-56.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="for-hide" style={{ display: this.state.hideChatroom ? "block" : "none" }}>
                        <div className="conversation-area">
                            <div className="chatroom-date">
                                <p>Today</p>
                            </div>
                            {chatRoomType == "PRIVATE" ? (
                                <ChatPrivate
                                    chatHistoryRoom={chatHistory}
                                    profile={profile}
                                    friendData={friendData}
                                    data={this.props}
                                    chatRoom={chatRoom}
                                />
                            ) : chatRoomType == "GROUP" || chatRoomType == "PUBLIC" ? (
                                <ChatGroup
                                    chatHistoryRoom={chatHistory}
                                    profile={profile}
                                    members={members}
                                    data={this.props}
                                    chatRoom={chatRoom}
                                />
                            ) : null}
                        </div>
                        <div>
                            <ChatInput
                                sendmessage={this._messageReceiver}
                                sendPhoto={this._photoReceiver}
                                sendFile={this._fileReceiver}
                                isAddclick={this._isAddclick}
                                addClick={this.state.addClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        chatlist: state.chatReducer,
        socket: state.socketReducer,
        profile: state.profileReducer,
        chatHistory: state.messageReducer,
        auth: state.authReducer
    };
};
const mapDispatchToProps = dispatch => {
    return {
        deleteRoom: index => {
            dispatch({ type: DELETE_ROOM, payload: index });
        },
        setMessageOfChat: data => {
            dispatch({ type: SET_MESSAGE_OF_CHAT, payload: data });
        },
        deleteMessageOfChat: id => {
            dispatch({ type: DELETE_MESSAGE_OF_CHAT, payload: id });
        },
        setVideoCount: count => {
            dispatch({ type: VIDEO_CALL_COUNT, payload: count });
        }
    };
};
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(ChatBox);
