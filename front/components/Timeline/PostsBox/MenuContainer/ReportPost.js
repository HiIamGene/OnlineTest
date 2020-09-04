import React, { Component } from 'react';
import compose from "recompose/compose";
import {connect} from "react-redux"
import {setOptionOpen, setReportOptionOpen} from "../../../../redux/actions/feedAction";
import {withNamespaces} from "../../../../lib/i18n";
import axios from 'axios';
import { API_FEED_REPORT } from '../../../../constant/ENV';

class ReportPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reportPost: this.props.feed.post,
            isNudityClick: false,
            isViolenceClick: false,
            isHarrasmentClick: false,
            isFalseNewsClick: false,
            isSpamClick: false,
            isHateSpeechClick: false,
            isTerrorismClick: false,
            reason: ""
        }
    }

    activateReason(index) {
        if(index === 0) {
            const isNudityClick = this.state.isNudityClick
            this.setState({
                isNudityClick: !isNudityClick
            })
        }
        if(index === 1) {
            const isViolenceClick = this.state.isViolenceClick
            this.setState({
                isViolenceClick: !isViolenceClick
            })
        }
        if(index === 2) {
            const isHarrasmentClick = this.state.isHarrasmentClick
            this.setState({
                isHarrasmentClick: !isHarrasmentClick
            })
        }
        if(index === 3) {
            const isFalseNewsClick = this.state.isFalseNewsClick
            this.setState({
                isFalseNewsClick: !isFalseNewsClick
            })
        }
        if(index === 4) {
            const isSpamClick = this.state.isSpamClick
            this.setState({
                isSpamClick: !isSpamClick
            })
        }
        if(index === 5) {
            const isHateSpeechClick = this.state.isHateSpeechClick
            this.setState({
                isHateSpeechClick: !isHateSpeechClick
            })
        }
        if(index === 6) {
            const isTerrorismClick = this.state.isTerrorismClick
            this.setState({
                isTerrorismClick: !isTerrorismClick
            })
        }
    }

    otherReason() {
        alert("Coming Soon...")
    }

    async reportMakeText(e) {
        e.preventDefault()
        const {t} = this.props
        if(this.state.isNudityClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t('REPORT.reason name.nudity')}, `)
            })
        }
        if(this.state.isViolenceClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t('REPORT.reason name.violence')}, `)
            })
        }
        if(this.state.isHarrasmentClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t('REPORT.reason name.harrasment')}, `)
            })
        }
        if(this.state.isFalseNewsClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t('REPORT.reason name.false news')}, `)
            })
        }
        if(this.state.isSpamClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t('REPORT.reason name.spam')}, `)
            })
        }
        if(this.state.isHateSpeechClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t('REPORT.reason name.hate speech')}, `)
            })
        }
        if(this.state.isTerrorismClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t('REPORT.reason name.terrorism')}`)
            })
        }
        this.state.reason !== "" ?
        this.reportSubmit() : alert(t('REPORT.report not select'))
    }

    async reportSubmit() {
        const {t} = this.props
        try {
            await axios.post(API_FEED_REPORT, {
                postId: this.state.reportPost.id,
                reason: this.state.reason
            })
            alert(t('REPORT.report succeeded'))
        } catch(err) {
            alert(t('REPORT.report failed'))
        }
        this.props.setReportOptionOpen(false)
    }

    reportPost() {
        const {t} = this.props
        const listOfReportTypeLeft = [
            t('REPORT.reason name.nudity'),
            t('REPORT.reason name.violence'),
            t('REPORT.reason name.harrasment'),
            t('REPORT.reason name.false news'),
        ]
        const listOfReportTypeRight = [
            t('REPORT.reason name.spam'),
            t('REPORT.reason name.hate speech'),
            t('REPORT.reason name.terrorism')
        ]
        return(
            <div className="report-main-wrapper">
                <div className="report-main-left">
                    <div className="reason-container">
                        <div className="report-reason-header">{t('REPORT.reason header')}:</div>
                        <div className="reason-container-left">
                            <div className={this.state.isNudityClick ? "reason-name-report hight-light-selected" : "reason-name-report"} onClick={() => {
                                this.activateReason(0)
                            }}>
                                <span className="reason-text-report">
                                    {listOfReportTypeLeft[0]}
                                </span>
                            </div>
                            <div className={this.state.isViolenceClick ? "reason-name-report hight-light-selected" : "reason-name-report"} onClick={() => {
                                this.activateReason(1)
                            }}>
                                <span className="reason-text-report">
                                    {listOfReportTypeLeft[1]}
                                </span>
                            </div>
                            <div className={this.state.isHarrasmentClick ? "reason-name-report hight-light-selected" : "reason-name-report"} onClick={() => {
                                this.activateReason(2)
                            }}>
                                <span className="reason-text-report">
                                    {listOfReportTypeLeft[2]}
                                </span>
                            </div>
                            <div className={this.state.isFalseNewsClick ? "reason-name-report hight-light-selected" : "reason-name-report"} onClick={() => {
                                this.activateReason(3)
                            }}>
                                <span className="reason-text-report">
                                    {listOfReportTypeLeft[3]}
                                </span>
                            </div>
                        </div>
                        <div className="reason-container-right">
                            <div className={this.state.isSpamClick ? "reason-name-report hight-light-selected" : "reason-name-report"} onClick={() => {
                                this.activateReason(4)
                            }}>
                                <span className="reason-text-report">
                                    {listOfReportTypeRight[0]}
                                </span>
                            </div>
                            <div className={this.state.isHateSpeechClick ? "reason-name-report hight-light-selected" : "reason-name-report"} onClick={() => {
                                this.activateReason(5)
                            }}>
                                <span className="reason-text-report">
                                    {listOfReportTypeRight[1]}
                                </span>
                            </div>
                            <div className={this.state.isTerrorismClick ? "reason-name-report hight-light-selected" : "reason-name-report"} onClick={() => {
                                this.activateReason(6)
                            }}>
                                <span className="reason-text-report">
                                    {listOfReportTypeRight[2]}
                                </span>
                            </div>
                            <div className={this.state.isNudity ? "reason-name-report hight-light-selected" : "reason-name-report"} onClick={() => {
                                this.otherReason()
                            }}>
                                <span className="reason-text-report">
                                <i   className="fas fa-search"/> Other reason
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="report-main-right">
                    <div className="report-submit" onClick={e => {
                        this.reportMakeText(e)
                    }}>{t('REPORT.reason report')}</div>
                </div>
            </div>
        )
    }

    render() {
        // console.log(this.state.reason)
        return(
            !this.props.feed.isOptionClose ? 
                <div className="option-post-wrapper">
                    <div className="option-header">
                        <div className="option-name-header">{this.props.optionName}</div>
                        <div className="option-name-close" onClick={() => {
                            this.props.setOptionOpen(true)
                            this.props.setReportOptionOpen(false)
                        }}><i className="fas fa-times"/></div>
                    </div>
                    <div className="option-report-post-wrapper">
                        {this.reportPost()}
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
    connect(mapStateToProps,{setOptionOpen, setReportOptionOpen}),
)(ReportPost)