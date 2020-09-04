import React, { Component } from "react";
import Feed from "../timeline";
import Reactions from "./Reactions";
import Comments from "./Comments";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withNamespaces } from "../../../lib/i18n";
// import Card from '../Card';
import { imageWithToken } from "../../../utils/image";
import { DEFAULT_AVATAR_URL } from "../../../constant";
import { setPostInfiniteScroll, setPostPopup, clearFeedPost } from "../../../redux/actions/feedAction";
import MenuContainer from "../menuContainer";
import router, { withRouter } from "next/dist/lib/router";
import moment from "moment";
import Link from "next/link";
import PostTime from "../PostsBox/PostComponent/PostTime";
import PostImage from "../PostsBox/PostComponent/PostImage";
import PostYoutubeVideo from "../PostsBox/PostComponent/PostYoutubeVideo";

class PostShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            getPost: [],
            postId: "",
            // isBottom: false,
            page: 2,
            editMessage: "",
            isFeedEmpty: true,
            text: "",
            link: "",
            isMessageHaveLink: false,
            timeStamp: ""
        };
        this.createPost = this.createPost.bind(this);
        this._redirect = this._redirect.bind(this);
    }

    _redirect(id) {
        if (id == this.props.profile.user.id) {
            router.push("/timeline");
        } else {
            router.push("/timeline?search=" + id);
        }
    }

    createTime(localeTime) {
        return `${moment(localeTime).fromNow()}`;
    }

    formatMessage(message) {
        const text = message.split(" ");
        let filterText;
        let link = "";
        for (let i = 0; i < text.length; i++) {
            if (text[i].match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
                link = text[i];
            }
        }
        filterText = text.filter(text => text != link);
        // // console.log("Filter link only", filterText)
        return (
            <div>
                {filterText.length > 0 ? filterText.join(" ") : filterText}{" "}
                <Link href={link}>
                    <a target="blank" className="link-text">
                        {link}
                    </a>
                </Link>
            </div>
        );
    }

    createSharePost(post, index) {
        if (post.message || post.images) {
            const { profile } = this.props;
            return post.sharePostForm ? (
                <Feed key={"createPost" + index} noPadding={true} noPadding_bottom={true} className="post-wrapper">
                    <div>
                        <div className={"header"}>
                            <div
                                className={"wrapper-profile"}
                                onClick={() => {
                                    this._redirect(post.user.id);
                                }}
                            >
                                <img
                                    src={
                                        post.user.profilePic ? imageWithToken(post.user.profilePic) : DEFAULT_AVATAR_URL
                                    }
                                />
                            </div>
                            <div className={"wrapper-detail margintop-header"}>
                                <div
                                    className={"name"}
                                    onClick={() => {
                                        this._redirect(post.user.id);
                                    }}
                                >
                                    <span>
                                        {post.user.name.concat(post.user.surname).length > 50
                                            ? post.user.name
                                                  .concat(post.user.surname)
                                                  .substring(0, 50)
                                                  .concat("...")
                                            : `${post.user.name} ${post.user.surname}`}
                                    </span>
                                </div>
                                <PostTime
                                    time={this.createTime(post.createdAt)}
                                    profile={profile}
                                    post={post}
                                    index={index}
                                />
                            </div>
                            <div className={"menu-container margintop-header"}>
                                <MenuContainer getPost={post} postId={post.id} profile={profile} index={index} />
                            </div>
                        </div>
                        <div className={"body"}>
                            {post.message !== null ? (
                                <div
                                    className={"captions"}
                                    style={{
                                        fontSize: post.message.length < 100 ? "20px" : "15px",
                                        padding: "10px 10px 0 20px"
                                    }}
                                >
                                    {this.formatMessage(post.message)}
                                </div>
                            ) : (
                                ""
                            )}
                            {post.sharePostForm.images.length > 0 ? (
                                <PostImage post={post.sharePostForm} isShare={false} />
                            ) : post.sharePostForm.message !== null ? (
                                <PostYoutubeVideo value={post.sharePostForm.message} />
                            ) : (
                                ""
                            )}
                            <div className="share-state">
                                <div className="share-box">
                                    <div className={"header"}>
                                        <div className={"wrapper-profile"}>
                                            <img
                                                src={
                                                    post.sharePostForm.user.profilePic
                                                        ? imageWithToken(post.sharePostForm.user.profilePic)
                                                        : DEFAULT_AVATAR_URL
                                                }
                                            />
                                        </div>
                                        <div className={"wrapper-detail margintop-header"}>
                                            <div
                                                className={"name"}
                                                onClick={() => {
                                                    this._redirect(post.sharePostForm.user.id);
                                                }}
                                            >
                                                <span>
                                                    {post.sharePostForm.user.name.concat(
                                                        post.sharePostForm.user.surname
                                                    ).length > 50
                                                        ? post.sharePostForm.user.name
                                                              .concat(post.sharePostForm.user.surname)
                                                              .substring(0, 50)
                                                              .concat("...")
                                                        : `${post.sharePostForm.user.name} ${
                                                              post.sharePostForm.user.surname
                                                          }`}
                                                </span>
                                            </div>
                                            <PostTime
                                                time={this.createTime(post.sharePostForm.createdAt)}
                                                profile={profile}
                                                post={post.sharePostForm}
                                                index={index}
                                            />
                                        </div>
                                    </div>
                                    {post.sharePostForm.message !== null && post.sharePostForm.message !== "" ? (
                                        <div
                                            className={"captions"}
                                            style={{
                                                fontSize: post.sharePostForm.message.length < 100 ? "20px" : "15px",
                                                padding: "10px 10px 0 20px"
                                            }}
                                        >
                                            {this.formatMessage(post.sharePostForm.message)}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>

                        <Reactions post={post} time={this.createTime(post.createdAt)} />
                        <Comments profile={profile} getPostId={post.id} post={post} />
                    </div>
                </Feed>
            ) : (
                <Feed key={"createPost" + index} noPadding={true} noPadding_bottom={true} className="post-wrapper">
                    <div className={"header"}>
                        <div className={"wrapper-profile"}>
                            <img
                                src={post.user.profilePic ? imageWithToken(post.user.profilePic) : DEFAULT_AVATAR_URL}
                            />
                        </div>
                        <div className={"wrapper-detail margintop-header"}>
                            <div
                                className={"name"}
                                onClick={() => {
                                    this._redirect(post.user.id);
                                }}
                            >
                                <span>
                                    {post.user.name.concat(post.user.surname).length > 50
                                        ? post.user.name
                                              .concat(post.user.surname)
                                              .substring(0, 50)
                                              .concat("...")
                                        : `${post.user.name} ${post.user.surname}`}
                                </span>
                            </div>
                            <PostTime
                                time={this.createTime(post.createdAt)}
                                profile={profile}
                                post={post}
                                index={index}
                            />
                        </div>
                        <div className={"menu-container margintop-header"}>
                            <MenuContainer getPost={post} postId={post.id} profile={profile} />
                        </div>
                    </div>

                    <div className={"body"}>
                        {post.message !== undefined && post.message !== null ? (
                            <div
                                className={"captions"}
                                style={{
                                    fontSize: post.message.length < 100 ? "20px" : "15px",
                                    padding: "10px 10px 0 20px"
                                }}
                            >
                                {this.formatMessage(post.message)}
                                <div className="deleted-post">
                                    <span className="deleted-text">This post has no longer available</span>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {post.images.length > 0 ? (
                            <PostImage post={post} isShare={false} />
                        ) : post.message !== null ? (
                            post.message.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/) ? (
                                <div className="youtube-preview-video">
                                    <PostYoutubeVideo value={post.message} />
                                </div>
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}
                    </div>

                    <Reactions post={post} time={this.createTime(post.createdAt)} />
                    <Comments profile={profile} getPostId={post.id} post={post} />
                </Feed>
            );
        }
    }

    createShareEvent(post, index) {
        if (post.message) {
            const { profile } = this.props;
            return post.shareEventForm ? (
                <Feed key={"createPost" + index} noPadding={true} noPadding_bottom={true} className="post-wrapper">
                    <div>
                        <div className={"header"}>
                            <div
                                className={"wrapper-profile"}
                                onClick={() => {
                                    this._redirect(post.user.id);
                                }}
                            >
                                <img
                                    src={
                                        post.user.profilePic ? imageWithToken(post.user.profilePic) : DEFAULT_AVATAR_URL
                                    }
                                />
                            </div>
                            <div className={"wrapper-detail margintop-header"}>
                                <div
                                    className={"name"}
                                    onClick={() => {
                                        this._redirect(post.user.id);
                                    }}
                                >
                                    <span>
                                        {post.user.name.concat(post.user.surname).length > 50
                                            ? post.user.name
                                                  .concat(post.user.surname)
                                                  .substring(0, 50)
                                                  .concat("...")
                                            : `${post.user.name} ${post.user.surname}`}
                                    </span>
                                </div>
                                <PostTime
                                    time={this.createTime(post.createdAt)}
                                    profile={profile}
                                    post={post}
                                    index={index}
                                />
                            </div>
                            <div className={"menu-container margintop-header"}>
                                <MenuContainer getPost={post} postId={post.id} profile={profile} />
                            </div>
                        </div>
                        <div className={"body"}>
                            {post.message !== null ? (
                                <div
                                    className={"captions"}
                                    style={{
                                        fontSize: post.message.length < 100 ? "20px" : "15px",
                                        padding: "10px 10px 0 20px"
                                    }}
                                >
                                    {this.formatMessage(post.message)}
                                </div>
                            ) : (
                                ""
                            )}
                            <div className={"event-share mt-3"}>
                                <Link href={`_event?id=${post.shareEventForm.id}`}>
                                    <a className="event-link">
                                        <div className={"wrapper"}>
                                            <div className={"event-cover-main"}>
                                                <div className={"event-cover-center"}>
                                                    <img
                                                        src={
                                                            post.shareEventForm.images
                                                                ? imageWithToken(post.shareEventForm.images)
                                                                : "../../../static/images/icon/crewhitz-meeting-2.png"
                                                        }
                                                        className={"event-cover"}
                                                        alt={"cover"}
                                                    />
                                                </div>
                                            </div>
                                            <div className={"container-event-name"}>
                                                <div className={"wrap-name-event"}>
                                                    <img
                                                        src="/static/images/icon/calendar-s.png"
                                                        className={"icon-calendar"}
                                                    />
                                                    <label className={"start"}>
                                                        {post.shareEventForm.eventName.length <= 27
                                                            ? `${post.shareEventForm.eventName}`
                                                            : `${post.shareEventForm.eventName.substring(0, 27)}...`}
                                                    </label>
                                                </div>
                                                <div className={"wrap-name-event"}>
                                                    <i
                                                        className={"fas fa-map-marker-alt"}
                                                        style={{ marginRight: 10 }}
                                                    />
                                                    <label className={"start"}>
                                                        {post.shareEventForm.location.length <= 30
                                                            ? `${post.shareEventForm.location}`
                                                            : `${post.shareEventForm.location.substring(0, 30)}...`}
                                                    </label>
                                                </div>
                                                <div className={"wrap-name-event view"}>
                                                    {" "}
                                                    <i className={"fas fa-eye mr-2"} /> View :{" "}
                                                    {post.shareEventForm.privacy == "PUBLIC" ? "Public" : "Private"}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                                <div className={"content-post"}>
                                    {post.shareEventForm.descript.length <= 297
                                        ? `${post.shareEventForm.descript}`
                                        : `${post.shareEventForm.descript.substring(0, 297)}...`}
                                </div>
                            </div>
                        </div>

                        <Reactions post={post} time={this.createTime(post.createdAt)} />
                        <Comments profile={profile} getPostId={post.id} post={post} isEventPost={true} />
                    </div>
                </Feed>
            ) : (
                <Feed key={"createPost" + index} noPadding={true} noPadding_bottom={true} className="post-wrapper">
                    <div className={"header"}>
                        <div className={"wrapper-profile"}>
                            <img
                                src={post.user.profilePic ? imageWithToken(post.user.profilePic) : DEFAULT_AVATAR_URL}
                            />
                        </div>
                        <div className={"wrapper-detail margintop-header"}>
                            <div
                                className={"name"}
                                onClick={() => {
                                    this._redirect(post.user.id);
                                }}
                            >
                                <span>
                                    {post.user.name.concat(post.user.surname).length > 50
                                        ? post.user.name
                                              .concat(post.user.surname)
                                              .substring(0, 50)
                                              .concat("...")
                                        : `${post.user.name} ${post.user.surname}`}
                                </span>
                            </div>
                            <PostTime
                                time={this.createTime(post.createdAt)}
                                profile={profile}
                                post={post}
                                index={index}
                            />
                        </div>
                        <div className={"menu-container margintop-header"}>
                            <MenuContainer getPost={post} postId={post.id} profile={profile} />
                        </div>
                    </div>

                    <div className={"body"}>
                        {post.message !== undefined && post.message !== null ? (
                            <div
                                className={"captions"}
                                style={{
                                    fontSize: post.message.length < 100 ? "20px" : "15px",
                                    padding: "10px 10px 0 20px"
                                }}
                            >
                                {this.formatMessage(post.message)}
                                <div className="deleted-post">
                                    <span className="deleted-text">This post has no longer available</span>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {post.images.length > 0 ? (
                            <PostImage post={post} isShare={false} />
                        ) : post.message !== null ? (
                            post.message.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/) ? (
                                <div className="youtube-preview-video">
                                    <PostYoutubeVideo value={post.message} />
                                </div>
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}
                    </div>

                    <Reactions post={post} time={this.createTime(post.createdAt)} />
                    <Comments profile={profile} getPostId={post.id} post={post} />
                </Feed>
            );
        }
    }

    createPost(post, index) {
        if (post.message !== "" || post.images !== undefined) {
            const { profile } = this.props;
            return (
                <Feed key={"createPost" + index} noPadding={true} noPadding_bottom={true} className="post-wrapper">
                    <div className={"header"}>
                        <div className={"wrapper-profile"}>
                            <img
                                src={post.user.profilePic ? imageWithToken(post.user.profilePic) : DEFAULT_AVATAR_URL}
                            />
                        </div>
                        <div className={"wrapper-detail margintop-header"}>
                            <div
                                className={"name"}
                                onClick={() => {
                                    this._redirect(post.user.id);
                                }}
                            >
                                <span>
                                    {post.user.name.concat(post.user.surname).length > 50
                                        ? post.user.name
                                              .concat(post.user.surname)
                                              .substring(0, 50)
                                              .concat("...")
                                        : `${post.user.name} ${post.user.surname}`}
                                </span>
                            </div>
                            <PostTime
                                time={this.createTime(post.createdAt)}
                                profile={profile}
                                post={post}
                                index={index}
                            />
                        </div>
                        <div className={"menu-container margintop-header"}>
                            <MenuContainer getPost={post} postId={post.id} profile={profile} />
                        </div>
                    </div>

                    <div className={"body"}>
                        {post.message !== undefined && post.message !== null ? (
                            <div
                                className={"captions"}
                                style={{
                                    fontSize: post.message.length < 100 ? "20px" : "15px",
                                    padding: "10px 10px 0 20px"
                                }}
                            >
                                {this.formatMessage(post.message)}
                            </div>
                        ) : (
                            ""
                        )}
                        {post.images.length > 0 ? (
                            <PostImage post={post} isShare={false} />
                        ) : post.message !== null ? (
                            post.message.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/) ? (
                                <div className="youtube-preview-video">
                                    <PostYoutubeVideo value={post.message} />
                                </div>
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}
                    </div>

                    <Reactions post={post} time={this.createTime(post.createdAt)} />
                    <Comments profile={profile} getPostId={post.id} post={post} />
                </Feed>
            );
        }
    }

    render() {
        const posts = this.props.posts.map((post, index) => {
            if (!post.sourcePostId && !post.sourceEventId) return this.createPost(post, index);
            else {
                if (post.sourcePostId) return this.createSharePost(post, index);
                else if (post.sourceEventId) return this.createShareEvent(post, index);
            }
        });
        return (
            <div>
                {posts}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profileReducer,
        feed: state.feedReducer
    };
};

export default compose(
    withNamespaces("timeline"),
    connect(
        mapStateToProps,
        { setPostInfiniteScroll, setPostPopup, clearFeedPost }
    ),
    withRouter
)(PostShow);
