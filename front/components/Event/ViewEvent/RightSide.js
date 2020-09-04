import React, {Component} from "react";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import { compose } from "recompose";
import RelateEvent from "./RelateEvent";
import FriendRequest from "./FriendRequest";

class RightSide extends Component{
    constructor(props) {
        super(props);
    }

    _onAction = (callback) => {
        if(callback) {
            this.props.onClick(true);
        }
    }

    render() {
        const profile = this.props.profile.user;
        const {request} = this.props;

        //get data Event
        const event = this.props.eventData;
        const permission = event.user.id == profile.id;


        return (
            <div className={"right"}>
                <div className={"right-top"}>
                    <RelateEvent relateEvent={this.props.relateEvent}/>
                </div>
                <div className={"right-bottom"}>
                    <FriendRequest permission={permission} request={request} onClick={this._onAction}/>
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
    withNamespaces(),
    withRouter
)(RightSide);