import React, {Component} from "react";
import {compose} from "recompose";
import { API_FEED_EVENT_BOOKMARK, API_FEED_SHARE_EVENT } from "../../../constant/ENV";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withToastManager } from 'react-toast-notifications'

class DropDown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: false,
            bookmark: this.props.bookmark == "saved" ? true : false
        }

        this.handleToggle = this.handleToggle.bind(this)
        this.handleClickOut = this.handleClickOut.bind(this)
        //console.log(this.props);
    }

    saveEventBookmark = () => {
        //// console.log("bookmark");
        axios.post(API_FEED_EVENT_BOOKMARK, {eventId: this.props.id}).then(response => {
            if(response.status == 200) {
                this.setState({
                    bookmark: true
                })
                this.props.toastManager.add("Add Event to your Bookmark",{
                    autoDismiss: true,
                    appearance: "success"
                })
            }
        });
    }

    deleteEventBookmark = () => {
        axios.delete(API_FEED_EVENT_BOOKMARK + "/" + this.props.id).then(response => {
            if(response.status == 200) {
                this.setState({
                    bookmark: false
                }) 
                this.props.toastManager.add("Remove Event to your Bookmark",{
                    autoDismiss: true,
                    appearance: "success"
                })
            }
        })
    }

    handleToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    handleClickOut = () => {
        this.setState({
            toggle: false
        })
    }

    handleShareAsPost = () => {
        axios.post(API_FEED_SHARE_EVENT + "/" + this.props.id, {
            message: "Share event",
            privacy: "PUBLIC"
        }).then(response => {
            if(response.status == 200) {
                this.props.toastManager.add("share success", { 
                    appearance: 'success',
                    autoDismiss: true
                });
            }
        })
    }

    render() {
        const { toggle, bookmark } = this.state
        const list = [{
            value: "Bookmarks", 
            icon: !bookmark ? "../../static/images/icon/AW_CrewHitz_ICON-67.png" : "/static/images/icon/bookred.png",
            onClick: !bookmark ? this.saveEventBookmark : this.deleteEventBookmark
        },{
            value: "Save as Post", 
            icon: "",
            onClick: this.handleShareAsPost
        }]
        return (
            <label className={"dropdown-main"}>
                <button className={"dropdown-title-name"} onClick={this.handleToggle}>
                    <div>
                        Shared
                    </div>
                    { !toggle ?
                        <div className={"event-dropdown-arrow"}>
                            <i className="fas fa-angle-down"></i>
                        </div>
                    :
                        <div className={"event-dropdown-arrow"}>
                            <i className="fas fa-angle-up"></i>
                        </div>
                    }
                </button>
                <div className={toggle ? "dropdown-list-display" : "dropdown-list-none"}>
                    {
                        list.map((index) => 
                            <div className={"dropdown-items"} 
                            key={index.value} onClick={index.onClick}>
                                <img src={index.icon}/>
                                {index.value}
                            </div>
                        )
                    }
                </div>
            </label>
        )
    }
}

export default compose(
    withToastManager
)(DropDown)