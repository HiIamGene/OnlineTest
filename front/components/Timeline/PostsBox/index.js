import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withNamespaces } from "../../../lib/i18n";
import axios from "axios";
import { API_FEED_ANOTHER_PROFILE, API_FEED_MY_FEED } from "../../../constant/ENV";
import { setPostInfiniteScroll, setPostPopup, clearFeedPost } from "../../../redux/actions/feedAction";
import { withRouter } from "next/dist/lib/router";
import PostShow from "./PostShow";
import moment from "moment";

class PostsBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            getPost: [],
            postId: "",
            // isBottom: false,
            page: 2,
            editMessage: "",
            isFeedEmpty: null,
            text: "",
            link: "",
            isMessageHaveLink: false,
            isLoadingFeed: true
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    async componentWillMount() {
        await this.props.clearFeedPost();
        const timeStamp = moment().format();
        if (this.props.user) {
            console.log(this.props.user.id);
            console.log(timeStamp);
            try {
                await axios
                    .get(
                        `${API_FEED_ANOTHER_PROFILE}?page=1&perPage=6?timestamp=${timeStamp}&anothorUserId=${this.props.user.id}`
                    )
                    .then(res => {
                        const { data } = res;
                        const { payload } = data;
                        const { post } = payload;
                        if (post) {
                            this.setState({
                                isFeedEmpty: false,
                                timeStamp
                            });
                            this.props.setPostInfiniteScroll(post);
                        }
                    })
                    .then(() => {
                        this.setState({
                            isLoadingFeed: false
                        });
                        console.log(this.props.feed.posts);
                        window.addEventListener("scroll", this.handleScroll);
                    })
                    .catch(e => {
                        console.log(e);
                        this.setState({
                            isFeedEmpty: true,
                            isLoadingFeed: false
                        });
                    });
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                await axios
                    .get(`${API_FEED_MY_FEED}?page=1&perPage=6?timeStamp=${timeStamp}`)
                    .then(res => {
                        const { data } = res;
                        const { payload } = data;
                        const { post } = payload;
                        console.log(post);
                        if (post) {
                            this.setState({
                                isFeedEmpty: false,
                                isLoadingFeed: true,
                                timeStamp
                            });
                            this.props.setPostInfiniteScroll(post);
                        }
                    })
                    .then(() => {
                        this.setState({
                            isLoadingFeed: false
                        });
                        console.log(this.props.feed.posts);
                        window.addEventListener("scroll", this.handleScroll);
                    });
            } catch (e) {
                console.log(e);
            }
        }
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    async componentDidUpdate(prevProps) {
        // console.log(prevProps.feed.posts.length + " != " + this.props.feed.posts.length+" && "+prevProps.router.query.search+" === "+this.props.router.query.search);
        if (this.props.user !== undefined && this.props.user.id !== prevProps.user.id) {
            if (this.props.feed.posts.length != 0) {
                await this.props.clearFeedPost();
                try {
                    const response = await axios.get(
                        `${API_FEED_ANOTHER_PROFILE}?page=1&perPage=6&anothorUserId=${this.props.user.id}`
                    );
                    const { data } = response;
                    const { payload } = data;
                    const { post } = payload;
                    // console.log("res",response);
                    if (post !== "") {
                        this.setState({
                            isFeedEmpty: false
                        });
                        await this.props.setPostInfiniteScroll(post);
                    }
                } catch (error) {
                    // console.log("error",error);
                }
            } else {
                const response = await axios.get(
                    `${API_FEED_ANOTHER_PROFILE}?page=1&perPage=6&anothorUserId=${this.props.user.id}`
                );
                const { data } = response;
                const { payload } = data;
                const { post } = payload;
                // console.log("res",response);
                if (post !== "") {
                    this.setState({
                        isFeedEmpty: false
                    });
                    await this.props.setPostInfiniteScroll(post);
                }
            }
        }
    }
    async handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            if (this.props.user !== undefined) {
                try {
                    const response = await axios.get(
                        `${API_FEED_ANOTHER_PROFILE}?page=${this.state.page}&perPage=6&anothorUserId=${this.props.user.id}`
                    );

                    const { data } = response;
                    const { payload } = data;
                    const { post } = payload;
                    // console.log("res",response);
                    if (post !== "") {
                        this.setState({
                            isFeedEmpty: false
                        });
                        await this.props.setPostInfiniteScroll(post);
                    }
                } catch (error) {
                    // console.log("error",error);
                }
            } else {
                const res = await axios.get(`${API_FEED_MY_FEED}?page=${this.state.page}&perPage=6`);
                const { data } = res;
                const { payload } = data;
                const { post } = payload;
                // console.log("res : "+ this.state.page +" = ",res);
                if (post !== "") {
                    this.setState({
                        page: this.state.page + 1
                    });
                    this.props.setPostInfiniteScroll(post);
                } else {
                    // console.log("No feed anymore")
                }
            }
            // this.setState({
            //     isBottom: true,
            // });
        }
        // else {
        //     this.setState({
        //         isBottom: false
        //     });
        // }
    }

    render() {
        const postArray = Object.values(this.props.feed.posts);
        return (
            <div>
                {this.state.isLoadingFeed ? (
                    <img className="loading-screen" src="../../../static/images/image-loader/spinner-loader.gif" />
                ) :
                this.state.isFeedEmpty ? (
                    <div className={"no-feed-wrapper-text"}>No Feed</div>
                ) : (
                    <PostShow posts={postArray} />
                )}
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
        { setPostInfiniteScroll, setPostPopup, clearFeedPost }
    ),
    withRouter
)(PostsBox);
