import React, { Component } from 'react';
import Feed from "../../timeline"
import Reactions from "../Reactions"
import Comments from "../Comments"
import compose from "recompose/compose"
import {connect} from "react-redux"
import {withNamespaces} from "../../../../lib/i18n";
// import Card from '../Card';
import {imageWithToken} from "../../../../utils/image";
import {DEFAULT_AVATAR_URL} from "../../../../constant";
import axios from "axios";
import {API_FEED_FEED} from "../../../../constant/ENV";
import {setPostInfiniteScroll, setPostPopup, setPostCommentPopup, setPostImagePopup, setImageIndex} from "../../../../redux/actions/feedAction";
import MenuContainer from '../../menuContainer';
import router, {withRouter} from "next/dist/lib/router";
import PostYoutubeVideo from '../PostComponent/PostYoutubeVideo';

class PostPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            isPopupClose: false,
            imageSize: {
                width: 0,
                height: 0
            }
        }
    }

    componentWillMount() {
        const img = document.querySelector("img")
        const div = document.getElementById(this.props.post.id)
        this.setState({
            token: this.props.auth.token,
            isPopupClose: false,
            imageSize: {
                width: img.width,
                height: img.height
            }
        })
    }

    _redirect(id){
        // // console.log(id + " = " + this.props.profile.user.id);
        if(id == this.props.profile.user.id){
            router.push('/timeline');
        }
        else{
            router.push('/timeline?search=' +id);
        }
    }

    _popupOpen(isPostPopup) {
        this.props.setPostPopup({
            id: this.props.feed.post.id,
            isPostPopup,
        })
        this.props.setPostCommentPopup({
            id: this.props.feed.post.id,
            isPostCommentPopup: isPostPopup
        })
        this.props.setPostImagePopup({
            id: this.props.feed.post.id,
            isPostImagePopup: isPostPopup
        })
    }

    render() {
        const { post, profile } = this.props
        return(
            <div className="post-popup-wrapper">
                <div className="post-popup">
                    <div className="post-popup-main">
                        {this.props.post.images[0] !== undefined ?
                        <div className="image-slide-main">
                            <div className="current-image-slide" id={post.id} >
                                <img className="current-image-show" src={this.props.feed.imageIndex !== -1 ? `${post.images[this.props.feed.imageIndex].url}?token=${this.state.token}` : `${post.images[0].url}?token=${this.state.token}`}
                                style={{
                                    width: this.state.imageSize.width > this.state.imageSize.height ? "auto" : "100%",
                                    height: this.state.imageSize.height > this.state.imageSize.width ? "auto" : "100%"
                                }}/>
                                <i className="prev-image-left fas fa-chevron-left" onClick={() => {
                                    this.props.feed.imageIndex === 0 ? this.props.setImageIndex(this.props.post.images.length - 1) : this.props.setImageIndex(this.props.feed.imageIndex - 1)
                                }}/>
                                <i className="prev-image-right fas fa-chevron-right" onClick={() => {
                                    this.props.feed.imageIndex === this.props.post.images.length - 1 ? this.props.setImageIndex(0) : this.props.setImageIndex(this.props.feed.imageIndex + 1)
                                }}/>
                            </div>
                        </div> : ""}
                        {post.message !== null ?
                        (post.message.includes("https://www.youtube.com") || post.message.includes("https://youtu.be")) && this.props.post.images[0] === undefined ?
                        <div className="youtube-preview-video">
                            <PostYoutubeVideo value={post.message}/>
                        </div> : "" : ""}
                        <div className="post-detail" style={{ minWidth: "350px", width: post.images[0] !== undefined ? "35%" : "100%", maxHeight: "70vh", overflow: "auto" }}>
                            <div className={"popup-header"}>
                                <div className={"popup-wrapper-profile"}>
                                    <img className="profile-image" src={post.user.profilePic ? imageWithToken(post.user.profilePic) : DEFAULT_AVATAR_URL }/>
                                </div>
                                <div className={"popup-wrapper-detail margintop-header"}>
                                    <div className={"popup-name"} onClick={()=>{this._redirect(post.user.id)}}><span className="popup-name-text">{`${post.user.name} ${post.user.surname}`}</span></div>
                                    <div className={"popup-date"}><span style={{ color: "#8b8b8b", fontSize: ".8em" }}>{this.props.time}</span></div>
                                </div>
                                <div className = {"menu-container margintop-header"}>
                                    <MenuContainer getPost={post} postId={post.id} profile={profile}/>
                                </div>
                            </div>
                            {post.message !== null ?
                            <div className={"captions"} style={{ fontSize: post.message.length < 100 ? "20px" : "15px", padding: "10px 10px 0 20px" }}>
                                {post.message}
                            </div> : "" }
                            <div className="reaction-state">
                                <Reactions post={post}/>
                            </div>
                            {/* <div className="comment-state">
                                <Comments profile={profile} getPostId={post.id}/>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="post-popup-click" onClick={() => { this._popupOpen(false) }}></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
        feed: state.feedReducer,
        auth: state.authReducer
    }
};

export default compose(
    withNamespaces('timeline'),
    connect(mapStateToProps,{setPostInfiniteScroll, setPostPopup, setPostCommentPopup, setPostImagePopup, setImageIndex}),
    withRouter
)(PostPopup);