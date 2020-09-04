import React from 'react'
import {PageLayout} from '../containers/app/pageLayout';
import Confirm from '../components/Register/Confirm.js';
import {AppLayout} from "../containers/app/app";
import compose from "recompose/compose"
import {connect} from "react-redux"
import {withNamespaces} from "../lib/i18n"
import Router from "next/dist/lib/router"
import {API_USER_VERIFY} from "../constant/ENV"
import axios from "axios"


class ConfirmEmail extends React.Component{
    static async getInitialProps(ctx) {
        if (ctx.req && !ctx.query.t) {
            ctx.res.writeHead(302, { Location: '/login' })
            ctx.res.end()
            return
        }

        if (!ctx.query.t) {
            Router.push('/login')
        }
        const token = ctx.query.t
        let verify = {}
        try{
            verify = await axios.post(API_USER_VERIFY,{token})
            if(verify) verify = true
        }catch(e) {
            verify = false;
            console.error(e.response)
        }
        return {
            verify,
            namespacesRequired: ['common'],
        }
    }

    render(){
        return (
            <AppLayout>
                <main className={"confirm-email-container confirm-email-bg"} >
                    <Confirm verify={this.props.verify}/>
                </main>
            </AppLayout>
        );
    }
}
export default compose(
    withNamespaces()
)(ConfirmEmail);