import compose from 'recompose/compose'
import React, {Component} from 'react'
import AdvanceSearchLayout from '../containers/app/advanceSearchLayout'
import FilterResult from '../components/AdvanceSearch/FilterResult'
import BodyResult from '../components/AdvanceSearch/BodyResult';
import EventBox from '../components/AdvanceSearch/EventResult'
import PostsBox from '../components/Timeline/PostsBox'
import Head from '../components/AdvanceSearch/Header'
import {withNamespaces} from "../lib/i18n";
import {connect} from "react-redux"
import {setProfile} from "../redux/actions/profileAction"
import {bindActionCreators} from "redux"
import {withAuthSync} from "../utils/auth/index"
import ChatList from "../components/Chat";
class AdvanceSearch extends Component{
    constructor(props){
        super(props)
    }

    static getInitialProp(ctx){
        return{
            namespacesRequired: ['advance-search']
        }
    }

    render(){
        return(
            <AdvanceSearchLayout>
                <div className={'head'}>
                    <Head/>
                </div>
                <div className={'body'}>
                    <div className={'filter-result'}>
                        <FilterResult/>
                    </div>
                    <div className={'body-result'}>
                        <BodyResult/>
                        <div className={'body-event'}>
                            {/* <EventBox/> */}
                        </div>
                        <div className={'body-feed'}>
                            { console.log(this.props)}
                            {//<PostsBox user={this.props}/>}
                            }
                        </div>
                    </div>
                </div>
                <style jsx>
                    {`
                        .head{
                            margin-top: 4.25%;
                            width: 100%;
                            height: 100%;
                        }

                        .body{
                            margin-top: 1%;
                            display: flex;
                            flex-direction: row;
                            width: 100%;
                            height: 100%;
                        }

                        .filter-result{
                            margin-left: 2%;
                            width: 15%;
                        }

                        .body-result{
                            width: 100%;
                            margin-left: 1.75%;
                        }

                        .body-event{
                            margin-top: 1%;
                            width: 60%;
                        }

                        .body-feed{
                            margin-top: 1%;
                            width: 60%;
                        }
                    `}
                </style>
                <div className='chatlist-position'>
                </div>
            </AdvanceSearchLayout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProfile: bindActionCreators(setProfile, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
    }
}

export default compose(
    connect(mapDispatchToProps, mapStateToProps),
    withNamespaces(),
    withAuthSync
)(AdvanceSearch)