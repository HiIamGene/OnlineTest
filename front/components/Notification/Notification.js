import React, {Component} from 'react'
import {
    DropdownItem,
    DropdownMenu,
  } from "reactstrap"
import { withRouter } from "next/router"
import { compose } from 'recompose'
import NotificationDetail from "./NotificationDetail"
import { API_ALL_NOTIFICATION } from "../../constant/ENV"
import axios from "axios"
import socketIOclient from "socket.io-client"
import { SOCKET_SERVICE } from "../../constant/ENV"
import { withAuthSync } from "../../utils/auth"
import { connect } from "react-redux"
  
class Notification extends Component {
    constructor(props){
        super(props)
        this.state = {
            noticData: new Array(),
            perPage: 5,
            page: 1,
            totalPage: 1,
            loading: false
        }
        //console.log(this.props)
        this.socketIO = socketIOclient(SOCKET_SERVICE, {
            query : {
                authorization: this.props.token
            }
        })
    }

    componentDidMount() {
        this.getInitialNotification()
        this.receivDataSocketIO()
    }

    receivDataSocketIO = () => {
        this.socketIO.on("get-noti-alert", (socket) => {
            // console.log("connected")
            console.log("notification socket -> ", socket)
            const noticTmp = this.state.noticData
            const newNotic = [socket.notification]
            this.setState({
                noticData: []
            })
            //console.log(noticTmp)
            this.setNewNoticData(noticTmp, newNotic)
        })
    }

    setNewNoticData = (prev, next) => {
        prev.forEach((key) => {
            next.push(key)
        })
        //console.log(next)
        this.setState({
            noticData: next
        })
        this.props.notic(true)
    }

    getInitialNotification = () => {
        //// console.log("initial data . . .")
        this.setState({
            loading: true
        })
        const { perPage, page} = this.state

        axios.get(`${API_ALL_NOTIFICATION}?page=${page}&perPage=${perPage}`).then(response => {
            //console.log(response)
            if(response.status == 200) {
                const { noticData } = this.state
                const receivData = response.data.payload
                const tmpArr = noticData

                receivData.inappAlert.forEach(data => {
                    tmpArr.push(data)
                })

                this.setState({
                    noticData: tmpArr,
                    totalPage: receivData.pagination.totalPage,
                    loading: false,
                    loadMore: false
                })
            }
        })
    }

    render(){
        const { loading, noticData} = this.state
        return (
            <DropdownMenu right>
                <div className={!loading ? "notice-popup" : "display-none"}>
                    <div className="notice-header">
                        Notification
                    </div>
                    { noticData.length > 0 ?
                        noticData.map((data, index) => (
                            index < 6 ? 
                                <NotificationDetail detail={data} onPage={false}/>
                            :
                            null
                        ))
                        :
                        <div className={"no-data-now"}>
                            No notification at now
                        </div>
                    }
                    <DropdownItem>
                        <label className={"notice-see-more"} onClick={() => this.props.router.push("/notification")}>See all</label>
                    </DropdownItem>
                </div>
                <div className={loading ? "loading-state notice-popup-state" : "display-none"}>
                    <img
                        className={"loading-gif notice-popup-loading"}
                        src={"../../static/images/image-loader/spinner-loader.gif"}
                    />
                </div>
            </DropdownMenu>
        );
    }
}

export default compose(
    withAuthSync,
    withRouter
)(Notification)