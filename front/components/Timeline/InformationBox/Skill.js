import React from 'react';
import InfoBox from "./InfoBox"
import compose from "recompose/compose";
import { withNamespaces } from "../../../lib/i18n";
import { withRouter } from "next/dist/lib/router";
import InfoItemNoData from "./InfoItemNoData";
import SeeMore from "../EventsBox/SeeMore"
import router from "next/router"
import InfoItem from "./InfoItem"
import { sendEndorse } from '../../../services/userService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from "reactstrap";
import {
    API_USER_ANOTHERPROFILE_V010001
} from "../../../constant/ENV"
import axios from "axios"
class Skill extends React.Component {
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
    test = (e) => {
        this.setState({ knowAbout: e.target.value })
    }
    setActionDegree = (e) => {
        this.setState({ actionDegree: e })
    }
    // console.log("InfoItem friends : ",friend);
    async _sendEndorse(id, type, knowAbout, actionDegree) {
        
        /*switch (type) {
            case "SOFT_SKILL":
                let resA = await sendEndorse(id, "SOFT_SKILL", knowAbout, actionDegree);
                break;
            case "HARD_SKILL":
                let resB = await sendEndorse(id, "HARD_SKILL", knowAbout, actionDegree);
                break;
            case "COMPUTER_SKILL":
                let resC = await sendEndorse(id, "COMPUTER_SKILL", knowAbout, actionDegree);
                break;
            case "LANGUAGE":
                let resD = await sendEndorse(id, "LANGUAGE", knowAbout, actionDegree);
                break;
            case "ENGLISH_PROFICIENCY_TEST":
                let resE = await sendEndorse(id, "ENGLISH_PROFICIENCY_TEST", knowAbout, actionDegree);
                break;
            case "MARLIN_TEST":
                let resF = await sendEndorse(id, "MARLIN_TEST", knowAbout, actionDegree);
                break;

            default:
                break;
        }
        this.setState({ mockupStatus: true })*/

    }
    componentDidMount() {

        this.checkMockupStatus(this.props.type, this.props.anotherProfileId)
    }
    checkMockupStatus = async (key, id) => {

        let res = await axios.get(API_USER_ANOTHERPROFILE_V010001 + id)
        const { data } = res
        const { payload } = data

        //this.state.mockupStatus
        /*switch (key) {

            case "SOFT_SKILL":
                const { experiences } = payload
                this.setState({ mockupStatus: experiences.endorseStatus }
                break;
            case "HARD_SKILL":
                const { experiences } = payload
                this.setState({ mockupStatus: experiences.endorseStatus }
                break;
            case "COMPUTER_SKILL":
                const { experiences } = payload
                this.setState({ mockupStatus: experiences.endorseStatus }
                break;
            case "LANGUAGE":
                const { experiences } = payload
                this.setState({ mockupStatus: experiences.endorseStatus }
                break;
            case "ENGLISH_PROFICIENCY_TEST":
                const { experiences } = payload
                this.setState({ mockupStatus: experiences.endorseStatus }
                break;
            case "MARLIN_TEST":
                const { experiences } = payload
                this.setState({ mockupStatus: experiences.endorseStatus }
                break;

            default:
                break;
        }*/
        console.log(this.props.info)    

    }


    render() {
        const { info, t, anotherProfile, friend, type, anotherProfileId } = this.props
        if (!info) {
            return null;
        }
        let totalsoft = 0;
        return (
            <InfoBox anotherProfileId={anotherProfileId} type={type} icon={"/static/images/icon/AW_CrewHitz_ICON-25.png"} title={t("skill")}>
                <ul className={"info-items"}>
                    {
                        _.isEmpty(info)
                            ? <InfoItemNoData title={!anotherProfile ? t("BOX.add_skill") : t('No Skill')} to={!anotherProfile ? "/about?action=skill" : window.location} />
                            : info.map((item, i) => (
                                <div className="skill-main-container" key={i}>
                                    <p hidden>{totalsoft += item.score}</p>
                                    {item.score != 0 ?
                                        <div className="skill-container">
                                            <li key={i} className={"softSkill-profile-item"}>
                                                <b className={""}>{item.masterSkill.name}</b></li>
                                            {anotherProfile && friend == "STATUS_TYPE_FRIENDED" ?
                                                <div>
                                                    {this.state.mockupStatus ? <div className="endose-score-show" onClick={this.showMockup}><p>Endorse</p><img src="/static/images/icon/AW_CrewHitz_ICON-72.png" /><p className="endose-score-point"></p></div>
                                                        :
                                                        <div className="endose-score-show" onClick={this.showMockup}><p>Endose</p><img src="/static/images/icon/AW_CrewHitz_ICON-71.png" /><p className="endose-score-point"></p>
                                                            < Modal isOpen={this.state.mockup} toggle={this.showMockup}>
                                                                <ModalHeader toggle={this.showMockup}>
                                                                    <h2 style={{ color: 255 }}>Thanks for endorsing</h2>
                                                                    Help identify relevant opportunities and content</ModalHeader>
                                                                <ModalBody>

                                                                    <FormGroup>
                                                                        <Label >Comment</Label>
                                                                        <Input type="textarea" name="text" onChange={this.test} />
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
                                        </div>
                                        : ""}
                                    {totalsoft == 0 && i == (info.length - 1) ? <InfoItemNoData anotherProfile={anotherProfile} title={!anotherProfile ? t("BOX.add_skill") : t('No Skill')} to={!anotherProfile ? "/about?action=skill" : window.location} /> : ""}
                                </div>
                            ))
                    }
                </ul>
                {info.length > 4 ? <SeeMore text={this.props.anotherProfile ? t('see_more_anotherabout') + this.props.name + t('see_more_anotherabout2') : t('see_more_about')} onClick={anotherProfile ? () => { router.push("/about?action=skill&search=" + anotherProfileId) } : () => { router.push("/about?action=skill") }} /> : ""}

                <style jsx>{`
                .info-items{
                    padding-left: 0;
                    margin:0;
                    max-height:312px;
                    overflow:hidden;
                }
                  .softSkill-profile-item{
                    background-color: #EFEFEF;
                    border-radius: .5em;
                    display: flex;
                    text-align: center;
                    padding: 1em;
                    min-height:70px;
                    transition: all .2s ease-in;
                    cursor:pointer;
                    width: ${friend && friend == "STATUS_TYPE_FRIENDED" ? "calc(100% - 100px)" : "100%"};
                }
                .softSkill-profile-item:hover{
                    transform:scale(1.04);
                }

                .softSkill-profile-item >b{
                    // margin-left: 1em;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    justify-content:center;
                    align-item: center;
                }
                .endose-score-show{
                    min-height: 70px;
                    width:${friend && friend == "STATUS_TYPE_FRIENDED" ? "87px" : "0"};
                    height:${friend && friend == "STATUS_TYPE_FRIENDED" ? "5vw" : "0"};
                    margin : 0 0 0 10px;
                    border-radius: 10px;
                    background-color: #efefef;
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items:center;
                }
                .endose-score-show p{
                    margin:0;
                    font-size: 12.8px;
                }
                .endose-score-show img{
                    margin-bottom:2px;
                    width:28px;
                }
                .skill-container{
                    display:flex;
                    align-items:center;
                }
                .endose-score-point{
                    font-family: cloud;
                    color:#e45245;
                }
                .skill-main-container{
                    margin-bottom: .5em;
                }
                .skill-main-container:last-child{
                    margin: 0;
                }
            `}</style>
            </InfoBox>
        );
    };
}

export default compose(
    withNamespaces('timeline'),
    withRouter
)(Skill);