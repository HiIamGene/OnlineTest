import { Component } from 'react'
import { withRouter } from 'next/router'
import { compose } from 'recompose'
import { API_USER_ENDORSE } from '../../constant/ENV'
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Button, Label } from 'reactstrap'
import axios from 'axios'
import { withToastManager } from 'react-toast-notifications'

class ModalEndorse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeBtn: [false, false, false],
            commentData: ''
        }
    }

    _onClickBtn = (index) => {
        let arr = this.state.activeBtn
        arr.forEach((data, index) => {
            arr[index] = false
        })
        arr[index] = true
        this.setState({
            activeBtn: arr
        })
    }

    _onChangeTextArea = (data) => {
        this.setState({
            commentData: data
        })
    }

    actionEndorse = async(id, type) => {
        console.log('modal-endorse', this.props)
        try {
            const url = API_USER_ENDORSE + "/" + id
            const { activeBtn, commentData } = this.state
            let actionDegree = ''
            activeBtn.forEach((data, index) => {
                if(data === true) {
                    if(index === 0) actionDegree = 'GOOD'
                    else if(index === 1) actionDegree = 'VERY_GOOD'
                    else if(index === 2) actionDegree = 'HIGHLY'
                    return false
                }
            })
            const data = {
                type: type,
                knowAbout: commentData,
                actionDegree: actionDegree
            }
            console.log(id, data)
            const res = await axios.post(url, data)
            this.props.onClick(true)
        }
        catch(error) {
            console.log('noti-endorse', error)
            this.props.onClick(false)
        }
    }

    render() {
        const { isOpen, isClose } = this.props
        const { activeBtn } = this.state
        return (
            < Modal isOpen={isOpen} toggle={isClose}>
                <ModalHeader toggle={isClose}>
                    <h2>Thanks for endorsing</h2>
                    Help identify relevant opportunities and content
                </ModalHeader>
                <ModalBody>
                     <FormGroup>
                        <Label>Comment</Label>
                        <Input 
                            type="textarea" 
                            name="text" 
                            maxLength={100}
                            onChange={(e) => this._onChangeTextArea(e.target.value)}
                        />
                    </FormGroup>
                    <Button color="primary" outline onClick={() => this._onClickBtn(0)} active={activeBtn[0]}>
                        <div className={"font14"}>Good</div>
                    </Button>{' '}
                    <Button color="primary" outline onClick={() => this._onClickBtn(1)} active={activeBtn[1]}>
                        <div className={"font14"}>Very Good</div>
                    </Button>{' '}
                    <Button color="primary" outline onClick={() => this._onClickBtn(2)} active={activeBtn[2]}>
                        <div className={"font14"}>Highly</div>
                    </Button>
                </ModalBody>
                < ModalFooter>
                    <Button color="primary" onClick={() => this.actionEndorse(this.props.id, this.props.type)}>
                        <div className={"font14"}>confirm</div>
                    </Button>{' '}
                    <Button color="secondary" onClick={isClose}>
                        <div className={"font14"}>cancle</div>
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default compose(
    withRouter
)(ModalEndorse)