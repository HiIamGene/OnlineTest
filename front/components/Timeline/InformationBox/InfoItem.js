import React from 'react';
import { imageWithToken } from "../../../utils/image";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from "reactstrap";
import { sendEndorse } from '../../../services/userService';
import {
    API_USER_ANOTHERPROFILE_V010001
} from "../../../constant/ENV"
import axios from "axios"

class InfoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mockup: false,
            knowAbout: "",
            actionDegree: "",
            mockupStatus: false
        }
    }
    showMockup = () => {
        this.setState(prevState => ({ mockup: !prevState.mockup }));
    }
    sendMockup = () => {
        this.setState(prevState => ({ mockup: !prevState.mockup }));
        this._sendEndorse(this.props.anotherProfileId, this.props.type, this.state.knowAbout, this.state.actionDegree)
    }
    text = (e) => {
        this.setState({ knowAbout: e.target.value })
    }
    setActionDegree = (e) => {
        this.setState({ actionDegree: e })
    }
    // console.log("InfoItem friends : ",friend);
    async _sendEndorse(id, type, knowAbout, actionDegree) {
        switch (type) {
            case "Experience":
                    let resA = await sendEndorse(id, "EXPERIENCE", knowAbout, actionDegree);
                break;
            case "Education":
                    let resB = await sendEndorse(id, "EDUCATION", knowAbout, actionDegree);
                break;

            default:
                break;
        }
        this.setState({mockupStatus: true})
    }
    componentDidMount() {

        this.checkMockupStatus(this.props.type, this.props.anotherProfileId)
    }
    checkMockupStatus = async (key, id) => {

        let res = await axios.get(API_USER_ANOTHERPROFILE_V010001 + id)
        const { data } = res
        const { payload } = data

        //this.state.mockupStatus
        switch (key) {
            //endorseStatus
            case "Experience":
                const { experiences } = payload
                this.setState({ mockupStatus: experiences.endorseStatus })

                break;
            case "Education":
                const { educations } = payload
                this.setState({ mockupStatus: educations.endorseStatus })
                break;

            default:
                break;
        }

    }

    render() {
        const { img, title, desc, danger, certificate, friend, anotherProfile } = this.props
        let isCertificate = false;
        let imageLink = null
        if (certificate) {
            isCertificate = true;
            switch (certificate) {
                case "competency": {
                    imageLink = "/static/images/icon/AW_CrewHitz_ICON-76.png";
                    break;
                }
                case "proficiency": {
                    imageLink = "/static/images/icon/AW_CrewHitz_ICON-77.png";
                    break;
                }
                case "training": {
                    imageLink = "/static/images/icon/AW_CrewHitz_ICON-78.png";
                    break;
                }
                case "dp": {
                    imageLink = "/static/images/icon/AW_CrewHitz_ICON-79.png";
                    break;
                }
                case "health": {
                    imageLink = "/static/images/icon/AW_CrewHitz_ICON-80.png";
                    break;
                }
            }
        }
        return (
            <div className="info-container">
                <li className={"item-cer"}>
                    <div style={{
                        display: "flex"
                    }}>
                        <div className="containerLogo">
                            {certificate ? <img className={"cr-icon"} src={imageLink} /> : (
                                img ? <img className={"cr-icon"} src={imageWithToken(img)} alt="" /> : null
                            )}
                        </div>
                    </div>
                    <div className={"detail"}>
                        <p className={"info-detail-header"}>{title}</p>
                        <small>{desc}</small>
                    </div>
                </li>
                {anotherProfile && friend == "STATUS_TYPE_FRIENDED" ?
                    <div>
                        {this.state.mockupStatus ? <div className="endose-score-show" onClick={this.showMockup}><p>Endorse</p><img src="/static/images/icon/AW_CrewHitz_ICON-72.png" /><p className="endose-score-point"></p></div>
                            :
                            <div className="endose-score-show" onClick={this.showMockup}><p>Endorse</p><img src="/static/images/icon/AW_CrewHitz_ICON-71.png" /><p className="endose-score-point"></p>
                                < Modal isOpen={this.state.mockup} toggle={this.showMockup}>
                                    <ModalHeader toggle={this.showMockup}>
                                        <h2 style={{ color: 255 }}>Thanks for endorsing</h2>
                                        Help identify relevant opportunities and content</ModalHeader>
                                    <ModalBody>

                                        <FormGroup>
                                            <Label >Comment</Label>
                                            <Input type="textarea" name="text" onChange={this.text} />
                                        </FormGroup>
                                    </ModalBody>
                                    <ModalBody>
                                        <Button color="primary" onClick={() => { this.setActionDegree("GOOD") }}>GOOD</Button>{' '}
                                        <Button color="primary" onClick={() => { this.setActionDegree("VERY_GOOD") }}>VERY GOOD</Button>{' '}
                                        <Button color="primary" onClick={() => { this.setActionDegree("HIGHLY") }}>HIGHLY</Button>
                                    </ModalBody>
                                    < ModalFooter>

                                        <Button color="primary" onClick={this.sendMockup}>confirm</Button>{' '}
                                        <Button color="secondary" onClick={this.showMockup}>cancle</Button>

                                    </ModalFooter>
                                </Modal>
                            </div>}

                    </div>
                    : ""

                }
                {
                    anotherProfile && friend == "STATUS_TYPE_FRIENDED" ?
                        <style jsx>{`
                .item-cer{
                    background-color: ${danger ? "#FFFBFB;" : "#EFEFEF;"}
                    display : flex;
                    border-radius: .5em;
                    padding: .7em;
                    transition: all .2s ease-in;
                    width: ${friend && friend == "STATUS_TYPE_FRIENDED" ? "calc(100% - 100px)" : "100%"};
                    min-width: ${friend && friend == "STATUS_TYPE_FRIENDED" ? "calc(100% - 100px)" : "100%"};
                    ${danger ? "border:solid 1.5px #ff7777;" : ""};
                    min-height: 80px;
                }
                .item-cer:hover{
                    transform:scale(1.04);
                }
                .cr-icon{
                    border : 1px solid rgb(200,200,200);
                    border-radius : 15px;
                    width : 50px;
                    padding: 5px;
                    height: auto;
                }

                .item-cer > .icon{
                    width: 50px;
                    height: 50px;
                    font-size: 2.5em;
                    text-align: center;
                }
                .detail > small {
                    color:#999999;
                    line-height: 1em;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }

                .item-cer >.detail{
                    margin-left: 1em;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    justify-content:center;
                }
                .containerLogo{
                    min-width: 50px !important;
                    min-height: 50px !important;
                }
                .info-detail-header{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-family: cloud;
                    margin:0;
                }
                .detail{
                    width:50%;
                }
                .endose-score-show{
                    width:${friend && friend == "STATUS_TYPE_FRIENDED" ? "87px" : "0"};
                    height:${friend && friend == "STATUS_TYPE_FRIENDED" ? "80px" : "0"};
                    margin : 0 0px 0px 10px;
                    border-radius: 10px;
                    background-color: #efefef;
                    display:flex;
                    visibility: ${friend && friend == "STATUS_TYPE_FRIENDED" ? "visible" : "hidden"};
                    flex-direction: column;
                    justify-content: center;
                    align-items:center;
                }
                .info-container{
                    display:flex;
                    align-items:center;
                    margin-bottom: .5em;
                }
                .info-container:last-child{
                    margin: 0;
                }
                .endose-score-show p{
                    margin:0;
                    font-size: 12.8px;
                }
                .endose-score-show img{
                    margin-bottom:2px;
                    width:28px;
                }
                .endose-score-point{
                    font-family: cloud;
                    color:#e45245;
                }
                
            `}</style>
                        :
                        <style jsx>{`
            .item-cer{
                background-color: ${danger ? "#FFFBFB;" : "#EFEFEF;"}
                display : flex;
                border-radius: .5em;
                padding: .7em;
                transition: all .2s ease-in;
                cursor:pointer;
                width: ${friend && friend == "STATUS_TYPE_FRIENDED" ? "calc(100% - 100px)" : "100%"};
                min-width: ${friend && friend == "STATUS_TYPE_FRIENDED" ? "calc(100% - 100px)" : "100%"};
                ${danger ? "border:solid 1.5px #ff7777;" : ""};
                min-height: 80px;
            }
            .item-cer:hover{
                transform:scale(1.04);
            }
            .cr-icon{
                border : 1px solid rgb(200,200,200);
                border-radius : 15px;
                width : 50px;
                padding: 5px;
                height: auto;
            }

            .item-cer > .icon{
                width: 50px;
                height: 50px;
                font-size: 2.5em;
                text-align: center;
            }
            .detail > small {
                color:#999999;
                line-height: 1em;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            .item-cer >.detail{
                margin-left: 1em;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                justify-content:center;
            }
            .containerLogo{
                min-width: 50px !important;
                min-height: 50px !important;
            }
            .info-detail-header{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-family: cloud;
                margin:0;
            }
            .detail{
                width:50%;
            }
            .endose-score-show{
                width:${friend && friend == "STATUS_TYPE_FRIENDED" ? "87px" : "0"};
                height:${friend && friend == "STATUS_TYPE_FRIENDED" ? "80px" : "0"};
                margin : 0 0px 0px 10px;
                border-radius: 10px;
                background-color: #efefef;
                display:flex;
                visibility: ${friend && friend == "STATUS_TYPE_FRIENDED" ? "visible" : "hidden"};
                flex-direction: column;
                justify-content: center;
                align-items:center;
            }
            .info-container{
                display:flex;
                align-items:center;
                margin-bottom: .5em;
            }
            .info-container:last-child{
                margin: 0;
            }
            .endose-score-show p{
                margin:0;
                font-size: 12.8px;
            }
            .endose-score-show img{
                margin-bottom:2px;
                width:28px;
            }
            .endose-score-point{
                font-family: cloud;
                color:#e45245;
            }
            
        `}</style>

                }
            </div >
        );

    };
};

export default InfoItem;