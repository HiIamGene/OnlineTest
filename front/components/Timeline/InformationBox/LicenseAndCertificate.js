import React from 'react';
import InfoBox from "./InfoBox"
import InfoItem from "./InfoItem"
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import InfoItemNoData from "./InfoItemNoData";
import _ from "lodash"
import {connect} from "react-redux";
import anotherProfile from '../../../pages/another-profile';
import SeeMore from "../EventsBox/SeeMore"
import router from "next/router"

const LicenseAndCertificate = ({info,t,profile,props}) => {
    if(!_.isUndefined(props)){
        //// console.log('user', props.anotherProfile)
        profile = props.anotherProfile
        anotherProfileId = props.anotherProfileId
        name = props.name

    }

    let now = new Date()
    let notifyCount = 0;
    
    const proficiency = !_.isUndefined(profile.user.proficiency) ? profile.user.proficiency.map((item,id)=>{
        console.log(item)
        let endDate = new Date(item.expiryDate)
        const isExpired = now>endDate
        if (isExpired){
            notifyCount++
        }
        return(<InfoItem certificate={"proficiency"} key={id} title={item.master.englishName} desc={item.master.localName} img={item.master.imageUrl} danger={isExpired}/>)
    }) : []

    const competency = !_.isUndefined(profile.user.competency) ? profile.user.competency.map((item,id)=>{
        let endDate = new Date(item.expiryDate)
        const isExpired = now>endDate
        if (isExpired){
            notifyCount++
        }
        return(<InfoItem certificate={"competency"} key={id} title={item.master.englishName} desc={item.master.localName} img={item.master.imageUrl} danger={isExpired}/>)
    }) : []

    const trainings = !_.isUndefined(profile.user.trainings) ? profile.user.trainings.map((item,id)=>{
        let endDate = new Date(item.end)
        const isExpired = now>endDate
        if (isExpired){
            notifyCount++
        }
        return(<InfoItem certificate={"training"} key={id} title={item.master.englishName} desc={item.master.localName} img={item.master.imageUrl} danger={isExpired}/>)
    }) : []

    return (
        <InfoBox icon={"/static/images/icon/AW_CrewHitz_ICON-24.png"} title={t('license&certificate')} notify={notifyCount+""}>
            <ul className={"timeline-info-items"}>
                {
                    (_.isEmpty(proficiency) && _.isEmpty(competency) && _.isEmpty(trainings))
                        ? <InfoItemNoData title={t("BOX.add_cert")} to={!anotherProfile ? "/about?action=license" : window.location}/>
                        : [...proficiency,...competency,...trainings].slice(0,3)
                }
            </ul>
            {/* {notifyCount>=3?<SeeMore text={anotherProfile? t('see_more_anotherabout')+name+t('see_more_anotherabout2'):t('see_more_about')} onClick={anotherProfile? ()=>{router.push("/about?action=competency&search="+anotherProfileId)}:()=>{router.push("/about?action=competency")}}/> : ""} */}
        </InfoBox>
        
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
    }
}

export default compose(
    connect(mapStateToProps),
    withNamespaces('timeline'),
    withRouter
)(LicenseAndCertificate);