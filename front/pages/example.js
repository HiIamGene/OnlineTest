import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {changeLanguages as changeLang} from "../redux/actions/languagesAction";
import compose from 'recompose/compose';
import {withNamespaces } from '../lib/i18n'
import {changeLanguage} from "../utils/multi-lang"
import {withToastManager } from 'react-toast-notifications';
import {Desktop, Mobile} from "../components/Responsive"
import {API_DOMAIN_NAME, API_USER_LOGIN} from "../constant/ENV"
import {PageLayout} from "../containers/app/pageLayout"
import axios from "axios";
import cookie from "js-cookie";
import {_error_handler} from "../utils/errorHandler";

class HomePage extends Component {
    static getInitialProps() {
        // console.log("this from example")
        return {
            namespacesRequired: ['common'],
        }
    }

    setLanguage = (lang) => {
        notify.show('Toasty!',"success");
        // changeLanguage(lang)
        // this.props.changeLang(lang)
        //        this.props.toastManager.add('Saved Successfully', { appearance: 'success' });
    }


    ///////////////////////////   How to use Error Handler   ///////////////////////////////////////
    //
    // axios.post(API_USER_LOGIN, this.state )
    //     .then(res => {
    //         // console.log("res", res.data.payload.user.token)
    //         cookie.set('token', res.data.payload.user.token, { path: '/' })
    //     this.props.router.push('/timeline')
    //     })
    //     .catch(err => _error_handler(this.props.toastManager,err));
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    render() {
        const { t } = this.props
        return (
            <PageLayout >
                <h1>{this.props.lang} : {t('welcome')} </h1>
                <span>{API_DOMAIN_NAME}</span>


                <Mobile>
                    <h3>You are using Mobile now</h3>
                </Mobile>
                <Desktop>
                    <h3>You are using Desktop now</h3>
                </Desktop>


                <button
                    onClick={() => this.setLanguage('th')}
                >
                    TH
                </button>
                <button
                    onClick={() => this.setLanguage('en')}
                >
                    EN
                </button>
            </PageLayout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeLang: bindActionCreators(changeLang, dispatch),
    }
}
const mapStateToProps = (state) => {
    return {
        lang: state.languagesReducer.lang,
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    // withToastManager,                                 //// [ notify ] 3. last use this HOC with Components
    withNamespaces(),
)(HomePage)
