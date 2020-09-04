import React, { Component } from 'react'
import FriendInformation from "./FriendInformation";
import { friendList, anotherFriendList } from '../../services/userService';
import { setPop } from '../../redux/actions/friendAction'
import compose from "recompose/compose"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { SET } from '../../redux/reducers/friendReducer';
import {withRouter} from "next/router";

class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: [],
            friend: 0,
            page: 1,
            perPage: 10,
            totalPage: 1,
            loading: false,
            searchId: props.router.query.search
        }
        //this._friendList = this._friendList.bind(this);
    }

    componentWillMount() {
        this.props.onRef(this);
        this._friendList();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUpdate() {
        /* const { searchId } = this.state
        const { search } = this.props.router.query
        if(search !== undefined) {
            if(search !== searchId) {
                this.setState({
                    searchId: search
                }, this.forceUpdate)
            }
        } */
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const { loading } = this.state
        if(loading) return false

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = winScroll / height
        if(scrolled > 0.7) {
            // console.log('more')
            this.getMoreFriend()
        }
    }

    getMoreFriend = () => {
        let { page, totalPage } = this.state
        if(page < totalPage) {
            this.setState({
                page: page+1
            }, this._friendList)
        }
    }

    _friendList = async() => {
        this.setState({
            loading: true
        })
        if (this.props.anotherProfile == false) {
            const { page, perPage } = this.state
            let data = await friendList(page, perPage);
            const { pagination, listFriend } = data.listFriends
            const { totalPage } = pagination
            let { request } = this.state
            listFriend.forEach((key) => {
                request.push(key)
            })

            this.setState({
                request: request,
                friend: listFriend.length,
                totalPage: totalPage,
                loading: false
            }, () => this.props.setPop(this.state));
            
        }
        else {
            const { page, perPage } = this.state
            let data = await anotherFriendList(this.props.anotherProfileId, page, perPage);
            const { pagination, listFriends } = data
            // const { totalPage } = pagination

            this.setState({
                request: listFriends,
                friend: listFriends.length,
                loading: false,
                // totalPage: totalPage,
            }, () => this.props.setPop(this.state));
    }

}
render() {
    const anotherProfile = this.props.anotherProfile
    return (
        <div className="wrapper">
            <div className="container">
                {this.state.friend == 0 ? <div className="no-invition">No invition right now.</div> : this.state.request == null ? "" : this.state.request.map((data) => {
                    return (
                        <div className="item-friend"><FriendInformation data={data} key={data.id} reload={() => { this._friendList() }} anotherProfile={anotherProfile} /></div>
                    );
                })}
            </div>
        </div>
    )
}
}
const mapDispatchToProps = dispatch => {
    return {
        setPop: (number) => { dispatch({ type: SET, payload: number }) }
    }
}

const mapStateToProps = (state) => {
    return {
        popularity: state.friendReducer
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(FriendList)