import React, { Component } from 'react';
import {connect} from "react-redux"
// import {setPostInfiniteScroll,deleteFeedPost} from "../../redux/actions/feedAction";
import compose from "recompose/compose"
import {withNamespaces} from "../../lib/i18n";
import EditPost from './PostsBox/MenuContainer/EditPost'
import DeletePost from './PostsBox/MenuContainer/DeletePost'
import ChangePrivacyPost from './PostsBox/MenuContainer/ChangePrivacyPost'
import ReportPost from './PostsBox/MenuContainer/ReportPost'
import {setOptionOpen,
    setEditPostOptionOpen,
    setDeletePostOptionOpen,
    setChangePrivacyOptionOpen,
    setReportOptionOpen,
    setPostForOption} 
from "../../redux/actions/feedAction";

class MenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isEditClick: true,
            isDeleteClick: true,
            isChangePrivacyClick: true,
            isReportClick: true,
            getPostForOption: {},
        };
        this.isShowMenu = this.isShowMenu.bind(this)
    }

    isShowMenu(isShow) {
        this.setState({
            isShow
        })
    }
    async _isClick(isClick, name) {
        if(name === "edit") {
            this.props.setEditPostOptionOpen({
                id: this.props.feed.post.id,
                isClick,
            })
        };
        if(name === "delete") {
            this.props.setDeletePostOptionOpen({
                id: this.props.feed.post.id,
                isClick,
            })
        };
        if(name === "changePrivacy") {
            this.props.setChangePrivacyOptionOpen(({
                id: this.props.feed.post.id,
                isClick,
            }))
        };
        if(name === "report") {
            this.props.setReportOptionOpen(({
                id: this.props.feed.post.id,
                isClick,
            }))
        };
    }

    render() {
        const {t, profile} = this.props
        return(
            <div>
                <i className="fas fa-ellipsis-h menu-container" style={{ cursor: "pointer"}} onClick={() => {
                    this.isShowMenu(true)
                    this.props.setPostForOption(this.props.getPost)
                }}/>
                {this.state.isShow ?
                    <div className={"post-menu"}>
                        {this.props.profile.user.id === this.props.getPost.user.id ? 
                        <ul className={"menulist-container"}>
                            <li className="menu-list" style={{ cursor: "pointer" }} onClick={() => {
                                this._isClick(true, "edit");
                                this.isShowMenu(false)
                                this.props.setOptionOpen(false)
                            }}><img src={"../../static/images/icon/AW_CrewHitz_ICON-33.png"} className={"post-icon edit"} alt="edit"/><span className="menulist-text">{t('POST_MENU.Edit Post')}</span></li>
                            <li className="menu-list" style={{ cursor: "pointer" }} onClick={() => {
                                this._isClick(true, "delete");
                                this.isShowMenu(false)
                                this.props.setOptionOpen(false)
                            }}><img src={"../../static/images/icon/AW_CrewHitz_ICON-34.png"} className={"post-icon delete"} alt="delete"/><span className="menulist-text">{t('POST_MENU.Delete Post')}</span></li>
                            <li className="menu-list" style={{ cursor: "pointer" }} onClick={() => {
                                this._isClick(true, "changePrivacy");
                                this.isShowMenu(false)
                                this.props.setOptionOpen(false)
                            }}><img src={"../../static/images/icon/AW_CrewHitz_ICON-57.png"} className={"post-icon privacy"} alt="privacy"/><span className="menulist-text">{t('POST_MENU.Privacy')}</span></li>
                        </ul> : 
                        <ul className={"menulist-container"}>
                            <li className="menu-list" style={{ cursor: "pointer" }} onClick={() => {
                                this._isClick(true, "report");
                                this.isShowMenu(false)
                                this.props.setOptionOpen(false)
                            }}><img src={"../../static/images/icon/AW_CrewHitz_ICON-54.png"} className={"post-icon report"} alt="report"/><span className="menulist-text">{t('POST_MENU.Report')}</span></li>
                        </ul>}
                    </div> : ""}
                {!this.props.feed.isOptionClose ?
                    this.props.feed.isEditHasClick && this.props.getPost.id === this.props.feed.postIdForOption ?
                    <div className="modal-post">
                        <div className="modal-post-main">
                            <EditPost profile={profile} optionName={t('POST_MENU.Edit Post')}/>
                        </div>
                    </div>
                    :
                    this.props.feed.isDeleteHasClick && this.props.getPost.id === this.props.feed.postIdForOption ? 
                    <div className="modal-post">
                        <div className="modal-post-main">
                            <DeletePost profile={profile} optionName={t('POST_MENU.Delete Post')} optionDetail={t('POST_MENU.DETAIL.DELETE POST CONFIRM')}/>
                        </div>
                    </div>
                    :
                    this.props.feed.isChangePrivacyHasClick && this.props.getPost.id === this.props.feed.postIdForOption ? 
                    <div className="modal-post">
                        <div className="modal-post-main">
                            <ChangePrivacyPost profile={profile} optionName={t('POST_MENU.Privacy')} privacyChangeText={t('PRIVACY.change privacy')} changeButton={t('PRIVACY.change')} cancelButton={t('OPTION.cancel')}public={t('PRIVACY.public')} friendOnly={t('PRIVACY.friend only')} currentPrivacy={this.props.getPost.privacy}/>
                        </div>
                    </div>
                    :
                    this.props.feed.isReportHasClick && this.props.getPost.id === this.props.feed.postIdForOption ? 
                    <div className="modal-post">
                        <div className="modal-post-main">
                            <ReportPost profile={profile} optionName={t('POST_MENU.Report')}/>
                        </div>
                    </div>
                    : ""
                : ""}
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
    // connect(mapStateToProps,{setPostInfiniteScroll,deleteFeedPost}),
    connect(mapStateToProps,{
        setOptionOpen,
        setEditPostOptionOpen,
        setDeletePostOptionOpen,
        setChangePrivacyOptionOpen,
        setReportOptionOpen,
        setPostForOption}),
)(MenuContainer)