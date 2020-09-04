import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import Link from "next/link";
import {
    setOptionOpen,
    setEditPostOptionOpen,
    setPostInfiniteScroll,
    editFeedPost
} from "../../../../redux/actions/feedAction";
import { withNamespaces } from "../../../../lib/i18n";
import Card from "../../Card";
import { imageWithToken } from "../../../../utils/image";
import axios from "axios";
import { API_UPLOAD, API_FEED_POST, API_FEED_FEED, API_FEED_SHARE } from "../../../../constant/ENV";
import { DEFAULT_AVATAR_URL } from "../../../../constant";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
    Col,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import PostImage from "../PostComponent/PostImage";
import PostYoutubeVideo from "../PostComponent/PostYoutubeVideo";

const fontSize = {
    fontSize: "12.5px"
};

const editPostEnable = {
    backgroundColor: "#0E143B",
    border: "1px solid #0E143B"
};

const editPostDisable = {
    backgroundColor: "#999999",
    border: "1px solid #999999",
    cursor: "default"
};

const deleteShare = {
    position: "absolute",
    right: "0",
    cursor: "pointer"
};

const sharePostStyle = {
    margin: "20px",
    borderLeft: "5px solid #eee",
    borderRadius: "4px",
    position: "relative"
};

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            editImageURL: this.props.feed.post.images.map(image => {
                return image.url;
            }),
            editMessage: this.props.feed.post.message,
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
            imageWithBase64: [],
            imageURL: this.props.feed.post.images.map(image => {
                return {
                    url: image.url,
                    isLoading: false
                };
            }),
            imageTest: this.props.feed.post.images.map(image => {
                return image.url;
            }),
            isShowClass: false,
            indexImage: 0,
            isImageArrayLoaded: true,
            countLoad: 0,
            isShareDelete: false,
            isImageHasStartLoad: false,
            privacy: "",
            privacyText: "Public",
            isDropDown: false,
            isEditLoaded: false
        };
        this.editPost = this.editPost.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.deleteShare = this.deleteShare.bind(this);
    }

    async componentWillMount() {
        await axios.get(`${API_FEED_POST}/${this.props.feed.post.id}`).then(res => {
            const { data } = res;
            const { payload } = data;
            if (this.props.post.sharePostForm) {
                this.setState({
                    imageTest: []
                });
            }
            this.setState({
                privacyText: payload.post.privacy === "PUBLIC" ? "Public" : "Friend Only",
                privacy: payload.post.privacy,
                isEditLoaded: true
            });
        });
    }
    async editPostSubmit(e) {
        e.preventDefault();
        const { editMessage, imageTest, privacy } = this.state;
        let inputData = {};
        // console.log("Edit message".editMessage);
        editMessage !== undefined && editMessage !== null && editMessage !== ""
            ? imageTest !== undefined
                ? (inputData = {
                      message: editMessage,
                      images: imageTest
                  })
                : (inputData = {
                      message: editMessage
                  })
            : (inputData = {
                  images: imageTest
              });
        const res = await axios.put(`${API_FEED_POST}/${this.props.feed.post.id}`, { ...inputData });
        const { data } = res;
        const { payload } = data;
        const { post } = payload;
        await axios.put(`${API_FEED_POST}/${this.props.feed.post.id}/privacy`, {
            privacy: privacy
        });
        this.props.editFeedPost({
            id: this.props.feed.post.id,
            data: post
        });
    }

    inputHandler(e) {
        const message = e.target.value;
        const editMessage = message !== null ? message : "";
        this.setState({
            editMessage
        });
    }

    deleteImage(getIndex) {
        const imageURL = this.state.imageURL.filter((item, index) => {
            return index !== getIndex;
        });
        const imageTest = this.state.imageTest.filter((item, index) => {
            return index !== getIndex;
        });
        // console.log(imageTest);
        this.setState({
            imageURL,
            imageTest
        });
    }
    selectImage(event) {
        this.setState({
            isImageHasStartLoad: true
        });
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
    }

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
                // console.log(this.state.imageTest);
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
        // console.log("Count state", this.state.countLoad)
        // console.log("Image length", images.length)
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

    confirmToCloseEditTab(isClick) {
        this.props.setEditPostOptionOpen({
            id: this.props.feed.post.id,
            isClick
        });
    }

    deleteShare = async post => {
        this.setState({
            isShareDelete: true
        });
        await axios.delete(`${API_FEED_SHARE}/${post.id}`);
    };

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

    toggleDropDown() {
        this.setState(prevState => ({
            isDropDown: !prevState.isDropDown
        }));
    }

    editPost() {
        const { t, profile, post } = this.props;
        return (
            <div>
                <Modal isOpen={this.props.feed.isEditHasClick} fade={false} style={{ minWidth: "50vw" }}>
                    <ModalHeader>{t("POST_MENU.Edit Post")}</ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Col md="12">
                                <Input
                                    type="textarea"
                                    name="text"
                                    value={this.state.editMessage}
                                    style={
                                        this.props.feed.inputFocus && this.props.feed.postStay
                                            ? {
                                                  resize: "none",
                                                  overflow: "auto",
                                                  fontSize: this.props.feed.postMessage.length < 50 ? "20px" : "15px"
                                              }
                                            : {
                                                  resize: "none",
                                                  fontSize: this.props.feed.postMessage.length < 50 ? "20px" : "15px",
                                                  overflow: "hidden"
                                              }
                                    }
                                    className={"input-post"}
                                    placeholder={
                                        profile.user.name.concat(profile.user.surname).length > 30
                                            ? `${t("POSTS.placeholder")}${", "}${profile.user.name
                                                  .concat(profile.user.surname)
                                                  .substring(0, 30)}...`
                                            : `${t("POSTS.placeholder")}${", "}${profile.user.name} ${
                                                  profile.user.surname
                                              }...`
                                    }
                                    onChange={e => this.inputHandler(e)}
                                    rows={
                                        this.props.feed.inputFocus && this.props.feed.postStay
                                            ? this.state.rowAddedWhenClick
                                            : this.state.rowRemoveWhenOut
                                    }
                                    cols="62"
                                    wrap="hard"
                                />
                            </Col>
                        </FormGroup>
                        {post.sharePostForm &&
                        !this.state.isShareDelete &&
                        (post.sharePostForm && !this.state.isImageHasStartLoad) ? (
                            // Share post state
                            <div style={sharePostStyle}>
                                <div style={deleteShare} onClick={() => this.deleteShare(post)}>
                                    <i className="fas fa-times" />
                                </div>
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
                                                {post.sharePostForm.user.name.concat(post.sharePostForm.user.surname)
                                                    .length > 50
                                                    ? post.sharePostForm.user.name
                                                          .concat(` ${post.sharePostForm.user.surname}`)
                                                          .substring(0, 50)
                                                          .concat("...")
                                                    : `${post.sharePostForm.user.name} ${post.sharePostForm.user.surname}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"body"}>
                                    {post.sharePostForm.message !== undefined && post.sharePostForm.message !== null ? (
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
                        ) : post.shareEventForm &&
                          !this.state.isShareDelete &&
                          (post.shareEventForm && !this.state.isImageHasStartLoad) ? (
                            <div style={sharePostStyle}>
                                <div style={deleteShare} onClick={() => this.deleteShare(post)}>
                                    <i className="fas fa-times" />
                                </div>
                                <div className="header">
                                    <div className={"wrapper-profile"}>
                                        <img
                                            src={
                                                post.shareEventForm.user.profilePic
                                                    ? imageWithToken(post.shareEventForm.user.profilePic)
                                                    : DEFAULT_AVATAR_URL
                                            }
                                        />
                                    </div>
                                    <div className={"wrapper-detail margintop-header"}>
                                        <div
                                            className={"name"}
                                            onClick={() => {
                                                this._redirect(post.shareEventForm.user.id);
                                            }}
                                        >
                                            <span>
                                                {post.shareEventForm.user.name.concat(post.shareEventForm.user.surname)
                                                    .length > 50
                                                    ? post.shareEventForm.user.name
                                                          .concat(` ${post.shareEventForm.user.surname}`)
                                                          .substring(0, 50)
                                                          .concat("...")
                                                    : `${post.shareEventForm.user.name} ${post.shareEventForm.user.surname}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"body"}>
                                    {post.shareEventForm.message !== undefined &&
                                    post.shareEventForm.message !== null ? (
                                        <div
                                            className={"captions"}
                                            style={{
                                                fontSize: post.shareEventForm.message.length < 100 ? "20px" : "15px",
                                                padding: "10px 10px 0 20px"
                                            }}
                                        >
                                            {this.formatMessage(post.shareEventForm.message)}
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
                                                                    : `${post.shareEventForm.eventName.substring(
                                                                          0,
                                                                          27
                                                                      )}...`}
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
                                                                    : `${post.shareEventForm.location.substring(
                                                                          0,
                                                                          30
                                                                      )}...`}
                                                            </label>
                                                        </div>
                                                        <div className={"wrap-name-event view"}>
                                                            {" "}
                                                            <i className={"fas fa-eye mr-2"} /> View :{" "}
                                                            {post.shareEventForm.privacy == "PUBLIC"
                                                                ? "Public"
                                                                : "Private"}
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
                            </div>
                        ) : this.state.imageURL.length > 0 ? (
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
                                                        key={index}
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
                                                    this.fileInput.setAttribute("multiple", "multiple");
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
                        ) : (
                            ""
                        )}
                        <Modal isOpen={this.state.confirmDiscard}>
                            <ModalBody>{t("OPTION.confirm text")}</ModalBody>
                            <ModalFooter>
                                <Button
                                    color="link"
                                    style={fontSize}
                                    onClick={() => {
                                        this.setState({
                                            confirmDiscard: false
                                        });
                                    }}
                                >
                                    {t("OPTION.cancel")}
                                </Button>{" "}
                                <Button
                                    color="primary"
                                    style={fontSize}
                                    onClick={() => this.confirmToCloseEditTab(false)}
                                >
                                    Discard
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </ModalBody>
                    <ModalFooter>
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
                        </div>
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
                            color="link"
                            style={fontSize}
                            onClick={() => {
                                this.setState({
                                    confirmDiscard: true
                                });
                            }}
                        >
                            {t("OPTION.cancel")}
                        </Button>{" "}
                        <Button
                            style={
                                (this.state.editMessage !== "" &&
                                    this.editMessage !== null &&
                                    this.state.isImageArrayLoaded) ||
                                (this.state.imageTest.length !== 0 && this.state.isImageArrayLoaded)
                                    ? editPostEnable
                                    : editPostDisable
                            }
                            onClick={e => {
                                if (
                                    (this.state.editMessage !== "" &&
                                        this.editMessage !== null &&
                                        this.state.isImageArrayLoaded) ||
                                    (this.state.imageTest.length !== 0 && this.state.isImageArrayLoaded)
                                ) {
                                    this.editPostSubmit(e);
                                    this.props.setEditPostOptionOpen(false);
                                }
                            }}
                        >
                            {t("POST_MENU.Edit Post")}
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    render() {
        return !this.props.feed.isOptionClose && this.state.isEditLoaded ? (
            <div className="option-post-wrapper">{this.editPost()}</div>
        ) : (
            ""
        );
    }
}

const mapStateToProps = store => {
    return {
        feed: store.feedReducer,
        auth: store.authReducer
    };
};

export default compose(
    withNamespaces("timeline"),
    connect(
        mapStateToProps,
        { setOptionOpen, setEditPostOptionOpen, editFeedPost, setPostInfiniteScroll }
    )
)(EditPost);
