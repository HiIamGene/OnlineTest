import React, { Component } from "react";
import { imageWithToken } from "../../utils/image";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { DELETE_ROOM } from "../../redux/reducers/chatReducer";
import { SET_MESSAGE_OF_CHAT, DELETE_MESSAGE_OF_CHAT } from "../../redux/reducers/messageReducer";
import { VIDEO_CALL_COUNT } from "../../redux/reducers/chatReducer";
import { withRouter } from "next/router";
import ChatInput from "./ChatInput";
import axios from "axios";
import MyMsg from "./MyMsg";
import Link from "next/link";
class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps() {
        let scroll = document.getElementsByClassName("conver-wrapper");
        scroll.scrollTop = scroll.scrollHeight - 9999;
    }

    render() {
        let { chatHistoryRoom, profile, friendData, data, chatRoom } = this.props;
        return (
            <div className="conver-wrapper" style={{width: "100%"}}>
                {chatHistoryRoom.length != 0
                    ? chatHistoryRoom.map((message, index) => {
                          if (
                              message.fromUserId == profile.user.id &&
                              message.message != null &&
                              message.file == null
                          ) {
                              return <MyMsg message={message} chatRoomId={chatRoom} key={index}/>;
                          } else if (
                              message.fromUserId == profile.user.id &&
                              message.file != null &&
                              message.message == null
                          ) {
                              return <MyMsg message={message} chatRoomId={chatRoom} key={index}/>;
                          } else if (
                              message.fromUserId != profile.user.id &&
                              message.message != null &&
                              message.fromUserId == friendData.id &&
                              message.file == null
                          ) {
                              return (
                                  <div key={index}>
                                      {/* <p className="friend-chat-name">{friendData.name}</p> */}
                                      <div className="friend-msg-container">
                                          <div className={"chatlist-image"}>
                                              <img
                                                  src={
                                                      friendData.profilePic
                                                          ? imageWithToken(friendData.profilePic)
                                                          : "/static/images/icon/user_avatar_icon.jpg"
                                                  }
                                              />
                                          </div>
                                          <p>{message.message}</p>
                                      </div>
                                  </div>
                              );
                          } else if (
                              message.fromUserId != profile.user.id &&
                              message.file != null &&
                              message.fromUserId == friendData.id &&
                              message.message == null
                          ) {
                              return (
                                  <div key={index}>
                                      {/* <p className="friend-chat-name">{friendData.name}</p> */}
                                      <div className="friend-msg-container img-include">
                                          <div className={"chatlist-image"}>
                                              <img
                                                  src={
                                                      friendData.profilePic
                                                          ? imageWithToken(friendData.profilePic)
                                                          : "/static/images/icon/user_avatar_icon.jpg"
                                                  }
                                              />
                                          </div>
                                          <img src={imageWithToken(message.file)} className="img-preview-in-chat" />
                                      </div>
                                  </div>
                              );
                          } else if (
                              message.fromUserId == profile.user.id &&
                              message.message != null &&
                              message.file != null
                          ) {
                              return <MyMsg message={message} chatRoomId={chatRoom} key={index}/>;
                          } else if (
                              message.fromUserId != profile.user.id &&
                              message.message != null &&
                              message.fromUserId == friendData.id &&
                              message.file != null
                          ) {
                              return (
                                  <div key={index}>
                                      {/* <p className="friend-chat-name">{friendData.name}</p> */}
                                      <div className="friend-msg-container">
                                          <div className={"chatlist-image"}>
                                              <img
                                                  src={
                                                      friendData.profilePic
                                                          ? imageWithToken(friendData.profilePic)
                                                          : "/static/images/icon/user_avatar_icon.jpg"
                                                  }
                                              />
                                          </div>
                                          <a href={imageWithToken(message.file)} target="_blank">
                                              <i className="fas fa-arrow-circle-down"></i> {message.message}
                                          </a>
                                      </div>
                                  </div>
                              );
                          }
                      })
                    : ""}
                {data.chatHistory.messages[chatRoom]
                    ? data.chatHistory.messages[chatRoom].map((message, index) => {
                          if (message.fromUserId == profile.user.id && message.text != null && message.photo == null) {
                              return (
                                  <div className="my-msg" key={index}>
                                      <p>{message.text}</p>
                                  </div>
                              );
                          } else if (
                              message.fromUserId == profile.user.id &&
                              message.photo != null &&
                              message.text == null
                          ) {
                              return (
                                  <div className="my-msg" key={index}>
                                      <img src={imageWithToken(message.photo)} className="img-preview-in-chat" />
                                  </div>
                              );
                          } else if (
                              message.fromUserId != profile.user.id &&
                              message.text != null &&
                              message.fromUserId == friendData.id &&
                              message.photo == null
                          ) {
                              return (
                                  <div className="friend-msg-container" key={index}>
                                      <div className={"chatlist-image"}>
                                          <img
                                              src={
                                                  friendData.profilePic
                                                      ? imageWithToken(friendData.profilePic)
                                                      : "/static/images/icon/user_avatar_icon.jpg"
                                              }
                                          />
                                      </div>
                                      <p>{message.text}</p>
                                  </div>
                              );
                          } else if (
                              message.fromUserId != profile.user.id &&
                              message.photo != null &&
                              message.fromUserId == friendData.id &&
                              message.text == null
                          ) {
                              return (
                                  <div className="friend-msg-container img-include" key={index}>
                                      <div className={"chatlist-image"}>
                                          <img
                                              src={
                                                  friendData.profilePic
                                                      ? imageWithToken(friendData.profilePic)
                                                      : "/static/images/icon/user_avatar_icon.jpg"
                                              }
                                          />
                                      </div>
                                      <img src={imageWithToken(message.photo)} className="img-preview-in-chat" />
                                  </div>
                              );
                          } else if (
                              message.fromUserId == profile.user.id &&
                              message.text != null &&
                              message.photo != null
                          ) {
                              return (
                                  <div className="my-msg" key={index}>
                                      <a href={imageWithToken(message.photo)} target="_blank">
                                          <i className="fas fa-arrow-circle-down"></i> {message.text}
                                      </a>
                                  </div>
                              );
                          } else if (
                              message.fromUserId != profile.user.id &&
                              message.text != null &&
                              message.fromUserId == friendData.id &&
                              message.photo != null
                          ) {
                              return (
                                  <div className="friend-msg-container" key={index}>
                                      <div className={"chatlist-image"}>
                                          <img
                                              src={
                                                  friendData.profilePic
                                                      ? imageWithToken(friendData.profilePic)
                                                      : "/static/images/icon/user_avatar_icon.jpg"
                                              }
                                          />
                                      </div>
                                      <a href={imageWithToken(message.photo)} target="_blank">
                                          <i className="fas fa-arrow-circle-down"></i> {message.text}
                                      </a>
                                  </div>
                              );
                          }
                      })
                    : ""}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        chatlist: state.chatReducer,
        socket: state.socketReducer,
        profile: state.profileReducer,
        chatHistory: state.messageReducer
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
