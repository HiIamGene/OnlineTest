import React, { Component } from 'react';
import Icon from "../../Icon/Icon"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from "next/router"
import { compose } from 'recompose';


class EventsIcon extends Component {
    constructor(props) {
        super(props)
        //console.log("event icon : ", this.props)
    }

    collaspeString = (str, num) => {
        if(str.length <= num) {
            return str
        }
        else return `${str.substring(0, num)}...`
    }

    onClickToViewEvent = () => {
        this.props.router.push(`/_event?id=${this.props.detail.id}`)
    }

    render() {
        const { detail } = this.props
        const { eventName, descript, privacy } = detail
        const numCollase = 22
        return (
            <div className={"wrapper"} onClick={this.onClickToViewEvent}>
    
                <Icon icon={"calendar-s"} size={2} color={"no"} className="mb-1"/>
                <span className={"start"}>{this.collaspeString(eventName, numCollase)}</span>
                <span className={"captain"}>{this.collaspeString(descript, numCollase)}</span>
    
                <div className={"view"}> 
                    <i className={"fas fa-eye"}></i> 
                    View : {`${privacy.charAt(0).toUpperCase()}${privacy.slice(1).toLowerCase()}`}
                </div>
    
                <style jsx>{`
                    .wrapper{
                        cursor:pointer;
                        display:flex;
                        align-items: center;
                        width: 33%;
                        flex-direction: column;
                        background-color: #efefef;
                        border-radius: 5px;
                        padding: .7em;
                        margin-right: 1em;
                        transition: all .2s ease-in-out;
                        transition: 0.5s;
                    }
                    .wrapper:hover{
                        transform: scale(1.05);
                        transition: 0.5s;
                    }
                    .wrapper:last-child{
                        margin-right: 0;
                    }
    
                    .start{
                        font-family:"Cloud";
                        font-size:12.8px;
                        margin-bottom: 0;
                    }
                    .captain{
                        font-size:12.8px;
                        color:#00000091;
                        margin-bottom: .2em;
                    }
                    .view{
                        background-color: #636363;
                        font-size: 12.8px;
                        border-radius: 17px;
                        padding: 0.35em 1em 0.2em 1em;
                        color: white;
                        margin-bottom: .3em;
                    }
                `}</style>
            </div>
        )
    }
}

export default compose(
    withRouter
)(EventsIcon)