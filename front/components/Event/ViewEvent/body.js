import React, {Component} from "react";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router"
import { compose } from "recompose";
import Left from "./LeftSide";
import Center from "./Center";
import Right from "./RightSide";
import axios from "axios";
import {
        API_FEED_EVENT,
        API_FEED_EVENT_ID_SUGGESTION,
        API_FEED_EVENT_REQUEST_LIST,
        API_FEED_EVENT_SUGGESTION} from "../../../constant/ENV";

class BodyViewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 0,
            foundPage: false,
            loadFalse: false
        }
        this.eventID = this.props.router.query.id; //"166c2eb5-3919-4ef9-8339-44b5427e76b5" "c266fe7c-1e2f-4655-8271-e344952a57ef"
        this.eventData = "";
        this.eventSuggest = "";
        this.eventRequest = "";
        this.eventPermission = "";
        this.suggestFriend = "";
    }

    componentWillMount() {
        this.getInitialEvent();
    }

    componentWillReceiveProps(next) {
        console.log('event', next, this.eventID)
        if(next.router.query.id !== this.eventID) {
            this.setState({
                loading: 0
            })
            this.eventID = next.router.query.id 
            this.componentWillMount()
        }
    }

    getEventRequest = () => {
        axios.get(API_FEED_EVENT_REQUEST_LIST).then(response => {
            let data = response.data.payload.response;
            //// console.log("get list")
            data.map(index => {
                if(index.id == this.eventID) {
                    this.eventRequest = index.eventRequest;
                    // console.log(this.eventRequest);
                }
            });
            this.loadSuccess();
        });
    }

    getInitialEvent = () => {
        axios.get(API_FEED_EVENT + "/" +this.eventID).then(response => {
            //console.log(response.data.payload);
            this.eventData = response.data.payload;

            if(this.eventData.user.id == this.props.profile.user.id) {
                this.eventPermission = "myEvent";
            }
            else if(this.eventData.bookmark != "none") {
                this.eventPermission = "bookmark";
            }
            else {
                this.eventPermission = "event";
            }
            this.loadSuccess();
            axios.get(API_FEED_EVENT_ID_SUGGESTION + this.eventData.id).then(response2 => {
                //// console.log(response2);
                this.suggestFriend = response2.data.payload;
                this.loadSuccess();
            });
            
            this.getEventRequest();
        
            axios.get(API_FEED_EVENT_SUGGESTION).then(response => {
                const data = response.data.payload;
                this.eventSuggest = data;
                this.loadSuccess();
            })

        }).catch(err => {
            console.log("_event", err.response, this.state)
            this.setState({
                foundPage: false,
                loadFalse: true
            })
        });
    }

    loadSuccess = () => {
        this.setState({
            foundPage: true,
            loading: this.state.loading+1
        });
    }

    _onAction = (callback) => {
        if(callback) {
            this.setState({
                loading: 0
            })
            this.eventData = "";
            this.eventSuggest = "";
            this.eventRequest = "";
            this.eventPermission = "";
            this.suggestFriend = "";
            this.getInitialEvent();
        }
    }

    render() {
        //// console.log(this.props.router);
        //// console.log(this.eventRequest);
        return (
            this.state.loading >= 4 ?
                (<div className={"view-event-body"}>
                    <Left permission={this.eventPermission} router={this.props.router} isDetail={true}/>
                    <Center eventData={this.eventData} suggest={this.suggestFriend}/>
                    <Right eventData={this.eventData} request={this.eventRequest} relateEvent={this.eventSuggest} onClick={this._onAction}/>
                </div>) 
                :
                !this.state.foundPage && this.state.loadFalse ?
                    <div className={"view-event-not-found"}>
                        404: This Event is not found
                    </div>
                    :
                    <div className={"view-event-loading"}>
                        <img 
                            src={"../../../static/images/image-loader/spinner-loader.gif"}
                        />
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
)(BodyViewEvent);