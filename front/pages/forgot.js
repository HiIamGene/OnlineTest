import React from 'react'
import {PageLayout} from '../containers/app/pageLayout';
import Forgot from '../components/Forgot/Forgot';
import Link from 'next/link'
import compose from "recompose/compose";
import {withNamespaces} from "../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import {withToastManager} from "react-toast-notifications";
import Register from '../components/Register/Register';

class ForgetPasswordPage  extends React.Component{
    static async getInitialProps(ctx) {
        return{
            namespacesRequired: ['common'],
        }
    }

    render(){
        const {t} = this.props
        return(
            <PageLayout>
                <div className="left-half">
                
                    <img className="logo-lock " src="/static/images/icon/icon_d.png" alt="logo"/>
                    <img className="bg-lock forgot-logo-border" src={"/static/images/icon/icon_wh.png"} alt="Crewhitz"/>
                    <div className={"forgot-text"}>
                    <span>
                        {t('FORGOT.welcome')} <br/>
                        {t('FORGOT.dont')} <br/>
                    </span>
                        <Link href='register' className="regis-left-half">
                            <a className="btn forgot-btn-info mt-3 "><div className="forgot-create">{t('FORGOT.create_account')}</div></a>
                        </Link>
                    </div>
                </div>
                <Forgot/>
            </PageLayout>
        )
    }
}

export default compose(
    withNamespaces("forgot-pass"),
)(ForgetPasswordPage);
