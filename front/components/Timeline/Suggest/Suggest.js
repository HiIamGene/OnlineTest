import React from 'react';
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import {imageWithToken} from "../../../utils/image";
import API from '../../../constant/ENV';
import axios from 'axios';

class Suggest extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isShow: true
        };

        this.__addFriend = this.__addFriend.bind(this);
    }

    async __addFriend(userId){
        this.setState({
            isShow: false
        });

        await axios.post(API.USER.PROFILE.FRIEND.ADD_V010000,{
            userId
        });
    }

    render() {
        let {t,data} = this.props;
        return !this.state.isShow ? "" : (
            <div className={"friend-item-wrapper"}>
                <div className={"friend-profile"}>
                    <img
                        src={data.profilePic ? imageWithToken(data.profilePic) : "/static/images/icon/user_avatar_icon.jpg"}
                        alt=""/>
                </div>
                <div className="nearby-wrapper-friend-item">
                    <div className={"detail"}>
                        <div className={"information-nearby"}>
                            <span className={"nearby-user-name"}>{data.name} {data.surname}</span>
                            <small>
                                <div className={"mt-7"}>Ship expert tecnology</div>
                            </small>
                        </div>
                    </div>
                    <div className="btn-nearby">
                        <button onClick={()=>{
                            this.__addFriend(data.id);
                        }} className={"btn-add-friend-feed"}>+ Add Friend</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    withNamespaces('timeline'),
    withRouter
)(Suggest);