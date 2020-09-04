import React, { Component } from 'react'
import FriendList from "./FriendList";
import Company from "./Company";
import Invitation from "./Invitation";

class FriendComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friendActive: true,
            companyActive: false,
            invitationActive: false
        }
        this.friendListChange = this.friendListChange.bind(this)
        this.companyChange = this.companyChange.bind(this)
        this.invitationChange = this.invitationChange.bind(this)
    }
    friendListChange = () => {
        this.setState({
            friendActive: true,
            companyActive: false,
            invitationActive: false
        })
    }
    companyChange = () => {
        this.setState({
            friendActive: false,
            companyActive: true,
            invitationActive: false
        })
    }
    invitationChange = () => {
        this.setState({
            friendActive: false,
            companyActive: false,
            invitationActive: true
        })
    }
    render() {
        return (
            <div className="friend-wrapper">
                <div className="friend-header">
                    <h3 className="connection-header">Connections</h3>
                </div>
                <div className="button-statement">
                    <span className="friend friend-list" onClick={this.friendListChange}>All Friends <span className="notice list">(8)</span></span>
                    <span className="friend friend-company" onClick={this.companyChange}>Companies <span className="notice list">(3)</span></span>
                    <span className="friend friend-invitation" onClick={this.invitationChange}>Invitations <span className="notice invite">8</span></span>
                </div>
                <div className="friend-component">
                    <div className={this.state.friendActive === false ? "hide" : ""}>
                        <FriendList/>
                    </div>
                    <div className={this.state.companyActive === false ? "hide" : ""}>
                        <Company/>
                    </div>
                    <div className={this.state.invitationActive === false ? "hide" : ""}>
                        <Invitation/>
                    </div>
                </div>
                <style jsx>{`
                    .friend-wrapper {
                        width :100%;
                        background-color : white;
                    }
                    .friend-header{
                        background-color : #0F143A;
                        color : white;
                        padding : 10px 0px;
                    }
                    .connection-header {
                        padding : 0px 3vw;
                        margin : 0px;
                    }
                    .button-statement {
                        color : black;
                        padding : 10px 0px;
                    }
                    .friend{
                        padding : 0px 3vw;
                        margin : 0px;
                        font-size: 20px;
                        font-weight: 900;
                    }
                    .friend:hover {
                        cursor: pointer;
                        color: gray;
                    }
                    .notice {
                        color: gray;
                    }
                    .friend-component {
                        border-top: 1px solid #E5E5E5;
                        padding: 10px;
                    }
                    .friend-invitation {
                        display: relative;
                    }
                    .hide {
                        display: none;
                    }
                    .invite {
                        display: absolute;
                        width: 25px;
                        height: 25px;
                        position: absolute;
                        background: red;
                        color: white;
                        border-radius: 50%;
                        text-align: center;
                        margin-left: 5px;
                        margin-top: 3px;
                    }
                `}</style>
            </div>
        )
    }
}

export default FriendComponent