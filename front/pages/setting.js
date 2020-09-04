import React, { Component } from "react"
import { compose } from "redux"
import {withAuthSync} from "../utils/auth"
import { withRouter } from "next/router"
import Layout from "../containers/app/advanceSearchLayout"
import Setting from "../components/Setting/setting"

class SettingPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Layout>
                <Setting selected={"languages"}/>
            </Layout>    
        )
    }
}

export default compose(
    withRouter,
    withAuthSync
)(SettingPage)