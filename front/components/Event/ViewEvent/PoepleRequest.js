import React, {Component} from "react"
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router"
import { compose } from "recompose";
import {API_FEED_EVENT_REQUEST_ACTION} from "../../../constant/ENV";
import axios from "axios";
import {imageWithToken} from "../../../utils/image";

class PeopleRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invite: false,
            msgOut: "../../../static/images/icon/AW_CrewHitz_ICON-04.png",
            msgIn: "../../../static/images/icon/AW_CrewHitz_ICON-11.png",
            msgToggle: false
        }

        //// console.log(this.props);
        this.handleToggle = this.handleToggle.bind(this)
    }

    putEventRequestAction = (action) => {
        axios.put(API_FEED_EVENT_REQUEST_ACTION + "/" + this.props.bio.id, {action: action}).then(response => {
            if(response.status == 200) {
                this.props.onClick(action, this.props.index);
            }
        });
    }

    handleApprove = () => {
        this.putEventRequestAction("APPROVE")
    }

    handleDeny = () => {
        this.putEventRequestAction("DENY")
    }

    handleToggle() {
        this.setState({
            invite: true
        })
    }

    render() {
        const invite = this.state.invite;
        const bioInfo = this.props.bio.user;
        const status = true;
        const { msgIn, msgOut, msgToggle } = this.state
        //// console.log(this.props);
        const name = `${bioInfo.name} ${bioInfo.surname}`
        let organization = ""
        if(bioInfo.organization != null) {
            organization = bioInfo.organization.length <= 45 ? bioInfo.organization : `${bioInfo.organization.substring(0, 45)}...`
        }
        

        return (
            <div className={"people-request-main"}>
                <div className={"people-request-pic"}>
                    <img
                        className={"people-request-pic"}
                        src={bioInfo.profilePic ? 
                            imageWithToken(bioInfo.profilePic)
                            : 
                            "../../../static/images/icon/user_avatar.png"
                        }
                    />
                    {status ? <label></label> : null}
                </div>
                <div className={"people-request-info"}>
                    <div className={"people-request-name"}>
                        <span>{name.length <= 45 ? name : `${name.substring(0, 45)}...`}</span>
                    </div>
                    <div className={"people-request-ship"}>
                        <span>{bioInfo.organization ? organization : null}</span>
                    </div>
                    <div className={status ? "people-request-status" : "event-status-offline"}>
                        <span>{status ? "online" : "offline"}</span>
                    </div>
                </div>
                <div className={"people-request-operantion"}> 
                    <img 
                        className={"img-msg"} 
                        src={msgToggle ? msgIn : msgOut}
                        onMouseEnter={() => this.setState({msgToggle: true})}
                        onMouseOut={() => this.setState({msgToggle: false})}
                        onClick={""/* add function click chat here !!*/} 
                    />
                    <div className={"people-request-bnt-accecpt"}>
                        <img
                            onClick={this.handleApprove}
                            src={"../../static/images/icon/AW_CrewHitz_ICON-37.png"}
                        />
                    </div>
                    <div className={"people-request-bnt-decline"}>
                         <img
                            onClick={this.handleDeny}
                            src={"../../static/images/icon/AW_CrewHitz_ICON-38.png"}
                        />
                    </div>
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
)(PeopleRequest);