import React from 'react';
import {withToastManager } from 'react-toast-notifications';
import axios from "axios"
import {API_USER_SEND_VERIFY} from "../../constant/ENV"
import {WIDTH_BREAKPOINT} from "../../constant/responsive"
import compose from "recompose/compose";
import {withNamespaces} from "../../lib/i18n";
import {withRouter} from "next/dist/lib/router";



const AlertConfirmEmail = ({email,toastManager,t}) => {

    const resend = (email)=>{
        axios.post(API_USER_SEND_VERIFY,{email})
            .then(res=>{
                toastManager.add(t('RESEND_EMAIL.toast_msg',{ email}), { appearance: 'success' ,autoDismiss:true});
            }).catch(err=>{
            toastManager.add(err.response.message + email, { appearance: 'error' ,autoDismiss:true});
        })

    }

    return (
        <div className={"alert-email-cfm"}>
            <span>{t('RESEND_EMAIL.confirm_your_email',{email})} </span>
            <a onClick={()=>{resend(email)}} className={"ml-4"}>{t('RESEND_EMAIL.resend')}</a>

            <style jsx>{`
            @media only screen and (max-width: ${WIDTH_BREAKPOINT-1}px){
                .alert-email-cfm{
                    
                }

                .alert-email-cfm>span{
                    font-size: 15px !important;
                }
            }
                .alert-email-cfm{
                    text-align: center;
                    padding: 10px;
                    background-color: #fff9c3;
                    position: fixed;
                    top: 60px;
                    width: 100%;
                    z-index: 100;
                }
                .alert-email-cfm>a{
                    color: #009aff;
                    font-family: "Cloud";
                    text-decoration: underline;
                    cursor: pointer;
                }

                @media only screen and (max-width: ${WIDTH_BREAKPOINT-1}px)  {
                    .alert-email-cfm{
                        top: 58px;
                    }
                 }
            `}</style>
        </div>
    );
};

export default compose(
    withNamespaces('timeline'),
    withRouter,
    withToastManager
)(AlertConfirmEmail);