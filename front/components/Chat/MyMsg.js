import React, { Component } from "react";
import { imageWithToken } from "../../utils/image";
import dayjs from "dayjs";
import socketIOclient from "socket.io-client";
import { SOCKET_MESSAGE } from "../../constant/ENV";
import { connect } from "react-redux";

class MyMsg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRead: false,
            isSocketConnect: false
        };
        this.socketIO = socketIOclient(SOCKET_MESSAGE, {
            query: {
                authorization: this.props.auth.token
            }
        });
    }

    _msgHover(data) {
        this.setState({
            showRead: data
        });
    }
    render() {
        let { message } = this.props;
        return (
            <div>
                {message != null && message.message != null && message.file == null ? (
                    <div className="my-msg-container">
                        {message.readAt ? (
                            <div>
                                <p className="read-at-message">Read</p>
                            </div>
                        ) : (
                            <p className="read-at-message">Send</p>
                        )}
                        <div className="my-msg" key={message.id}>
                            <p>{message.message}</p>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {message != null && message.message == null && message.file != null ? (
                    <div>
                        <div className="my-msg" key={message.id}>
                            <img src={imageWithToken(message.file)} className="img-preview-in-chat" />
                        </div>
                        {message.readAt ? (
                            <div>
                                <p className="read-at-message photo-msg">Read</p>
                                <p className="read-at-message photo-msg">
                                    {dayjs(this.props.message.readAt).format("dddd, MMMM D YYYY") +
                                        ", " +
                                        dayjs(this.props.message.readAt).format("HH:mm:ss")}
                                </p>
                            </div>
                        ) : (
                            <p className="read-at-message">Send</p>
                        )}
                    </div>
                ) : (
                    ""
                )}
                {message != null && message.message != null && message.file != null ? (
                    <div>
                        <div key={message.id} className="my-msg">
                            <a href={imageWithToken(message.file)} target="_blank">
                                <i className="fas fa-arrow-circle-down"></i> {this.props.message.message}
                            </a>
                        </div>
                        {message.readAt ? (
                            <div>
                                <p className="read-at-message photo-msg">Read</p>
                                <p className="read-at-message photo-msg">
                                    {dayjs(this.props.message.readAt).format("dddd, MMMM D YYYY") +
                                        ", " +
                                        dayjs(this.props.message.readAt).format("HH:mm:ss")}
                                </p>
                            </div>
                        ) : (
                            <p className="read-at-message">Send</p>
                        )}
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default connect(store => {
    return {
        profile: store.profileReducer,
        socket: store.socketReducer,
        auth: store.authReducer
    };
})(MyMsg);
