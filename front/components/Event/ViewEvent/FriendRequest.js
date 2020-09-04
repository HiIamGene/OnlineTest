import React, {Component} from "react";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import { compose } from "recompose";
import PeopleRequest from "./PoepleRequest";
import { isUndefined } from "util";


class FriendRequest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            requestList: this.props.request
        }
    }

    _onAction = (callback, index) => {
        let array = this.state.requestList
        array.splice(index, 1)
        this.setState({
            requestList: array
        })
        if(callback == "APPROVE") {
            this.props.onClick(true);
        }
    }

    render() {
        const friendsBio1 = {
            name: "BabyIce Lee",
            profilePic: "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            id: 12345678,
            ship: "Ship Expert Technology",
            status: "online",
            connected: false
        }
        const {permission, t} = this.props;
        const {requestList} = this.state

        return (
            <div className={permission ? "friend-request-join" : "friend-request-join-none"}>
                <div className={"friend-request-join-head"}>
                    <label>{t('FRIEND.title')}</label>
                </div>
                <div className={"friend-request-join-body"}>
                    {
                        Array.isArray(requestList) && requestList.length > 0 ? 
                        requestList.map((key, index) => (
                            <PeopleRequest bio={key} id={key.eventId} onClick={this._onAction} index={index}/>
                        ))
                        :
                        <div className={"no-data-now"}>
                            {t('FRIEND.no')}
                        </div>
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
    }
};

export default compose(
    connect(mapStateToProps),
    withNamespaces('event'),
    withRouter
)(FriendRequest);