import React, { Component } from "react";
import compose from "recompose/compose";
import { withNamespaces } from "../../../lib/i18n";
import { withRouter } from "next/dist/lib/router";
import axios from "axios";
import { imageWithToken } from "../../../utils/image";
import { DEFAULT_AVATAR_URL } from "../../../constant";
import Link from "next/link";
import Card from "../Card";
import Comments from "./Comments";
import Feed from "../timeline";
import { API_FEED_POST, API_FEED_SHARE, API_FEED_EMOTION } from "../../../constant/ENV";
import { setPostCommentPopup, setPostForOption, setCreatePostHasPost } from "../../../redux/actions/feedAction";
import { connect } from "react-redux";
import PostImage from "./PostComponent/PostImage";
import PostYoutubeVideo from "./PostComponent/PostYoutubeVideo";
import PostPopup from "./PostComponent/PostPopup";
import moment from "moment";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormGroup,
    Col,
    Input
} from "reactstrap";
class Reactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likeAppear: "",
            isStay: "",
            isClick: false,
            iconURL: [
                "/static/images/icon/like-icon/001.png",
                "/static/images/icon/like-icon/002.png",
                "/static/images/icon/like-icon/003.png",
                "/static/images/icon/like-icon/004.png",
                "/static/images/icon/like-icon/005.png",
                "/static/images/icon/like-icon/006.png"
            ],
            likes: ["LIKE", "LOVE", "CRY", "CRAZY", "SAD", "ANGRY"],
            isShare: false,
            message: "",
            isSuccess: false,
            emotion: "",
            emotionCount: 0,
            emotionIcon: {
                LIKE: "/static/images/icon/like-icon/001.png",
                LOVE: "/static/images/icon/like-icon/002.png",
                CRY: "/static/images/icon/like-icon/003.png",
                CRAZY: "/static/images/icon/like-icon/004.png",
                SAD: "/static/images/icon/like-icon/005.png",
                ANGRY: "/static/images/icon/like-icon/006.png"
            },
            emotionsMax: [],
            emotionsImages: [],
            commentCount: 0,
            emotionLoaded: true,
            isPreviewHasShow: false,
            isLikeLoading: false,
            isShowClass: false,
            privacy: "",
            privacyText: "Public",
            isDropDown: false
        };
        this._onMouseover = this._onMouseover.bind(this);
        this.onClickLike = this.onClickLike.bind(this);
        this._isLikeStay = this._isLikeStay.bind(this);
    }

    async componentWillMount() {
        const res = await axios.get(`${API_FEED_POST}/${this.props.post.id}`);
        const { data } = res;
        const { payload } = data;
        const { post } = payload;
        const { emotion } = post;
        await this.setState({
            emotionCount:
                (emotion.LIKE !== undefined ? emotion.LIKE : 0) +
                (emotion.LOVE !== undefined ? emotion.LOVE : 0) +
                (emotion.SAD !== undefined ? emotion.SAD : 0) +
                (emotion.ANGRY !== undefined ? emotion.ANGRY : 0) +
                (emotion.CRY !== undefined ? emotion.CRY : 0) +
                (emotion.CRAZY !== undefined ? emotion.CRAZY : 0),
            emotion,
            commentCount: post.comment.length,
            privacy: this.props.post.privacy,
            privacyText: this.props.post.privacy === "PUBLIC" ? "Public" : "Friend Only"
        });
        this.pushEmotionToArr(emotion);
    }
    async componentWillReceiveProps(prevProps) {
        if (this.props.feed.isCreatePostHasPost) {
            const res = await axios.get(`${API_FEED_POST}/${this.props.post.id}`);
            const { data } = res;
            const { payload } = data;
            const { post } = payload;
            const { emotion } = post;
            await this.setState({
                emotionCount:
                    (emotion.LIKE !== undefined ? emotion.LIKE : 0) +
                    (emotion.LOVE !== undefined ? emotion.LOVE : 0) +
                    (emotion.SAD !== undefined ? emotion.SAD : 0) +
                    (emotion.ANGRY !== undefined ? emotion.ANGRY : 0) +
                    (emotion.CRY !== undefined ? emotion.CRY : 0) +
                    (emotion.CRAZY !== undefined ? emotion.CRAZY : 0),
                emotion,
                commentCount: post.comment.length
            });
            this.pushEmotionToArr(emotion);
            this.props.setCreatePostHasPost(false);
        }
    }
    pushEmotionToArr(emotions) {
        const { emotionIcon } = this.state;
        let arr = [];
        for (var value in emotions) {
            let temp = {
                type: value,
                value: emotions[value]
            };
            arr.push(temp);
        }
        if (arr.length > 1) {
            this.sortEmotion(arr);
        } else if (arr.length === 1) {
            for (let value in emotionIcon) {
                if (arr[0].type === value) {
                    this.setState({
                        emotionsImages: [emotionIcon[value]]
                    });
                }
            }
        }
    }

    sortEmotion(emotions) {
        const len = emotions.length; // 6
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1; j++) {
                if (emotions[j + 1].value > emotions[j].value) {
                    let tmp = emotions[j];
                    emotions[j] = emotions[j + 1];
                    emotions[j + 1] = tmp;
                }
            }
        }
        const filterEmotion = emotions.filter((value, index) => {
            if (index < 3) return emotions[index];
        });
        this.setState({
            emotionsMax: filterEmotion
        });
        this.getSRCImage();
    }

    getSRCImage() {
        const { emotionIcon, emotionsMax } = this.state;
        for (let i = 0; i < emotionsMax.length; i++) {
            for (var value in emotionIcon) {
                if (emotionsMax[i].type === value) {
                    this.setState({
                        emotionsImages: [...this.state.emotionsImages, emotionIcon[value]]
                    });
                }
            }
        }
    }
    async _onMouseover(likeAppear) {
        await this.setState({
            likeAppear
        });
    }
    _isLikeStay(isStay) {
        this.setState({
            isStay
        });
    }
    onClickLike(idx) {
        const currentLike = {
            iconLikeURL: this.state.iconURL[idx],
            likes: this.state.likes[idx],
            count: 1
        };
        this.setState({
            getLikes: currentLike,
            count: 1,
            isStay: false,
            likeAppear: false,
            isLikeLoading: true
        });
        // this.sortEmotionWithPreViewLike(currentLike)
        this.postEmotion(currentLike.likes);
    }

    async postEmotion(like) {
        const { emotionIcon } = this.state;
        await axios.post(API_FEED_EMOTION, {
            postId: this.props.post.id,
            emotionType: like
        });
        const res = await axios.get(`${API_FEED_POST}/${this.props.post.id}`);
        const value = Object.values(res.data.payload.post.emotion);
        const type = Object.keys(res.data.payload.post.emotion);
        let emotionFace = [];
        let getValue = value.reduce((cur, prev) => {
            return cur + prev;
        }, 0);
        for (let i = 0; i < type.length; i++) {
            for (let value in emotionIcon) {
                if (type[i] === value) {
                    emotionFace = [...emotionFace, emotionIcon[value]];
                }
            }
        }
        this.setState({
            emotionCount: getValue,
            emotionsImages: emotionFace,
            isStay: false,
            likeAppear: false,
            isLikeLoading: false
        });
    }

    getSharePost() {
        this.setState(prevState => ({
            isShare: !prevState.isShare
        }));
    }

    shareMessageChange(e) {
        const message = e.target.value;
        this.setState({
            message
        });
    }

    async shareUpload(e) {
        e.preventDefault();
        const { post } = this.props;
        const images = post.images.map(image => {
            return image.url;
        });
        // console.log(images)
        const config = {
            message: this.state.message === "" ? "" : this.state.message,
            privacy: this.state.privacy,
            images
        };
        await axios.post(`${API_FEED_SHARE}/${this.props.post.id}`, { ...config });
        this.setState({
            isSuccess: true,
            message: ""
        });
    }

    setToggleClass() {
        const toggleClass = this.state.isShowClass;
        this.setState({
            isShowClass: !toggleClass
        });
    }

    _postPopup(isPostCommentPopup) {
        this.props.setPostCommentPopup({
            id: this.props.feed.post.id,
            isPostCommentPopup
        });
    }

    toggleDropDown() {
        this.setState(prevState => ({
            isDropDown: !prevState.isDropDown
        }));
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

    render() {
        const { t, post, profile } = this.props;
        const { iconURL, emotionsImages } = this.state;
        return (
            <div className={"reaction"}>
                {this.state.emotionCount !== 0 || this.state.commentCount !== 0 ? (
                    <div className={"count"}>
                        <div className={"like"}>
                            {this.state.isLikeLoading ? (
                                <div
                                    className="loading-like-submit"
                                    style={{
                                        backgroundImage: `url('../../../static/images/image-loader/loading.gif')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                            ) : (
                                    <>
                                        <img
                                            className="like-icon"
                                            src={emotionsImages[0] !== undefined ? emotionsImages[0] : ""}
                                        />
                                        <img
                                            className="like-icon"
                                            src={emotionsImages[1] !== undefined ? emotionsImages[1] : ""}
                                        />
                                        <img
                                            className="like-icon"
                                            src={emotionsImages[2] !== undefined ? emotionsImages[2] : ""}
                                        />{" "}
                                        {this.state.emotionCount !== 0 ? this.state.emotionCount : ""}
                                    </>
                                )}
                        </div>
                        <div className={"comment"}>
                            {this.state.commentCount !== 0 ? `${this.state.commentCount} ${t("POSTS.comments")}` : ""}
                        </div>
                    </div>
                ) : (
                        ""
                    )}
                <div
                    className={"panel"}
                    style={{ justifyContent: this.props.feed.isPostPopup ? "space-around" : "space-between" }}
                >
                    <button
                        id="btn-like"
                        className={"btn btn like-animation"}
                        onMouseOver={() => {
                            this._onMouseover(false);
                            this._isLikeStay(true);
                        }}
                        onMouseLeave={() => {
                            this._onMouseover(false);
                            this._isLikeStay(false);
                        }}
                    >
                        <i className={"far fa-thumbs-up"} /> {t("POSTS.like")}
                    </button>
                    <div
                        id="like"
                        className={
                            this.state.likeAppear || this.state.isStay
                                ? "alt-like"
                                : this.state.likeAppear === false
                                    ? "alt-like off"
                                    : ""
                        }
                        onMouseOver={() => {
                            this._onMouseover(true);
                        }}
                        onMouseLeave={() => {
                            this._onMouseover(false);
                        }}
                    >
                        <div className="btn-container">
                            <button className="alt-like-icon">
                                <img src={iconURL[0]} className="like-icon" onClick={() => this.onClickLike(0)} />
                            </button>
                            <button className="alt-like-icon">
                                <img src={iconURL[1]} className="like-icon" onClick={() => this.onClickLike(1)} />
                            </button>
                            <button className="alt-like-icon">
                                <img src={iconURL[2]} className="like-icon" onClick={() => this.onClickLike(2)} />
                            </button>
                            <button className="alt-like-icon">
                                <img src={iconURL[3]} className="like-icon" onClick={() => this.onClickLike(3)} />
                            </button>
                            <button className="alt-like-icon">
                                <img src={iconURL[4]} className="like-icon" onClick={() => this.onClickLike(4)} />
                            </button>
                            <button className="alt-like-icon">
                                <img src={iconURL[5]} className="like-icon" onClick={() => this.onClickLike(5)} />
                            </button>
                        </div>
                    </div>
                    {this.props.feed.isPostPopup || this.props.feed.isPostCommentPopup ? (
                        ""
                    ) : (
                            <button
                                className={"btn btn"}
                                onClick={async () => {
                                    await this.props.setPostForOption(this.props.post);
                                    this._postPopup(true);
                                }}
                            >
                                <i className={"far fa-comment"} /> {t("POSTS.comment")}{" "}
                            </button>
                        )}
                    <button
                        className={"btn btn"}
                        onClick={() => {
                            this.getSharePost();
                        }}
                    >
                        <i className={"fa fa-share-alt"} /> {t("POSTS.share")}{" "}
                    </button>
                    <Modal isOpen={this.state.isShare} fade={false} toggle={() => this.getSharePost()}>
                        <ModalHeader toggle={() => this.getSharePost()} className="cloud">
                            Share
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup row>
                                <Col md={12}>
                                    <Input
                                        type="textarea"
                                        name="text"
                                        id="shareMessage"
                                        placeholder="Say something about this..."
                                        style={{
                                            resize: "none"
                                        }}
                                        value={this.state.message}
                                        onChange={e => this.shareMessageChange(e)}
                                    />
                                </Col>
                            </FormGroup>
                            {post.sharePostForm ? (
                                // Share post state
                                <div>
                                    <div className="header">
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
                                                            .concat(` ${post.sharePostForm.user.surname}`)
                                                            .substring(0, 50)
                                                            .concat("...")
                                                        : `${post.sharePostForm.user.name} ${
                                                        post.sharePostForm.user.surname
                                                        }`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"body"}>
                                        {post.sharePostForm.message !== undefined &&
                                            post.sharePostForm.message !== null ? (
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
                                        {post.sharePostForm.images.length > 0 ? (
                                            <PostImage post={post.sharePostForm} isShare={false} />
                                        ) : post.sharePostForm.message !== null ? (
                                            post.sharePostForm.message.match(
                                                /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/
                                            ) ? (
                                                    <div className="youtube-preview-video">
                                                        <PostYoutubeVideo value={post.sharePostForm.message} />
                                                    </div>
                                                ) : (
                                                    ""
                                                )
                                        ) : (
                                                    ""
                                                )}
                                    </div>
                                </div>
                            ) : (
                                    // Post only state
                                    <div>
                                        <div className="header">
                                            <div className={"wrapper-profile"}>
                                                <img
                                                    src={
                                                        post.user.profilePic
                                                            ? imageWithToken(post.user.profilePic)
                                                            : DEFAULT_AVATAR_URL
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
                                                post.message.match(
                                                    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/
                                                ) ? (
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
                                    </div>
                                )}
                        </ModalBody>
                        <ModalFooter>
                            <Dropdown isOpen={this.state.isDropDown} toggle={() => this.toggleDropDown()}>
                                <DropdownToggle caret>{this.state.privacyText}</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem
                                        onClick={() => {
                                            this.setState({
                                                privacyText: "Public",
                                                privacy: "PUBLIC"
                                            });
                                        }}
                                    >
                                        Public
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => {
                                            this.setState({
                                                privacyText: "Friends Only",
                                                privacy: "FRIENDED"
                                            });
                                        }}
                                    >
                                        Friends Only
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>{" "}
                            <Button
                                onClick={e => this.shareUpload(e)}
                                style={{
                                    backgroundColor: "#0E143B",
                                    color: "#fff"
                                }}
                            >
                                Share
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.isSuccess}>
                        <ModalBody
                            style={{
                                textAlign: "center",
                                fontFamily: "cloud light"
                            }}
                        >
                            Share success
                        </ModalBody>
                    </Modal>
                </div>
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
        { setPostCommentPopup, setPostForOption, setCreatePostHasPost }
    ),
    withRouter
)(Reactions);
