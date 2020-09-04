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

    render() {
        let { chatHistoryRoom, profile, members, data, chatRoom } = this.props;
        return (
            <div className="conver-wrapper">
                {chatHistoryRoom.length != 0
                    ? chatHistoryRoom.map((message, index) => {
                          if (message.fromUserId == profile.user.id) {
                              if (message.message != null && message.file == null) {
                                  return <MyMsg message={message} chatRoomId={chatRoom} key={index} />;
                              } else if (message.file != null && message.message == null) {
                                  return <MyMsg message={message} chatRoomId={chatRoom} key={index} />;
                              } else if (message.message != null && message.file != null) {
                                  return <MyMsg message={message} chatRoomId={chatRoom} key={index} />;
                              }
                          } else {
                              return members.map(member => {
                                  if (
                                      message.message != null &&
                                      message.file == null &&
                                      message.fromUserId == member.user.id
                                  ) {
                                      return (
                                          <div key={index}>
                                              <p className="friend-chat-name">
                                                  {member.user.name.concat(` ${member.user.surname}`).length > 15
                                                      ? member.user.name
                                                            .concat(` ${member.user.surname}`)
                                                            .substring(0, 15)
                                                      : member.user.name.concat(` ${member.user.surname}`)}
                                              </p>
                                              <div className="friend-msg-container">
                                                  <div className={"chatlist-image"}>
                                                      <img
                                                          src={
                                                              member.user.profilePic
                                                                  ? imageWithToken(member.user.profilePic)
                                                                  : "/static/images/icon/user_avatar_icon.jpg"
                                                          }
                                                      />
                                                  </div>
                                                  <p>{message.message}</p>
                                              </div>
                                          </div>
                                      );
                                  } else if (
                                      message.file != null &&
                                      message.message == null &&
                                      message.fromUserId == member.user.id
                                  ) {
                                      return (
                                          <div key={index}>
                                              <p className="friend-chat-name">
                                                  {member.user.name.concat(` ${member.user.surname}`).length > 15
                                                      ? member.user.name
                                                            .concat(` ${member.user.surname}`)
                                                            .substring(0, 15)
                                                      : member.user.name.concat(` ${member.user.surname}`)}
                                              </p>

                                              <div className="friend-msg-container img-include">
                                                  <div className={"chatlist-image"}>
                                                      <img
                                                          src={
                                                              member.user.profilePic
                                                                  ? imageWithToken(member.user.profilePic)
                                                                  : "/static/images/icon/user_avatar_icon.jpg"
                                                          }
                                                      />
                                                  </div>
                                                  <img
                                                      src={imageWithToken(message.file)}
                                                      className="img-preview-in-chat"
                                                  />
                                              </div>
                                          </div>
                                      );
                                  } else if (
                                      message.message != null &&
                                      message.file != null &&
                                      message.fromUserId == member.user.id
                                  ) {
                                      return (
                                          <div key={index}>
                                              <p className="friend-chat-name">
                                                  {member.user.name.concat(` ${member.user.surname}`).length > 15
                                                      ? member.user.name
                                                            .concat(` ${member.user.surname}`)
                                                            .substring(0, 15)
                                                      : member.user.name.concat(` ${member.user.surname}`)}
                                              </p>

                                              <div className="friend-msg-container">
                                                  <div className={"chatlist-image"}>
                                                      <img
                                                          src={
                                                              member.user.profilePic
                                                                  ? imageWithToken(member.user.profilePic)
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
                              });
                          }
                      })
                    : ""}
                {data.chatHistory.messages[chatRoom]
                    ? data.chatHistory.messages[chatRoom].map((message, index) => {
                          if (message.fromUserId == profile.user.id) {
                              return message.text != null && message.photo == null ? (
                                  <div className="my-msg" key={index}>
                                      <p>{message.text}</p>
                                  </div>
                              ) : message.photo != null && message.text == null ? (
                                  <div className="my-msg" key={index}>
                                      <img src={imageWithToken(message.photo)} className="img-preview-in-chat" />
                                  </div>
                              ) : message.text != null && message.photo != null ? (
                                  <div className="my-msg" key={index}>
                                      <a href={imageWithToken(message.photo)} target="_blank">
                                          <i className="fas fa-arrow-circle-down"></i> {message.text}
                                      </a>
                                  </div>
                              ) : null;
                          } else {
                              return members.map((member, index) => {
                                  if (
                                      message.fromUserId == member.user.id &&
                                      message.text != null &&
                                      message.photo == null
                                  ) {
                                      return (
                                          <div key={index}>
                                              <p className="friend-chat-name">
                                                  {member.user.name.concat(` ${member.user.surname}`).length > 15
                                                      ? member.user.name
                                                            .concat(` ${member.user.surname}`)
                                                            .substring(0, 15)
                                                      : member.user.name.concat(` ${member.user.surname}`)}
                                              </p>
                                              <div className="friend-msg-container">
                                                  <div className={"chatlist-image"}>
                                                      <img
                                                          src={
                                                              member.user.profilePic
                                                                  ? imageWithToken(member.user.profilePic)
                                                                  : "/static/images/icon/user_avatar_icon.jpg"
                                                          }
                                                      />
                                                  </div>
                                                  <p>{message.text}</p>
                                              </div>
                                          </div>
                                      );
                                  } else if (
                                      message.fromUserId != member.user.id &&
                                      message.photo != null &&
                                      message.text == null
                                  ) {
                                      return (
                                          <div key={index}>
                                              <p className="friend-chat-name">
                                                  {member.user.name.concat(` ${member.user.surname}`).length > 15
                                                      ? member.user.name
                                                            .concat(` ${member.user.surname}`)
                                                            .substring(0, 15)
                                                      : member.user.name.concat(` ${member.user.surname}`)}
                                              </p>
                                              <div className="friend-msg-container img-include">
                                                  <div className={"chatlist-image"}>
                                                      <img
                                                          src={
                                                              member.user.profilePic
                                                                  ? imageWithToken(member.user.profilePic)
                                                                  : "/static/images/icon/user_avatar_icon.jpg"
                                                          }
                                                      />
                                                  </div>
                                                  <img
                                                      src={imageWithToken(message.photo)}
                                                      className="img-preview-in-chat"
                                                  />
                                              </div>
                                          </div>
                                      );
                                  } else if (
                                      message.fromUserId != member.user.id &&
                                      message.text != null &&
                                      message.photo != null
                                  ) {
                                      return (
                                          <div key={index}>
                                              <p className="friend-chat-name">
                                                  {member.user.name.concat(` ${member.user.surname}`).length > 15
                                                      ? member.user.name
                                                            .concat(` ${member.user.surname}`)
                                                            .substring(0, 15)
                                                      : member.user.name.concat(` ${member.user.surname}`)}
                                              </p>
                                              <div className="friend-msg-container">
                                                  <div className={"chatlist-image"}>
                                                      <img
                                                          src={
                                                              member.user.profilePic
                                                                  ? imageWithToken(member.user.profilePic)
                                                                  : "/static/images/icon/user_avatar_icon.jpg"
                                                          }
                                                      />
                                                  </div>
                                                  <a href={imageWithToken(message.photo)} target="_blank">
                                                      <i className="fas fa-arrow-circle-down"></i> {message.text}
                                                  </a>
                                              </div>
                                          </div>
                                      );
                                  }
                              });
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
