import React, { Component } from 'react'
import InvitationInformation from "./InvitationInformation";
import {checkRequest} from '../../services/userService';
import {setPop} from '../../redux/actions/friendAction'
import compose from "recompose/compose"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { SET } from '../../redux/reducers/friendReducer';
class Invitation extends Component {
    constructor(){
        super();
        this.state = {
            request : [],
            invite : 0,
        }
        this._checkRequest = this._checkRequest.bind(this);
    }

    componentDidMount(){
        this._checkRequest();
    }
    async _checkRequest(){
        let data = await checkRequest();
        await this.setState({
            request: data.friendRequests,
            invite : data.friendRequests.length
        });
        this.props.setPop(this.state);
    }
    render() {
        let data = this.state;
        // console.log("Invite : " ,data);
        // console.log("Invite Props : ", this.props);
        return (
            <div className="wrapper">
                <div className="container">
                    {data.invite == 0? <div className = "no-invition">No invition right now.</div> : this.state.request.map((data)=>{
                        return(
                            <div className="item-friend"><InvitationInformation data = {data} checkRequest = {this._checkRequest}/></div>
                        );
                    })}
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setPop: (number) => {dispatch({type: SET,payload:number})}
    }
}

const mapStateToProps = (state) =>{
    return{
        popularity : state.friendReducer
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(Invitation)