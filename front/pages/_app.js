import React from 'react'
import {Provider} from 'react-redux'
import App, {Container} from 'next/app'
import withRedux from 'next-redux-wrapper'
import {initStore} from '../redux/store/index'
import compose from 'recompose/compose';
import {appWithTranslation} from '../lib/i18n'
import {ToastProvider} from 'react-toast-notifications';
import nextCookie from 'next-cookies'
import axios from "axios"
import {COOKIE_LANG, COOKIE_TOKEN} from "../constant"
import cookie from 'js-cookie'
import {loadProgressBar} from '../lib/loading'
import {login} from "../redux/actions/authAction";
import AppContainer from '../containers/AppContainer'

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        const nCookie = nextCookie(ctx)
        axios.defaults.headers.common['locale'] = nCookie[COOKIE_LANG]

        if (nCookie[COOKIE_TOKEN]) {
            axios.defaults.headers.common['Authorization'] = nCookie[COOKIE_TOKEN];
            ctx.store.dispatch(login(nCookie[COOKIE_TOKEN]));
        }

        return {
            namespacesRequired: ['common'],
            pageProps: Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {}
        }
    }

    componentWillMount() {
        loadProgressBar()
        const token = cookie.get(COOKIE_TOKEN);
        if (token) {
            axios.defaults.headers.common['Authorization'] = token
            window.localStorage.setItem("AuthorizationToken", token)
        }
    }

    render() {
        const {Component, pageProps, store} = this.props
        return (
            <Container>
                <Provider store={store}>
                    <AppContainer>
                        { typeof window !== 'undefined' && <ToastProvider placement={"bottom-left"} autoDismissTimeout={5000}><Component {...pageProps} /></ToastProvider>}
                        
                    </AppContainer>
                </Provider>
            </Container>
        )
    }
}

export default compose(
    withRedux(initStore),
    appWithTranslation,
)(MyApp)
