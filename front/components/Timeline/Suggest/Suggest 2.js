import React from 'react';
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
const SuggestFriends = ({t}) => {
    return (
        <div className={"f-wrapper"}>
            <div className={"friend-profile"}>
                <img src="https://pm1.narvii.com/6096/2c4691d02a17fe6216515a39bb1621ebe7c85e4e_hq.jpg" alt=""/>
            </div>
            <div className="nearby-wrapper">
                <div className={"detail"}>
                    <div className={"information-nearby"}>
                        <span>Draco Malfoy</span>
                        <small>Ship expert tecnology</small>
                        <div className={"mutual-friend"}>
                            <div className={"sm-profile"}>
                                <img src="https://pm1.narvii.com/6096/2c4691d02a17fe6216515a39bb1621ebe7c85e4e_hq.jpg" alt=""/>
                            </div>
                            <span className={"mutual"}>
                        1 {t('FRIENDS.mutual_connection')}
                    </span>
                        </div>
                    </div>
                </div>
                <div className="btn-nearby">
                    <button className={"btn-add-friend-feed"}>+ Add Friend</button>
                </div>
            </div>
        </div>
    );
};

export default compose(
    withNamespaces('timeline'),
    withRouter
)(SuggestFriends);