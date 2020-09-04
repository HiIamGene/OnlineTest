import React, { Component } from 'react';
import compose from "recompose/compose"
import {connect} from "react-redux"
import PostPopup from './PostPopup'
import {setPostPopup, setPostForOption} from "../../../../redux/actions/feedAction";

class PostTime extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPostPopup: false
        }
    }

    _postPopup(isPostPopup) {
        this.props.setPostPopup({
            id: this.props.feed.post.id,
            isPostPopup
        })
    }

    render() {
        return(
            <div className="date-wrapper">
                <div className={"date"} onClick={async () => {
                    await this.props.setPostForOption(this.props.post)
                    this._postPopup(true);
                }}>
                    <span className="date-text">{this.props.time}</span>
                </div>
                {(this.props.feed.isPostPopup || this.props.feed.isPostCommentPopup || this.props.feed.isPostImagePopup) && this.props.feed.postIdForPopup === this.props.post.id ? 
                <PostPopup post={this.props.post} profile={this.props.profile} time={this.props.time} index={this.props.index}/> : ""}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
        feed: state.feedReducer
    }
};

export default compose(
    connect(mapStateToProps,{setPostPopup, setPostForOption})
)(PostTime);