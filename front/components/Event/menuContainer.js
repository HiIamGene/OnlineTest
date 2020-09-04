import React, { Component } from 'react';
import axios from 'axios'
import { API_FEED_EVENT_REPORT } from "../../constant/ENV";
import {connect} from "react-redux"
import {API_FEED_EVENT} from "../../constant/ENV";
import ModalDelete from "./modalDelete"
import ModalReport from './modalReport'
import { withToastManager } from "react-toast-notifications"
import { compose } from 'recompose';
import {withNamespaces} from "../../lib/i18n";

class MenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            post: this.props.getPost,
            modalDelete: false,
            modalReport: false
        };
        this.isShowMenu = this.isShowMenu.bind(this)
        //// console.log(this.props);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = () => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                isShow: false
            })
        }
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    isShowMenu(isShow) {
        this.setState({
            isShow
        })
    }

    modalDeleteOpen = () => {
        console.log(this.props)
        this.setState({
            modalDelete: true
        })
    }

    modalDeleteClose = () => {
        this.setState({
            modalDelete: false
        })
    }

    modalReportOpen = () => {
        console.log(this.props)
        this.setState({
            modalReport: true
        })
    }

    modalReportClose = () => {
        this.setState({
            modalReport: false
        })
    }

    async editPost() {
        this.props.isEdit(true);
    }

    async deletePost() {
        axios.delete(API_FEED_EVENT + "/" + this.props.eventData.id).then(reponse => {
            this.props.isDelete(true);
        })
    }

    async changePrivacyPost() {

    }

    reportEvent = (callback) => {
        
        this.modalReportClose()
        axios.post(API_FEED_EVENT_REPORT, {
            eventId: this.props.eventData.id,
            reportMessage: callback
        }).then(response => {
            if(response.status == 200) {
                this.props.toastManager.add("Report Event Success", {
                    appearance: "success",
                    autoDismiss: true
                })
            }
        }).catch(err => {
            this.props.toastManager.add("Report Event Fail", {
                appearance: "error",
                autoDismiss: true
            })
        })
    }

    render() {
        const {user} = this.props.eventData;
        const { t } = this.props
        const {id} = this.props.user;
        const isUser = user.id == id;
        const { modalDelete, modalReport } = this.state
        //// console.log(isUser);
        return(
            <div>
                <ModalDelete 
                    modalDisplay={modalDelete} 
                    modalClose={this.modalDeleteClose} 
                    deleteEvent={() => this.deletePost()}
                />
                <ModalReport
                    modalDisplay={modalReport} 
                    modalClose={this.modalReportClose} 
                    reportEvent={this.reportEvent}
                />

                <i className="fas fa-ellipsis-h header-menu-container" style={{ cursor: "pointer"}} onClick={() => {
                    this.isShowMenu(true)
                }}/>
                {this.state.isShow ?
                    <div className={"post-menu"}>
                        <ul className={"menulist-container"} ref={(node) => this.setWrapperRef(node)}>
                            {   isUser ?
                                <div>
                                    <li className="menu-list" style={{ cursor: "pointer" }} onClick={() => {
                                        this.editPost();
                                        this.isShowMenu(false)
                                    }}>
                                        <img 
                                            src={"../../static/images/icon/AW_CrewHitz_ICON-33.png"} 
                                            className={"post-icon edit"} alt="edit"
                                        />
                                            <span className="menulist-text">
                                                {t('CONTAINER.edit')}
                                            </span>
                                    </li>
                                    <li className="menu-list" style={{ cursor: "pointer" }} onClick={() => {
                                        //this.deletePost();
                                        this.modalDeleteOpen()
                                        this.isShowMenu(false)
                                    }}>
                                        <img 
                                            src={"../../static/images/icon/AW_CrewHitz_ICON-34.png"} 
                                            className={"post-icon delete"} alt="delete"
                                        />
                                            <span className="menulist-text">    
                                                {t('CONTAINER.delete')}
                                            </span>
                                    </li> 
                                </div>
                                :
                                <li className="menu-list" style={{ cursor: "pointer" }} onClick={() => {
                                    this.modalReportOpen()
                                    this.isShowMenu(false)
                                }}>
                                    <img 
                                        src={"../../static/images/icon/AW_CrewHitz_ICON-54.png"} 
                                        className={"post-icon report"} 
                                        alt="report"
                                    />
                                        <span className="menulist-text">
                                            {t('CONTAINER.report')}
                                        </span>
                                </li>
                            }
                        </ul>
                    </div> : ""}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        feed: store.feedReducer,
    }
};

export default compose(
    connect(mapStateToProps),
    withNamespaces('event'),
    withToastManager
)(MenuContainer)