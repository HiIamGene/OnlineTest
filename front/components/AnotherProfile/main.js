import React, {Component} from 'react';
import Navbar from '../Navbar'
import {compose} from 'recompose';
import axios from 'axios';
import TimelineLayout from "../../containers/app/timelineLayout"
import PostBox from '../../components/Timeline/PostsBox'
import CreatePostBox from "../../components/Timeline/CreatePostBox"
import InformationBox from "../../components/Timeline/InformationBox/Index"
import LicenseAndCertificate from "../../components/Timeline/InformationBox/LicenseAndCertificate"
import Education from "../../components/Timeline/InformationBox/Education"
import Skill from "../../components/Timeline/InformationBox/Skill"
import FriendsBox from "../../components/Timeline/FriendsBox"
import {withNamespaces} from "../../lib/i18n";
import {API_USER_PROFILE_EXPERIENCE_V010001, 
        API_USER_PROFILE_EDUCATION, 
        API_USER_PROFILE_SKILL_SOFT_SKILL, 
        API_USER_PROFILE_ANOTHER_PROFILE} from '../../constant/ENV';
import Card from "../../components/Timeline/Card"
import {withRouter} from "next/router"
import {connect} from "react-redux"

class AnotherProfile extends Component{
    constructor(props){
        super(props)

        this.state = { 
            loading: true,
            success: false
        }
        // console.log("another-profile", this.props)
        // console.log('Another-Profile-Page', Date())
        this.getData()
    }

    async getData(){
        let href = window.location.href.split('=')
        let data = href[1]
        try{
            let getData = await axios.get(API_USER_PROFILE_ANOTHER_PROFILE+data)
            this.setState({
                anotherProfile: {
                    user: {
                        ...getData.data.payload,
                        proficiency: []
                    },
                    education: getData.data.payload.education,
                    softSkill: getData.data.payload.softSkill,
                    router: this.props.router,
                },
                ...this.props,
                loading: false,
                success: getData.status == 200 ? true : false
            })
        }
        catch{
            this.setState({
                loading: false,
                success: false
            })
        }
        // console.log("data : " ,this.state);
    }

    render(){
        const data = this.state
        //// console.log('props ', data)
        return(
            !this.state.loading ?(
                this.state.success && !_.isUndefined(data.anotherProfile) ?(
                    <TimelineLayout profile={data}>
                        <div> 
                            <div style={{
                                display: "flex",
                                justifyContent: "space-around",
                                }}>
                                <div className={"wrapper-timeline-content-left"}>
                                    <Card>
                                        <LicenseAndCertificate props={data}/> 
                                        <Education info={data.anotherProfile}/>
                                        <Skill info={data.anotherProfile}/>
                                    </Card>
                                    <FriendsBox/>
                                </div>
                            
                                <div className={"wrapper-timeline-content-right"}>
                                    <PostBox user={data}/> 
                                </div>

                            </div>
                        </div>
                    </TimelineLayout>
                ): 
                    <div>
                        <Navbar/>
                        <div style={{
                            marginTop: '25%',
                            marginLeft: '25%',
                            fontSize: '72px'
                        }}>
                            <span>404: User Not Found</span>
                        </div>
                    </div>
            ):
                <div>
                    <Navbar/>
                    <div style={{
                        marginTop: '25%',
                        marginLeft: '35%',
                        fontSize: '72px'
                    }}>
                        <span>{'Loading .......'}</span>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
    }
}

export default compose(
    connect(mapStateToProps),
    withNamespaces('another-profile'),
    withRouter
)(AnotherProfile)