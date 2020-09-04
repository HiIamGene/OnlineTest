import React, {Component} from "react";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import { compose } from "recompose";
import Creater from "./Creater"
import InviteEvent from "./InviteEvent";
import {imageWithToken} from "../../../utils/image";

class Center extends Component{
    constructor(props) {
        super(props);
        //// console.log(this.props.eventData);
    }

    render() {
        const user = this.props.eventData;
        //// console.log(user);
        return (
            <div className={"center"}>
                <div className={"center-head"}>
                </div>
                <div className={"center-body"}>
                    <img 
                        className={"center-head-img"} 
                        src={user.images ? imageWithToken(user.images) : "../../../static/images/icon/crewhitz-meeting-2.png"} 
                    />
                    <Creater creater={user}/>
                </div>
                <div className={"center-bottom"}>
                    <InviteEvent creater={user} suggest={this.props.suggest}/>  
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
)(Center);