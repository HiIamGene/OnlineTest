import React, { Component } from 'react';
import Card from "../Card"
import RecommendBanner from "./RecommendBanner"
import compose from "recompose/compose";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/router";
import InviteItems from "./InviteItems";
import {API_FEED_EVENT,
        API_FEED_EVENT_INVITATION} from "../../../constant/ENV";
import axios from "axios";
import { withToastManager } from "react-toast-notifications"

class InviteBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            eventArray: [],
            loading: true,
            errorEvent: 0
        }
    }

    componentDidMount() {
        this.getInitialData();
    }

    componentDidUpdate() {
        //console.log(this.props)
    }

    getInitialData = () => {
        this.setState({
            loading: true
        })
        axios.get(API_FEED_EVENT_INVITATION).then(response1 => {
            if(response1.status == 200) {
                const data = response1.data.payload.response;
                this.setState({
                    eventArray: data,
                    loading: false
                })
            }
        })
    }

    _isClick = (callback) => {
        if(callback) {
            this.getInitialData();
        }
    }

    _errEvent = (callback) => {
        //console.log(callback)
        this.setState({
            errorEvent: this.state.errorEvent + 1
        }) 
    }

    render() {
        const { t } = this.props;
        const { loading, eventArray, errorEvent } = this.state;
        //console.log(eventArray.length)
        //console.log(this.props)
        return (
            <Card title={t('INVITE.Invitation_event')}>
                {
                    loading ? 
                        <div className={"loading-event"}>
                            <img 
                                className={"loading-event-gif"}
                                src={"../static/images/image-loader/spinner-loader.gif"}
                            />
                        </div>
                    :
                        <div className={"invitation-event-main"}>
                            {
                                eventArray.length <= errorEvent ?
                                    <div className={!loading ? "no-data-now" : "none-display"}>
                                        {t('INVITE.no')}
                                    </div>
                                :
                                    eventArray.map((key, index) => (
                                        <InviteItems 
                                            id={key} 
                                            isClick={this._isClick} 
                                            error={this._errEvent} 
                                            index={index}
                                            key={`eventInviteItems-${index}`}
                                        />
                                    ))
                            }
                        </div>
                }
            </Card>
        );
    }
};

export default compose(
    withNamespaces('event'),
    withRouter,
    withToastManager
)(InviteBox);