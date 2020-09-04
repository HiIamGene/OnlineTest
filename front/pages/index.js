import React from 'react';
import Router from "next/router"

export default class Index extends React.Component {
    static async getInitialProps(ctx) {
        if (ctx.isServer) {
            ctx.res.writeHead(302, { Location: '/feed' })
            ctx.res.end()
            return
        }

        if (!ctx.isServer) {
            Router.push('/feed')
        }

        return{}
    }
    render(){
        return(
           <h1>This is  </h1>
        )
    }
}


