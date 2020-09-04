import React, { Component } from 'react';
import compose from "recompose/compose";
import {connect} from "react-redux"
import {setOptionOpen, setDeletePostOptionOpen,deleteFeedPost} from "../../../../redux/actions/feedAction";
import {withNamespaces} from "../../../../lib/i18n";
import axios from "axios";
import {API_FEED_POST} from "../../../../constant/ENV"

class DeletePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reportPost: this.props.feed.post
        }
        this.deletePost = this.deletePost.bind(this);
    }
    async deletePost() {
            await axios.delete(`${API_FEED_POST}/${this.props.feed.post.id}`)
            this.props.deleteFeedPost(this.props.feed.post.id);
            this.props.setOptionOpen(true);
            this.props.setDeletePostOptionOpen(false);
    }
    render() {
        // console.log("DeletePost props : ",this.props);
        return(
            !this.props.feed.isOptionClose ? 
                <div className="option-post-wrapper">
                    <div className="option-header">
                        <div className="option-name-header">{this.props.optionName}</div>
                        <div className="option-name-close" onClick={() => {
                            this.props.setOptionOpen(true)
                            this.props.setDeletePostOptionOpen(false)
                        }}><i className="fas fa-times"/></div>
                    </div>
                    <div className="option-detail">{this.props.optionDetail}</div>
                    <div className="option-button-container">
                        <button className = "option-button red" onClick = {()=>{
                            this.deletePost();
                        }}>
                            Delete
                        </button>
                        <button className = "option-button grey" onClick = {()=>{
                            this.props.setOptionOpen(true)
                            this.props.setDeletePostOptionOpen(false)
                        }}>
                            Cancel
                        </button>
                    </div>
                </div> : ""
        )
    }
}

const mapStateToProps = (store) => {
    return {
        feed: store.feedReducer
    }
};

export default compose(
    withNamespaces('timeline'),
    connect(mapStateToProps,{setOptionOpen, setDeletePostOptionOpen,deleteFeedPost}),
)(DeletePost)