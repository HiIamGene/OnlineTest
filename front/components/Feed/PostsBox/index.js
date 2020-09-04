import React, { Component } from "react";
import Feed from "../feed";
import Reactions from "./Reactions";
import Comments from "./Comments";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withNamespaces } from "../../../lib/i18n";
// import Card from '../Card';
import { imageWithToken } from "../../../utils/image";
import { DEFAULT_AVATAR_URL } from "../../../constant";
import axios from "axios";
import { API_FEED_FEED, API_FEED_EVENT } from "../../../constant/ENV";
import { setPostInfiniteScroll, setPostPopup, clearFeedPost } from "../../../redux/actions/feedAction";
import MenuContainer from "../MenuContainer";
import router, { withRouter } from "next/dist/lib/router";
import moment from "moment";
import Link from "next/link";
import PostTime from "../PostsBox/PostComponent/PostTime";
import PostImage from "../PostsBox/PostComponent/PostImage";
import PostYoutubeVideo from "../PostsBox/PostComponent/PostYoutubeVideo";
import YoutubeVideo from "../CreatePostBox/YoutubeVideo";
import Content from "../../Event/PostsBox/Content";
import PostShow from "./PostShow";

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
            timeStamp: "",
            isLoadingFeed: true
        };
        this.handleScroll = this.handleScroll.bind(this);
        this._redirect = this._redirect.bind(this);
    }

    // async componentWillMount() {
    //     const timeStamp = moment().format()
    //     const response = await axios.get(`${API_FEED_FEED}?page=1&perPage=6?timeStamp=${timeStamp}`);
    //     const {data} = response;
    //     const {payload} = data;
    //     const {post} = payload;
    //     // console.log(post)
    //     if(post !== "") {
    //         this.setState({
    //             isFeedEmpty: false
    //         })
    //         this.props.setPostInfiniteScroll(post)
    //     }
    // }

    async componentDidMount() {
        this.props.clearFeedPost();
        const timeStamp = moment().format();
        await axios
            .get(`${API_FEED_FEED}?page=1&perPage=6?timeStamp=${timeStamp}`)
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
                window.addEventListener("scroll", this.handleScroll);
            });
    }

    componentWillUnmount() {
        // console.log("Unmounted");
        window.removeEventListener("scroll", this.handleScroll);
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
            // this.setState({
            //     isBottom: true,
            // });
            const res = await axios.get(
                `${API_FEED_FEED}?page=${this.state.page}&perPage=6?timeStamp=${this.state.timeStamp}`
            );
            const { data } = res;
            const { payload } = data;
            const { post } = payload;
            if (post !== "") {
                this.setState({
                    page: this.state.page + 1
                });
                this.props.setPostInfiniteScroll(post);
            } else {
                // console.log("No feed anymore")
            }
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
                    // <div className={"no-feed-wrapper"}>
                    <img className="loading-screen" src="../../../static/images/image-loader/spinner-loader.gif" />
                ) : // </div>
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
)(PostsBox);
