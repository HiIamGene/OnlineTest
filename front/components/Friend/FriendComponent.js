import React, { Component } from 'react'
import FriendList from "./FriendList";
import Company from "./Company";
import Invitation from "./Invitation";
import compose from "recompose/compose"
import { connect } from "react-redux"
import {withRouter} from "next/router"

class FriendComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friendActive: true,
            companyActive: false,
            invitationActive: false,
            anotherProfile:false
        }
        this._getData();
        this.friendListClassChange = this.friendListClassChange.bind(this)
        this.companyClassChange = this.companyClassChange.bind(this)
        this.invitationClassChange = this.invitationClassChange.bind(this)
    }
    

    _getData(){
        this.setState({anotherProfile: this.props.anotherProfilePage})
        
        
    }
    friendListClassChange = () => {
        let friend = document.getElementById("friend")
        let company = document.getElementById("company")
        let invitation = document.getElementById("invitation")
        this.setState({
            friendActive: true,
            companyActive: false,
            invitationActive: false
        })
        friend.style.color = "#2c2c2c"
        friend.style.fontFamily = "cloud"
        company.style.color = "#5a5a5a"
        company.style.fontFamily = "cloud light"
        if (this.props.anotherProfilePage ==false) {
            invitation.style.color = "#5a5a5a"
            invitation.style.fontFamily = "cloud light"
        }

    }
    companyClassChange = () => {
        let friend = document.getElementById("friend")
        let company = document.getElementById("company")
        let invitation = document.getElementById("invitation")
        this.setState({
            friendActive: false,
            companyActive: true,
            invitationActive: false
        })
        friend.style.color = "#5a5a5a"
        friend.style.fontFamily = "cloud light"
        company.style.color = "#2c2c2c"
        company.style.fontFamily = "cloud"
        if (this.props.anotherProfilePage ==false) {
            invitation.style.color = "#5a5a5a"
            invitation.style.fontFamily = "cloud light"
        }

    }
    invitationClassChange = () => {
        let friend = document.getElementById("friend")
        let company = document.getElementById("company")
        let invitation = document.getElementById("invitation")
        this.setState({
            friendActive: false,
            companyActive: false,
            invitationActive: true
        })
        friend.style.color = "#5a5a5a"
        friend.style.fontFamily = "cloud light"
        company.style.color = "#5a5a5a"
        company.style.fontFamily = "cloud light"
        invitation.style.color = "#2c2c2c"
        invitation.style.fontFamily = "cloud"
    }
    _onMenuClick = () => {
        this.child._friendList();
    }
    render() {
        //const id=
        return (
            <div className="friend-wrapper" onLoad={this._onMenuClick}> 
                <div className="friend-header">
                    <h3 className="connection-header">Connections</h3>
                </div>
                <div>
                    {this.props.anotherProfilePage ?
                        <div>
                            <div className="button-statement">
                                <span className="friend friend-list" onClick={async () => { await this.friendListClassChange(); await this._onMenuClick(); }} id="friend">All Friends<span className="notice list"> ({this.props.popularity.friend})</span></span>
                                <span className="friend friend-company" onClick={this.companyClassChange} id="company">Companies <span className="notice list"> ({this.props.popularity.company})</span></span>

                            </div>
                        </div>
                        :
                        <div>
                            <div className="button-statement">
                                <span className="friend friend-list" onClick={async () => { await this.friendListClassChange(); await this._onMenuClick(); }} id="friend">All Friends<span className="notice list"> ({this.props.popularity.friend})</span></span>
                                <span className="friend friend-company" onClick={this.companyClassChange} id="company">Companies <span className="notice list"> ({this.props.popularity.company})</span></span>
                                <span className="friend friend-invitation" onClick={this.invitationClassChange} id="invitation">Invitations <span className="notice invite"> {this.props.popularity.invite}</span></span>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    {this.props.anotherProfilePage ?
                        <div className="friend-component">
                            <div className={this.state.friendActive === false ? "hide" : ""}>
                                <i className="mini-spot" />
                                <FriendList onRef={ref => (this.child = ref)}
                                    anotherProfile={this.props.anotherProfilePage}
                                    anotherProfileId={this.props.anotherProfile.anotherProfile.user.id} />
                            </div>
                            <div className={this.state.companyActive === false ? "hide" : ""}>
                                <i className="mini-spot" />
                                <Company />
                            </div>
                        </div>
                        :
                        <div className="friend-component">
                            <div className={this.state.friendActive === false ? "hide" : ""}>
                                <i className="mini-spot" />
                                <FriendList onRef={ref => (this.child = ref)}
                                    anotherProfile={this.props.anotherProfilePage} />
                            </div>
                            <div className={this.state.companyActive === false ? "hide" : ""}>
                                <i className="mini-spot" />
                                <Company />
                            </div>
                            <div className={this.state.invitationActive === false ? "hide" : ""}>
                                <i className="mini-spot" />
                                <Invitation />
                            </div>
                        </div>

                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        popularity: state.friendReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPop: (number) => { dispatch({ type: SET, payload: number }) }
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    //connect(mapStateToProps),
    withRouter
)(FriendComponent);