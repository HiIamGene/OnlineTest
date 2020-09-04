import { Modal, ModalBody, ModalFooter, Button, ModalHeader } from "reactstrap"
import { Component } from "react";

class ModalDelete extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { modalDisplay, modalClose, deleteEvent } = this.props
        return(
            <Modal isOpen={modalDisplay} toggle={modalClose}>
                <ModalHeader>
                    Notification about Event
                </ModalHeader>
                <ModalBody>
                    Do you want to Delete your Event ?
                </ModalBody>
                <ModalFooter>
                    <Button color={"outline-primary"} onClick={modalClose}>
                        No
                    </Button>
                    <Button color={"outline-danger"} onClick={deleteEvent}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalDelete