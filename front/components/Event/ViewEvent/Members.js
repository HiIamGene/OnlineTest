import React, {Component} from "react";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import { compose } from "recompose";
import {imageWithToken} from "../../../utils/image";

class Members extends Component {
    constructor(props) {
        super(props);
    }

    handleRemoveInvitation = () =>{
        this.props.remove(this.props.index);
    }

    render() {
        const { detail, createrId, profile } = this.props
        const info = detail
        const isUser = createrId === profile.user.id
        //// console.log(detail);
        return (
            <div className={"member-profile"}>
                <div className={"member-pic"}>
                    <img
                        src={
                            info.profilePic ? imageWithToken(info.profilePic) 
                            :
                            "../../../static/images/icon/user_avatar.png"
                        }
                    />  
                </div>
                <div className={"member-name"}>
                    <span>{info.name.length <= 30 ? info.name : `${info.name.substring(0, 30)}...`}</span>
                </div>
                <div className={ isUser ? "member-remove" : "none-display"}>
                    <img
                        className={"remove-icon"}
                        onClick={this.handleRemoveInvitation}
                        src={"../../static/images/icon/AW_CrewHitz_ICON-66.png"}
                    />
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
)(Members);