import React from 'react';
import {PageLayout} from "../containers/app/pageLayout"
import ChangeLangButton from '../components/Login/ChangeLangButton';
import {changeLanguage} from "../utils/multi-lang/changeLanguage"
import Router from "next/dist/lib/router"
import nextCookie from "next-cookies"
import compose from "recompose/compose"
import {withNamespaces} from "../lib/i18n"
import LoginComponent from "../components/Login/index"


 class Login extends React.Component {
     static async getInitialProps(ctx) {
         const { token } = nextCookie(ctx)
         // console.log("login token",token)

         if(ctx.req && token){
             ctx.res.writeHead(302, {Location: '/feed'})
             ctx.res.end()
             return
         }

         if(token){
             Router.push('/feed')
         }


         return {
             namespacesRequired: ['common'],
         }
     }

    render(){
        return (
            <body style={{height: "100vh"}}>
            <ChangeLangButton changeLanguage={changeLanguage}/>
            <PageLayout>
                <LoginComponent/>
            </PageLayout>
            </body>
        )
    }
}

export default compose(
    withNamespaces(),
)(Login);