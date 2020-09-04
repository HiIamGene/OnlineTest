import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {WIDTH_BREAKPOINT} from "../../constant/responsive"
import axios from "axios"
import {API_USER_FORGOT_PASSWORD} from "../../constant/ENV"
import {withToastManager} from "react-toast-notifications"
import Router from "next/router"
import compose from "recompose/compose";
import {withNamespaces} from "../../lib/i18n";

class ResetPasswordForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newPassword:"",
            confirmPassword:""
        }
    }

    _handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    _handleSubmit = (e)=>{
        e.preventDefault();
        const {token} = this.props;
        if(this.state.newPassword === this.state.confirmPassword){
            // console.log(token)
            axios.post(API_USER_FORGOT_PASSWORD,{...this.state,token})
                .then(res=>{
                    this.props.toastManager.add(res.data.message, { appearance: 'success',autoDismiss:true });
                    Router.push("/login")
                }).catch(err=>{
                    console.error(err.response)
                this.props.toastManager.add(err.response.data.message, { appearance: 'error',autoDismiss:true });
            })
        }else{
            this.props.toastManager.add('Password not match', { appearance: 'error',autoDismiss:true });
            // console.log("password dons't matched",this.state.newPassword,this.state.confirmPassword)
        }


    }


    render(){
        const {t} = this.props
        return (
            <div className={"wrapper"}>
                <div className={"form-wrapper"}>
                    <img className="reset-password-logo" src="/static/images/icon/icon_wh.png" alt=""/>
                    <h4 className={"underline mb-3"}>{t('RESET.header')}</h4>
                    <Form onSubmit={this._handleSubmit}>
                        <Input required onChange={this._handleChange} type="password" className={"mb-2"} name="newPassword" id="newPassword"  placeholder={t('RESET.new_password')} />
                        <Input required onChange={this._handleChange} type="password" className={"mb-3"} name="confirmPassword" id="confirmPassword" placeholder={t('RESET.confirm_password')} />

                        <Button color={"primary"} block>{t('RESET.change_password')}</Button>
                    </Form>
                </div>

                <style jsx>{`
            body{
                height:100%;
            }

            @media only screen and (max-width: ${WIDTH_BREAKPOINT-1}px){
                .form-wrapper{
                    width: 90% !important;
                }
            }
                .reset-password-logo{
                    width: 350px;
                    align-self: center;
                    margin-bottom: 3em;
                }

                .form-wrapper{
                    width:25%;
                    display: flex;
                    flex-direction: column;
                }
                .wrapper{
                    align-items: center;
                    background-color: #171e4a;
                    height: auto;
                    flex-grow: 1;
                    padding: 2em;
                    display: flex;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .underline{
                    border-bottom: solid 1px #ffffff;
                    padding-bottom: 0.4em;
                    color: white;
                    font-family: "Cloud";
                }
            `}</style>
            </div>
        );
    }

};

export default compose(
    withNamespaces("forgot-pass"),
    withToastManager
) (ResetPasswordForm);