import React from 'react';
import Card from "../Card"
import RecommendBanner from "./RecommendBanner"
import compose from "recompose/compose";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/router";

const RecommendBox = ({t}) => {
    return (
        <Card title={t('RECOMMEND.recommend_for_u')}>
            <div style={{display:"flex"}}>
                <RecommendBanner name={"HEALTH CERTIFICATE"} textStatus={"2/3"} />
                <RecommendBanner name={"YOUR LICENSE"} textStatus={"0/2"}  color={"red"}/>
            </div>
        </Card>
    );
};
export default compose(
    withNamespaces('timeline'),
    withRouter
)(RecommendBox);