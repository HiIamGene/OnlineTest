import React, { Component } from 'react';
import axios from 'axios'
import {API_FEED_FEED, API_FEED_COMMENT, API_FEED_POST} from "../../constant/ENV";
import {connect} from "react-redux"
import {setPostComment} from "../../redux/actions/feedAction";
import compose from "recompose/compose"
import {withNamespaces} from "../../lib/i18n";

class MenuContainerComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            post: this.props.getPost
        };
        this.isShowMenu = this.isShowMenu.bind(this)
    }

    isShowMenu(isShow) {
        this.setState({
            isShow
        })
    }

    async editComment(comment) {
        const {t} = this.props
        const input = prompt(t("Menu.Edit Comment"), comment.message);
        // console.log(input)
        await axios.put(`${API_FEED_COMMENT}/${comment.id}`, {
            message: input
        })
        await axios.get(`${API_FEED_POST}/${this.props.postId}`)
            .then(res => {
                const {data} = res
                const {payload} = data
                const {post} = payload
                // console.log(post.comment)
                // this.props.setPostComment(post.comment)
            })
    }

    async deleteComment(comment) {
        const {t} = this.props
        const res = confirm(t("Menu.Delete Comment"))
        if(res) {
            await axios.delete(`${API_FEED_COMMENT}/${comment.id}`)
                .then(res => {
                    console.log(res)
                })
            alert("Deleted")
            await axios.get(`${API_FEED_POST}/${this.props.postId}`)
                .then(res => {
                    const {data} = res
                    const {payload} = data
                    const {post} = payload
                    // console.log(post.comment)
                    this.props.setComments(post.comment)
                })
        }
    }

    render() {
        const {t, comment, profile} = this.props
        return(
            <div>
                <i className="fas fa-ellipsis-h menu-comment-container" style={{ cursor: "pointer"}} onClick={() => {
                    this.isShowMenu(true)
                }}/>
                {this.state.isShow ?
                    <div className={"comment-menu"}>
                        {profile.user.id === comment.user.id ? 
                        <ul className={"menulist-container"}>
                            <li className="menu-list" style={{ cursor: "pointer" }} onClick={() => {
                                this.editComment(comment)
                                this.isShowMenu(false)
                            }}><img src={"../../static/images/icon/AW_CrewHitz_ICON-33.png"} alt="edit" className="comment-option-icon edit"/><span className="menulist-text">{t('POST_MENU.Edit Post')}</span></li>
                            <li className="menu-list" style={{ cursor: "pointer" }} onClick={() => {
                                this.deleteComment(comment)
                                this.isShowMenu(false)
                            }}><img src={"../../static/images/icon/AW_CrewHitz_ICON-34.png"} alt="delete" className="comment-option-icon delete"/><span className="menulist-text">{t('POST_MENU.Delete Post')}</span></li>
                        </ul> : ""}
                    </div> : ""}
                <div className={this.state.isShow ? "click-anywhere-to-close" : ""} onClick={() => {
                    this.state.isShow ? 
                    this.isShowMenu(false) : ""
                }}></div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        feed: store.feedReducer
    }
};

export default compose(
    withNamespaces('timeline'),
    connect(mapStateToProps,{setPostComment}),
)(MenuContainerComment)