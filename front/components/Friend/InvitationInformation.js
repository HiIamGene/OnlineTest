import React, { Component } from 'react'
import { imageWithToken } from "../../utils/image";
import { DEFAULT_AVATAR_URL } from "../../constant";
import { acceptFriend } from "../../services/userService"
import compose from "recompose/compose";
import router, { withRouter } from "next/dist/lib/router";
import axios from 'axios';
import { API_MESSAGE_PRIVATE } from '../../constant/ENV';
class Invitationnformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            added: false
        }
        this._sendaccept = this._sendaccept.bind(this);
        this._redirect = this._redirect.bind(this);
    }
    _redirect() {
        console.log("Data props", this.props.data);
        router.push('/timeline?search=' + this.props.data.relatingUser.id);
    }
    async _sendaccept(data, type) {
        await acceptFriend(data.id, type);
        await axios.post(API_MESSAGE_PRIVATE, {
            userId: data.relatingUser.id
        });
    }
    render() {
        // console.log("Invitationnformation : ",this.props.id);
        return (
            <div className="friend-information-wrapper">
                <div className="image-state">
                    <img className="friend-img" src={this.props.data.relatingUser.profilePic ? imageWithToken(this.props.data.relatingUser.profilePic) :
                        DEFAULT_AVATAR_URL
                    } alt="invitation_friends" />
                </div>
                <div className="text">
                    <div className="information-state information">
                        <p className="p-name" onClick={() => { this._redirect(); }}>{this.props.data.relatingUser.name + " " + this.props.data.relatingUser.surname}</p>
                        <p className="p-content">{this.props.data.relatingUser.nationality}</p>
                        <p className="p-content">Ship Expert</p>
                    </div>
                    <div className="connection-state">
                        <div className="button-state">
                            <button className="button-connected information-child" onClick={async () => {
                                await this._sendaccept(this.props.data, "ACCEPT");
                                await this.props.checkRequest();
                            }}>{this.state.added ? "Connected" : (<div><i className="fas fa-plus" /> Connect</div>)}</button>
                            <button className="button-connected last-child" onClick={async () => {
                                await this._sendaccept(this.props.data, "DELETE");
                                await this.props.checkRequest();
                            }}><i className="fas fa-ban"></i> Decline </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default compose(
    withRouter
)(Invitationnformation)