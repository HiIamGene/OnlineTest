import React, { Component } from "react";
import Card from "../feed";
import FriendItem from "./FriendItem";
import compose from "recompose/compose";
import { withNamespaces } from "../../../lib/i18n";
import { withRouter } from "next/dist/lib/router";
import { geolocated } from "react-geolocated";
import { connect } from "react-redux";
import socketIOclient from "socket.io-client";
import { SOCKET_USER } from "../../../constant/ENV";
import { setNearmeShow } from "../../../redux/actions/feedAction";

// import InfiniteScroll from 'react-infinite-scroller';

class FriendsBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            additional_window: false,
            response: false,
            users: [],
            pagination: {
                perPage: 4,
                page: 1
            },
            isFetchNearMe: false,
            isSocketConnect: false,
            isShowNearMe: true,
            isIntervalStart: false,
            oneTimeRunning: 0
        };
        this._showWindow = this._showWindow.bind(this);
        this.emitLocation = this.emitLocation.bind(this);
        this.setNearMeInterval = this.setNearMeInterval.bind(this);
        this.socketIO = socketIOclient(SOCKET_USER, {
            query: {
                authorization: this.props.auth.token
            }
        });
    }

    setNearMeInterval() {
        setInterval(() => {
            this.emitLocation();
        }, 1000);
    }
    _showWindow(additional_window) {
        this.setState({
            additional_window
        });
    }

    componentWillMount() {
        if (this.state.oneTimeRunning === 0) {
            this.emitLocation();
            this.setState({
                oneTimeRunning: 1
            });
        }
        if (!this.state.isIntervalStart) {
            this.setNearMeInterval();
            this.setState({
                isIntervalStart: true
            });
        }
    }

    async emitLocation(nextPage = false) {
        try {
            if (this.props.coords) {
                let { pagination } = this.state;
                this.socketIO.emit("sent-nearme", {
                    lat: this.props.coords.latitude,
                    lng: this.props.coords.longitude,
                    page: nextPage ? pagination.page++ : pagination.page,
                    perPage: pagination.perPage
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        try {
            if (this.socketIO && !this.state.isSocketConnect) {
                this.socketIO.on("get-nearme", data => {
                    if (data.payload) {
                            this.setState({
                            users: data.payload.users,
                            pagination: data.payload.pagination
                        });
                    }
                    if (!this.state.users.length > 0) this.props.setNearmeShow(false);
                    else {
                        if (!this.props.feed.isNearmeShow) this.props.setNearmeShow(true);
                    }
                });
                this.setState({
                    isSocketConnect: true
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let { t } = this.props;
        let isGeolocationPass = false;
        let content;
        switch (true) {
            case !this.props.isGeolocationAvailable: {
                content = <div>Your browser does not support Geolocation</div>;
                break;
            }
            case !this.props.isGeolocationEnabled: {
                content = <div>Geolocation is not enabled</div>;
                break;
            }
            case !this.props.coords: {
                content = <div>Getting the location data&hellip;</div>;
                break;
            }
            case !this.state.users.length > 0: {
                content = <div>No someone nearby you&hellip;</div>;
                break;
            }
            default: {
                isGeolocationPass = true;
                if (!this.state.isFetchNearMe) {
                    this.emitLocation();
                    this.setState({
                        isFetchNearMe: true,
                        isShowNearMe: this.state.users && this.state.users.length >= 0
                    });
                }
                content = (
                    <div>
                        {this.state.users &&
                            this.state.users.map((value, index) => {
                                if (index >= 4) return;
                                return <FriendItem data={value} key={"friend-item-" + index} />;
                            })}
                        <button
                            className="find-friends-btn"
                            onClick={() => {
                                this._showWindow(true);
                            }}
                        >
                            {this.state.users.length > 4 ? t("NEARBY_MENU.Discover More") : ""}
                        </button>
                        {this.state.additional_window && (
                            <div className="nearby-list-header">
                                <Card
                                    title={t("NEARBY_MENU.Near Me")}
                                    topRight={
                                        <span
                                            className={"btn-close-find-friends"}
                                            onClick={() => {
                                                this._showWindow(false);
                                            }}
                                        >
                                            <i className="fas fa-times" />
                                        </span>
                                    }
                                >
                                    <div className="center-div">
                                        <Card noMargin={true}>
                                            {/*<InfiniteScroll*/}
                                            {/*pageStart={0}*/}
                                            {/*loadMore={()=>{*/}
                                            {/*this.emitLocation(true)*/}
                                            {/*}}*/}
                                            {/*hasMore={true}*/}
                                            {/*loader={<div className="loader" key={0}>Loading ...</div>}*/}
                                            {/*>*/}
                                            {this.state.users.map((value, index) => {
                                                if (index >= this.state.pagination.perPage) return;
                                                return <FriendItem data={value} key={"friend-item-" + index} />;
                                            })}
                                            {/*</InfiniteScroll>*/}
                                        </Card>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                );
            }
        }

        return (
            this.state.isShowNearMe && (
                <div className={"near-me"}>
                    <div className={"wrapper-overall"}>
                        <Card
                            title={t("NEARBY_MENU.Near Me")}
                            noPadding_bottom={true}
                        >
                            <div className={"wrapper"}>
                                {content}
                                {!isGeolocationPass && <br />}
                                {this.state.additional_window ? (
                                    <div
                                        className="grey-onclick-element show near"
                                        onClick={() => {
                                            this._showWindow(false);
                                        }}
                                    />
                                ) : (
                                    <div className="grey-onclick-element near" />
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            )
        );
    }
}

export default compose(
    connect(
        store => {
            return {
                auth: store.authReducer,
                socket: store.socketReducer,
                feed: store.feedReducer
            };
        },
        { setNearmeShow }
    ),
    geolocated({
        positionOptions: {
            enableHighAccuracy: false
        },
        userDecisionTimeout: 5000
    }),
    withNamespaces("timeline"),
    withRouter
)(FriendsBox);
