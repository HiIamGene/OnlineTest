import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { API_MESSAGE_GROUP_REMOVE } from "../../constant/ENV";
import { setMemberKickRemove } from "../../redux/actions/chatAction";
import { connect } from "react-redux";
import compose from "recompose/compose";
import axios from "axios";
class ModalKick extends Component {
    async kickPeopleAbsolutely(userId, chatRoomId) {
        const url = `${API_MESSAGE_GROUP_REMOVE}/${chatRoomId}`;
        await this.props.setMemberKickRemove({
            userId,
            isKick: true
        });
        await axios
            .delete(url, {
                userId
            })
            .then(res => console.log("res", res.data))
            .then(() => this.props.kickToggle())
            .catch(e => {
                this.props.kickToggle();
            });
    }
    kickToggle() {
        this.props.kickToggle();
    }
    render() {
        const { chatRoomId } = this.props;
        return (
            <Modal isOpen={true} toggle={() => this.kickToggle()}>
                <ModalHeader toggle={() => this.kickToggle()}>Modal title</ModalHeader>
                <ModalBody>
                    <span>
                        Are you sure to kick?{" "}
                        <span className="name-kick">{`${this.props.chatlist.currentMember.user.name}`}</span>
                    </span>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => this.kickPeopleAbsolutely(this.props.chatlist.currentMember.user.id, chatRoomId)}
                    >
                        Sure
                    </Button>{" "}
                    <Button color="secondary" onClick={() => this.kickToggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
const mapStateToProps = state => {
    return {
        chatlist: state.chatReducer
    };
};

export default compose(
    connect(
        mapStateToProps,
        { setMemberKickRemove }
    )
)(ModalKick);
