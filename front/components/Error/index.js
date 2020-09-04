import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { setError } from "../../redux/actions/errorAction";
import "../../styles/_error.scss";
import Router from "next/dist/lib/router";

class ErrorPage extends Component {
    componentWillMount() {
        this.props.setError(true);
        document.title = "Under maintainance";
        this.setTitleLogo();
    }

    setTitleLogo = () => {
        let link =
            document.querySelector("link[rel*='icon']") ||
            document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = "../../static/images/icon/icon_d.png";
        document.getElementsByTagName("head")[0].appendChild(link);
    };

    redirectToMainPage = () => {
        Router.push("/");
    };

    render() {
        return (
            <div className="error-page-container">
                <p className="error-under-maintenance-text cloud">
                    SITE UNDER MAINTENANCE
                </p>
                <small className="small-under-maintenance">
                    <p>We apologize for any inconviniences</p>
                    <p>We've almost done.</p>
                </small>
                <img
                    className="error-under-maintenance-image"
                    src="../../static/images/maintenance/maintenance.png"
                />
                {/* <button
                    className="go-back-btn"
                    onClick={() => this.redirectToMainPage()}
                >
                    Go back to main page
                </button> */}
            </div>
        );
    }
}

export default compose(
    connect(
        null,
        { setError }
    )
)(ErrorPage);
