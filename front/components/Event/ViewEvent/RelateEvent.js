import React, {Component} from "react";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import { compose } from "recompose";
import RelateEventBox from "./RelateEventBox";
import { isUndefined } from "util";

class RelateEvent extends Component{
    constructor(props) {
        super(props);

        this.arrayEvent = [];
        this.scrollLeft = -230;
        this.scrollRight = 230;
        this.scrollVal = 0;
    }

    handleScroll = () => {
        const element = document.getElementsByClassName("relate-event-contents");
        //console.log(element);
        if(this.scrollVal > element[0].scrollLeft - 230) {
          this.scrollVal = element[0].scrollLeft - 230;
        }
        if(this.scrollVal < 0) {
          this.scrollVal = 0;
        }
        return(element);
      }
    
      handleScrollLeft = () => {
        const element = this.handleScroll();
        this.scrollVal += this.scrollLeft;
        element[0].scrollLeft = this.scrollVal;
        // console.log(this.scrollVal);
      }
    
      handleScrollRight = () => {
        const element = this.handleScroll();
        this.scrollVal += this.scrollRight;
        element[0].scrollLeft = this.scrollVal;
        // console.log(this.scrollVal);
      }

    render() {
        this.arrayEvent = this.props.relateEvent;
        //// console.log(this.arrayEvent);
        const arrayEvent = this.arrayEvent;
        const { t } = this.props

        return (
            <div className={"relate-event-main"}>
                <div className={"relate-event-head"}>
                    <label className={"relate-event-title"}>{t('RELATIVE.title2')}</label>
                </div>
                <div className={"relate-event-body"}>
                    { arrayEvent.lenght > 0 ?  
                        <div>
                            <div className={"arrow-left"} onClick={this.handleScrollLeft}>
                                <div className={"arrow"}>
                                    <img
                                        src={"../../static/images/icon/icons8-back-48-white.png"}
                                    />
                                </div>
                            </div> 
                            <div className={"arrow-right"} onClick={this.handleScrollRight}>
                                <div className={"arrow"}>
                                    <img
                                        src={"../../static/images/icon/icons8-back-48-white.png"}
                                    />
                                </div>
                            </div>
                            <div className={"relate-event-contents"}>
                                {
                                    !isUndefined(arrayEvent) ?
                                    arrayEvent.map(key => (
                                        <div className={"relate-event-eachbox"}>
                                            <RelateEventBox eventData={key}/>
                                        </div>
                                    ))
                                    :
                                    null
                                }
                            </div>
                        </div>
                    :
                    <div className={"no-data-now"}>
                        {t('EVENTS.no')}
                    </div>    
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
    }
};

export default compose(
    connect(mapStateToProps),
    withNamespaces('event'),
    withRouter
)(RelateEvent);