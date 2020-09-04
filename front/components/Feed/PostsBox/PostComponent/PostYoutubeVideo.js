import React, { Component } from 'react';
import compose from "recompose/compose"
import {connect} from "react-redux"
import {withRouter} from "next/dist/lib/router"
import {withNamespaces} from "../../../../lib/i18n";
import {setCreatePost, setCreatePostHasPost, setDeleteForYoutube} from '../../../../redux/actions/feedAction';

class YoutubeVideo extends Component {
    constructor(props) {
        super(props)
        this.state ={
            video: "",
            splitLink: "",
            youtubeDetail: {
                thumbnail: "",
                title: "",
                description: ""
            }
        };
    };

    componentWillMount() {
        if(this.props.value !== null) {
            const text = this.props.value.split(" ");
            let link = "";
            for(let i = 0;i < text.length;i++) {
                if(text[i].match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
                    link = text[i];
                };
            };
            let videoId = link.substr(32, 11);
            this.makeYoutubeLink(videoId)
        }
    }

    componentWillReceiveProps(prevProps) {
        if(this.props.feed.isCreatePostHasPost || this.props.feed.isDelete) {
            if(this.props.feed.isYoutubeUpload) {
                this.setState({
                    video: "",
                    youtubeDetail: {
                        thumbnail: "",
                        title: "",
                        description: ""
                    }
                })
            }
            if(this.props.value !== null) {
                const text = this.props.value.split(" ");
                let link = "";
                for(let i = 0;i < text.length;i++) {
                    if(text[i].match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
                        link = text[i];
                    };
                };
                let videoId = link.substr(32, 11);
                this.makeYoutubeLink(videoId)
            }
            this.props.setCreatePostHasPost(false)
            this.props.setDeleteForYoutube(false)
        }
    };

    async makeYoutubeLink(videoId) {
        const video = videoId;
        const key = "AIzaSyDop-1_1XcDpEAZi2RkBuO1Cv5a_Zh8x7k"
        const res = `https://www.googleapis.com/youtube/v3/videos?id=${video}&key=${key}&part=snippet`;
        return fetch(res)
        .then(response => response.json())
        .then(async responseJSON => {
            await this.setState({
                youtubeDetail: {
                    thumbnail: responseJSON.items[0].snippet.thumbnails.maxres ? 
                    responseJSON.items[0].snippet.thumbnails.maxres : responseJSON.items[0].snippet.thumbnails.standard ?
                    responseJSON.items[0].snippet.thumbnails.standard : responseJSON.items[0].snippet.thumbnails.high ?
                    responseJSON.items[0].snippet.thumbnails.high : responseJSON.items[0].snippet.thumbnails.medium ?
                    responseJSON.items[0].snippet.thumbnails.medium : responseJSON.items[0].snippet.thumbnails.default,
                    title: responseJSON.items[0].snippet.title,
                    description: responseJSON.items[0].snippet.description.length > 200 ? responseJSON.items[0].snippet.description.substring(0, 200).concat("...") : 
                    responseJSON.items[0].snippet.description !== "" ? responseJSON.items[0].snippet.description : ""
                },
                video
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return(
            this.state.video !== "" ?
            <div className="youtube-form-wrapper">
                <div className="youtube-form-video">
                    <iframe width="100%" height="300px" frameBorder="0" src={`https://www.youtube.com/embed/${this.state.video}`} allowFullScreen={true}/>
                </div>
                <div className="youtube-video-detail">
                    <div className="youtube-video-name"><span className="youtube-video-name-text">{this.state.youtubeDetail.title}</span></div>
                    <div className="youtube-video-description"><small className="youtube-video-description-text">{this.state.youtubeDetail.description}</small></div>
                </div>
            </div> : ""
        )
    }
}
export default compose(
    withNamespaces('timeline'),
    connect((store)=>{
        return {
            profile: store.profileReducer,
            feed: store.feedReducer
        }
    },{setCreatePost, setCreatePostHasPost, setDeleteForYoutube}),
    withRouter
)(YoutubeVideo);
