import { Component } from "react";
import socketIOclient from "socket.io-client";
import { SOCKET_MESSAGE, API_MESSAGE_LIST } from "../../constant/ENV";
import ChatUser from "./ChatUser";
import axios from "axios";
import { connect } from "react-redux";
import { friendList } from "../../services/userService";
import FriendChat from "./FriendChat";
import { withRouter } from "next/dist/lib/router";
import compose from "recompose/compose";
import Router from "next/dist/lib/router";
import { setChatHeader } from "../../redux/actions/chatAction";

class ChatList extends Component {
    constructor(props) {
        super(props);
        this._isMount = false;
        this.state = {
            hideChatlist: true,
            res: false,
            messageList: [],
            peopleOnline: 0,
            isSocketConnect: false,
            oneTimeRunning: 0,
            isIntervalStart: false,
            chatType: true,
            friendList: []
        };
        this.hideorshowchatlist = this.hideorshowchatlist.bind(this);
        this.fetchUserList = this.fetchUserList.bind(this);
        this.emitChatList = this.emitChatList.bind(this);
        this.setChatList = this.setChatList.bind(this);
        this.onChatList = this.onChatList.bind(this);
        this.socketIO = this.props.auth.isLogin
            ? socketIOclient(SOCKET_MESSAGE, {
                  query: {
                      authorization: this.props.auth.token
                  }
              })
            : Router.push("/login");
    }

    async fetchUserList() {
        try {
            const res = await axios.get(API_MESSAGE_LIST);
            this.setState({
                messageList: res.data.payload.list
            });
        } catch (e) {
            console.log(e);
        }
    }

    setChatList() {
        setInterval(() => {
            this.emitChatList();
        }, 1000);
    }

    async componentDidMount() {
        this._isMount = true;
        this.onChatList();
        if (this.state.oneTimeRunning === 0) {
            await this.emitChatList();
            this.setState({
                oneTimeRunning: 1
            });
        }
        if (!this.state.isIntervalStart) {
            this.setChatList();
            this.setState({
                isIntervalStart: true
            });
        }
        await friendList().then(listFriends => {
            this.setState({
                friendList: listFriends.listFriends.listFriend
            });
        });
    }

    async emitChatList() {
        try {
            this.socketIO.emit("chat-list");
        } catch (e) {
            console.log(e);
        }
    }

    componentWillUnmount() {
        this.setState({
            hideChatlist: true
        });
        this._isMount = false;
    }

    onChatList() {
        try {
            if (this.socketIO && !this.state.isSocketConnect) {
                this.socketIO.on("get-chat-list", data => {
                    this.setState({
                        messageList: data.list,
                        peopleOnline: data.userOnline
                    });
                });
                this.setState({
                    isSocketConnect: true
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    selectionType(isClick) {
        this.setState({
            chatType: isClick
        });
        this.props.setChatHeader(isClick ? "Chats" : "Friends");
    }

    hideorshowchatlist() {
        this._isMount && this.state.hideChatlist
            ? this._isMount && this.setState({ hideChatlist: false })
            : this._isMount && this.setState({ hideChatlist: true });
    }

    render() {
        const { hideChatlist, chatType, friendList } = this.state;
        var onlineFriends = {
            display: this.state.hideChatlist ? "none" : "block"
        };
        return (
            <div className={"cr-chat"}>
                <div className="chat-box-container">
                    <div className="chatlists">
                        <button
                            className="close-open-list-btn"
                            onClick={() => {
                                this._isMount ? this.hideorshowchatlist() : "";
                            }}
                        >
                            <div className="chat-header">
                                <div className="chat-title-left">
                                    {this.props.chatlist.chatHeader}
                                </div>
                                <div className="chat-title-right">
                                    <i className="green fas fa-circle chat-icon mr-1" />{" "}
                                    <span className="green mr-3">
                                        Online({this.state.peopleOnline})
                                    </span>
                                    <i
                                        className={
                                            hideChatlist
                                                ? "fas fa-chevron-up"
                                                : "fas fa-chevron-down"
                                        }
                                    />
                                </div>
                            </div>
                        </button>
                        <div className="online-friend-container">
                            {chatType ? (
                                <div
                                    className="onlineFriends"
                                    style={onlineFriends}
                                >
                                    {/* <div className="private-header">Privates</div> */}
                                    {this.state.messageList.map(
                                        (message, index) => {
                                            if (message.type === "PRIVATE") {
                                                let userId = this.props.profile
                                                    .user.id;
                                                let friend =
                                                    message.member[0].userId ===
                                                    userId
                                                        ? message.member[1].user
                                                        : message.member[0]
                                                              .user;
                                                if (friend) {
                                                    return (
                                                        <ChatUser
                                                            key={
                                                                "user-chat-list-" +
                                                                message.id
                                                            }
                                                            data={friend}
                                                            chatRoomId={
                                                                message.id
                                                            }
                                                            type={message.type}
                                                        />
                                                    );
                                                }
                                            }
                                        },
                                        this
                                    )}
                                    {/* <div className="group-header">Groups</div> */}
                                    {this.state.messageList.map(
                                        (message, index) => {
                                            if (
                                                message.type === "PUBLIC" ||
                                                message.type === "GROUP"
                                            ) {
                                                return (
                                                    <ChatUser
                                                        key={
                                                            "user-chat-list-" +
                                                            message.id
                                                        }
                                                        data={message}
                                                        chatRoomId={message.id}
                                                        type={message.type}
                                                        userLists={
                                                            message.member
                                                                .length
                                                        }
                                                        profile={
                                                            this.props.profile
                                                        }
                                                    />
                                                );
                                            }
                                        },
                                        this
                                    )}
                                </div>
                            ) : (
                                <div
                                    className="onlineFriends"
                                    style={onlineFriends}
                                >
                                    {/* <div className="private-header"></div> */}
                                    {friendList.map((friend, index) => {
                                        return (
                                            <FriendChat
                                                friend={friend}
                                                key={index}
                                            />
                                        );
                                    }, this)}
                                </div>
                            )}
                            <div
                                style={onlineFriends}
                                className="chat-footer-wrapper"
                            >
                                <div className="chat-footer">
                                    <div
                                        className={`mr-3 icon-chat-footer ${
                                            !chatType
                                                ? "none-hight-light-chat-footer"
                                                : null
                                        }`}
                                        onClick={() => this.selectionType(true)}
                                    >
                                        <i className="fas fa-comment-alt" />
                                    </div>
                                    <div
                                        className={`icon-chat-footer ${
                                            chatType
                                                ? "none-hight-light-chat-footer"
                                                : null
                                        }`}
                                        onClick={() =>
                                            this.selectionType(false)
                                        }
                                    >
                                        <i className="fas fa-user-friends" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    connect(
        store => {
            return {
                chatlist: store.chatReducer,
                profile: store.profileReducer,
                socket: store.socketReducer,
                auth: store.authReducer
            };
        },
        { setChatHeader }
    ),
    withRouter
)(ChatList);
