import React, {Component} from "react"
import { compose } from "redux"
import { withAuthSync } from "../../utils/auth"
import { withRouter } from "next/router"
import { connect } from "react-redux"
import NotificationDetail from "./NotificationDetail"
import { API_ALL_NOTIFICATION } from "../../constant/ENV"
import axios from "axios"
import socketIOclient from "socket.io-client"
import { SOCKET_SERVICE } from "../../constant/ENV"

class SeeAllNotification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noticData: new Array(),
            perPage: 10,
            page: 1,
            totalPage: 1,
            loading: true,
            scrolling: false,
            loadMore: false
        }
        //console.log(this.props.auth.token)
        this.socketIO = socketIOclient(SOCKET_SERVICE, {
            query : {
                authorization: this.props.auth.token
            }
        })
    }

    componentDidMount() {
        //console.log("did mount", this.socketIO)
        this.getInitialNotification()
        this.receivDataSocketIO()
        window.addEventListener('scroll', this.handleScroll)
    }


    componentWillUnmount() {
        //console.log("will unmount")
        window.removeEventListener('scroll', this.handleScroll)
    }

    receivDataSocketIO = () => {
        this.socketIO.on("get-noti-alert", (socket) => {
            //console.log("connected")
            //console.log("notification socket -> ", socket)
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
    }

    handleScroll = (e) => {
        const { scrolling, page, totalPage, loadMore, loading} = this.state

        if(loading) return false
        if(scrolling) return false
        if(page >= totalPage) return false

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = winScroll / height

        //// console.log(scrolled, page, totalPage)
        if(scrolled >= 0.7 && !loadMore) {
            this.loadMore()
        }
    }

    getInitialNotification = () => {
        //// console.log("initial data . . .")
        this.setState({
            loading: true,
            loadMore: true
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

    loadMore = () => {
        this.setState((state) => ({
            page: state.page + 1
        }), this.getDataMore)
    }

    getDataMore = () => {
        //// console.log("load more . . .")
        this.setState({
            loadMore: true
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
                    loadMore: false
                })
            }
        })
    }

    render() {
        const { loading, noticData } = this.state
        //const noticData = new Array()
        //// console.log(noticData)
        return (
            <div className={"notification-page"}>
                <div className={"notification-page-head"}>
                    <span>Notification</span>
                </div>
                <div className={loading ? "loading-state" : "display-none"}>
                    <img
                        className={"loading-gif"}
                        src={"../../static/images/image-loader/spinner-loader.gif"}
                    />
                </div>
                <div className={!loading ? "notification-page-body" : "display-none"}>
                    {
                        noticData.length > 0 ?
                            noticData.map((data, index) => (
                                <NotificationDetail detail={data} index={index} onPage={true}/>
                            ))
                        :
                        <div className={"no-data-now"}>
                            No notification at now
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        profile: store.profileReducer,
        auth: store.authReducer
    }
};

export default compose(
    connect(mapStateToProps),
    withAuthSync,
    withRouter
)(SeeAllNotification)