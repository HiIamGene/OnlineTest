import React from 'react';
import InfoBox from "./InfoBox"
import compose from "recompose/compose"
import {connect} from "react-redux"
import {withRouter} from "next/dist/lib/router"
import {withNamespaces} from "../../../lib/i18n";

const About = ({profile,t}) => {
    return (
        <InfoBox icon={"/static/images/icon/AW_CrewHitz_ICON-24.png"} title={t('about')}>
            <ul className={"info"}>
                <li><span>{t('ABOUT.live_in')}</span> <b className={"hover-underline"}>Bangkok, Thailand</b></li>
                <li><span>{t('ABOUT.email')}</span> <b className={"hover-underline"}>{profile&&profile.email}</b></li>
            </ul>
            <style jsx>{`
                .info>li>span{
                    color: #bcbcbc;
                }
                .info{
                    padding-left: 2em;
                }
            `}</style>
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
)(About);