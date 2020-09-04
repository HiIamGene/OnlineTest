import React, { Component } from "react"
import AllMember from "./AllMember"
import { compose } from "recompose";
import {withNamespaces} from "../../../lib/i18n";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class SeeAllPopup extends Component {
    constructor(props) {
        super(props)
    }

    handleClose = () => {
        this.props.isClose(true)
    }

    removeMember = (i) => {
        this.props.memberList.splice(i, 1)
        this.forceUpdate()
        this.handleClose()
    }

    render() {
        const { isOpen, countConnected, countOther, memberList, friendList, user, createId, eventId, t } = this.props;
        return (
            <Modal isOpen={isOpen} toggle={this.handleClose}>
                <div className={isOpen ? "allmember-popup-display" : "allmember-popup-none"}>
                    <ModalHeader className={"allmember-popup-head"} toggle={this.handleClose}>
                        <div className={"allmember-popup-head-title"}>{t('MEMBER.title')}</div>
                    </ModalHeader>
                    <ModalBody className={"allmember-popup-main"}>
                        <div className={"allmember-popup-body"}>
                            <div className={"allmember-popup-body-connected"}>
                                <div className={"body-connected-head"}>
                                    {t('MEMBER.connect')} ({countConnected})
                                </div>
                            </div>
                            <div className={"list-connected"}>
                                {
                                    memberList.map((data, i) => (
                                        data.user.id == user.id || friendList.find(e => e.id == data.user.id) != undefined ? 
                                        (<AllMember 
                                            member={data.user} 
                                            connect={true} 
                                            createId={createId} 
                                            eventId={eventId}
                                            remove={() => this.removeMember(i)}
                                        />)
                                        :
                                        ""
                                    ))
                                }
                            </div>
                            <div className={"allmember-popup-body-other"}>
                                <div className={"body-other-head"}>
                                    {t('MEMBER.other')} ({countOther})
                                </div>
                            </div>
                            <div className={"list-other"}>
                                {
                                    memberList.map((data, i) => (
                                        data.user.id != user.id && friendList.find(e => e.id == data.user.id) == undefined ? 
                                        (<AllMember 
                                            member={data.user} 
                                            connect={false} 
                                            createId={createId} 
                                            eventId={eventId}
                                            remove={() => this.removeMember(i)}
                                        />) 
                                        :
                                        ""
                                    ))
                                }
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>
        )
    }
}

export default compose(
    withNamespaces('event')
)(SeeAllPopup)