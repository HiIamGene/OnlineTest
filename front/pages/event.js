import {Desktop, Mobile} from "../components/Responsive"
import React, { Component } from 'react'
import compose from "recompose/compose";
import {withNamespaces} from "../lib/i18n";
import {connect} from "react-redux"
import {withAuthSync} from "../utils/auth/index"
import {bindActionCreators} from "redux"
import {setProfile} from "../redux/actions/profileAction"
import EventsBox from "../components/Event/EventBox"
import CreateBox from "../components/Event/CreateBox"
import InviteBox from "../components/Event/InviteBox"
import PostsBox from "../components/Event/PostsBox";
import {withRouter} from "next/router";
import { API_FEED_EVENT_LIST } from "../constant/ENV";
import AppLayout from "../containers/app/advanceSearchLayout";
import Left from "../components/Event/ViewEvent/LeftSide";
import axios from "axios";
import { withToastManager } from "react-toast-notifications"

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            event: [],
            isEdit: false,
            eventData: [],
            perPage: 5,
            page: 1,
            totalPages: 1,
            scrolling: false,
            created: false,
            loadMore: false,
            redirect: false
        }
        this.getInitialEvent()
        //console.log("router => ",this.props.router)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    _isCreated = (state) => {
        this.setState({
            created: state
        })
    }

    handleScroll = (e) => {
        if(this.state.loading) return false

        const { scrolling, page, totalPages, created} = this.state
        if(scrolling) return false
        if(page >= totalPages) return false
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = winScroll / height
        //// console.log(scrolled)
        if(scrolled >= 0.7 && !created) {
            this.getMoreEvent()
            this._isCreated(true)
        }
    }

    getInitialEvent = () => {
        //// console.log(this.props.router)
        //// console.log("load more")
        this.setState({
            redirect: false
        })
        const { perPage, page, totalPages } = this.state
        const url = `${API_FEED_EVENT_LIST}?page=${page}&perPage=${perPage}`
        axios.get(url).then(response => {
            //// console.log(response)
            if(response.status == 200) {
                const event = response.data.payload;
                this.setState({
                    totalPages: event.pagination.totalPage
                })
                this.getSelectEvent(event.event);
            }
            //console.log(event);
        })
    }

    getMoreEvent = () => {
        this.setState((state) => ({
            page: state.page + 1
        }), this.getInitialEvent)
    }

    getSelectEvent = (eventList) => {
        const { action } = this.props.router.query;
        let { event } = this.state

        eventList.forEach((data, index) => {
            if(action === 'bookmark') {
                if(data.bookmark === 'saved') {
                    event.push(data)
                }
            }
            else if(action === 'my-events') {
                if(data.user.id === this.props.profile.user.id) {
                    event.push(data)
                }
            }
            else {
                event.push(data)
            }
        })
        
        this.setState({
            loading: false,
            event: event,
            created: false
        }, this.checkEventMore)
    }

    checkEventMore = () => {
        const { page, totalPages, event, perPage} = this.state
        if(page < totalPages) {
            if(event.length < perPage) {
                this.setState({
                    loading: true
                }, this.getMoreEvent)
            }
        }
    }

    _isEdit = (callback, eventData, index) => {
        //// console.log(callback, eventData);
       if(callback) {
            let array = this.state.event
            const members = array[index].members
            const user = array[index].user
            array[index] = {
                ...eventData, 
                members: members,
                user: user
            }
            this.setState({
                isEdit: true,
                event: array
            })
        }
    }

    _onClickRedirect = (callback, action) => {
        if(callback) {
            // console.log("Redirect ", action)
            if(action !== undefined) {
                this.props.router.query = {action: action}
            }
            this.setState({
                loading: true,
                event: new Array(),
                page: 1,
                redirect: true,
                created: true
            }, this.getInitialEvent)
        }
    }

    _onClickSelectDel = (callback, action, type) => {
        if(callback) {
            const array = this.state.event
            this.setState({
                event: new Array()
            }, () => this._changeEventArray(array, action))
            if(type !== 'bookmark') {
                this.props.toastManager.add("Delete your Event ", {
                    appearance: "success",
                    autoDismiss: true
                })
            }
        }
    }

    _changeEventArray = (array, index) => {
        array.splice(index, 1)
            this.setState({
            event: array
        })
    }

    render() {
        const { t } = this.props
        const { action } = this.props.router
        const { created } = this.props.router.query
        const { loading, event, isEdit, eventData } = this.state;
        const verified = this.props.profile.user.permissions.USER_ACTIVE.action === "YES"
        //const eventList = React.lazy(() => import(`${event}`))
        //console.log(eventList);
        
        return (
            <AppLayout>
                    <div 
                        className = {verified ? "eventfeed-content-container" : "eventfeed-content-container no-verify"} 
                        onScrollCapture={this.handleScroll}
                    >
                            <Desktop>
                                <div className ='wrapper-eventfeed-content-left'>
                                    <Left action ={action} onClick={this._onClickRedirect}/>
                                </div>
                                <div className ='wrapper-eventfeed-content-center'>
                                    {   
                                        <CreateBox eventData={eventData} isEdit={isEdit} ref={"CreateBox"} isCreated={this._onClickRedirect} created={created}/>
                                    }
                                    
                                    { loading ?
                                        <div className={"loading-event"}>
                                            <img 
                                                className={"loading-event-gif"}
                                                src={"../static/images/image-loader/spinner-loader.gif"}
                                            />
                                        </div>
                                        :
                                        event.length > 0 ?
                                            event.map((key, index) => (
                                                    <PostsBox 
                                                        eventData={key} 
                                                        isEdit={this._isEdit} 
                                                        isDelete={this._onClickSelectDel}
                                                        isSaveEdit={this._isEdit} 
                                                        index={index}
                                                    />
                                            ))
                                        :
                                            <div className={"loading-event"}>
                                                {t('CREATE.Status')}
                                            </div>
                                    }
                                </div>
                                <div className ='wrapper-eventfeed-content-right'>
                                    <EventsBox/>
                                    <InviteBox/>
                                </div>
                                <div className='chatlist-position'>
                                </div>
                            </Desktop>

                            <Mobile>
                            <div className={"wrapper-timeline-content-left wrapper-timeline-content"}>
                                <CreateBox/>
                                <div className = 'behind-create-post-box'>
                                    { loading ?
                                        <div className={"loading-event"}>
                                            <img 
                                                className={"loading-event-gif"}
                                                src={"../static/images/image-loader/spinner-loader.gif"}
                                            />
                                        </div>
                                        :
                                            event.length > 0 ?
                                                event.map((key, index) => (
                                                        <PostsBox 
                                                            eventData={key} 
                                                            isEdit={this._isEdit} 
                                                            isDelete={this._onClickSelectDel}
                                                            isSaveEdit={this._isEdit} 
                                                            index={index}
                                                        />
                                                ))
                                            :
                                                <div className={"loading-event"}>
                                                    No Event post
                                                </div>
                                    }
                                </div>
                            </div>
                        </Mobile>
                    </div>
            </AppLayout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProfile: bindActionCreators(setProfile, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
    }
}

export default compose(
    withAuthSync,
    connect(mapStateToProps, mapDispatchToProps),
    withNamespaces("event"),
    withToastManager,
    withRouter
)(Event);
