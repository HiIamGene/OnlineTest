import React, { Component } from "react";
import compose from "recompose/compose";
import { withNamespaces } from "../../../lib/i18n";
import { withRouter } from "next/dist/lib/router";
import { DEFAULT_AVATAR_URL } from "../../../constant";
import { connect } from "react-redux";
import { imageWithToken } from "../../../utils/image";
import {
    setPostComment,
    setCreateComment,
    setPostForOption,
    setEditComment,
    setDeleteComment,
    setCreatePostHasPost
} from "../../../redux/actions/feedAction";
import axios from "axios";
import { API_FEED_COMMENT, API_FEED_POST, API_FEED_FEED } from "../../../constant/ENV";
import moment from "moment";
import MenuContainerComment from "../MenuContainerComment";
import CommentLike from "../CommentLike";
import { FormGroup, Input, FormText } from "reactstrap";

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            fullComment: [],
            comment: [],
            commentPost: [],
            commentGet: [],
            currentComment: "",
            isLike: false,
            commentOptionShow: false,
            emotion: [],
            isShowSeeMore: true,
            isCommentSubmitShow: false,
            commentSubmit: false,
            page: 1,
            perPage: 5,
            isSeeMoreLoading: false,
            isLoading: false,
            lastPerPage: 0,
            tempCommentLength: 0,
            rowWhenFocus: 1
        };
        this.createComment = this.createComment.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    async componentWillMount() {
        const res = await axios.get(`${API_FEED_POST}/${this.props.getPostId}/comment?postId=${this.props.getPostId}`);
        const { data } = res;
        const { payload } = data;
        await this.setState({
            fullComment: payload,
            commentGet: this.props.post.comment
        });
    }

    async componentWillReceiveProps(prevProps) {
        if (this.props.feed.isCreatePostHasPost) {
            const res = await axios.get(
                `${API_FEED_POST}/${this.props.getPostId}/comment?postId=${this.props.getPostId}`
            );
            const { data } = res;
            const { payload } = data;
            await this.setState({
                fullComment: payload,
                commentGet: this.props.post.comment
            });
            this.props.setCreatePostHasPost(false);
        }
    }

    async seeMoreShow() {
        const { page, perPage, commentGet } = this.state;
        await axios
            .get(
                `${API_FEED_POST}/${this.props.getPostId}/comment?page=${page}&perPage=${perPage}&postId=${this.props.getPostId}`
            )
            .then(res => {
                if (res.data.payload.pagination.totalPage - res.data.payload.pagination === 1) {
                    this.setState({
                        perPage: this.state.lastPerPage
                    });
                }
                if (res.data.payload.payload.length > 0) {
                    if (this.props.post.totalComment < page * perPage || this.props.post.totalComment === 5) {
                        this.setState({
                            isShowSeeMore: false,
                            isSeeMoreLoading: false
                        });
                    }
                    this.setState({
                        commentGet:
                            page === 1
                                ? commentGet.concat(res.data.payload.payload.slice(1, res.data.payload.payload.length))
                                : commentGet.concat(res.data.payload.payload),
                        page: page + 1,
                        isSeeMoreLoading: false
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    async createComment(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        const inputData = {
            message: this.state.currentComment,
            postId: this.props.getPostId
        };
        await axios.post(API_FEED_COMMENT, { ...inputData }).then(res => {
            if (this.state.commentGet !== undefined) {
                let commentGet = this.state.commentGet;
                commentGet.unshift(res.data.payload);
                this.setState({
                    commentGet,
                    currentComment: "",
                    isLoading: false,
                    tempCommentLength: 1
                });
            }
        });
    }

    inputHandler(e) {
        const message = e.target.value;
        this.setState({
            currentComment: message
        });
        this.props.setCreateComment(message);
    }

    getTimeComment(localeTime) {
        return `${moment(localeTime).fromNow()}`;
    }

    _redirect(id) {
        if (id == this.props.profile.user.id) {
            router.push("/timeline");
        } else {
            router.push("/timeline?search=" + id);
        }
    }

    cancelCommentEdit() {
        this.props.setEditComment({
            isEditComment: false,
            currentComment: {}
        });
    }

    createCommentForm(comment) {
        const { profile } = this.props;
        if (comment.message !== "") {
            return (
                <div className={"comments-list"} key={comment.id}>
                    <div className={"profile-img"}>
                        <img
                            src={comment.user.profilePic ? imageWithToken(comment.user.profilePic) : DEFAULT_AVATAR_URL}
                            className={"post-profile"}
                        />
                    </div>
                    <div className={"detail"}>
                        {!(this.props.feed.currentComment.id === comment.id && this.props.feed.isEditComment) ? (
                            <>
                                <div className={"name-and-time"}>
                                    <div className={"name"}>
                                        <span
                                            onClick={() => {
                                                this._redirect(post.user.id);
                                            }}
                                        >
                                            {comment.user.name.concat(comment.user.surname).length > 30
                                                ? `${comment.user.name
                                                      .concat(comment.user.surname)
                                                      .substring(0, 30)}...`
                                                : `${comment.user.name} ${comment.user.surname}`}
                                        </span>
                                        <small>{this.getTimeComment(comment.createdAt)}</small>
                                        {this.props.profile.user.id === comment.user.id ? (
                                            <div className="menu-comment-container">
                                                <MenuContainerComment
                                                    comment={comment}
                                                    profile={profile}
                                                    postId={this.props.getPostId}
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <span className={"text"}>{comment.message}</span>
                                </div>
                                <div className={"like"}>
                                    <CommentLike comment={comment} />
                                </div>
                                <i className={"pointer"} />
                            </>
                        ) : (
                            <FormGroup className="mb-0 w-100">
                                <Input
                                    type="textarea"
                                    row={2}
                                    name="text"
                                    id="exampleText"
                                    value={this.props.feed.commentMessage}
                                    onChange={e => this.inputHandler(e)}
                                    className="edit-comment-textarea"
                                    style={{
                                        width: "100%",
                                        fontSize: "12.5px",
                                        resize: "none"
                                    }}
                                >
                                    <span
                                        // className="comment-submit"
                                        style={
                                            {
                                                // top: "50%",
                                                // transform: "translateY(-50%)"
                                            }
                                        }
                                        onClick={e => {
                                            if (this.state.currentComment !== "") {
                                                this.createComment(e);
                                            }
                                        }}
                                    >
                                        Send
                                    </span>
                                </Input>
                                <FormText>
                                    Click to{" "}
                                    <span className="cancel-comment-text" onClick={() => this.cancelCommentEdit()}>
                                        cancel
                                    </span>
                                    .
                                </FormText>
                            </FormGroup>
                        )}
                    </div>
                    <style jsx>{`
                        .pointer {
                            position: absolute;
                        }
                        .pointer:after {
                            position: absolute;
                            height: 0;
                            border: 7px solid transparent;
                            border-right-color: #efefef;
                            content: "";
                            left: -24px;
                            top: 5px;
                        }
                        .cancel-comment-text {
                            text-decoration: underline;
                            color: #0e143b;
                        }
                        .cancel-comment-text:hover {
                            font-family: "cloud";
                            color: #1d2350;
                            cursor: pointer;
                        }
                        .like {
                            display: flex;
                            align-items: center;
                        }
                        .detail {
                            display: flex;
                            padding-left: 0.7em;
                            flex-grow: 1;
                            border-radius: 5px;
                            padding: 0.4em 0.8em 0.4em 0.8em;
                            background-color: #efefef;
                            line-height: 1.3em;
                            margin-left: 1em;
                            font-size: 12.8px;
                            position: relative;
                        }
                        .name-and-time {
                            display: flex;
                            flex-direction: column;
                            color: #0e143b;
                        }
                        .name {
                            display: flex;
                            align-items: center;
                            align-item: center;
                            font-family: "Cloud";
                            color: #1f2546;
                            font-size: 12.8px;
                        }
                        .name > span:hover {
                            text-decoration: underline;
                            cursor: pointer;
                        }
                        .name > small {
                            font-family: "Cloud";
                            color: #0000005c;
                            margin-left: 1em;
                            font-size: 0.8em;
                        }
                        .text {
                            color: #777777;
                            font-size: 0.9em;
                            margin-top: 0;
                            margin-left: 0;
                        }
                        .option-comment {
                            margin-left: 10px;
                            margin-top: 2px;
                            font-size: 10px;
                            cursor: pointer;
                        }
                        .detail {
                            display: flex;
                            justify-content: space-between;
                            flex-grow: 1;
                        }
                        .profile-img {
                            width: 50px;
                            height: 50px;
                            border-radius: 100%;
                            overflow: hidden;
                            min-width: 50px;
                            min-height: 50px;
                        }
                        .profile-img > img {
                            width: 50px;
                        }
                        .comments-list {
                            display: flex;
                            position: relative;
                        }
                        .comments-list:not(:first-child) {
                            margin-top: 20px;
                        }
                        .hide-comment-option {
                            display: none;
                        }
                        .comment-option {
                            position: relative;
                        }
                        .list-comment-option {
                            margin-left: 10px;
                            list-style: none;
                            display: block;
                            width: 100px;
                            background: #cccccc;
                            border: 1px solid #cccccc;
                            border-radius: 4px;
                            position: absolute;
                            padding-inline-start: 0px;
                            z-index: 4;
                        }
                        list-comment-option::before {
                            content: "test";
                        }
                        .list-comment {
                            padding: 8px;
                            color: #000;
                            font-size: 12.8px;
                            cursor: pointer;
                        }
                    `}</style>
                </div>
            );
        }
    }

    isCommentSubmitShow(isCommentSubmitShow) {
        this.setState({
            isCommentSubmitShow
        });
    }

    render() {
        const { post, profile, t } = this.props;
        const commentGet = this.state.commentGet
            ? this.state.commentGet.map(item => this.createCommentForm(item)).reverse()
            : "";
        return (
            <div
                className={"box"}
                style={{ padding: post.totalComment > 0 || this.state.tempCommentLength > 0 ? "1em" : "0 1em 1em 1em" }}
            >
                {post.totalComment > 1 && this.state.isShowSeeMore ? (
                    <div className="see-more-comment">
                        <span
                            className="see-more-btn"
                            onClick={() => {
                                this.seeMoreShow();
                                {
                                    post.totalComment % 5 == 0
                                        ? post.totalComment >= this.state.page * this.state.perPage
                                            ? this.setState({
                                                  isShowSeeMore: true,
                                                  isSeeMoreLoading: true
                                              })
                                            : ""
                                        : this.setState({
                                              lastPerPage: post.totalComment / 5,
                                              isShowSeeMore: true,
                                              isSeeMoreLoading: true
                                          });
                                }
                            }}
                        >
                            {`${t("POSTS.see_more_comment")}`}
                            {this.state.isSeeMoreLoading ? (
                                <div
                                    className="see-more-load"
                                    style={{
                                        backgroundImage: `url('../../../static/images/image-loader/loading.gif')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                            ) : (
                                ""
                            )}
                        </span>
                    </div>
                ) : (
                    ""
                )}
                {commentGet}
                {!this.props.feed.isEditComment ? (
                    <div className={"input-comment"}>
                        <div className={"profile-img"}>
                            <img
                                src={
                                    profile.user.profilePic
                                        ? imageWithToken(profile.user.profilePic)
                                        : DEFAULT_AVATAR_URL
                                }
                                className={"post-profile"}
                            />
                        </div>
                        <form className={"input"} onSubmit={e => this.createComment(e)}>
                            <textarea
                                type="text"
                                placeholder={t("POSTS.write_comment")}
                                value={this.state.currentComment}
                                style={{
                                    resize: "none"
                                }}
                                cols="2"
                                wrap="hard"
                                maxLength="300"
                                rows={this.state.rowWhenFocus}
                                onChange={e => this.inputHandler(e)}
                                onFocus={() => {
                                    this.setState({
                                        commentSubmit: true,
                                        rowWhenFocus: 2
                                    });
                                    // console.log(this.props.getPostId)
                                }}
                                onBlur={() => {
                                    this.isCommentSubmitShow(false);
                                    this.setState({
                                        rowWhenFocus: 1
                                    });
                                }}
                            />
                            {this.state.isLoading ? (
                                <div
                                    className="loading-comment-submit"
                                    style={{
                                        backgroundImage: `url('../../../static/images/image-loader/loading.gif')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                            ) : (
                                <span
                                    className="comment-submit"
                                    style={{
                                        top: "50%",
                                        transform: "translateY(-50%)"
                                    }}
                                    onClick={e => {
                                        if (this.state.currentComment !== "") {
                                            this.createComment(e);
                                        }
                                    }}
                                >
                                    Send
                                </span>
                            )}
                        </form>
                    </div>
                ) : (
                    ""
                )}
                <style jsx>{`
                    .see-more-load {
                        width: 15px;
                        height: 15px;
                    }
                    .see-more-btn {
                        font-size: 12px;
                        color: #3b6bb4;
                        cursor: pointer;
                        margin-right: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .see-more-btn:hover {
                        text-decoration: underline;
                    }
                    .loading-comment-submit {
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        top: 30%;
                        right: 10px;
                    }
                    .input {
                        display: flex;
                        align-items: center;
                        flex-grow: 1;
                        padding-left: 1em;
                        font-size: 12.8px;
                        position: relative;
                    }
                    .input > textarea {
                        width: 100%;
                        background-color: #efefef;
                        border: solid 1.2px #c6c6c633;
                        border-radius: 20px;
                        padding: 0.3em 0.5em 0.3em 0.5em;
                        color: #353535;
                        transition: all 0.2s ease-in;
                    }
                    .input > textarea:focus {
                        border-radius: 5px;
                        outline: 0;
                        box-shadow: none;
                        border: solid 1px #0d153b;
                    }

                    .input-comment {
                        margin-top: 1em;
                        display: flex;
                        align-items: center;
                        z-index: 10px;
                    }
                    .comment-submit {
                        position: absolute;
                        right: 10px;
                        top: 20%;
                        font-family: "Cloud";
                        color: #0e143b;
                        cursor: pointer;
                    }
                    .profile-img {
                        width: 50px;
                        height: 50px;
                        border-radius: 100%;
                        overflow: hidden;
                    }
                    .profile-img > img {
                        width: 50px;
                    }
                    .box {
                        position: relative;
                    }
                `}</style>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        feed: store.feedReducer
    };
};
export default compose(
    withNamespaces("timeline"),
    connect(
        mapStateToProps,
        { setPostComment, setCreateComment, setPostForOption, setEditComment, setDeleteComment, setCreatePostHasPost }
    ),
    withRouter
)(Comments);
