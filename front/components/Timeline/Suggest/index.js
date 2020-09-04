import React, { Component } from 'react';
import Card from "../feed"
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import SuggestFriends from "./Suggest";
import axios from 'axios';
import API from '../../../constant/ENV';

class SuggestBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            additional_window:false,
            friends: []
        };
        this._showWindow = this._showWindow.bind(this);
    }
    _showWindow(additional_window){
        this.setState({
            additional_window
        });
    }

    async componentDidMount() {
        try {
            let res = await axios.get(API.USER.FRIEND_SUGGESTION_V010000+"?type=NOT%20FRIEND");
            console.log(res);
            let friends = res.data.payload.listSuggestionFriend;
            if(friends){
                this.setState({
                    friends
                })
            }

        } catch (e) {
            console.log(e);
        }

    }

    render(){
        let {t} = this.props;
        return (
            <div className="wrapper-overall">
                <Card title={t('Suggest Friend')} noPadding_bottom={true}>
                    <div className={"wrapper"}>
                        {this.state.friends.map((friend,index)=>{
                            if(index >= 4) return;
                            return <SuggestFriends data={friend} key={index}/>
                        })}
                        <button className = "find-friends-btn" onClick={()=>{
                            this._showWindow(true);
                        }}>{t('NEARBY_MENU.Discover More')}</button>
                        {this.state.additional_window &&
                        <div className="nearby-list-header">
                            <Card title={t('NEARBY_MENU.Near Me')} topRight={<span className={"btn-close-find-friends"} onClick = {()=>{
                                this._showWindow(false);
                            }}><i className="fas fa-times"/></span>}>
                                <div className = "center-div">
                                    <Card noMargin={true}>
                                        {this.state.friends.map((friend,index)=>{
                                            return <SuggestFriends data={friend} key={index}/>
                                        })}
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