import React, { Component } from 'react';
import compose from "recompose/compose"
import {connect} from "react-redux"
import {withRouter} from "next/dist/lib/router"
import {withNamespaces} from "../../../../lib/i18n";
import {setCreatePost} from '../../../../redux/actions/feedAction';

class YoutubeVideo extends Component {
    constructor(props) {
        super(props)
        this.state ={
            videoId: "",
            splitLink: "",
            youtubeDetail: {
                thumbnail: "",
                title: "",
                description: ""
            }
        };
    };

    componentWillMount() {
        this.setState({
            videoId: "",
            splitLink: "",
            youtubeDetail: {
                thumbnail: "",
                title: "",
                description: ""
            }
        })
    }

    componentDidMount() {
        if(this.props.value !== null) {
            const text = this.props.value.split(" ");
            let link = "";
            for(let i = 0;i < text.length;i++) {
                if(text[i].includes("https://www.youtube.com") || text[i].includes("https://youtu.be")) {
                    link = text[i];
                    if(!text[i].includes("https://www.youtube.com")) {
                        link = `https://www.youtube.com/watch?v=${link.slice(17)}`
                    }
                    this.setState({
                        link: link.slice(0, 24) + "embed/" + link.slice(24)
                    })
                };
            };
            let splitLink = link.split("=")
            if(splitLink[0].includes("youtube")) {
                this.setState({
                    splitLink
                })
                // console.log(splitLink)
                splitLink.shift()
                this.makeYoutubeLink(splitLink)
            }
        }
    };

    async makeYoutubeLink(link) {
        const linkToGetYoutubeData = link[0]
        const videoId = !linkToGetYoutubeData.includes("&") ? linkToGetYoutubeData : linkToGetYoutubeData.substring(0, linkToGetYoutubeData.indexOf("&"))
        const key = "AIzaSyAnAQwjKboJq51uY9QxIBgGd7GaY8AgNMM"
        const res = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${key}&part=snippet`;
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
                videoId
            })
            // console.log(responseJSON)
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return(
            this.state.splitLink !== "" ?
            <div className="youtube-form-wrapper">
                <div className="youtube-video-thumbnail">
                    <iframe width="100%" height="300px" frameBorder="0" src={`https://www.youtube.com/embed/${this.state.videoId}`} allowFullScreen={true}/>
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
    },{setCreatePost}),
    withRouter
)(YoutubeVideo);