import React, { Component } from 'react';
import compose from "recompose/compose"
import {connect} from "react-redux"
import {withRouter} from "next/dist/lib/router"
import {withNamespaces} from "../../../lib/i18n";
import {setCreatePost} from '../../../redux/actions/feedAction';

class YoutubeVideo extends Component {
    constructor(props) {
        super(props)
        this.state ={
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
    };


    async makeYoutubeLink(videoId) {
        const video = videoId
        const key = "AIzaSyAnAQwjKboJq51uY9QxIBgGd7GaY8AgNMM"
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
                    description: responseJSON.items[0].snippet.description.length > 80 ? responseJSON.items[0].snippet.description.substring(0, 70).concat("...") : responseJSON.items[0].snippet.description
                }
            })
            // // console.log(responseJSON)
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return(
            this.props.feed.postMessage !== "" ?
            <div className="youtube-form-wrapper">
                <div className="youtube-video-thumbnail">
                    <img src={`${this.state.youtubeDetail.thumbnail.url}`} width="100%" height="auto"/>
                </div>
                <div className="youtube-video-detail">
                    <div className="youtube-video-link"><span className="youtube-video-link-text">YOUTUBE.COM</span></div>
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
    },{setCreatePost}),
    withRouter
)(YoutubeVideo);