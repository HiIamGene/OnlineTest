import {withRouter} from 'next/router'
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { Card, CardBody } from "reactstrap";
import Link from 'next/link';
import axios from "axios";
import React from "react"
import {withToastManager } from 'react-toast-notifications';
import compose from "recompose/compose"
import {API_USER_LOGIN, API_USER_LOGIN_FACEBOOK, API_USER_LOGIN_GOOGLE} from "../../constant/ENV"
import cookie from "js-cookie"
import {withNamespaces} from "../../lib/i18n";
import {Mobile} from "../Responsive";
import {_error_handler} from "../../utils/errorHandler/index"
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.__inputHandler = this.__inputHandler.bind(this);
        this.__submitHandler = this.__submitHandler.bind(this);
        this.__submitFacebook = this.__submitFacebook.bind(this);
        this.__submitGoogle = this.__submitGoogle.bind(this);
        this.state = {
            email: "",
            password: "",
        };
    }
    __inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    __submitHandler(e) {
        e.preventDefault();

        const {email,password} = this.state
        if (email.length <8 || password.length <8){
            this.props.toastManager.add(this.props.t('error_min_input'), { appearance: 'error',autoDismiss:true });
            return
        }
        axios.post(API_USER_LOGIN, this.state )
            .then(res => {
                // console.log("res", res.data.payload.user.token)
                cookie.set('token', res.data.payload.user.token, { path: '/' })
                this.props.router.push('/feed')
            })
            .catch(err => _error_handler(this.props.toastManager,err));

    }

    __submitFacebook = async (response) => {
        let login = await axios.post(API_USER_LOGIN_FACEBOOK, {
            token: response.accessToken
        })
        if(login){
            const token = login.data.payload.user.token
            cookie.set('token', token, { path: '/' })
            this.props.router.push({
                pathname: '/feed',
            })
        }

    }

    __submitGoogle = async (response) => {
        let login = await axios.post(API_USER_LOGIN_GOOGLE, {
            token: response.accessToken
        })
        if(login){
            const token = login.data.payload.user.token
            cookie.set('token', token, { path: '/' })

            this.props.router.push({
                pathname: '/feed',
            })
        }

    }


    render() {
        const {t} = this.props
        return (

            <div className={"login-page"}>
                <div className="left-half">
                    <img className="logo-lock" src="/static/images/icon/icon_d.png" alt="logo" />

                    <div className={"center-left"}>
                        <img className="bg-lock" src={"/static/images/icon/icon_wh.png"} alt="Crewhitz" />
                        <div className={"centerline"}>________________
                            <div className={"center-wel"}>{t('welcome')}
                                <div className={"ch-fontleft"}>{t('txt1')}</div>
                                <Link href='register'>
                                    {/* <a className="btn btn-info lca_position"><div className="login_create_account">{t('create_account')}</div></a> */}
                                    <a className="btn btn-info lca_position create-account-text">{t('create_account')}</a>
                                </Link>
                            </div>
                        </div></div>
                </div>


                <div className={"right-side"}>
                    <Card className={"ch-card"}  >
                        <CardBody className={"regis-card-body"}>
                            <form action="#" onSubmit={this.__submitHandler} className="mx-auto">
                                <img className="mobile-logo" src="/static/images/icon/icon_dh.png" />

                                <div className="ch-table-page ch-fontfirst mt-4 mb-3 select-type">

                                    <div className={"login-seaman"}><Link href="#"><a href="#"><u><b>{t('seaman')}</b></u></a></Link></div>
                                    <div className={"login-recruiter"}><Link href="Recruiter"><a className={"text-gray-1"} href="Recruiter">{t('recruiter')}</a></Link></div>
                                </div>

                                <div className="input-wrapper">
                                    <div className={"ch-form"}>
                                        <input type="text" name="email" onChange={this.__inputHandler} className="form-control mb-2" placeholder={t('email')} />
                                    </div>
                                    <div className={"ch-form"}>
                                        <input name="password" type="Password" onChange={this.__inputHandler} className="form-control mb-2" placeholder={t('password')} />
                                        <div className={"tp-freeforgot"} >
                                            <Link href='forgot?'><a className="text-gray-1" href="forgot?">{t('forgot')}</a></Link>
                                        </div>
                                    </div>
                                    
                                    <input className="btn btn-primary btn-lg ch-fontfirst btn-block login-login "
                                           type="submit"
                                           value={t('login')} />

                                    <Mobile>
                                        <Link href='register'>
                                            <a className="btn btn-primary btn-block login-login">{t('create_account')}</a>
                                        </Link>
                                    </Mobile>
                                    <div className={"login-or1"}>
                                        <hr/>
                                        <p className={"login-or2"}>OR</p>
                                    </div>
                                    <div className="divider" ></div>

                                    <GoogleLogin
                                        clientId="1082082679873-vese8e3dorse8e13l501nnae2lp44i5l.apps.googleusercontent.com"
                                        render={renderProps => (
                                            <button className="btn btn-outline-danger btn-login-socail btn-lg btn-block "
                                                    onClick={renderProps.onClick}><i className="fab fa-google-plus  "></i> {t('login_gmail')}
                                            </button>
                                        )}
                                        
                                        onSuccess={this.__submitGoogle}
                                        onFailure={this.__submitGoogle}
                                    />
                                    <div className={"login-fb"}>
                                        <FacebookLogin
                                            appId="380810929179350"
                                            fields="name,email,picture"
                                            callback={this.__submitFacebook}
                                            cssClass="btn btn-outline-primary btn-login-socail btn-lg btn-block"
                                            textButton={t('login_fb')}
                                            isMobile={true}
                                            icon="fab fa-facebook-f mr-1">{t('login_fb')}</FacebookLogin>
                                    </div>



                                </div>

                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>

        );
    }
}
export default compose(
    withNamespaces("login"),
    withToastManager,
    withRouter
)(Login);