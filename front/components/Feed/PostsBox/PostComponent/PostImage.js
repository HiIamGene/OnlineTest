import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withNamespaces } from "../../../../lib/i18n";
import { withRouter } from "next/dist/lib/router";
import { setImageIndex, setPostForOption, setPostImagePopup } from "../../../../redux/actions/feedAction";

class PostImage extends Component {
    _postPopup(isPostImagePopup) {
        this.props.setPostImagePopup({
            id: this.props.feed.post.id,
            isPostImagePopup
        });
    }

    imagePopup(index, post) {
        this.props.setImageIndex(index);
        this.props.setPostForOption(post);
    }
    render() {
        const { post, isShare } = this.props;
        return (
            <div className="post-img" key={post.id}>
                <div className="image-wrapper-post-fill">
                    {post.images.length > 3 ? (
                        <div className="image-post-wrapper">
                            {post.images.slice(0, 3).map((image, index) => {
                                return (
                                    <div
                                        className="image-post"
                                        style={{
                                            width: "50%",
                                            height: "50%",
                                            backgroundImage: `url(${image.url}?token=${this.props.auth.token})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                        key={index}
                                        onClick={async () => {
                                            if (!isShare) {
                                                await this.imagePopup(index, post);
                                                this._postPopup(true);
                                            }
                                        }}
                                    />
                                );
                            })}
                            <div
                                className="image-post"
                                style={{
                                    width: "50%",
                                    height: "50%",
                                    backgroundImage: `url(${post.images[3].url}?token=${this.props.auth.token})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                                onClick={async () => {
                                    if (!isShare) {
                                        await this.imagePopup(3, post);
                                        this._postPopup(true);
                                    }
                                }}
                            >
                                <div key={post.images[3].id} className="overlay-count" />
                                <span key={post.images[3].id} className="more-images">+{post.images.length - 3}</span>
                            </div>
                        </div>
                    ) : post.images.length === 3 ? (
                        <div className="image-post-wrapper">
                            {post.images.slice(0, 1).map((image, index) => {
                                return (
                                    <div
                                        className="image-post"
                                        key={index}
                                        style={{
                                            width: "50%",
                                            height: "100%",
                                            backgroundImage: `url(${image.url}?token=${this.props.auth.token})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                        onClick={async () => {
                                            if (!isShare) {
                                                await this.imagePopup(index, post);
                                                this._postPopup(true);
                                            }
                                        }}
                                    />
                                );
                            })}
                            <div
                                className="image-post"
                                style={{
                                    width: "50%",
                                    height: "100%",
                                    backgroundImage: `url(${post.images[1].url}?token=${this.props.auth.token})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                                onClick={async () => {
                                    if (!isShare) {
                                        await this.imagePopup(1, post);
                                        this._postPopup(true);
                                    }
                                }}
                            >
                                <div key={post.images[1].id} className="overlay-count" />
                                <span key={post.images[1].id} className="more-images">
                                    +{post.images.length - 1}
                                </span>
                            </div>
                        </div>
                    ) : post.images.length === 2 ? (
                        <div className="image-post-wrapper">
                            {post.images.map((image, index) => {
                                return (
                                    <>
                                        <div
                                            key={index}
                                            className="image-post"
                                            style={{
                                                width: "50%",
                                                height: "100%",
                                                backgroundImage: `url(${image.url}?token=${this.props.auth.token})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center"
                                            }}
                                            onClick={async () => {
                                                if (!isShare) {
                                                    await this.imagePopup(index, post);
                                                    this._postPopup(true);
                                                }
                                            }}
                                        />
                                        <div key={index + image.url} className="overlay" />
                                    </>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="image-post-wrapper">
                            {post.images.map((image, index) => {
                                return (
                                    <>
                                        <div
                                            className="image-post"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                backgroundImage: `url(${image.url}?token=${this.props.auth.token})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center"
                                            }}
                                            key={index}
                                            onClick={async () => {
                                                if (!isShare) {
                                                    await this.imagePopup(index, post);
                                                    this._postPopup(true);
                                                }
                                            }}
                                        />
                                        <div key={index + image.url} className="overlay" />
                                    </>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
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
        { setImageIndex, setPostForOption, setPostImagePopup }
    ),
    withRouter
)(PostImage);
