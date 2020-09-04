import React, { Component } from 'react'
import {imageWithToken} from "../../utils/image";
import { connect } from "react-redux";
class photoitem extends Component {
    constructor(){
        super();
        this.state = {
            isOpen : false
        }
        this._clickImg = this._clickImg.bind(this);
    }
    async _clickImg(status){
        await this.setState({
            isOpen : status
        });
        // console.log("isOpen : ", this.state.isOpen);
    }
    render() {
        return (
            <div>
                <div className = "photo-child" onClick = {()=>{
                    this._clickImg(true);
                }}><img src = {imageWithToken(this.props.src)} className = "picture-photo"/></div>
                {this.state.isOpen? 
                <div>
                    <div className = "grey-onclick-element show">
                    </div>
                    <div className = "large-photo" style={{backgroundImage: `url(${this.props.src}?token=${this.props.auth.token})`,}}></div>
                    <div className = "close-photo"  onClick = {()=>{
                        this._clickImg(false);
                    }}><img src = "../../static/images/icon/AW_CrewHitz_ICON-36.png"/></div>
                </div>
                : ""}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}

export default connect(mapStateToProps)(photoitem);