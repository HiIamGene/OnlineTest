import React, {Component} from "react";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router"
import Navbar from "../../Navbar";
import {compose} from "recompose";
import "../../../styles/style.scss"
import BodyView from "./body"

class ViewEvent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const verified = this.props.profile.user.permissions.USER_ACTIVE.action === "YES"
        return (
            <div className={verified ? "view-event-main" : "view-event-main no-verify"}>
                <BodyView/>
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
    withNamespaces("event"),
    withRouter
)(ViewEvent)