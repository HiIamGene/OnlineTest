import React, { Component } from 'react';
import Card from "../Card"
import compose from "recompose/compose";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/router";
import EventsPost from "./EventsPost"
import Content from "./Content";
import CreateBox from "../CreateBox/CreateBox";

class PostsBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
        //// console.log(this.props);
    }

    _isEdit = (callback) => {
        //// console.log(callback);
        this.props.isEdit(true, this.props.eventData, this.props.index);
        this.setState({
            isEdit: callback
        })
    }

    _isRedirect = (callback, eventData) => {
        if(callback) {
            this.props.isSaveEdit(true, eventData, this.props.index);
        }
    }

    _isDelete = (callback, type) => {
        if(callback) {
            this.props.isDelete(true, this.props.index, type);
        }
    }

    render() {
        const { eventData } = this.props;
        const { isEdit } = this.state;
        return (
            <Card noPadding={true}>
                {   isEdit ?
                    <CreateBox isEdit={this._isEdit} eventData ={eventData} isSaveEdit={this._isRedirect}/>
                    :
                    null

                }
                <div className={"header-eventpost"}>
                    <EventsPost eventData={eventData} isEdit={this._isEdit} isDelete={this._isDelete} index={this.props.index}/>
                </div>
                <div className={"content-eventpost"}>
                    <Content eventData={eventData} isClick ={this._isRedirect}/>
                </div> 
            </Card>
        );
    }
};
export default compose(
    withNamespaces('event'),
    
    withRouter
)(PostsBox);