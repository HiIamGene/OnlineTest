import React, { Component } from 'react';
import compose from "recompose/compose"
import {connect} from "react-redux"
import {setOptionOpen, setChangePrivacyOptionOpen} from "../../../../redux/actions/feedAction";
import {withNamespaces} from "../../../../lib/i18n";
import axios from 'axios';
import { API_FEED_POST } from '../../../../constant/ENV';

class ChangePrivacyPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowClass: false,
            privacy: "",
            privacyText: ""
        }
        this.setToggleClass = this.setToggleClass.bind(this)
    }

    componentWillMount() {
        this.setState({
            privacy: this.props.currentPrivacy,
            privacyText: this.props.currentPrivacy === "PUBLIC" ? this.props.public : this.props.friendOnly
        })
    }
    async changePrivacyPostSubmit() {
        await axios.put(`${API_FEED_POST}/${this.props.feed.post.id}/privacy`, {
            privacy: this.state.privacy
        })
            .then(res => {
                console.log(res)
            })
    }

    setToggleClass() {
        const toggleClass = this.state.isShowClass
        this.setState({
            isShowClass: !toggleClass
        })
    }

    changePrivacyPost() {
        return(
            <>
                <div className="privacy-change-container">
                    <span className="privacy-change-text">{this.props.privacyChangeText}</span>
                    <div className="privacy-option">
                        <div className="privacy-selection">
                            <div className="privacy-dropdown-click" onClick={() => this.setToggleClass()}>{this.state.privacyText} <i className="arrow fas fa-chevron-down"/></div>
                            <ul className={this.state.isShowClass ? "dropdown-option dropdown-show" : "dropdown-option"}>
                                <li className="privacy-sub-option" onClick={() => {
                                    this.setState({
                                        isShowClass: false,
                                        privacy: "PUBLIC",
                                        privacyText: this.props.public
                                    })
                                }}>{this.props.public}</li>
                                <li className="privacy-sub-option" onClick={() => {
                                    this.setState({
                                        isShowClass: false,
                                        privacy: "FRIENDED",
                                        privacyText: this.props.friendOnly
                                    })
                                }}>{this.props.friendOnly}</li>
                            </ul>
                        </div>
                        <div className="privacy-button-container">
                            <span className = "privacy-change-button" onClick = {()=>{
                                this.changePrivacyPostSubmit();
                                this.props.setChangePrivacyOptionOpen(false)
                            }}>
                                {this.props.changeButton}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    render() {
        const {t} = this.props
        return(
            !this.props.feed.isOptionClose ? 
                <div className="option-post-wrapper">
                    <div className="option-header">
                        <div className="option-name-header">{this.props.optionName}</div>
                        <div className="option-name-close" onClick={() => {
                            this.props.setOptionOpen(true)
                            this.props.setChangePrivacyOptionOpen(false)
                        }}><i className="fas fa-times"/></div>
                    </div>
                    <div className="option-privacy-post-wrapper">
                        {this.changePrivacyPost()}
                    </div>
                </div> : ""
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
    connect(mapStateToProps,{setOptionOpen, setChangePrivacyOptionOpen}),
)(ChangePrivacyPost)