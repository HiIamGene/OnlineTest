import React, {Fragment} from 'react';
import {AppLayout} from "./app";
import '../../styles/style.scss';

export const PageLayout = props => (
    <AppLayout>
        <main className={"ch-page-container"}>
            {props.children}
        </main>
    </AppLayout>
);