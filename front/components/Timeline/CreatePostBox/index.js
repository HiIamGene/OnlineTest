import React, { Component } from "react";
import Card from "../Card";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withRouter } from "next/dist/lib/router";
import { withNamespaces } from "../../../lib/i18n";
import { DEFAULT_AVATAR_URL } from "../../../constant";
import { imageWithToken } from "../../../utils/image";
import {
    setInputFocus,
    setPostStay,
    setPostMessage,
    setPostComment,
    setPostEmotion,
    setPostImage,
    setCreatePost,
    setPostUser
} from "../../../redux/actions/feedAction";
import PostsBox from "../PostsBox";
import axios from "axios";
import { API_FEED_POST, API_UPLOAD, API_FEED_FEED } from "../../../constant/ENV";
import YoutubeVideo from "./YoutubeVideo";

class CreatePostBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentPost: {
                id: "",
                message: "",
                postImages: [],
                createdAt: "",
                user: {
                    profilePic: "",
                    id: "",
                    name: "",
                    surName: ""
                }
            },
            link: "",
            imageWithBase64: [],
            imageURL: [],
            isShowClass: false,
            privacy: "PUBLIC",
            privacyText: "Public",
            isImageLoaded: true,
            rowAddedWhenClick: 4,
            rowRemoveWhenOut: 1,
            imageTest: [],
            indexImage: 0,
            isImageArrayLoaded: true,
            countLoad: 0
        };
        this.createPost = this.createPost.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.__onFocus = this.__onFocus.bind(this);
        this.__isStay = this.__isStay.bind(this);
        this.setToggleClass = this.setToggleClass.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.getBase64 = this.getBase64.bind(this);
    }

    __onFocus(isFocus) {
        this.props.setInputFocus(isFocus);
    }

    __isStay(isStay) {
        this.props.setPostStay(isStay);
    }

    setPostReducer(newPost) {
        this.props.setPostUser(newPost);
    }

    async createPost(e) {
        e.preventDefault();
        if (this.props.feed.postMessage !== "" || this.state.imageURL !== undefined) {
            let inputData;
            try {
                this.props.feed.postMessage !== ""
                    ? (inputData = {
                          message: this.props.feed.postMessage,
                          images: this.state.imageTest,
                          privacy: this.state.privacy
                      })
                    : (inputData = {
                          images: this.state.imageTest,
                          privacy: this.state.privacy
                      });
                await axios.post(API_FEED_POST, { ...inputData });
                const res = await axios.get(`${API_FEED_FEED}?page=1?perPage=6`);
                const { data } = res;
                const { payload } = data;
                const { post } = payload;
                const newPost = {
                    id: post[0].id,
                    message: post[0].message,
                    images: post[0].images,
                    createdAt: post[0].createdAt,
                    privacy: post[0].privacy,
                    emotions: post[0].emotion,
                    comments: post[0].comments,
                    user: {
                        profilePic: post[0].user.profilePic,
                        id: post[0].user.id,
                        name: post[0].user.name,
                        surname: post[0].user.surname
                    }
                };
                if (newPost.message !== "" || newPost.images !== "") {
                    const posts = [...this.state.posts, newPost];
                    this.setState({
                        posts,
                        currentPost: {
                            id: "",
                            message: "",
                            postImages: [],
                            createdAt: ""
                        },
                        imageWithBase64: [],
                        imageURL: [],
                        imageTest: [],
                        isShowClass: false,
                        privacy: "PUBLIC",
                        privacyText: "Public"
                    });

                    await this.setPostReducer(newPost);

                    this.props.setCreatePost("");
                    this.props.setYoutubeUpload(true);
                    this.props.setCreatePostHasPost(true);
                    this.setState({
                        privacy: "PUBLIC",
                        privacyText: "Public"
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
        this.__onFocus(false);
    }

    inputHandler(e) {
        const message = e.target.value;
        this.props.setCreatePost(message);
        this.formatLink(message);
    }

    async formatLink(link) {
        if (link.includes("https://www.youtube.com") || link.includes("https://youtu.be")) {
            await this.setState({
                link: link
            });
        } else if (this.state.link !== link) {
            this.setState({
                link: ""
            });
        } else {
            this.setState({
                link: ""
            });
        }
    }

    setToggleClass() {
        const toggleClass = this.state.isShowClass;
        this.setState({
            isShowClass: !toggleClass
        });
    }

    deleteImage(getIndex) {
        const imageURL = this.state.imageURL.filter((item, index) => {
            return index !== getIndex;
        });
        const imageTest = this.state.imageTest.filter((item, index) => {
            return index !== getIndex;
        });
        this.setState({
            imageURL,
            imageTest
        });
    }
    selectImage = event => {
        let indexImage = this.state.indexImage;
        if (this.state.imageURL.length > 0) {
            indexImage = this.state.imageURL.length - indexImage;
        }
        this.state.imageURL.push({
            url: "",
            isLoad: true
        });
        let file = event.target.files;
        if (file !== undefined) {
            Object.values(file).map(image => {
                let imageToBase64 = "";
                this.getBase64(image, result => {
                    imageToBase64 = result;
                    this.setState({
                        imageWithBase64: [...this.state.imageWithBase64, imageToBase64],
                        isImageArrayLoaded: false
                    });
                    this.getImage(result, indexImage++);
                });
            });
        } else {
            this.setState({
                isImageArrayLoaded: false
            });
        }
    };

    getImage(result, index) {
        let imageURL = this.state.imageURL;
        imageURL[index] = {
            isLoad: true
        };
        this.setState({
            imageURL
        });
        axios
            .post(`${API_UPLOAD}/post`, {
                file: result,
                path: "feed/post",
                device: "WWW"
            })
            .then(async res => {
                imageURL[index] = {
                    url: res.data.payload.url,
                    isLoad: false
                };
                await this.setState({
                    imageURL,
                    imageTest: imageURL.map(image => {
                        return image.url;
                    })
                });
                this.checkArrayImageLoaded(this.state.imageURL);
                // console.log(this.state.imageURL)
            });
    }

    checkArrayImageLoaded(images) {
        this.setState({
            countLoad: 0
        });
        for (let image in images) {
            if (!images[image].isLoad) {
                this.setState({
                    countLoad: this.state.countLoad + 1
                });
            }
        }
        // console.log("Count state", this.state.countLoad);
        // console.log("Image length", images.length);
        if (this.state.countLoad === images.length) {
            this.setState({
                isImageArrayLoaded: true
            });
        }
    }

    async getBase64(image, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            cb(reader.result);
        };
        reader.onerror = function(error) {
            console.log("Error: ", error);
        };
    }

    resetInput() {
        this.props.setCreatePost("");
        this.setState({
            imageTest: [],
            imageURL: []
        });
    }

    render() {
        // console.log("FEED PROPS : " ,this.props);
        let { profile, t } = this.props;
        return (
            <div>
                <Card title={t("Create Post")} isTimeLine={true}>
                    <div className={"post-wrapper"}>
                        <img
                            src={profile.user.profilePic ? imageWithToken(profile.user.profilePic) : DEFAULT_AVATAR_URL}
                            className={"post-profile"}
                        />
                        <form
                            className={"input-wrapper"}
                            onSubmit={
                                this.props.feed.postMessage !== ""
                                    ? e => this.createPost(e)
                                    : e => {
                                          e.preventDefault();
                                          this.__onFocus(false);
                                      }
                            }
                        >
                            <textarea
                                onFocus={() => {
                                    this.__onFocus(true);
                                    this.__isStay(true);
                                }}
                                style={
                                    this.props.feed.inputFocus && this.props.feed.postStay
                                        ? {
                                              resize: "none",
                                              overflow: "auto",
                                              whiteSpace: "pre-line",
                                              fontSize: this.props.feed.postMessage.length < 50 ? "20px" : "15px"
                                          }
                                        : {
                                              resize: "none",
                                              overflow: "auto",
                                              whiteSpace: "pre-line",
                                              fontSize: this.props.feed.postMessage.length < 50 ? "20px" : "15px",
                                              overflow: "hidden"
                                          }
                                }
                                className={"input-post"}
                                type="text"
                                placeholder={
                                    profile.user.name.concat(profile.user.surname).length > 30
                                        ? `${t("POSTS.placeholder")}${", "}${profile.user.name
                                              .concat(profile.user.surname)
                                              .substring(0, 30)}...`
                                        : `${t("POSTS.placeholder")}${", "}${profile.user.name} ${
                                              profile.user.surname
                                          }...`
                                }
                                value={this.props.feed.postMessage}
                                onChange={e => this.inputHandler(e)}
                                rows={
                                    this.props.feed.inputFocus && this.props.feed.postStay
                                        ? this.state.rowAddedWhenClick
                                        : this.state.rowRemoveWhenOut
                                }
                                cols="62"
                                wrap="hard"
                            />
                        </form>
                        <div
                            className={
                                this.props.feed.inputFocus && this.props.feed.postStay
                                    ? "post-media hide-media"
                                    : "post-media"
                            }
                        >
                            <input
                                style={{ display: "none" }}
                                accept="image/*"
                                type={"file"}
                                onChange={e => {
                                    this.selectImage(e);
                                }}
                                multiple
                                ref={fileInput => (this.fileInput = fileInput)}
                            />
                            <i
                                className={" click-animation fas fa-camera border-right pr-2 mx-1"}
                                onClick={() => {
                                    this.fileInput.setAttribute("multiple", "multiple");
                                    this.fileInput.click();
                                }}
                            />
                            <i className={" click-animation fas fa-video mx-1"} />
                        </div>
                    </div>
                    {this.state.imageURL.length === 0 && this.state.link !== "" ? (
                        <div className="youtube-video-state">
                            <YoutubeVideo value={this.props.feed.postMessage} />
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="image-wrapper">
                        <div className={"image-state"}>
                            <div className={"image-post"}>
                                {this.state.imageURL.map((item, index) => {
                                    if (item.url !== "") {
                                        return item.isLoad ? (
                                            <div
                                                className="image"
                                                style={{
                                                    backgroundImage: `url('../../../static/images/image-loader/spinner-loader.gif')`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center"
                                                }}
                                            />
                                        ) : (
                                            <div
                                                key={index}
                                                className="image"
                                                style={{
                                                    backgroundImage: `url(${item.url}?token=${this.props.auth.token})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center"
                                                }}
                                                onClick={() => {
                                                    this.deleteImage(index);
                                                }}
                                            />
                                        );
                                    }
                                })}
                                {this.state.imageURL.length > 0 ? (
                                    <div
                                        className="image-upload"
                                        onClick={() => {
                                            this.fileInput.click();
                                        }}
                                    >
                                        <i className="fas fa-plus click-upload" />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={this.props.feed.inputFocus ? "post-focus-option show-option" : "post-focus-option"}>
                        <div className={"post-focus-wrapper"}>
                            <div className={"media-options"}>
                                <input
                                    style={{ display: "none" }}
                                    accept="image/x-png,image/gif,image/jpeg"
                                    type={"file"}
                                    onChange={e => this.selectImage(e)}
                                    ref={fileInput => (this.fileInput = fileInput)}
                                />
                                <i
                                    className={" click-animation fas fa-camera border-right pr-2 mx-1"}
                                    onClick={() => {
                                        this.fileInput.setAttribute("multiple", "multiple");
                                        this.fileInput.click();
                                    }}
                                />
                                <i className={" click-animation fas fa-video mx-1"} />
                            </div>
                            <div className={"post-option"}>
                                <div className="privacy-option">
                                    <div className="privacy-dropdown-click" onClick={() => this.setToggleClass()}>
                                        {this.state.privacyText} <i className="arrow fas fa-chevron-down" />
                                    </div>
                                    <ul
                                        className={
                                            this.state.isShowClass ? "dropdown-option dropdown-show" : "dropdown-option"
                                        }
                                    >
                                        <li
                                            className="privacy-sub-option"
                                            onClick={() => {
                                                this.setState({
                                                    isShowClass: false,
                                                    privacy: "PUBLIC",
                                                    privacyText: "Public"
                                                });
                                            }}
                                        >
                                            Public
                                        </li>
                                        <li
                                            className="privacy-sub-option"
                                            onClick={() => {
                                                this.setState({
                                                    isShowClass: false,
                                                    privacy: "FRIENDED",
                                                    privacyText: "Friends Only"
                                                });
                                            }}
                                        >
                                            Friends Only
                                        </li>
                                    </ul>
                                </div>
                                <span
                                    className={
                                        (this.props.feed.postMessage && this.state.isImageArrayLoaded) ||
                                        (this.state.imageURL.length > 0 && this.state.isImageArrayLoaded)
                                            ? "share-option"
                                            : "share-option disable-btn"
                                    }
                                    onClick={e => {
                                        if (
                                            (this.props.feed.postMessage && this.state.isImageArrayLoaded) ||
                                            (this.state.imageURL.length > 0 && this.state.isImageArrayLoaded)
                                        ) {
                                            this.createPost(e);
                                        }
                                    }}
                                >
                                    Share
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
                {this.props.feed.inputFocus && this.props.feed.postStay ? (
                    <div
                        className="grey-onclick-element show"
                        onClick={() => {
                            this.__onFocus(false);
                            this.__isStay(false);
                            this.resetInput();
                            this.setState({
                                isShowClass: false
                            });
                        }}
                    />
                ) : (
                    <div className="grey-onclick-element" />
                )}
                <PostsBox link={this.state.link} isTimeLine={true} />
            </div>
        );
    }
}

export default compose(
    withNamespaces("timeline"),
    connect(
        store => {
            return {
                profile: store.profileReducer,
                feed: store.feedReducer,
                auth: store.authReducer
            };
        },
        {
            setInputFocus,
            setPostStay,
            setPostMessage,
            setPostComment,
            setPostEmotion,
            setPostImage,
            setCreatePost,
            setPostUser
        }
    ),
    withRouter
)(CreatePostBox);
