import React, { Component } from 'react';
import { API_FEED_EMOTION, API_FEED_COMMENT } from '../../constant/ENV';
import axios from 'axios'

class CommentLike extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentEmotion: 0
        }
        this.onClickLike = this.onClickLike.bind(this)
    }

    async componentWillMount() {
        const res = await axios.get(`${API_FEED_COMMENT}/${this.props.comment.id}`)
        const value = Object.values(res.data.payload.comment.emotion)
        this.setState({
            commentEmotion: value
        })
    }

    async onClickLike(id) {
        await axios.post(`${API_FEED_EMOTION}`, {
            commentId: id,
            emotionType: "LIKE"
        })
        const res = await axios.get(`${API_FEED_COMMENT}/${id}`)
        const value = Object.values(res.data.payload.comment.emotion)
        this.setState({
            commentEmotion: value
        })
    }
    render() {
        const { comment } = this.props
        const { commentEmotion } = this.state
        return(
            <div>
                <button className={"btn btn-sm"}onClick={() => this.onClickLike(comment.id)}>
                    <span className="emotion-count">{commentEmotion !== 0 ? commentEmotion : ""}</span> 
                    {" "}<i className={"far fa-thumbs-up"}/></button>
                <style jsx>{`
                    .emotion-count {
                        font-size: 10px;
                        font-family: "cloud-light";
                    }
                    .btn-sm{
                        padding:0;
                        color:#181d50;
                        font-size: 1.2em;
                        transition: all .2s ease-in;
                    }
                    .btn-sm:focus{
                        outline:none;
                        box-shadow:none !important;
        
                    }
                    .btn-sm:active{
                        transition: all .1s ease-in;
                        transform:scale(1) !important;
                    }
                    .btn-sm:hover{
                        transform: scale(1.2) rotate(-9deg);
                        color:#3d67d3;
                    }
                `}</style>
            </div>
        )
    }
}

export default CommentLike