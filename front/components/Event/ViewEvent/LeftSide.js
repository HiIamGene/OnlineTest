import React, { Component } from "react";
import {withRouter} from "next/dist/lib/router"
import { compose } from "recompose";
import { withNamespaces } from "../../../lib/i18n";

class LeftViewEvent extends Component {
    constructor(props) {
        super(props);
        //// console.log(this.props);
    }

    goToEventPage = (action) => {
        this.props.router.push("/event?action=" + action);
        if(!this.props.isDetail) {
            this.props.onClick(true, action);
        } 
    }

    render() {
        const {permission, router, t} = this.props;
        const {action} = router.query;
        //// console.log(action&permission);
        return (
            <div className={"left"}>
                
                <div className={"left-head"}>
                    <img 
                        className={"left-head-icon"} 
                        src={"../../../static/images/icon/AW_CrewHitz_ICON-02.png"}
                    />
                    <span className={"left-head-title"}>{t('MENU.event')}</span>
                </div>
                <div className={"left-body"}>
                    <p className={permission == "event" || action == "all-events" ? "left-body-display" : "events"} onClick={() => this.goToEventPage("all-events")} >{t('MENU.event')}</p>
                    <p className={permission == "myEvent" || action == "my-events" ? "left-body-display" : "my-events"} onClick={() => this.goToEventPage("my-events")} >{t('MENU.my_event')}</p>
                    <p className={permission == "bookmark" || action == "bookmark" ? "left-body-display" : "bookmarks"} onClick={() => this.goToEventPage("bookmark")} >{t('MENU.bookmark')}</p>
                </div>
            </div>
        )
    }
}

export default compose(
    withNamespaces('event'),
    withRouter
)(LeftViewEvent)