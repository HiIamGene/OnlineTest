import { Modal, ModalBody, ModalFooter, Button, ModalHeader } from "reactstrap"
import { Component } from "react";

class ModalLeave extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { modalDisplay, modalClose, leaveEvent } = this.props
        return(
            <Modal isOpen={modalDisplay} toggle={modalClose}>
                <ModalHeader>
                    Notification about Event
                </ModalHeader>
                <ModalBody>
                    Do you want to Leave this Event ?
                </ModalBody>
                <ModalFooter>
                    <Button color={"outline-primary"} onClick={modalClose}>
                        No
                    </Button>
                    <Button color={"outline-danger"} onClick={leaveEvent}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalLeave