import React, {Component} from "react";
import {withAuthSync} from "../utils/auth";
import {connect} from "react-redux";
import {withNamespaces} from "../lib/i18n";
import {bindActionCreators} from "redux";
import {setProfile} from "../redux/actions/profileAction";
import {compose} from "recompose";
import ViewEvent from "../components/Event/ViewEvent";
import Layout from "../containers/app/advanceSearchLayout";

class Event extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Layout>
                    <ViewEvent/>
                </Layout>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProfile: bindActionCreators(setProfile, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
    }
};

export default compose(
    connect(mapDispatchToProps, mapStateToProps),
    withNamespaces('event'),
    withAuthSync
)(Event);