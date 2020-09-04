import AnotherProfile from '../components/AnotherProfile/main'
import React, {Component } from 'react';
import { compose } from 'recompose';
import {withNamespaces} from "../lib/i18n";
import {connect} from "react-redux"
import {setProfile} from "../redux/actions/profileAction"
import {bindActionCreators} from "redux"
import {withAuthSync} from "../utils/auth/index"

class AnotherProfilePage extends Component{
    constructor(props){
        super(props)
    }

    static getInitialProps(ctx){
        return{
            namespacesRequired: ['another-profile']
        }
    }

    render() {
        return(
            <div>
                <AnotherProfile/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProfile: bindActionCreators(setProfile, dispatch),
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
    }
}

export default compose(
    connect(mapDispatchToProps, mapStateToProps),
    withNamespaces(),
    withAuthSync
)(AnotherProfilePage)