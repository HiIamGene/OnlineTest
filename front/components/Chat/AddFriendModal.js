import { Component } from "react";
import { imageWithToken } from "../../utils/image";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { ADD_ROOM, ADD_CURRENT_ROOM } from "../../redux/reducers/chatReducer";
import router, { withRouter } from "next/dist/lib/router";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import InvitationGroup from './InvitationGroup'
var moment = require("moment");

class AddFriendModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        };
    }

    async toggle() {
        await this.setState(prevState => ({
            isShow: !prevState.isShow
        }));
        this.props.modalShow(this.state.isShow);
    }

    render() {
        const { isShow, friendList } = this.props;
        return (
            <Modal isOpen={isShow} fade={false} toggle={() => this.toggle()}>
                <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
                <ModalBody>
                    <InvitationGroup friendList={friendList}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.toggle()}>
                        Do Something
                    </Button>{" "}
                    <Button color="secondary" onClick={() => this.toggle()}>
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
const mapDispatchToProps = dispatch => {
    return {
        addRoom: component => {
            dispatch({
                type: ADD_ROOM,
                payload: component
            });
        },
        addCurrentRoom: component => {
            dispatch({
                type: ADD_CURRENT_ROOM,
                payload: component
            });
        }
    };
};
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(AddFriendModal);
