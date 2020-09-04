import React, { Component } from 'react';
import axios from 'axios'
import { API_FEED_FEED, API_FEED_COMMENT, API_FEED_POST } from "../../constant/ENV";
import { connect } from "react-redux"
import { setPostComment, setEditComment, setDeleteComment } from "../../redux/actions/feedAction";
import compose from "recompose/compose"
import { withNamespaces } from "../../lib/i18n";

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

    commentOptionSelect(isClick, name, comment) {
        if (name === 'edit') {
            // console.log("Comment", comment);
            this.props.setEditComment({
                isEditComment: isClick,
                currentComment: comment
            });
        } else if (name === 'delete') {
            // console.log("Comment", comment);
            this.props.setDeleteComment({
                isDeleteComment: isClick,
                currentComment: comment
            });
        }
    }

    render() {
        const { t, comment, profile } = this.props
        return (
            <div>
                <i className="fas fa-ellipsis-h menu-comment-container" style={{ cursor: "pointer" }} onClick={() => {
                    this.isShowMenu(true)
                }} />
                {this.state.isShow ?
                    <div className={"comment-menu"}>
                        {profile.user.id === comment.user.id ?
                            <ul className={"menulist-container"}>
                                <li className="menu-list" style={{ cursor: "pointer" }} onClick={() => {
                                    this.commentOptionSelect(true, 'edit', comment);
                                }}><img src={"../../static/images/icon/AW_CrewHitz_ICON-33.png"} alt="edit" className="comment-option-icon edit" /><span className="menulist-text">{t('POST_MENU.Edit Post')}</span></li>
                                <li className="menu-list" style={{ cursor: "pointer" }} onClick={() => {
                                    this.commentOptionSelect(true, 'delete', comment);
                                }}><img src={"../../static/images/icon/AW_CrewHitz_ICON-34.png"} alt="delete" className="comment-option-icon delete" /><span className="menulist-text">{t('POST_MENU.Delete Post')}</span></li>
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
    connect(mapStateToProps, { setPostComment, setEditComment, setDeleteComment }),
)(MenuContainerComment)