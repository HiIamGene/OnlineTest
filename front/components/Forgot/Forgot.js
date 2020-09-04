import React from 'react';
import {Button, Card, CardBody, CardTitle} from "reactstrap";
import Link from 'next/link'
import axios from "axios"
import {API_USER_FORGOT_PASSWORD} from "../../constant/ENV"
import {withToastManager} from "react-toast-notifications"
import Router from "next/router"
import compose from "recompose/compose";
import {withNamespaces} from "../../lib/i18n";

class Forgot  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:""
        }
    }

    _onSubmit = (e) =>{
        e.preventDefault();
        axios.get(`${API_USER_FORGOT_PASSWORD}?email=${this.state.email}`)
            .then(res=>{
                this.props.toastManager.add(res.data.message, { appearance: 'success',autoDismiss:true });
                Router.push("/login")
            })
            .catch(err=>{
                this.props.toastManager.add(err.data.message, { appearance: 'error' });
                console.log(err)
            })
        // console.log(this.state.email)

    }
    _handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render(){
        const {t} = this.props
        return(
            <div className={"regis-right-half forgot-head"} >
                
                    <div className={"wrap-back"}>
                        <Link href="/login">
                            <a>
                                <img
                                    src="../../static/images/icon/icons8-back-48.png"
                                    alt="back-button"
                                    className="img-back"
                                />
                            </a>
                        </Link>
                        <img
                            src="../../static/images/icon/icon_wh.png"
                            alt="back-button"
                            className="img-crewhitz"
                        />
                    </div>
                <div className={"forgot-wrap"}>

                    <Card className={"ch-card forgot-position"}>
                        <CardBody>
                            <div className={"forgot-font"}>
                                <span className={"forgot-font-bold"}>{t('FORGOT.header')}</span>
                                <br/>
                                <small className={"forgot-font-light"}>{t('FORGOT.detail')}</small>
                                <br/>
                                <form action="#" onSubmit={this._onSubmit}>
                                    <input type="email" className="mt-3 form-control form-control mb-2 forgot-font-light"
                                           name={"email"}
                                           required
                                           onChange={this._handleChange}
                                           placeholder={t('FORGOT.email')}/>
                                    <button className="btn btn-primary btn btn-block forgot-font-light">
                                        {t('FORGOT.continue')}
                                    </button>
                                </form>

                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
}

export default compose(
    withNamespaces("forgot-pass"),
    withToastManager
)(Forgot);
