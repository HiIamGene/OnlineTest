import React from 'react'
// import '../styles/_confirm-email.scss'
import {PageLayout} from '../containers/app/pageLayout';
import Term from '../components/Term/Terms.js';
import {AppLayout} from "../containers/app/app";
import compose from "recompose/compose"
import {connect} from "react-redux"
import Router from "next/dist/lib/router"
import {API_USER_VERIFY} from "../constant/ENV"



export default class Terms extends React.Component{
    render(){
        return (
            <AppLayout>
                <main>
                    <Term/>
                </main>
            </AppLayout>
        );
    }
}
