import React, { Component } from 'react';
import Card from "../feed"
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import SuggestFriends from "./Suggest";

class SuggestBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            additional_window:false
        }
        this._showWindow = this._showWindow.bind(this);
    }
    _showWindow(additional_window){
        this.setState({
            additional_window
        });
    }
    render(){
        let {t} = this.props;
        return (
            <div className="wrapper-overall">
                <Card title={t('Suggest')+"..."} noPadding_bottom={true}>
                    <div className={"wrapper"}>
                        <SuggestFriends/>
                        <SuggestFriends/>
                        <SuggestFriends/>
                        <SuggestFriends/>
                        <button className = "find-friends-btn" onClick={()=>{
                            this._showWindow(true);
                        }}>{t('NEARBY_MENU.Discover More')+"..."}</button>
                        {this.state.additional_window &&
                        <div className="nearby-list-header">
                            <Card title={t('NEARBY_MENU.Near Me')+"..."} topRight={<span className={"btn-close-find-friends"} onClick = {()=>{
                                this._showWindow(false);
                            }}><i className="fas fa-times"/></span>}>
                                <div className = "center-div">
                                    <Card noMargin={true}>
                                        <SuggestFriends/>
                                        <SuggestFriends/>
                                        <SuggestFriends/>
                                        <SuggestFriends/>
                                        <SuggestFriends/>
                                        <SuggestFriends/>
                                        <SuggestFriends/>
                                        <SuggestFriends/>
                                        <SuggestFriends/>
                                        <SuggestFriends/>
                                        <SuggestFriends/>
                                        <SuggestFriends/>
                                    </Card>
                                </div>
                            </Card>
                        </div>
                        }
                        {this.state.additional_window? <div className='grey-onclick-element show near' onClick = {()=>{this._showWindow(false)}}/> : <div className='grey-onclick-element near'/>}
                    </div>
                </Card>
            </div>
        );
    }
}

export default compose(
    withNamespaces('timeline'),
    withRouter
)(SuggestBox);