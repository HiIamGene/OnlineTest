import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { setOptionOpen, setReportOptionOpen } from "../../../../redux/actions/feedAction";
import { withNamespaces } from "../../../../lib/i18n";
import axios from "axios";
import { API_FEED_REPORT } from "../../../../constant/ENV";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    FormGroup,
    Input
} from "reactstrap";

const pointer = {
    cursor: "pointer"
};
class ReportPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportPost: this.props.feed.post,
            isNudityClick: false,
            isViolenceClick: false,
            isHarrasmentClick: false,
            isFalseNewsClick: false,
            isSpamClick: false,
            isHateSpeechClick: false,
            isTerrorismClick: false,
            reason: "",
            hightlightSelected: {
                background: "#0e143b",
                color: "#fff",
                cursor: "pointer"
            },
            pointer: {
                cursor: "pointer"
            },
            isSuccess: false,
            isFailed: false,
            isHaveResaon: true,
            isOtherReasonShow: false
        };
    }

    activateReason(index) {
        if (index === 0) {
            const isNudityClick = this.state.isNudityClick;
            this.setState({
                isNudityClick: !isNudityClick
            });
        }
        if (index === 1) {
            const isViolenceClick = this.state.isViolenceClick;
            this.setState({
                isViolenceClick: !isViolenceClick
            });
        }
        if (index === 2) {
            const isHarrasmentClick = this.state.isHarrasmentClick;
            this.setState({
                isHarrasmentClick: !isHarrasmentClick
            });
        }
        if (index === 3) {
            const isFalseNewsClick = this.state.isFalseNewsClick;
            this.setState({
                isFalseNewsClick: !isFalseNewsClick
            });
        }
        if (index === 4) {
            const isSpamClick = this.state.isSpamClick;
            this.setState({
                isSpamClick: !isSpamClick
            });
        }
        if (index === 5) {
            const isHateSpeechClick = this.state.isHateSpeechClick;
            this.setState({
                isHateSpeechClick: !isHateSpeechClick
            });
        }
        if (index === 6) {
            const isTerrorismClick = this.state.isTerrorismClick;
            this.setState({
                isTerrorismClick: !isTerrorismClick
            });
        }
    }

    otherReason() {
        this.setState({
            isOtherReasonShow: true
        });
    }

    async reportMakeText(e) {
        e.preventDefault();
        const { t } = this.props;
        if (this.state.isNudityClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t("REPORT.reason name.nudity")}, `)
            });
        }
        if (this.state.isViolenceClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t("REPORT.reason name.violence")}, `)
            });
        }
        if (this.state.isHarrasmentClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t("REPORT.reason name.harrasment")}, `)
            });
        }
        if (this.state.isFalseNewsClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t("REPORT.reason name.false news")}, `)
            });
        }
        if (this.state.isSpamClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t("REPORT.reason name.spam")}, `)
            });
        }
        if (this.state.isHateSpeechClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t("REPORT.reason name.hate speech")}, `)
            });
        }
        if (this.state.isTerrorismClick) {
            await this.setState({
                reason: this.state.reason.concat(`${t("REPORT.reason name.terrorism")}`)
            });
        }
        this.state.reason !== "" ? this.reportSubmit() : this.setState({ isHaveResaon: false });
    }

    async reportSubmit() {
        const { t } = this.props;
        try {
            await axios
                .post(API_FEED_REPORT, {
                    postId: this.state.reportPost.id,
                    reason: this.state.reason
                })
                .then(() => {
                    this.setState({
                        isSuccess: true
                    });
                })
                .then(() => {
                    setTimeout(() => {
                        this.props.setReportOptionOpen(!this.props.feed.isReportHasClick);
                        this.setState({
                            isSuccess: false
                        });
                    }, 1500);
                });
        } catch (err) {
            await this.setState({
                isFailed: true
            });
            setTimeout(() => {
                this.props.setReportOptionOpen(!this.props.feed.isReportHasClick);
                this.setState({
                    isFailed: false
                });
            }, 1500);
        }
    }

    otherReasonInput(e) {
        const reason = e.target.value;
        this.setState({
            reason
        });
    }

    toggle() {
        this.props.setReportOptionOpen(!this.props.feed.isReportHasClick);
    }

    toggleReason() {
        this.setState(prevState => ({
            isHaveResaon: !prevState.isHaveResaon
        }));
    }

    toggleOtherReason() {
        this.setState(prevState => ({
            isOtherReasonShow: !prevState.isOtherReasonShow
        }));
    }

    reportPost() {
        const { t } = this.props;
        const listOfReportTypeLeft = [
            t("REPORT.reason name.nudity"),
            t("REPORT.reason name.violence"),
            t("REPORT.reason name.harrasment"),
            t("REPORT.reason name.false news")
        ];
        const listOfReportTypeRight = [
            t("REPORT.reason name.spam"),
            t("REPORT.reason name.hate speech"),
            t("REPORT.reason name.terrorism")
        ];
        return (
            // <div className="report-main-wrapper">
            //     <div className="report-main-left">
            //         <div className="reason-container">
            //             <div className="report-reason-header">{t("REPORT.reason header")}:</div>
            //             <div className="reason-container-left">
            //                 <div
            //                     className={
            //                         this.state.isNudityClick
            //                             ? "reason-name-report hight-light-selected"
            //                             : "reason-name-report"
            //                     }
            //                     onClick={() => {
            //                         this.activateReason(0);
            //                     }}
            //                 >
            //                     <span className="reason-text-report">{listOfReportTypeLeft[0]}</span>
            //                 </div>
            //                 <div
            //                     className={
            //                         this.state.isViolenceClick
            //                             ? "reason-name-report hight-light-selected"
            //                             : "reason-name-report"
            //                     }
            //                     onClick={() => {
            //                         this.activateReason(1);
            //                     }}
            //                 >
            //                     <span className="reason-text-report">{listOfReportTypeLeft[1]}</span>
            //                 </div>
            //                 <div
            //                     className={
            //                         this.state.isHarrasmentClick
            //                             ? "reason-name-report hight-light-selected"
            //                             : "reason-name-report"
            //                     }
            //                     onClick={() => {
            //                         this.activateReason(2);
            //                     }}
            //                 >
            //                     <span className="reason-text-report">{listOfReportTypeLeft[2]}</span>
            //                 </div>
            //                 <div
            //                     className={
            //                         this.state.isFalseNewsClick
            //                             ? "reason-name-report hight-light-selected"
            //                             : "reason-name-report"
            //                     }
            //                     onClick={() => {
            //                         this.activateReason(3);
            //                     }}
            //                 >
            //                     <span className="reason-text-report">{listOfReportTypeLeft[3]}</span>
            //                 </div>
            //             </div>
            //             <div className="reason-container-right">
            //                 <div
            //                     className={
            //                         this.state.isSpamClick
            //                             ? "reason-name-report hight-light-selected"
            //                             : "reason-name-report"
            //                     }
            //                     onClick={() => {
            //                         this.activateReason(4);
            //                     }}
            //                 >
            //                     <span className="reason-text-report">{listOfReportTypeRight[0]}</span>
            //                 </div>
            //                 <div
            //                     className={
            //                         this.state.isHateSpeechClick
            //                             ? "reason-name-report hight-light-selected"
            //                             : "reason-name-report"
            //                     }
            //                     onClick={() => {
            //                         this.activateReason(5);
            //                     }}
            //                 >
            //                     <span className="reason-text-report">{listOfReportTypeRight[1]}</span>
            //                 </div>
            //                 <div
            //                     className={
            //                         this.state.isTerrorismClick
            //                             ? "reason-name-report hight-light-selected"
            //                             : "reason-name-report"
            //                     }
            //                     onClick={() => {
            //                         this.activateReason(6);
            //                     }}
            //                 >
            //                     <span className="reason-text-report">{listOfReportTypeRight[2]}</span>
            //                 </div>
            //                 <div
            //                     className={
            //                         this.state.isNudity
            //                             ? "reason-name-report hight-light-selected"
            //                             : "reason-name-report"
            //                     }
            //                     onClick={() => {
            //                         this.otherReason();
            //                     }}
            //                 >
            //                     <span className="reason-text-report">
            //                         <i className="fas fa-search" /> Other reason
            //                     </span>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="report-main-right">
            //         <div
            //             className="report-submit"
            //             onClick={e => {
            //                 this.reportMakeText(e);
            //             }}
            //         >
            //             {t("REPORT.reason report")}
            //         </div>
            //     </div>
            // </div>
            <>
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroupItem
                                style={this.state.isNudityClick ? this.state.hightlightSelected : this.state.pointer}
                                onClick={() => this.activateReason(0)}
                                action
                            >
                                {listOfReportTypeLeft[0]}
                            </ListGroupItem>
                            <ListGroupItem
                                style={this.state.isViolenceClick ? this.state.hightlightSelected : this.state.pointer}
                                onClick={() => this.activateReason(1)}
                                action
                            >
                                {listOfReportTypeLeft[1]}
                            </ListGroupItem>
                            <ListGroupItem
                                style={
                                    this.state.isHarrasmentClick ? this.state.hightlightSelected : this.state.pointer
                                }
                                onClick={() => this.activateReason(2)}
                                action
                            >
                                {listOfReportTypeLeft[2]}
                            </ListGroupItem>
                            <ListGroupItem
                                style={this.state.isFalseNewsClick ? this.state.hightlightSelected : this.state.pointer}
                                onClick={() => this.activateReason(3)}
                                action
                            >
                                {listOfReportTypeLeft[3]}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col>
                        <ListGroup>
                            <ListGroupItem
                                style={this.state.isSpamClick ? this.state.hightlightSelected : this.state.pointer}
                                onClick={() => this.activateReason(4)}
                                action
                            >
                                {listOfReportTypeRight[0]}
                            </ListGroupItem>
                            <ListGroupItem
                                style={
                                    this.state.isHateSpeechClick ? this.state.hightlightSelected : this.state.pointer
                                }
                                onClick={() => this.activateReason(5)}
                                action
                            >
                                {listOfReportTypeRight[1]}
                            </ListGroupItem>
                            <ListGroupItem
                                style={this.state.isTerrorismClick ? this.state.hightlightSelected : this.state.pointer}
                                onClick={() => this.activateReason(6)}
                                action
                            >
                                {listOfReportTypeRight[2]}
                            </ListGroupItem>
                            <ListGroupItem style={this.state.pointer} onClick={() => this.otherReason()} action>
                                Other reason
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </>
        );
    }

    render() {
        const { t } = this.props;
        return !this.props.feed.isOptionClose ? (
            // <div className="option-post-wrapper">
            //     <div className="option-header">
            //         <div className="option-name-header">{this.props.optionName}</div>
            //         <div className="option-name-close" onClick={() => {
            //             this.props.setOptionOpen(true)
            //             this.props.setReportOptionOpen(false)
            //         }}><i className="fas fa-times"/></div>
            //     </div>
            //     <div className="option-report-post-wrapper">
            //         {this.reportPost()}
            //     </div>
            // </div> : ""
            <Modal isOpen={this.props.feed.isReportHasClick} fade={false} toggle={() => this.toggle()}>
                <ModalHeader toggle={() => this.toggle()}>{this.props.optionName}</ModalHeader>
                <ModalBody>
                    {this.reportPost()}
                    <Modal isOpen={!this.state.isHaveResaon} toggle={() => this.toggleReason()}>
                        <ModalHeader toggle={() => this.toggleReason()}>{this.props.optionName}</ModalHeader>
                        <ModalBody>{t("REPORT.report not select")}</ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.toggleReason()}>
                                {t("REPORT.report confirm")}
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.isOtherReasonShow} toggle={() => this.toggleOtherReason()}>
                        <ModalHeader toggle={() => this.toggleOtherReason()}>{this.props.optionName}</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                    value={this.state.reason}
                                    onChange={e => this.otherReasonInput(e)}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.reportSubmit()}>
                                {t("REPORT.reason report")}
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.isSuccess}>
                        <ModalBody>{t("REPORT.report succeeded")}</ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.isFailed}>
                        <ModalBody>{t("REPORT.report failed")}</ModalBody>
                    </Modal>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={e => this.reportMakeText(e)}>
                        {t("REPORT.reason report")}
                    </Button>
                </ModalFooter>
            </Modal>
        ) : (
            ""
        );
    }
}

const mapStateToProps = store => {
    return {
        feed: store.feedReducer
    };
};

export default compose(
    withNamespaces("timeline"),
    connect(
        mapStateToProps,
        { setOptionOpen, setReportOptionOpen }
    )
)(ReportPost);
