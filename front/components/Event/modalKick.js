import { Modal, ModalBody, ModalFooter, Button, ModalHeader } from "reactstrap"
import { Component } from "react";

class ModalKick extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { modalDisplay, modalClose, kickMember, kickName, kickId } = this.props
        return(
            <Modal isOpen={modalDisplay} toggle={modalClose}>
                <ModalHeader>
                    Notification about Invitation Event
                </ModalHeader>
                <ModalBody>
                    Do you want to kick {kickName} ?
                </ModalBody>
                <ModalFooter>
                    <Button color={"outline-primary"} onClick={modalClose}>
                        No
                    </Button>
                    <Button color={"outline-danger"} onClick={() => kickMember(kickId)}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalKick