import { Desktop, Mobile } from "../components/Responsive";
import React, { Component } from "react";
import compose from "recompose/compose";
import { withNamespaces } from "../lib/i18n";
import TimelineLayout from "../containers/app/timelineLayout"; /* ห้ามลบ */
import { connect } from "react-redux";
import { withAuthSync } from "../utils/auth/index";
import { bindActionCreators } from "redux";
import { setProfile } from "../redux/actions/profileAction";
import Navbar from "../components/Navbar/index";
import CreatePostBox from "../components/Feed/CreatePostBox";
import NearbyBox from "../components/Feed/NearbyBox";
import { AppLayout } from "../containers/app/app";
import ChatList from "../components/Chat";
import SuggestBox from "../components/Feed/Suggest/index";

class showfeed extends Component {
    render() {
        return (
            <div>
                <AppLayout>
                    <Navbar />
                    <div className="feed-content-container">
                        <Desktop>
                            <div className="wrapper-feed-content-left">
                                <CreatePostBox />
                            </div>
                            <div className="wrapper-feed-content-right">
                                <NearbyBox />
                                <SuggestBox />
                            </div>
                            <div className="chatlist-position" />
                        </Desktop>

                        <Mobile>
                            <div className={"wrapper-timeline-content-left wrapper-timeline-content"}>
                                <CreatePostBox />
                                <div className="behind-create-post-box" />
                            </div>
                        </Mobile>
                    </div>
                </AppLayout>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setProfile: bindActionCreators(setProfile, dispatch)
    };
};
const mapStateToProps = state => {
    return {
        profile: state.profileReducer,
        feed: state.feedReducer
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withNamespaces(),
    withAuthSync
)(showfeed);
