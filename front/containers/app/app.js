import React, {Fragment} from 'react';
import Head from 'next/head';

export const AppLayout = props => (
    <Fragment>
        <Head>
            <title>CREWHITZ</title>
            <link rel="icon" type="image/png" href="/static/images/icon/icon_d.png"/>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
                  integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
                  crossOrigin="anonymous"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        {props.children}
    </Fragment>
);