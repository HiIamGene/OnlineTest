import React, { Component } from 'react';
import Card from "../Card"
import EventsIcon from "./EventsIcon"
import SeeMore from "./SeeMore"
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import { API_FEED_EVENT_LIST } from "../../../constant/ENV"
import axios from "axios"
import { connect } from "react-redux"

class EventsBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
          page: 1,
          perPage: 10,
          totalPages: 1,
          myEventList: new Array(),
          loading: false
        }
    }
  
    componentDidMount() {
        this.intialEventData()
    }

    onClickSeeMore = () => {
        this.props.router.push("/event?action=my-events")
    }

    onClickCreateEvent = () => {
        this.props.router.push("/event?action=my-events&created=true")
    }
  
    intialEventData = () => {
        this.setState({
          loading: true
        })
        const { page, perPage, myEventList } = this.state
        const url = `${API_FEED_EVENT_LIST}?page=${page}&perPage=${perPage}`
  
        axios.get(url).then(response => {
          if(response.status == 200) {
            const data = response.data.payload
            const event = data.event
            this.setState({
              myEventList: [ ...myEventList, ...event],
              totalPages: data.pagination.totalPage,
            }, this.getMyEventList)
          }
        })
    }
  
    getMyEventList = () => {
        const { myEventList, page, totalPages } = this.state
        const { user } = this.props.profile
        //console.log("PAGE : ", page, "\nmy event list => ", myEventList)
        let array = new Array()
        myEventList.forEach((key) => {
            if(user.id == key.user.id) {
                array.push(key)
            }
        })

        if(array.length < 3 && page < totalPages) {
            this.setState({
                page: page+1
            }, this.intialEventData)
        }
        else {
            this.setState({
                myEventList: array.slice(0, 3),
                loading: false
            })
        }
    }

    render() {
        const { loading, myEventList } = this.state
        const { t } = this.props
        const countEventList = myEventList.length
        //console.log("slice my event list => ", this.state.myEventList)
        //console.log(this.props)
        return (
            <div className = "event-box-container" style = {{marginBottom: 15}}> 
                <Card title={t('events')} topRight={<span className={"btn-events-create "} isTimeLine={false} onClick={this.onClickCreateEvent}>{t("EVENTS.create")}</span>}>{
                    loading ?
                        <div className={"loading-event"}>
                            <img 
                                className={"loading-event-gif"}
                                src={"../static/images/image-loader/spinner-loader.gif"}
                            />
                        </div>
                    :
                        <div>
                            <div className={"even-icon-group"}> {
                                countEventList > 0 ?
                                    myEventList.map((key) => (
                                        <EventsIcon detail={key} />
                                    ))
                                :
                                <span>No your Event at now, try to create them</span>
                            }
                            </div> {
                                countEventList > 0 ?
                                <SeeMore text={t('EVENTS.see_more_events')} onClick={() => this.onClickSeeMore()}/>
                                :
                                null
                            }
                            
                        </div>
                    }
        
                    <style jsx>{`
                            .even-icon-group{
                                display:flex;
                                font-size: 14px;
                            }
                            .btn-events-create{
                                transition: all .2s ease-in-out;
                                font-family: "Cloud";
                                color: #31a7d7;
                                cursor: pointer;
                                line-height: 1.2;
                                font-size: 12.8px;
                                transition: 0.5s;
                            }
                            
                            .btn-events-create:hover{
                                transform: scale(1.1);
                                transition: 0.5s;
                            }
                    `}</style>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
    }
}

export default compose(
    connect(mapStateToProps),
    withNamespaces('timeline'),
    withRouter
)(EventsBox);