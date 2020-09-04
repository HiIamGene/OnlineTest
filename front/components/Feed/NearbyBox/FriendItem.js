import React from "react";
import compose from "recompose/compose";
import { withNamespaces } from "../../../lib/i18n";
import { withRouter } from "next/dist/lib/router";
import { imageWithToken } from "../../../utils/image";
import { API_MESSAGE_PRIVATE } from "../../../constant/ENV";
import {
    setChatShow,
    addRoom,
    addCurrentRoom
} from "../../../redux/actions/chatAction";
import { connect } from "react-redux";
var moment = require("moment");
import axios from "axios";

class FriendItem extends React.Component {
    async __goToChat(userId, data) {
        const res = await axios.post(API_MESSAGE_PRIVATE, {
            userId
        });
        console.log("Data near chat", res.data.payload);
        await this.props.addRoom({
            name: data.name + " " + data.surname,
            status:
                res.data.payload.member.length > 1
                    ? res.data.payload.member[1].user.status
                    : res.data.payload.member[0].user.status,
            profilePic: data.profilePic,
            id: data.id,
            chatRoom: res.data.payload.id,
            type: res.data.payload.type
        });
        await this.props.addCurrentRoom({
            name: data.name + " " + data.surname,
            status:
                res.data.payload.member.length > 1
                    ? res.data.payload.member[1].user.status
                    : res.data.payload.member[0].user.status,
            profilePic: data.profilePic,
            id: data.userId,
            chatRoom: res.data.payload.id,
            type: res.data.payload.type
        });
        // this.props.setChatShow(true);
    }

    componentDidMount() {
        console.log(this.props.data);
    }
    render() {
        let { t, data } = this.props;
        return !data ? (
            ""
        ) : (
            <div className={"friend-item-wrapper"}>
                <div className={"friend-profile"}>
                    <img
                        src={
                            data.profilePic
                                ? imageWithToken(data.profilePic)
                                : "/static/images/icon/user_avatar_icon.jpg"
                        }
                        alt=""
                    />
                </div>
                <div className="nearby-wrapper-friend-item">
                    <div className={"detail"}>
                        <div className={"information-nearby mt-7 pb-2"}>
                            <span className="nearme-header-name">
                                {data.name.concat(data.surname).length > 25
                                    ? data.name
                                          .concat(data.surname)
                                          .substring(0, 20)
                                          .concat("...")
                                    : `${data.name} ${data.surname}`}
                            </span>
                            <small className="info-nearby">
                                {data.organisation ? (
                                    <p className="organization-name mt-1 mb-0">
                                        {data.organisation.localName.length > 30
                                            ? data.organisation.localName
                                                  .substring(0, 30)
                                                  .concat("...")
                                            : data.organisation.localName}
                                    </p>
                                ) : (
                                    ""
                                )}
                                <div className={"nearme-location"}>
                                    <i className="fas fa-map-marker-alt  pb-2" />{" "}
                                    {data.distance
                                        ? (data.distance / 1000).toFixed(2)
                                        : 0}{" "}
                                    km
                                </div>
                                <div className={"nearme-online-offline"}>
                                    {data.status === "ONLINE" ? (
                                        <div>Online</div>
                                    ) : (
                                        moment(data.updatedAt).fromNow()
                                    )}
                                </div>
                            </small>
                        </div>
                    </div>
                    <div className="nearby-button-container">
                        <button
                            onClick={() => {
                                this.__goToChat(data.id, data);
                            }}
                            className={"btn-chat"}
                        >
                            <img
                                src="/static/images/icon/AW_CrewHitz_ICON-04.png"
                                className="nearby-icon grey"
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        chatlist: state.chatReducer
    };
};
export default compose(
    withNamespaces("timeline"),
    withRouter,
    connect(
        mapStateToProps,
        { setChatShow, addRoom, addCurrentRoom }
    )
)(FriendItem);
