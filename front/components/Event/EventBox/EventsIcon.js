import React, { Component } from "react"
import Icon from "../../Icon/Icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { API_FEED_EVENT_LIST } from "../../../constant/ENV"
import axios from "axios"

class EventsIcon extends Component {
    constructor(props) {
      super(props)
      this.state = {
        page: 1,
        perPage: 10,
        myEventList: new Array(),
        loading: false
      }
    }

    componentDidMount() {
      this.intialEventData()
    }

    intialEventData = () => {
      this.setState({
        loading: true
      })
      const { page, perPage, myEventList } = this.state
      const url = `${API_FEED_EVENT_LIST}?page=${page}&perPage=${perPage}`

      axios.get(url).then(response => {
        if(response.status == 200) {
          const data = response.data
          this.setState({
            myEventList: [ ...myEventList, ...data.payload],
            loading: false
          }, this.getMyEventList)
        }
      })
    }

    getMyEventList = () => {
      const { myEventList } = this.state
      console.log("my event list => ", myEventList)
    }

    render() {
      return (
        <div className={"event-icon-wrapper"}> {}
          <img
            src={
              "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F38763944%2F196155805820%2F1%2Foriginal.jpg?h=230&w=460&auto=compress&rect=0%2C0%2C1000%2C500&s=c0a5ac0519aee1ee72baf18af3ed0b31"
            }
            alt={"cover"}
            width={170}
          />
          <div className = "event-detail">
            <div>
            <img src="/static/images/icon/calendar-s.png" className={"icon-calendar event-icon"}/>
            <span className={"start"}>Event name #1</span>
            </div>
            <span className={"captain"}>
            <i className={"fas fa-map-marker-alt"} style={{marginRight: 4}}></i>National Dock, Sttahip</span>
          </div>
          <div className={"view"}>
            {" "}
             <p className = "view-date-header">Date : </p>
             <div className = "event-date-detail"><p>20 Mar 2018 - 20 August 2018</p></div>
          </div>
        </div>
      );
    }
}

export default EventsIcon;
