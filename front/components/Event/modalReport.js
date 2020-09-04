import { Modal, ModalBody, ModalFooter, Button, Col, Row, ModalHeader, InputGroup, ButtonGroup } from "reactstrap"
import { FormControl } from "react-bootstrap"
import { Component } from "react"
import { withToastManager } from "react-toast-notifications"
import { compose } from "recompose"

class ModalReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reason: "",
            report: [{
                name: "Wrong Location",
                active: false
            },{
                name: "Bad Event Name",
                active: false
            },{
                name: "Event Cover",
                active: false
            },{
                name: "Spam",
                active: false
            },
            ]
        }
    }

    checkInput = () => {
        const { reason } = this.state
        const input = document.getElementsByClassName("event-report-other")
        if(reason !== "" || input[0].value !== "") {
            this.props.reportEvent(reason !== "" ? reason : input[0].value)
        }
        else {
            this.props.toastManager.add("Please input some reason for report", {
                appearance: "warning",
                autoDismiss: true
            })
        }
    }

    reportReason = (text, index) => {
        let tmp = [...this.state.report]
        tmp[index].active = !tmp[index].active
        this.setState({
            reason: text,
            report: tmp
        })
    }

    render() {
        const { modalDisplay, modalClose } = this.props
        const { report } = this.state
        return(
            <Modal isOpen={modalDisplay} toggle={modalClose}>
                <ModalHeader>
                    Report This Event
                </ModalHeader>
                <ModalBody>
                    <Col>
                        <Row>
                            Please input reason for report this Event
                        </Row>
                        <Row>
                            <ButtonGroup>{
                                report.map((key, index) => (
                                    <Button 
                                        active={key.active} 
                                        color={"outline-info"}
                                        onClick={() => this.reportReason(key.name, index)}
                                    >
                                        {key.name}
                                    </Button>
                                ))
                            }</ButtonGroup>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <InputGroup> 
                                <FormControl
                                    type="text"
                                    placeholder="Other Reason"
                                    className={"event-report-other"}
                                >
                                </FormControl>
                            </InputGroup>
                        </Row>
                    </Col>
                </ModalBody>
                <ModalFooter>
                    <Button color={"outline-primary"} onClick={modalClose}>
                        No
                    </Button>
                    <Button color={"outline-danger"} onClick={this.checkInput}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default compose(
    withToastManager
)(ModalReport)