import React,{ Component } from 'react'
import TimelineLayout from "../containers/app/timelineLayout"
import RecommendBox from "../components/Timeline/RecommendBox"
import EventsBox from "../components/Timeline/EventsBox"
import CreatePostBox from "../components/Timeline/CreatePostBox"
import PostsBox from "../components/Timeline/PostsBox"
import InformationBox from "../components/Timeline/InformationBox/Index"
import FriendsBox from "../components/Timeline/FriendsBox"
import {Desktop, Mobile} from "../components/Responsive"
import {withAuthSync} from "../utils/auth/index"
import Router from "next/router"
import axios from "axios"
import {
    API_USER_PROFILE_EDUCATION,
    API_USER_PROFILE_EXPERIENCE_V010001,
    API_USER_PROFILE_SKILL_SOFT_SKILL,
    API_USER_PROFILE_ANOTHER_PROFILE
} from "../constant/ENV"
import compose from "recompose/compose"
import {connect} from "react-redux"
import {withNamespaces} from "../lib/i18n"
import {bindActionCreators} from "redux"
import {setProfile} from "../redux/actions/profileAction"
import { setAboutProfile } from "../redux/actions/aboutProfileAction"
import {withRouter} from "next/router"
import Navbar from '../components/Navbar'


class Timeline extends Component {
    constructor(props){
        super(props);
        
        this.state = { 
            loading: true,
            success: false,
            anotherProfile: [],
            anotherProfilePage : false,
            profileId: this.props.router.query.search
        }
        this.props.setAboutProfile(this.props.profile)
        //this._getData();  
    }

    static async getInitialProps(ctx) {
        let aboutInfo = {}
        try{
            const exp = await axios.get(API_USER_PROFILE_EXPERIENCE_V010001)
            const edu = await axios.get(API_USER_PROFILE_EDUCATION)
            const softSkill = await axios.get(API_USER_PROFILE_SKILL_SOFT_SKILL)
            aboutInfo = {
                    exp:exp.data.payload.experiences,
                    edu:edu.data.payload,
                    softSkill:softSkill.data.payload
            }
        }catch(e) {
            console.log(e)
        }
        return{
            aboutInfo,
            namespacesRequired: ['timeline'],
        }
    }

    componentDidMount(){
        this._getData();
    }

    componentDidUpdate() {
        if(this.props.router.query.search === undefined && this.state.anotherProfilePage) {
            this.setState({
                anotherProfilePage: false,
                loading: true,
                success: false
            }, this.componentDidMount)
        }
    }

    componentWillReceiveProps(nextProps) {
        const nextId = nextProps.router.query.search
        const prevId = this.props.router.query.search
        //console.log('prev', prevId, '\nnext', nextId)
        if(nextId !== prevId) {
            this.setState({
                profileId: nextId
            }, this._getData)
        }
    }

    _getData(){
        this.setState({
            loading: true,
            success: false,
            anotherProfile: false
        })
        const profileData = this.props.router.query
       // console.log('fetch-data', profileData, this.state.profileId)
        if(profileData.search !== undefined) {
            const url = API_USER_PROFILE_ANOTHER_PROFILE + profileData.search
            axios.get(url).then(response => {
                if(response.status == 200) {
                    const getData = response.data.payload
                    this.setState({
                        anotherProfile: {
                            user: {
                                ...getData,
                                proficiency: []
                            },
                            edu: getData.educations,
                            exp: getData.experiences,
                            softSkill: getData.softSkills,
                            router: this.props.router,
                        },
                        ...this.props,
                        loading: false,
                        success: true,
                        anotherProfilePage : true
                    }, this._setAboutAnotherData)
                }
            })
        }
        else {
            this.setState({
                loading : false,
                success: true,
                ...this.props,
                anotherProfilePage : false
            });
        }
    }

    _setAboutAnotherData = () => {
        const { anotherProfile } = this.state
        const url = `${API_USER_PROFILE_ANOTHER_PROFILE}about/${anotherProfile.user.id}`
        axios.get(url).then(response => {
            if(response.status == 200) {
                const data = {
                    user : {
                        ...anotherProfile.user
                    },
                    ...response.data.payload
                }
                this.props.setAboutProfile(data)
            }
        })
    }

    render () {
        let {user,profileStrength} = this.props.profile
        let data = this.state;
        const { t, router } = this.props
        return(!this.state.loading ?(
            this.state.success?(
            <TimelineLayout profile = {data}>
                {data.anotherProfilePage && data.anotherProfile.user.visibleStatus != "PUBLIC"? (<div><div>Private</div></div>) : <div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}>
                        <Desktop>
                            <div className={"wrapper-timeline-content-left"}>
                                {data.anotherProfilePage?<div> 
                                    <InformationBox anotherProfileId={this.props.router.query.search} anotherProfilePage={data.anotherProfilePage} aboutInfo={!data.anotherProfilePage? this.props.aboutInfo : data} softskill = {this.props.profile.user.softSkills} name={data.anotherProfile.user.name}/>
                                {
                                    <FriendsBox anotherProfile={this.props.router.query} anotherProfilePage={data.anotherProfilePage} name={data.anotherProfile.user.name}/>
                                }
                                </div>
                                :
                                <div> 
                                    <InformationBox anotherProfileId={this.props.router.query.search} anotherProfilePage={data.anotherProfilePage} aboutInfo={!data.anotherProfilePage? this.props.aboutInfo : data} softskill = {this.props.profile.user.softSkills} name={""}/>
                                {
                                    <FriendsBox anotherProfile={this.props.router.query} anotherProfilePage={data.anotherProfilePage} name={""}/>
                                }
                                </div>
                                }
                               
                            </div>

                            <div className={"wrapper-timeline-content-right"}>
                                {data.anotherProfilePage? "":
                                <div>
                                    <EventsBox/>
                                    <CreatePostBox/>
                                </div>
                                }
                                {data.anotherProfilePage ?<PostsBox user={data.anotherProfile.user}/> : ""}
                                <div className ='chatlist-position'>
                                </div>
                            </div>
                        </Desktop>

                        <Mobile>
                            <div className={"wrapper-timeline-content-left wrapper-timeline-content"}>
                                <InformationBox anotherProfileId = {this.props.router.query} anotherProfilePage = {data.anotherProfilePage} aboutInfo={!data.anotherProfilePage? this.props.aboutInfo : data} />
                                {data.anotherProfilePage? "":
                                <div>
                                    <EventsBox/>
                                    <FriendsBox/>
                                    <CreatePostBox/>
                                </div>
                                }
                                {/* <PostsBox user={!data.anotherProfilePage?this.props.profile.user:data.anotherProfile.user}/> */}
                            </div>
                        </Mobile>
                    </div>
                </div>}
            </TimelineLayout>) : 
            (<div>
                <Navbar/>
                <div style={{
                    marginTop: '25%',
                    marginLeft: '25%',
                    fontSize: '72px'
                }}>
                    <span>404: User Not Found</span>
                </div>
            </div>) ) : 
            (<div>
                <Navbar/>
                <div style={{
                    marginTop: '25%',
                    marginLeft: '35%',
                    fontSize: '72px'
                }}>
                    <div className={"center-loading"}>
                         <img 
                            className={"loading-event-gif"}
                            src={"static/images/image-loader/spinner-loader.gif"}
                        />
                    </div>
                </div>
            </div>)
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProfile: bindActionCreators(setProfile, dispatch),
        setAboutProfile: bindActionCreators(setAboutProfile, dispatch)
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
        aboutProfile: state.aboutProfileReducer
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withNamespaces(),
    withAuthSync,
    withRouter
)(Timeline);