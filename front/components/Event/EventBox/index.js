import React, { Component } from "react";
import Card from "../Card";
import EventsIcon from "./EventsIcon";
import compose from "recompose/compose";
import { withNamespaces } from "../../../lib/i18n";
import { withRouter } from "next/dist/lib/router";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import RelateEvent from "../ViewEvent/RelateEventBox";
import {API_FEED_EVENT_SUGGESTION} from "../../../constant/ENV";
import axios from "axios";
import { isUndefined } from "util";


class EventBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
    this.scrollLeft = -230;
    this.scrollRight = 230;
    this.scrollVal = 0;
    this.eventArray = [];

    this.loadEventSuggestion();
  }

  loadEventSuggestion = () => {
    axios.get(API_FEED_EVENT_SUGGESTION).then(response => {
      const data = response.data.payload;
      //// console.log(data);
      this.eventArray = data;
      this.setState({
        event: {data},
        loading: false
      })
    })
  }

  handleScroll = () => {
    const element = document.getElementsByClassName("event-icon-group");
    console.log(element[0].scrollLeft)
    if(this.scrollVal >= element[0].scrollLeft) {
      this.scrollVal = element[0].scrollLeft
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
    //console.log(this.scrollVal);
  }

  render() {
    const {t} = this.props;
    const event1 = {
      eventName: "Caption Meeting",
      startDate: "20 Mar 2018",
      endDate: "20 August 2018",
      location: "Ship FireBase Technology",
      profilePic: "https://storage.zcanme.com/img/37-event-img2-1556554027.jpg"
    }
    
    const event2 = {
      eventName: "Meeting until Dawn",
      startDate: "2 January 2019",
      endDate: "9 February 2019",
      location: "Ship FireBase Technology",
      profilePic: null
    }

    const {loading} = this.state;
    const eventArray = this.eventArray;

    return (
      <Card title={t('RELATIVE.title')}>
        { eventArray.length > 0 && !loading ?
          <div className={"interest-event-arrow"}>
              <div className={"arrow-left"}>
                  <div className={"arrow"} onClick={this.handleScrollLeft}>
                    <img
                      src={"../../static/images/icon/icons8-back-48-white.png"}
                    />
                  </div>
                </div> 
              <div className={"arrow-right"}>
                <div className={"arrow"} onClick={this.handleScrollRight}>
                  <img
                    src={"../../static/images/icon/icons8-back-48-white.png"}
                  />
                </div>
              </div>
          </div>
          :
          eventArray.length == 0 && !loading  ?
            <div className={!loading ? "no-data-now" : "none-display"}>
              {t('EVENTS.no')}
            </div>
          :
          null
        }
        <div className={eventArray.length > 0 ? "event-icon-group" : "none-display"}>
          {
            loading ? 
              <label className={"loading-event-suggestion"}>
                Loading ......
              </label>
            :
              !isUndefined(eventArray) ?
              eventArray.map(key => (
                <label className={"interest-event-box"}>
                  <RelateEvent eventData={key}/>
                </label>
              ))
              :
              null
          }
        </div>
      </Card>
    );
  }
}

export default compose(
  withNamespaces("event"),
  withRouter
)(EventBox);
