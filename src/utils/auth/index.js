import { Component } from 'react'
import Router from '../../../../git new/src/utils/auth/node_modules/next/router'
import nextCookie from '../../../../git new/src/utils/auth/node_modules/next-cookies'
import cookie from 'js-cookie'
import React from "react"
import axios from "axios"
import {API_USER_PROFILE_V010001} from "../../constant/ENV"
import {setProfile} from "../../redux/actions/profileAction"
import { destroyCookie } from '../../../../git new/src/utils/auth/node_modules/nookies'
import {COOKIE_LANG, COOKIE_TOKEN} from "../../constant"
import {_error_handler} from "../errorHandler";


export const logout = (ctx=null) => {
    // console.log("logout ctx",ctx)
    if (ctx && ctx.isServer){
        destroyCookie(ctx, 'token')
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
    }else {
        cookie.remove('token')
        window.localStorage.setItem('logout', Date.now())
        Router.push('/login')
    }

}


export const withAuthSync = WrappedComponent =>
    class extends Component {
        static async getInitialProps (ctx) {
            const token = auth(ctx)
            try {
                const profile = await axios.get(API_USER_PROFILE_V010001)

                ctx.store.dispatch(setProfile(profile.data.payload))

            }catch (err) {
                _error_handler(null,err,ctx)
            }


            const componentProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx))

            return { ...componentProps, token }
        }

        constructor (props) {
            super(props)
            this.syncLogout = this.syncLogout.bind(this)
        }

        componentDidMount () {
            window.addEventListener('storage', this.syncLogout)
        }

        componentWillUnmount () {
            window.removeEventListener('storage', this.syncLogout)
            window.localStorage.removeItem('logout')
        }

        syncLogout (event) {
            if (event.key === 'logout') {
                // console.log('logged out from storage!')
                Router.push('/login')
            }
        }

        render () {
            return <WrappedComponent {...this.props} />
        }
    }

export const auth = ctx => {
    const { token } = nextCookie(ctx)
    
    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
        return
    }

    if (!token) {
        Router.push('/login')
    }

    return token
}