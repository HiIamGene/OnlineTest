import React, { Component } from "react"
import { compose } from "redux"
import {withAuthSync} from "../utils/auth"
import { withRouter } from "next/router"
import Layout from "../containers/app/advanceSearchLayout"
import SeeAllNotification from "../components/Notification/SeeAllNotification"

class NotifiactionPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={"notification-page-layout"}>
                <Layout>
                    <SeeAllNotification />
                </Layout>
            </div>
            
        )
    }
}

export default compose(
    withRouter,
    withAuthSync
)(NotifiactionPage)