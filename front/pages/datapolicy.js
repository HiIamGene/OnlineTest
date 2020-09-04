import React from 'react'
// import '../styles/_confirm-email.scss'
import {PageLayout} from '../containers/app/pageLayout';
import Datapolicy from '../components/Term/DataPolicy';
import {AppLayout} from "../containers/app/app";
import compose from "recompose/compose"
import {connect} from "react-redux"
import Router from "next/dist/lib/router"
import {API_USER_VERIFY} from "../constant/ENV"



export default class DataPolicy extends React.Component{
    render(){
        return (
            <AppLayout>
                <main>
                    <Datapolicy/>
                </main>
            </AppLayout>
        );
    }
}
