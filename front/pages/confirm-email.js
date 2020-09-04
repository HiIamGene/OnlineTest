import React from 'react'
import {PageLayout} from '../containers/app/pageLayout';
import ConfirmEmail from '../components/Register/ConfirmEmail';
import {AppLayout} from "../containers/app/app";

export default () =>
    (
        <AppLayout>
            <main className={"confirm-email-container confirm-email-bg"} >
                <ConfirmEmail />
            </main>
        </AppLayout>
    )
