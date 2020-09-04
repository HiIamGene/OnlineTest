import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import {
    API_USER_PROFILE_FRIEND_UNFRIEND,
    API_MESSAGE_ROOM_DELETE,
    API_MESSAGE_GROUP_REMOVE
} from "../../constant/ENV";

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfirmShow: false,
            confirmCount: 0
        };
        this.deleteConfirmation = this.deleteConfirmation.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    async deleteConfirmation(isConfirmShow) {
        await this.setState({
            isConfirmShow
        });
        await this._mouseOver(false);
    }

    toggle() {
        this.setState(prevState => ({
            isConfirmShow: !prevState.isConfirmShow
        }));
        this.props.optionShow(false);
    }

    _mouseOver(isOver) {
        this.props.optionOver(isOver);
    }

    async optionSelection(profile, friendId, type, chatRoomId) {
        if (type === "chat") {
            await axios.delete(`${API_MESSAGE_ROOM_DELETE}?chatRoomId=${chatRoomId}`).then(() => {
                this.setState({
                    isConfirmShow: false
                });
            });
        } else if (type === "friend") {
            await axios.delete(`${API_USER_PROFILE_FRIEND_UNFRIEND}/${friendId}`).then(res => {
                this.props.unfriend(true, friendId);
            });
        } else if (type === "group") {
            console.log(chatRoomId);
            console.log(profile.user.id);
            // await axios
            //     .delete(`${API_MESSAGE_GROUP_REMOVE}/${chatRoomId}`, {
            //         userId: profile.user.id
            //     })
            //     .then(res => {
            //         console.log(res);
            //     });
        }
        this._mouseOver(false);
        this.props.optionShow(false);
    }

    render() {
        const { profile, chatRoomId, textHeader, text, friendId = 0, type } = this.props;
        const { isConfirmShow } = this.state;
        return (
            <div
                className="option-chat-list "
                onMouseOver={() => this._mouseOver(true)}
                onMouseLeave={() => this._mouseOver(false)}
            >
                <i
                    className={this.props.className}
                    style={{ display: isConfirmShow ? "none" : "block" }}
                    onClick={() => this.deleteConfirmation(true)}
                />
                <Modal isOpen={isConfirmShow} toggle={() => this.toggle()}>
                    <ModalHeader toggle={this.toggle}>{textHeader}</ModalHeader>
                    <ModalBody>{text}</ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.optionSelection(profile, friendId ? friendId : "", type, chatRoomId)}
                        >
                            Sure
                        </Button>{" "}
                        <Button color="secondary" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Option;
