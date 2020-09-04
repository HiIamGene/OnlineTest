import React from 'react'
import {PageLayout} from '../containers/app/pageLayout';
import ResetPasswordForm from "../components/ResetPassword/index"
import Router from "next/dist/lib/router"
import axios from "axios"
import {API_USER_FORGOT_PASSWORD} from "../constant/ENV"

class Resetpass extends React.Component{
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
        // console.log("reset password token",token)
        return{
            token,
            namespacesRequired: ['common'],
        }
    }

    render(){
        return (
            <PageLayout>
                <ResetPasswordForm token={this.props.token}/>
            </PageLayout>
        );
    }
}

export default Resetpass;
