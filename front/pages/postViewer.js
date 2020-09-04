import React, { Component } from 'react'
import { addPost } from '../redux/actions/postAction'
import Layout from '../containers/app/advanceSearchLayout'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { withAuthSync } from '../utils/auth/index'
import { connect } from 'react-redux'
import axios from 'axios'
import { API_FEED_POST } from '../constant/ENV'
import { withToastManager } from 'react-toast-notifications'
import PostShow from '../components/Feed/PostsBox/PostShow'
import { withRouter } from 'next/router'

class PostViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: [],
            loading: true,
            success: false
        }
        //console.log('constructor',this.props)
    }

    componentDidMount() {
        const { query } = this.props.router
        this.getPost(query.id)
    }

    componentDidUpdate() {
        const { loading } = this.state
        if(!loading) {
            if(this.state.post[0] !== undefined) {
                const prevId = this.state.post[0].id
                const nextId = this.props.router.query.id
                //console.log('did-update', nextId, prevId)
                if(prevId !== nextId) {
                    this.componentDidMount()
                }
            }
        }
    }

    componentWillReceiveProps() {
        //console.log('receive props')
    }

    getPost = async (postId) => {
        this.setState({
            loading: true,
            success: false
        })
        
        const url = `${API_FEED_POST}/${postId}`
        try {
            const res = await axios.get(url)
            const { data } = res
            const { payload } = data
            //console.log(payload)
            this.setState({
                post: [
                    payload.post
                ],
                loading: false,
                success: true
            })
        }
        catch(err) {
            console.log('post-view-error', err)
            this.props.toastManager.add("This post is no longer available", {
                appearance: "warning",
                autoDismiss: true
            })
            this.setState({
                loading: false,
                success: false
            })
        } 
    }

    render() {
        const { post, loading , success} = this.state
        const { user } = this.props.profile
        const verified = user.permissions.USER_ACTIVE.action === 'YES'
        return (
            <Layout> {
                !loading ?
                    success ? 
                        <div className={verified ? 'post-viewer-less' : 'post-viewer-full'}>
                            <PostShow posts={post} />
                        </div>
                    :
                        <div className={'post-viewer-center'}>
                            This Post is no longer available
                        </div>
                :
                    <div className={"post-viewer-center no-feed-wrapper"}>
                        <img className="loading-screen" src="../static/images/image-loader/spinner-loader.gif" />
                    </div>
            }
            </Layout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPosts: bindActionCreators(addPost, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.dataReducer,
        profile: state.profileReducer
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthSync,
    withToastManager,
    withRouter
)(PostViewer)