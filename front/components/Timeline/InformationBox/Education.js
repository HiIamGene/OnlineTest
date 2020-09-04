import React from 'react';
import InfoBox from "./InfoBox"
import InfoItem from "./InfoItem"
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import InfoItemNoData from "./InfoItemNoData";
import anotherProfile from '../../../pages/another-profile';
import SeeMore from "../EventsBox/SeeMore"
import router from "next/router"

const Education = ({info,t,anotherProfile,friend,type,anotherProfileId,name}) => {
    let educount = 0;
    if(info){
        // console.log('edu-info : ',info)
        // console.log('edu-anotherProfile : ',anotherProfile)
        const {education} = info
        const itemList = !_.isUndefined(info) ? info.map((item,id)=>{
            educount += 1;
            return(<InfoItem anotherProfileId={anotherProfileId} type={type} friend = {friend} key={id} title={!anotherProfile?item.englishName:item.educationMaster.englishName} desc={!anotherProfile?item.localName:item.educationMaster.localName} img={!anotherProfile?item.imageUrl:item.educationMaster.imageUrl} anotherProfile={anotherProfile}/>)
        }) : []
        return (
            <InfoBox  icon={"/static/images/icon/AW_CrewHitz_ICON-23.png"} title={t('education')}>
                <ul className={"info-items"}>
                    {
                        _.isEmpty(info)
                            ? <InfoItemNoData anotherProfile={anotherProfile} title={!anotherProfile ? t("BOX.add_edu") : t('No Education')} to={!anotherProfile ? "/about?action=education" : window.location}/>
                            : itemList
                    }
                </ul>
                {educount>4?<SeeMore text={anotherProfile? t('see_more_anotherabout')+name+t('see_more_anotherabout2'):t('see_more_about')} onClick={anotherProfile? ()=>{router.push("/about?action=education&serch="+anotherProfileId)}:()=>{router.push("/about?action=education")}}/> : ""}
                {/* {educount>4?<SeeMore text={this.props.anotherProfile? t('see_more_anotherabout')+this.props.name+t('see_more_anotherabout2'):t('see_more_about')} onClick={anotherProfile? ()=>{router.push("/about?action=education&serch="+anotherProfileId)}:()=>{router.push("/about?action=education")}}/> : ""} */}
    
                <style jsx>{`
                    .info-items{
                        padding-left: 0;
                        max-height:345px;
                        overflow:hidden;
                    }
                `}</style>
            </InfoBox>
        );
    }
    
};

export default compose(
    withNamespaces('timeline'),
    withRouter
)(Education);