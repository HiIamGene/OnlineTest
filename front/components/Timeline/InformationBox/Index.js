import React,{Component} from 'react';
import Card from "../../../components/Timeline/Card"
import About from "./About"
import Experience from "./Experience"
import Education from "./Education"
import Skill from "./Skill"
import SeeMore from "../EventsBox/SeeMore"
import {withRouter } from "next/router"
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";
import LicenseAndCertificate from "./LicenseAndCertificate";
import { connect } from "react-redux"

class InformationBox extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {anotherProfilePage,anotherProfileId,name} = this.props;
        let aboutInfo = !anotherProfilePage? this.props.aboutInfo : this.props.aboutInfo.anotherProfile.user;
        let softskill = this.props.softskill;
        let friend = anotherProfilePage? aboutInfo.friendStatus : "";
        // console.log("anotherProfilePage : ",anotherProfilePage);
        // console.log("anotherProfile in informationBox : ",this.props.aboutInfo.anotherProfilePage);
        // console.log("aboutInfo in informationBox : ",this.props.softskill);
        // console.log("friend? : ",friend);
        // // console.log("anotherProfile aboutInfo in informationBox : ",this.props.aboutInfo.anotherProfile.user);
        const {t} = this.props
         return (
            <Card >
                <div className={"wrapper"}>
                {/*<About />*/}
                {!anotherProfilePage?
                <LicenseAndCertificate info={aboutInfo&&aboutInfo.exp} anotherProfileId={anotherProfileId} name={name}/> 
                :
                 ""}
                        <Experience anotherProfileId={anotherProfileId} type={"Experience"} friend={friend} anotherProfile = {anotherProfilePage} name={name}info={!anotherProfilePage?aboutInfo&&aboutInfo.exp : aboutInfo&&aboutInfo.experiences} />
                        <Education anotherProfileId={anotherProfileId} type={"Education"} friend={friend} anotherProfile = {anotherProfilePage} name={name} info={!anotherProfilePage?aboutInfo&&aboutInfo.edu.education:aboutInfo&&aboutInfo.educations}/>
                        <Skill anotherProfileId={anotherProfileId} type={"Skill"} friend={friend} anotherProfile = {anotherProfilePage} name={name} info={!anotherProfilePage?this.props.softskill:aboutInfo&&aboutInfo.softSkills}/>
                    
                </div>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
        aboutProfile: state.aboutProfileReducer
    }
}

export default compose(
    connect(mapStateToProps),
    withNamespaces('timeline'),
    withRouter
)(InformationBox);