import React, { Component } from "react";
import Feed from "../../feed";
import Reactions from "../Reactions";
import Comments from "../Comments";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withNamespaces } from "../../../../lib/i18n";
// import Card from '../Card';
import { imageWithToken } from "../../../../utils/image";
import { DEFAULT_AVATAR_URL } from "../../../../constant";
import axios from "axios";
import { API_FEED_FEED } from "../../../../constant/ENV";
import {
    setPostInfiniteScroll,
    setPostPopup,
    setPostCommentPopup,
    setPostImagePopup,
    setImageIndex
} from "../../../../redux/actions/feedAction";
import MenuContainer from "../../MenuContainer";
import router, { withRouter } from "next/dist/lib/router";
import PostYoutubeVideo from "../PostComponent/PostYoutubeVideo";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class PostPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            isPopupClose: false,
            imageSize: {
                width: 0,
                height: 0
            },
            divSize: {
                width: 0,
                height: 0
            },
            isPostPopupShpw: this.props.feed.isPostPopup
        };
    }

    async componentWillMount() {
        const img = document.querySelector("img");
        this.setState({
            token: this.props.auth.token,
            isPopupClose: false,
            imageSize: {
                width: img.width > img.height ? "100%" : "auto",
                height: img.width > img.height ? "100%" : "auto"
            }
        });
        // console.log(this.state.imageSize)
    }

    _redirect(id) {
        // // console.log(id + " = " + this.props.profile.user.id);
        if (id == this.props.profile.user.id) {
            router.push("/timeline");
        } else {
            router.push("/timeline?search=" + id);
        }
    }

    async toggle() {
        const { feed } = this.props;
        if (feed.isPostCommentPopup) {
            this.props.setPostCommentPopup({
                id: feed.post.id,
                isPostPopup: !feed.isPostCommentPopup
            });
        } else if (feed.isPostImagePopup) {
            this.props.setPostImagePopup({
                id: feed.post.id,
                isPostPopup: !feed.isPostImagePopup
            });
        } else {
            this.props.setPostPopup({
                id: feed.post.id,
                isPostPopup: !feed.isPostPopup
            });
        }
    }

    changeImage(action) {
        if (action === -1) {
            if (this.props.feed.imageIndex === 0) {
                // console.log("Its", this.props.feed.imageIndex,"now")
                this.props.setImageIndex(this.props.post.images.length - 1);
            } else {
                this.props.setImageIndex(this.props.feed.imageIndex - 1);
                // console.log("Current image", this.props.feed.imageIndex)
                // console.log("Image length", this.props.post.images.length)
            }
        } else {
            if (
                this.props.feed.imageIndex ===
                this.props.post.images.length - 1
            ) {
                // console.log("Its", this.props.feed.imageIndex,"now")
                this.props.setImageIndex(0);
            } else {
                this.props.setImageIndex(this.props.feed.imageIndex + 1);
                // console.log("current index", this.props.feed.imageIndex)
                // console.log("Image length", this.props.post.images.length)
            }
        }
    }

    render() {
        const { post, profile } = this.props;
        return (
            <Modal
                isOpen={true}
                fade={false}
                centered
                className="post-popup-modal"
                toggle={() => this.toggle()}
            >
                <ModalBody className="post-popup-modal-body">
                    {this.props.post.images[0] !== undefined ? (
                        <div className="image-slide-main component-post-popup">
                            <img
                                className="current-image-show"
                                id={
                                    this.props.feed.imageIndex !== -1
                                        ? `${post.images[this.props.feed.imageIndex].id}?token=${this.state.token}`
                                        : `${post.images[0].id}`
                                }
                                src={
                                    this.props.feed.imageIndex !== -1
                                        ? `${post.images[this.props.feed.imageIndex].url}?token=${this.state.token}`
                                        : `${post.images[0].url}?token=${this.state.token}`
                                }
                            />
                            {this.props.post.images[1] !== undefined ? (
                                <>
                                    <i
                                        className="prev-image-left fas fa-chevron-left"
                                        onClick={() => this.changeImage(-1)}
                                    />
                                    <i
                                        className="prev-image-right fas fa-chevron-right"
                                        onClick={() => this.changeImage(0)}
                                    />
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="detail-post-popup">
                        <div className={"popup-header"}>
                            <div className={"popup-wrapper-profile"}>
                                <img
                                    className="profile-image"
                                    src={
                                        post.user.profilePic
                                            ? imageWithToken(
                                                  post.user.profilePic
                                              )
                                            : DEFAULT_AVATAR_URL
                                    }
                                />
                            </div>
                            <div
                                className={
                                    "popup-wrapper-detail margintop-header"
                                }
                            >
                                <div
                                    className={"popup-name"}
                                    onClick={() => {
                                        this._redirect(post.user.id);
                                    }}
                                >
                                    <span className="popup-name-text">{`${post.user.name} ${post.user.surname}`}</span>
                                </div>
                                <div className={"popup-date"}>
                                    <span
                                        style={{
                                            color: "#8b8b8b",
                                            fontSize: ".8em"
                                        }}
                                    >
                                        {this.props.time}
                                    </span>
                                </div>
                            </div>
                            <div className={"menu-container-popup"}>
                                <MenuContainer
                                    getPost={post}
                                    postId={post.id}
                                    profile={profile}
                                    isPostPopup={true}
                                />
                            </div>
                        </div>
                        {post.message !== null ? (
                            <div
                                className={"captions"}
                                style={{
                                    fontSize:
                                        post.message.length < 100
                                            ? "20px"
                                            : "15px",
                                    padding: "10px 10px 0 20px"
                                }}
                            >
                                {post.message}
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="reaction-state">
                            <Reactions post={post} />
                        </div>
                        <div className="comment-state">
                            <Comments
                                profile={profile}
                                post={post}
                                getPostId={post.id}
                            />
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            // <div className="post-popup-wrapper">
            //     <div className="post-popup">
            //         <div className="post-popup-main">
            //             {this.props.post.images[0] !== undefined ?
            //             <div className="image-slide-main">
            //                 <div className="current-image-slide" id={post.id} >
            //                     <img className="current-image-show" id={this.props.feed.imageIndex !== -1 ? `${post.images[this.props.feed.imageIndex].id}?token=${this.state.token}` : `${post.images[0].id}`}
            //                     src={this.props.feed.imageIndex !== -1 ? `${post.images[this.props.feed.imageIndex].url}?token=${this.state.token}` : `${post.images[0].url}?token=${this.state.token}`}
            //                     style={{
            //                         width: this.state.imageSize.width,
            //                         height: this.state.imageSize.height
            //                     }}/>
            //                     {this.props.post.images[1] !== undefined ?
            //                     <>
            //                         <i className="prev-image-left fas fa-chevron-left" onClick={() => this.changeImage(-1)} onKeyDown={e => this.handleChangeImage(e)}/>
            //                         <i className="prev-image-right fas fa-chevron-right" onClick={() => this.changeImage()} onKeyDown={e => this.handleChangeImage(e)}/>
            //                     </>
            //                     : ""}
            //                 </div>
            //             </div> : ""}
            //             {post.message !== null ?
            //             (post.message.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) && this.props.post.images[0] === undefined ?
            //             <div className="youtube-preview-video">
            //                 <PostYoutubeVideo value={post.message}/>
            //             </div> : "" : ""}
            //             <div className="post-detail" style={{ minWidth: "350px", width: post.images[0] !== undefined ? "35%" : "100%", maxHeight: "70vh", overflow: "auto" }}>

            // {post.message !== null ?
            // <div className={"captions"} style={{ fontSize: post.message.length < 100 ? "20px" : "15px", padding: "10px 10px 0 20px" }}>
            //     {post.message}
            // </div> : "" }
            // <div className="reaction-state">
            //     <Reactions post={post}/>
            // </div>
            // <div className="comment-state">
            //     <Comments profile={profile} post={post} getPostId={post.id}/>
            // </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="post-popup-click" onClick={() => { this._popupOpen(false) }}></div>
            // </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profileReducer,
        feed: state.feedReducer,
        auth: state.authReducer
    };
};

export default compose(
    withNamespaces("timeline"),
    connect(
        mapStateToProps,
        {
            setPostInfiniteScroll,
            setPostPopup,
            setPostCommentPopup,
            setPostImagePopup,
            setImageIndex
        }
    ),
    withRouter
)(PostPopup);
