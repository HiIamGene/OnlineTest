import React from 'react';
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import {imageWithToken} from "../../../utils/image";
var moment = require('moment');

const FriendItem = ({t, data}) => {
    return !data ? "" : (
        <div className={"friend-item-wrapper"}>
            <div className={"friend-profile"}>
                <img
                    src={data.profilePic ? imageWithToken(data.profilePic) : "/static/images/icon/user_avatar_icon.jpg"}
                    alt=""/>
            </div>
            <div className="nearby-wrapper-friend-item">
                <div className={"detail"}>
                    <div className={"information-nearby mt-7"}>
                        <span className={"nearby-user-name"}>{data.name} {data.surname}</span>
                        <small>
                            <div className={"mt-7"}>Ship expert tecnology</div>
                            <div className={"mt-7"}>
                                <i className="fas fa-map-marker-alt"/> {data.distance ? (data.distance / 1000).toFixed(2) : 0} km
                            </div>
                            <div className={"mt-7 text-success"}>{data.status === "ONLINE" ? <div>Online</div> : moment(data.updatedAt).fromNow()}</div>
                        </small>
                    </div>
                </div>
                <div className = "nearby-button-container">
                    <button className={"btn-chat"}><img src="/static/images/icon/AW_CrewHitz_ICON-04.png" className="nearby-icon grey"/></button>
                </div>
            </div>
        </div>
    );
};

export default compose(
    withNamespaces('timeline'),
    withRouter
)(FriendItem);